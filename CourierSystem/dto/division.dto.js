const { pickDefined } = require('../utils/pickDefined');

const REQUEST_FIELDS = ['name', 'active', 'countryId'];

function toDivisionRequestDTO(body) {
    return pickDefined(body, REQUEST_FIELDS);
}

function toDivisionResponseDTO(division) {
    return {
        id: division.id,
        name: division.name,
        active: division.active,
        countryId: division.countryId,
        createdAt: division.createdAt,
        updatedAt: division.updatedAt
    };
}

module.exports = { toDivisionRequestDTO, toDivisionResponseDTO };