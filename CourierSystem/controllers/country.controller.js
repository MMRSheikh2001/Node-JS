const Country = require("../models/country.model");
const { toCountryRequestDTO, toCountryResponseDTO } = require("../dto/country.dto");

exports.create = async (req, res) => {
    try {
        const countryData = toCountryRequestDTO(req.body);
        if (!countryData.name) {
            return res.status(400).json({ message: 'Name is Required' });
        }

        const country = await Country.create(countryData);
        return res.status(201).json(toCountryResponseDTO(country));



    } catch (error) {
        return res.status(500).json({
            message: "Error Creating Country",
            error: error.message
        })
    }
}

exports.findAll = async (req, res) => {
    try {
        const countries =await Country.findAll();
        return res.status(200).json(countries.map(toCountryResponseDTO));


    } catch (error) {
        return res.status(500).json({
            message: "Error getting Countries",
            error: error.message
        })
    }
}

exports.findOne = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) {
            return res.status(404).json({ message: `Country with id ${req.params.id} not found.` });
        }

        return res.status(200).json(toCountryResponseDTO(country));


    } catch (error) {
        return res.status(500).json({
            message: "Error getting Country",
            error: error.message
        })
    }
}

exports.update = async (req, res) => {
    try {

        const { id } = req.params;
        const countryData = toCountryRequestDTO(req.body);
        const [updatedRows] = await Country.update(countryData, { where: { id } });

        if (updatedRows === 0) {
            return res.status(404).json({ message: `Country with id ${id} not found.` });
        }

        const updatedCountry = await Country.findByPk(id);
        return res.status(200).json(toCountryResponseDTO(updatedCountry));


    } catch (error) {
        return res.status(500).json({
            message: "Error Updating Country",
            error: error.message
        })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await Country.destroy({ where: { id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: `Country with id ${id} not found.` });
        }
        return res.status(200).json({ message: "Country Deleted Successfully" });

    } catch (error) {
        return res.status(500).json({
            message: "Error Updating Country",
            error: error.message
        });
    }
}