const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { toUserRequestDTO, toUserResponseDTO } = require('../dto/user.dto');

const VALID_ROLES = ['RIDER', 'CUSTOMER', 'AGENT', 'ADMIN'];
const SALT_ROUNDS = 10;


exports.register = async (req, res) => {
    try {
        const userData = toUserRequestDTO(req.body);

        if (!userData.name || !userData.email || !userData.phone || !userData.password || !userData.role) {
            return res.status(400).json({ message: 'name, email, phone, password and role are all required.' });
        }

        if (!VALID_ROLES.includes(userData.role)) {
            return res.status(400).json({ message: `role must be one of: ${VALID_ROLES.join(', ')}` });
        }


        userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);

        const user = await User.create(userData);

        return res.status(201).json(toUserResponseDTO(user));
    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email or phone is already registered.' });
        }
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};



exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users.map(toUserResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting users', error: error.message });
    }
};


exports.findOne = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: `User with id ${req.params.id} not found.` });
        }

        return res.status(200).json(toUserResponseDTO(user));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting user', error: error.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = toUserRequestDTO(req.body);

        if (userData.role && !VALID_ROLES.includes(userData.role)) {
            return res.status(400).json({ message: `role must be one of: ${VALID_ROLES.join(', ')}` });
        }


        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
        }

        const [updatedRows] = await User.update(userData, { where: { id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: `User with id ${id} not found.` });
        }

        const updatedUser = await User.findByPk(id);
        return res.status(200).json(toUserResponseDTO(updatedUser));
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email or phone is already registered.' });
        }
        return res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};


exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await User.destroy({ where: { id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: `User with id ${id} not found.` });
        }

        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};