const Division = require('../models/division.model');
const { toDivisionRequestDTO, toDivisionResponseDTO } = require('../dto/division.dto');



exports.create = async (req, res) => {
    try {
        const divisionData = toDivisionRequestDTO(req.body);

        if (!divisionData.name) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        if (!divisionData.countryId) {
            return res.status(400).json({ message: 'countryId is required.' });
        }

        const division = await Division.create(divisionData);

        return res.status(201).json(toDivisionResponseDTO(division));
    } catch (error) {
        return res.status(500).json({ message: 'Error creating division', error: error.message });
    }
};



exports.findAll = async (req, res) => {
    try {
        const divisions = await Division.findAll();
        return res.status(200).json(divisions.map(toDivisionResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting divisions', error: error.message });
    }
};



exports.findOne = async (req, res) => {
    try {
        const division = await Division.findByPk(req.params.id);

        if (!division) {
            return res.status(404).json({ message: `Division with id ${req.params.id} not found.` });
        }

        return res.status(200).json(toDivisionResponseDTO(division));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting division', error: error.message });
    }
};



exports.findByCountryId = async (req, res) => {
    try {
        const { countryId } = req.params;

        const divisions = await Division.findAll({ where: { countryId } });

        return res.status(200).json(divisions.map(toDivisionResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting divisions for country', error: error.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const divisionData = toDivisionRequestDTO(req.body);
        const [updatedRows] = await Division.update(divisionData, { where: { id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: `Division with id ${id} not found.` });
        }

        const updatedDivision = await Division.findByPk(id);
        return res.status(200).json(toDivisionResponseDTO(updatedDivision));
    } catch (error) {
        return res.status(500).json({ message: 'Error updating division', error: error.message });
    }
};


exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Division.destroy({ where: { id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: `Division with id ${id} not found.` });
        }

        return res.status(200).json({ message: 'Division deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting division', error: error.message });
    }
};