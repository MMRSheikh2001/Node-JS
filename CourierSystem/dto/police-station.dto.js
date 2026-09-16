const { pickDefined } = require('../utils/pickDefined');


const REQUEST_FIELDS = ['name', 'postalCode', 'active', 'districtId'];

function toPoliceStationRequestDTO(body) {
    return pickDefined(body, REQUEST_FIELDS);
}

function toPoliceStationResponseDTO(policeStation) {
    return {
        id: policeStation.id,
        name: policeStation.name,
        postalCode: policeStation.postalCode,
        active: policeStation.active,
        districtId: policeStation.districtId,
        createdAt: policeStation.createdAt,
        updatedAt: policeStation.updatedAt
    };
}

module.exports = { toPoliceStationRequestDTO, toPoliceStationResponseDTO };