

const { pickDefined } = require('../utils/pickDefined');


const REQUEST_FIELDS = ['name',  'districtCode', 'active', 'divisionId'];

function toDistrictRequestDTO(body) {
  return pickDefined(body, REQUEST_FIELDS);
}

function toDistrictResponseDTO(district) {
  return {
    id: district.id,
    name: district.name,
    districtCode: district.districtCode,
    active: district.active,
    divisionId: district.divisionId,
    createdAt: district.createdAt,
    updatedAt: district.updatedAt
  };
}

module.exports = { toDistrictRequestDTO, toDistrictResponseDTO };