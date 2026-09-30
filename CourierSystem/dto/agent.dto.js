const { pickDefined } = require('../utils/pickDefined');


const USER_FIELDS = ['name', 'email', 'phone', 'password'];
const PROFILE_FIELDS = ['designation', 'active', 'hubId'];

function toAgentUserRequestDTO(body) {
  return pickDefined(body, USER_FIELDS);
}

function toAgentProfileRequestDTO(body) {
  return pickDefined(body, PROFILE_FIELDS);
}


function toAgentResponseDTO(agent) {
  const user = agent.user;
  const hub = agent.hub;
  const district = hub ? hub.district : null;
  const division = district ? district.division : null;
  const country = division ? division.country : null;

  return {
    id: agent.id,
    userId: agent.userId,
    name: user ? user.name : undefined,
    email: user ? user.email : undefined,
    phone: user ? user.phone : undefined,
    role: user ? user.role : undefined,
    designation: agent.designation,
    image: agent.image,
    active: agent.active,
    hubId: agent.hubId,
    hubName: hub ? hub.name : undefined,
    postalCode: hub ? hub.postalCode : undefined,
    districtId: district ? district.id : undefined,
    districtName: district ? district.name : undefined,
    divisionId: division ? division.id : undefined,
    divisionName: division ? division.name : undefined,
    countryName: country ? country.name : undefined,
    createdAt: agent.createdAt,
    updatedAt: agent.updatedAt
  };
}

module.exports = { toAgentUserRequestDTO, toAgentProfileRequestDTO, toAgentResponseDTO };