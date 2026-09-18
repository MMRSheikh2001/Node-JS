const { pickDefined } = require('../utils/pickDefined');


const REQUEST_FIELDS = ['name', 'email', 'phone', 'password', 'role', 'active', 'policeStationId'];

function toUserRequestDTO(body) {
    return pickDefined(body, REQUEST_FIELDS);
}


function toUserResponseDTO(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        active: user.active,
        policeStationId: user.policeStationId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

module.exports = { toUserRequestDTO, toUserResponseDTO };