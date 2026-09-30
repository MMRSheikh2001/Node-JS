

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const User = require('../models/user.model');
const Agent = require('../models/agent.model');
const PoliceStation = require('../models/police-station.model');
const District = require('../models/district.model');
const Division = require('../models/division.model');
const Country = require('../models/country.model');
const {
  toAgentUserRequestDTO,
  toAgentProfileRequestDTO,
  toAgentResponseDTO
} = require('../dto/agent.dto');

const SALT_ROUNDS = 10;


const AGENT_INCLUDE = [
  { model: User, as: 'user' },
  {
    model: PoliceStation,
    as: 'hub',
    include: [{
      model: District,
      as: 'district',
      include: [{ model: Division, as: 'division', include: [{ model: Country, as: 'country' }] }]
    }]
  }
];

function deleteUploadedFileIfAny(req) {
  if (req.file) {
    fs.unlink(req.file.path, () => {});
  }
}


exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userData = toAgentUserRequestDTO(req.body);
    const profileData = toAgentProfileRequestDTO(req.body);

    if (req.file) {
      profileData.image = `/uploads/agent/${req.file.filename}`;
    }

    if (!userData.name || !userData.email || !userData.phone || !userData.password) {
      await t.rollback();
      deleteUploadedFileIfAny(req);
      return res.status(400).json({ message: 'name, email, phone and password are all required.' });
    }
    if (!profileData.hubId) {
      await t.rollback();
      deleteUploadedFileIfAny(req);
      return res.status(400).json({ message: 'hubId is required.' });
    }

    userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);

    const user = await User.create({ ...userData, role: 'AGENT' }, { transaction: t });
    const agent = await Agent.create({ ...profileData, userId: user.id }, { transaction: t });

    await t.commit();

    const created = await Agent.findByPk(agent.id, { include: AGENT_INCLUDE });
    return res.status(201).json(toAgentResponseDTO(created));
  } catch (error) {
    await t.rollback();
    deleteUploadedFileIfAny(req);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Email or phone is already registered.' });
    }
    return res.status(500).json({ message: 'Error creating agent', error: error.message });
  }
};


// READ - all
exports.findAll = async (req, res) => {
  try {
    const agents = await Agent.findAll({ include: AGENT_INCLUDE });
    return res.status(200).json(agents.map(toAgentResponseDTO));
  } catch (error) {
    return res.status(500).json({ message: 'Error getting agents', error: error.message });
  }
};

// READ 
exports.findOne = async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id, { include: AGENT_INCLUDE });

    if (!agent) {
      return res.status(404).json({ message: `Agent with id ${req.params.id} not found.` });
    }

    return res.status(200).json(toAgentResponseDTO(agent));
  } catch (error) {
    return res.status(500).json({ message: 'Error getting agent', error: error.message });
  }
};


// READ 
exports.findByHubId = async (req, res) => {
  try {
    const { hubId } = req.params;
    const agents = await Agent.findAll({ where: { hubId }, include: AGENT_INCLUDE });
    return res.status(200).json(agents.map(toAgentResponseDTO));
  } catch (error) {
    return res.status(500).json({ message: 'Error getting agents for hub', error: error.message });
  }
};


// READ 
exports.findByUserId = async (req, res) => {
  try {
    const agent = await Agent.findOne({ where: { userId: req.params.userId }, include: AGENT_INCLUDE });

    if (!agent) {
      return res.status(404).json({ message: `Agent for user id ${req.params.userId} not found.` });
    }

    return res.status(200).json(toAgentResponseDTO(agent));
  } catch (error) {
    return res.status(500).json({ message: 'Error getting agent', error: error.message });
  }
};


// UPDATE 
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const profileData = toAgentProfileRequestDTO(req.body);

    let oldImagePath = null;
    if (req.file) {
      const existing = await Agent.findByPk(id);
      if (existing && existing.image) {
        oldImagePath = path.join(__dirname, '..', existing.image);
      }
      profileData.image = `/uploads/agent/${req.file.filename}`;
    }

    const [updatedRows] = await Agent.update(profileData, { where: { id } });

    if (updatedRows === 0) {
      deleteUploadedFileIfAny(req);
      return res.status(404).json({ message: `Agent with id ${id} not found.` });
    }

    if (oldImagePath) {
      fs.unlink(oldImagePath, () => {});
    }

    const updated = await Agent.findByPk(id, { include: AGENT_INCLUDE });
    return res.status(200).json(toAgentResponseDTO(updated));
  } catch (error) {
    deleteUploadedFileIfAny(req);
    return res.status(500).json({ message: 'Error updating agent', error: error.message });
  }
};

// DELETE 
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Agent.findByPk(id);
    if (!existing) {
      return res.status(404).json({ message: `Agent with id ${id} not found.` });
    }

    await Agent.destroy({ where: { id } });

    if (existing.image) {
      fs.unlink(path.join(__dirname, '..', existing.image), () => {});
    }

    return res.status(200).json({ message: 'Agent deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting agent', error: error.message });
  }
};