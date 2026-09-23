const { pickDefined } = require('../utils/pickDefined');


const USER_FIELDS = ['name', 'email', 'phone', 'password'];
const PROFILE_FIELDS = ['address', 'gender', 'dob', 'image', 'policeStationId'];

function toCustomerUserRequestDTO(body) {
    return pickDefined(body, USER_FIELDS);
}

function toCustomerProfileRequestDTO(body) {
    return pickDefined(body, PROFILE_FIELDS);
}


function toCustomerResponseDTO(customer) {
    const user = customer.user;
    const policeStation = customer.policeStation;
    const district = policeStation ? policeStation.district : null;
    const division = district ? district.division : null;

    return {
        id: customer.id,
        userId: customer.userId,
        name: user ? user.name : undefined,
        email: user ? user.email : undefined,
        phone: user ? user.phone : undefined,
        role: user ? user.role : undefined,
        address: customer.address,
        gender: customer.gender,
        dob: customer.dob,
        image: customer.image,
        policeStationId: customer.policeStationId,
        policeStationName: policeStation ? policeStation.name : undefined,
        districtName: district ? district.name : undefined,
        divisionName: division ? division.name : undefined,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt
    };
}

module.exports = { toCustomerUserRequestDTO, toCustomerProfileRequestDTO, toCustomerResponseDTO };