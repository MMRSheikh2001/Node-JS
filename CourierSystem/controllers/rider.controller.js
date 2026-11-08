const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const User = require('../models/user.model');
const Rider = require('../models/rider.model');
const PoliceStation = require('../models/police-station.model');
const District = require('../models/district.model');
const Division = require('../models/division.model');
const Country = require('../models/country.model');
const {
    toRiderUserRequestDTO,
    toRiderProfileRequestDTO,
    toZoneIds,
    toRiderResponseDTO
} = require('../dto/rider.dto');

const SALT_ROUNDS = 10;

// Eager-load chain for the response DTO:
// Rider -> User, and Rider -> zones -> District -> Division -> Country.
// `through: { attributes: [] }` hides the raw join-table columns so the
// response only carries each zone's own fields.
const RIDER_INCLUDE = [
    { model: User, as: 'user' },
    {
        model: PoliceStation,
        as: 'zones',
        through: { attributes: [] },
        include: [{
            model: District,
            as: 'district',
            include: [{ model: Division, as: 'division', include: [{ model: Country, as: 'country' }] }]
        }]
    }
];

// Multer writes the file before the controller runs, so if the request
// fails afterwards we remove the orphaned file.
function deleteUploadedFileIfAny(req) {
    if (req.file) {
        fs.unlink(req.file.path, () => { });
    }
}

// Returns the zone ids that don't exist as PoliceStations, so we can reject
// the request with a clear message instead of a raw foreign-key DB error.
async function findMissingZoneIds(zoneIds) {
    const uniqueIds = [...new Set(zoneIds)];
    if (uniqueIds.length === 0) return [];
    const found = await PoliceStation.findAll({ where: { id: uniqueIds }, attributes: ['id'] });
    const foundIds = new Set(found.map((z) => z.id));
    return uniqueIds.filter((id) => !foundIds.has(id));
}

// CREATE: User (role=RIDER) + Rider profile + zone links, in one transaction.
exports.create = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const userData = toRiderUserRequestDTO(req.body);
        const profileData = toRiderProfileRequestDTO(req.body);
        const zoneIds = toZoneIds(req.body);

        if (req.file) {
            profileData.image = `/uploads/rider/${req.file.filename}`;
        }

        if (!userData.name || !userData.email || !userData.phone || !userData.password) {
            await t.rollback();
            deleteUploadedFileIfAny(req);
            return res.status(400).json({ message: 'name, email, phone and password are all required.' });
        }

        const missingZones = await findMissingZoneIds(zoneIds);
        if (missingZones.length > 0) {
            await t.rollback();
            deleteUploadedFileIfAny(req);
            return res.status(400).json({ message: `Zone not found: ${missingZones.join(', ')}` });
        }

        userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);

        const user = await User.create({ ...userData, role: 'RIDER' }, { transaction: t });
        const rider = await Rider.create({ ...profileData, userId: user.id }, { transaction: t });

        // setZones fills the rider_zones join table. An empty list is allowed:
        // a rider can be created first and given zones later through update.
        if (zoneIds.length > 0) {
            await rider.setZones(zoneIds, { transaction: t });
        }

        await t.commit();

        const created = await Rider.findByPk(rider.id, { include: RIDER_INCLUDE });
        return res.status(201).json(toRiderResponseDTO(created));
    } catch (error) {
        await t.rollback();
        deleteUploadedFileIfAny(req);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email or phone is already registered.' });
        }
        return res.status(500).json({ message: 'Error creating rider', error: error.message });
    }
};


