const Country = require("/models/country.model");
const { toCountryRequestDTO, toCountryResponseDTO } = require("/dto/country.dto");

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
        const countries = Country.findAll();
        return res.status(200).json(countries.map(toCountryResponseDTO);)


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

        return res.status(200).json(toCountryRequestDTO(country));


    } catch (error) {
        return res.status(500).json({
            message: "Error getting Country",
            error: error.message
        })
    }
}