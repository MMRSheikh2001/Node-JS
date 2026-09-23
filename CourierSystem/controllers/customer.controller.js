const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const PoliceStation = require('../models/police-station.model');
const District = require('../models/district.model');
const Division = require('../models/division.model');
const {
    toCustomerUserRequestDTO,
    toCustomerProfileRequestDTO,
    toCustomerResponseDTO
} = require('../dto/customer.dto');

const SALT_ROUNDS = 10;

// Eager-load chain so the response DTO can flatten user + location names
// without extra round trips: Customer -> User, Customer -> PoliceStation -> District -> Division
const CUSTOMER_INCLUDE = [
    { model: User, as: 'user' },
    {
        model: PoliceStation,
        as: 'policeStation',
        include: [{ model: District, as: 'district', include: [{ model: Division, as: 'division' }] }]
    }
];

// Multer already writes the file to disk before the controller even runs.
// If registration fails afterwards (validation, DB error, etc.), delete that
// now-orphaned file instead of leaving it on disk forever.
function deleteUploadedFileIfAny(req) {
    if (req.file) {
        fs.unlink(req.file.path, () => { }); // best-effort, ignore errors
    }
}

// REGISTER — creates the User (auth account, role=CUSTOMER) and the
// Customer (profile) together, in one request, in one DB transaction:
// if either insert fails, both are rolled back (no orphaned User row).
exports.register = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const userData = toCustomerUserRequestDTO(req.body);
        const profileData = toCustomerProfileRequestDTO(req.body);

        // If an image was uploaded, req.file holds its saved-on-disk info
        // (courtesy of the `upload.single('image')` middleware on this route).
        // Store the public URL path, not the raw filesystem path.
        if (req.file) {
            profileData.image = `/uploads/customer/${req.file.filename}`;
        }

        if (!userData.name || !userData.email || !userData.phone || !userData.password) {
            await t.rollback();
            deleteUploadedFileIfAny(req);
            return res.status(400).json({ message: 'name, email, phone and password are all required.' });
        }

        userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);

        // 1. Create the auth account
        const user = await User.create({ ...userData, role: 'CUSTOMER' }, { transaction: t });

        // 2. Create the profile, linked to that account
        const customer = await Customer.create({ ...profileData, userId: user.id }, { transaction: t });

        await t.commit();

        const created = await Customer.findByPk(customer.id, { include: CUSTOMER_INCLUDE });
        return res.status(201).json(toCustomerResponseDTO(created));
    } catch (error) {
        await t.rollback();
        deleteUploadedFileIfAny(req);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email or phone is already registered.' });
        }
        return res.status(500).json({ message: 'Error registering customer', error: error.message });
    }
};


// READ - all
exports.findAll = async (req, res) => {
    try {
        const customers = await Customer.findAll({ include: CUSTOMER_INCLUDE });
        return res.status(200).json(customers.map(toCustomerResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting customers', error: error.message });
    }
};

// READ - one by Customer id
exports.findOne = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, { include: CUSTOMER_INCLUDE });

        if (!customer) {
            return res.status(404).json({ message: `Customer with id ${req.params.id} not found.` });
        }

        return res.status(200).json(toCustomerResponseDTO(customer));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting customer', error: error.message });
    }
};


// READ - one by User id (handy once login returns a userId)
// GET /api/customer/user/:userId
exports.findByUserId = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: { userId: req.params.userId },
            include: CUSTOMER_INCLUDE
        });

        if (!customer) {
            return res.status(404).json({ message: `Customer for user id ${req.params.userId} not found.` });
        }

        return res.status(200).json(toCustomerResponseDTO(customer));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting customer', error: error.message });
    }
};


// UPDATE - profile fields only (address/gender/dob/image/policeStationId).
// Auth fields (name/email/phone/password) aren't touched here — that would
// belong to a dedicated "update account" flow once login exists.
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const profileData = toCustomerProfileRequestDTO(req.body);

        let oldImagePath = null;
        if (req.file) {
            const existing = await Customer.findByPk(id);
            if (existing && existing.image) {
                oldImagePath = path.join(__dirname, '..', existing.image); // e.g. .../uploads/customer/old.jpg
            }
            profileData.image = `/uploads/customer/${req.file.filename}`;
        }

        const [updatedRows] = await Customer.update(profileData, { where: { id } });

        if (updatedRows === 0) {
            deleteUploadedFileIfAny(req);
            return res.status(404).json({ message: `Customer with id ${id} not found.` });
        }

        // Now that the new image is saved in the DB, it's safe to remove the old one
        if (oldImagePath) {
            fs.unlink(oldImagePath, () => { });
        }

        const updated = await Customer.findByPk(id, { include: CUSTOMER_INCLUDE });
        return res.status(200).json(toCustomerResponseDTO(updated));
    } catch (error) {
        deleteUploadedFileIfAny(req);
        return res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
};

// DELETE - removes the Customer profile only (leaves the User account intact,
// matching the fact that a User could later be re-used for a different role).
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await Customer.findByPk(id);
        if (!existing) {
            return res.status(404).json({ message: `Customer with id ${id} not found.` });
        }

        await Customer.destroy({ where: { id } });

        if (existing.image) {
            fs.unlink(path.join(__dirname, '..', existing.image), () => { });
        }

        return res.status(200).json({ message: 'Customer deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
};