// READ - all
exports.findAll = async (req, res) => {
    try {
        const riders = await Rider.findAll({ include: RIDER_INCLUDE });
        return res.status(200).json(riders.map(toRiderResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting riders', error: error.message });
    }
};

// READ - one by Rider id
exports.findOne = async (req, res) => {
    try {
        const rider = await Rider.findByPk(req.params.id, { include: RIDER_INCLUDE });

        if (!rider) {
            return res.status(404).json({ message: `Rider with id ${req.params.id} not found.` });
        }

        return res.status(200).json(toRiderResponseDTO(rider));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting rider', error: error.message });
    }
};

// READ - one by User id
exports.findByUserId = async (req, res) => {
    try {
        const rider = await Rider.findOne({ where: { userId: req.params.userId }, include: RIDER_INCLUDE });

        if (!rider) {
            return res.status(404).json({ message: `Rider for user id ${req.params.userId} not found.` });
        }

        return res.status(200).json(toRiderResponseDTO(rider));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting rider', error: error.message });
    }
};


// READ - riders covering a given zone.  GET /api/rider/police-station/:policeStationId?active=true
//
// Two steps on purpose. If we put `where` straight on the `zones` include,
// Sequelize would also trim each matched rider's zones down to just that one
// zone in the response. So step 1 only finds the matching rider ids, and
// step 2 reloads those riders with their full zone list.
exports.findByPoliceStationId = async (req, res) => {
    try {
        const { policeStationId } = req.params;

        const matches = await Rider.findAll({
            attributes: ['id'],
            include: [{
                model: PoliceStation,
                as: 'zones',
                attributes: [],
                through: { attributes: [] },
                where: { id: policeStationId },
                required: true
            }]
        });
        const riderIds = matches.map((r) => r.id);

        if (riderIds.length === 0) {
            return res.status(200).json([]);
        }

        const where = { id: riderIds };
        if (req.query.active !== undefined) {
            where.active = req.query.active === 'true';
        }

        const riders = await Rider.findAll({ where, include: RIDER_INCLUDE });
        return res.status(200).json(riders.map(toRiderResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting riders for police station', error: error.message });
    }
};

// READ - riders covering any zone inside a district.  GET /api/rider/district/:districtId?active=true
// Same two-step idea, one level deeper (zones -> district).
exports.findByDistrictId = async (req, res) => {
    try {
        const { districtId } = req.params;

        const matches = await Rider.findAll({
            attributes: ['id'],
            include: [{
                model: PoliceStation,
                as: 'zones',
                attributes: [],
                through: { attributes: [] },
                required: true,
                include: [{ model: District, as: 'district', attributes: [], where: { id: districtId }, required: true }]
            }]
        });
        const riderIds = [...new Set(matches.map((r) => r.id))];

        if (riderIds.length === 0) {
            return res.status(200).json([]);
        }

        const where = { id: riderIds };
        if (req.query.active !== undefined) {
            where.active = req.query.active === 'true';
        }

        const riders = await Rider.findAll({ where, include: RIDER_INCLUDE });
        return res.status(200).json(riders.map(toRiderResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting riders for district', error: error.message });
    }
};


// UPDATE: profile fields, optional new image, optional zone replacement.
// No `zones` key in the body = zones untouched. `zones` present (even an
// empty list) = the rider's zone set is replaced with exactly that list.
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const profileData = toRiderProfileRequestDTO(req.body);
        const zonesProvided = req.body.zones !== undefined;
        const zoneIds = zonesProvided ? toZoneIds(req.body) : null;

        const rider = await Rider.findByPk(id);
        if (!rider) {
            deleteUploadedFileIfAny(req);
            return res.status(404).json({ message: `Rider with id ${id} not found.` });
        }

        if (zonesProvided) {
            const missingZones = await findMissingZoneIds(zoneIds);
            if (missingZones.length > 0) {
                deleteUploadedFileIfAny(req);
                return res.status(400).json({ message: `Zone not found: ${missingZones.join(', ')}` });
            }
        }

        let oldImagePath = null;
        if (req.file) {
            if (rider.image) {
                oldImagePath = path.join(__dirname, '..', rider.image);
            }
            profileData.image = `/uploads/rider/${req.file.filename}`;
        }

        await rider.update(profileData);

        if (zonesProvided) {
            await rider.setZones(zoneIds);
        }

        // The old image is only removed once the DB update has succeeded.
        if (oldImagePath) {
            fs.unlink(oldImagePath, () => { });
        }

        const updated = await Rider.findByPk(id, { include: RIDER_INCLUDE });
        return res.status(200).json(toRiderResponseDTO(updated));
    } catch (error) {
        deleteUploadedFileIfAny(req);
        return res.status(500).json({ message: 'Error updating rider', error: error.message });
    }
};

// PATCH /api/rider/:id/active  body: { "active": true | false }
// A small on/off switch that doesn't need the full update payload.
exports.setActive = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;

        if (typeof active !== 'boolean') {
            return res.status(400).json({ message: 'active must be true or false.' });
        }

        const [updatedRows] = await Rider.update({ active }, { where: { id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: `Rider with id ${id} not found.` });
        }

        const updated = await Rider.findByPk(id, { include: RIDER_INCLUDE });
        return res.status(200).json(toRiderResponseDTO(updated));
    } catch (error) {
        return res.status(500).json({ message: 'Error updating rider active status', error: error.message });
    }
};

// DELETE: removes the Rider profile (the User account stays). Sequelize
// also clears this rider's rows from the rider_zones join table.
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await Rider.findByPk(id);
        if (!existing) {
            return res.status(404).json({ message: `Rider with id ${id} not found.` });
        }

        await Rider.destroy({ where: { id } });

        if (existing.image) {
            fs.unlink(path.join(__dirname, '..', existing.image), () => { });
        }

        return res.status(200).json({ message: 'Rider deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting rider', error: error.message });
    }
};