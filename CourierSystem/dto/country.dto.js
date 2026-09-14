const {pickDefined} = require('../utils/pickDefined');

const REQUEST_FIELDS = ['name', 'code', 'phoneCode', 'active'];

function toCountryRequestDTO(body) {
    return pickDefined(body, REQUEST_FIELDS);
}

function toCountryResponseDTO(country) {
    return {
        id: country.id,
        name: country.name,
        code: country.code,
        phoneCode: country.phoneCode,
        active: country.active,
        createdAt: country.createdAt,
        updatedAt: country.updatedAt
    };
}

module.exports = { toCountryRequestDTO, toCountryResponseDTO };