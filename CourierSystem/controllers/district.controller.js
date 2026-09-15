const District = require('../models/district.model');
const { toDistrictRequestDTO, toDistrictResponseDTO } = require('../dto/district.dto');


exports.create = async (req, res) => {
    try {
        const districtData = toDistrictRequestDTO(req.body);

        if (!districtData.name) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        if (!districtData.divisionId) {
            return res.status(400).json({ message: 'divisionId is required.' });
        }

        const district = await District.create(districtData);

        return res.status(201).json(toDistrictResponseDTO(district));
    } catch (error) {
        return res.status(500).json({ message: 'Error creating district', error: error.message });
    }
};



exports.findAll = async (req, res) => {
    try {
        const districts = await District.findAll();
        return res.status(200).json(districts.map(toDistrictResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting districts', error: error.message });
    }
};


exports.findOne = async (req, res) => {
    try {
        const district = await District.findByPk(req.params.id);

        if (!district) {
            return res.status(404).json({ message: `District with id ${req.params.id} not found.` });
        }

        return res.status(200).json(toDistrictResponseDTO(district));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting district', error: error.message });
    }
};



exports.findByDivisionId = async (req, res) => {
    try {
        const { divisionId } = req.params;

        const districts = await District.findAll({ where: { divisionId } });

        return res.status(200).json(districts.map(toDistrictResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting districts for division', error: error.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const districtData = toDistrictRequestDTO(req.body);
        const [updatedRows] = await District.update(districtData, { where: { id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: `District with id ${id} not found.` });
        }

        const updatedDistrict = await District.findByPk(id);
        return res.status(200).json(toDistrictResponseDTO(updatedDistrict));
    } catch (error) {
        return res.status(500).json({ message: 'Error updating district', error: error.message });
    }
};


exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await District.destroy({ where: { id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: `District with id ${id} not found.` });
        }

        return res.status(200).json({ message: 'District deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting district', error: error.message });
    }
};