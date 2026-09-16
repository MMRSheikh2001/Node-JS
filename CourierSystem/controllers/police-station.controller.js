const PoliceStation = require('../models/police-station.model');
const { toPoliceStationRequestDTO, toPoliceStationResponseDTO } = require('../dto/police-station.dto');


exports.create = async (req, res) => {
    try {
        const policeStationData = toPoliceStationRequestDTO(req.body);

        if (!policeStationData.name) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        if (!policeStationData.districtId) {
            return res.status(400).json({ message: 'districtId is required.' });
        }

        const policeStation = await PoliceStation.create(policeStationData);

        return res.status(201).json(toPoliceStationResponseDTO(policeStation));
    } catch (error) {
        return res.status(500).json({ message: 'Error creating police station', error: error.message });
    }
};



exports.findAll = async (req, res) => {
    try {
        const policeStations = await PoliceStation.findAll();
        return res.status(200).json(policeStations.map(toPoliceStationResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting police stations', error: error.message });
    }
};


exports.findOne = async (req, res) => {
    try {
        const policeStation = await PoliceStation.findByPk(req.params.id);

        if (!policeStation) {
            return res.status(404).json({ message: `Police station with id ${req.params.id} not found.` });
        }

        return res.status(200).json(toPoliceStationResponseDTO(policeStation));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting police station', error: error.message });
    }
};



exports.findByDistrictId = async (req, res) => {
    try {
        const { districtId } = req.params;

        const policeStations = await PoliceStation.findAll({ where: { districtId } });

        return res.status(200).json(policeStations.map(toPoliceStationResponseDTO));
    } catch (error) {
        return res.status(500).json({ message: 'Error getting police stations for district', error: error.message });
    }
};



exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const policeStationData = toPoliceStationRequestDTO(req.body);
        const [updatedRows] = await PoliceStation.update(policeStationData, { where: { id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: `Police station with id ${id} not found.` });
        }

        const updatedPoliceStation = await PoliceStation.findByPk(id);
        return res.status(200).json(toPoliceStationResponseDTO(updatedPoliceStation));
    } catch (error) {
        return res.status(500).json({ message: 'Error updating police station', error: error.message });
    }
};


exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await PoliceStation.destroy({ where: { id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: `Police station with id ${id} not found.` });
        }

        return res.status(200).json({ message: 'Police station deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting police station', error: error.message });
    }
};