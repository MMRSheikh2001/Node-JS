const { pickDefined } = require('../utils/pickDefined');

const USER_FIELDS = ['name', 'email', 'phone', 'password'];
const PROFILE_FIELDS = ['vehicleType', 'vehicleNumber', 'nidNumber', 'active'];

function toRiderUserRequestDTO(body) {
    return pickDefined(body, USER_FIELDS);
}

function toRiderProfileRequestDTO(body) {
    return pickDefined(body, PROFILE_FIELDS);
}

// `zones` can arrive in several shapes depending on how the client sends it:
//  - a real array, e.g. [1, 3, 7]                  (JSON body)
//  - a JSON string, e.g. "[1,3,7]"                 (multipart/form-data)
//  - a comma-separated string, e.g. "1,3,7"        (easiest in Postman form-data)
//  - an array of {policeStationId} objects         (the Java DTO shape)
// Multipart text fields are always strings, which is why the string cases exist.
// All of them are normalised here into a plain array of numeric ids.
function toZoneIds(body) {
    let zones = body.zones;

    if (typeof zones === 'string') {
        try {
            zones = JSON.parse(zones);      // "[1,3]" -> [1,3]   but also "2" -> 2 (a number!)
        } catch (e) {
            zones = zones.split(',');        // "1,3" -> ["1","3"]
        }
    }

    if (zones === undefined || zones === null) return [];

    // A single zone arrives as a bare value ("2" or 2), not an array, so wrap it.
    if (!Array.isArray(zones)) zones = [zones];

    return zones
        .map((z) => (typeof z === 'object' && z !== null ? z.policeStationId : z))
        .filter((z) => z !== undefined && z !== null && String(z).trim() !== '') // skip blanks like "1,,3"
        .map((z) => Number(z))
        .filter((id) => Number.isInteger(id) && id > 0);
}

// Response DTO: flattens Rider + User + each zone's location chain
// (PoliceStation -> District -> Division -> Country), like the Java
// RiderResponseDTO.ZoneSummary. Expects `rider` loaded with RIDER_INCLUDE.
function toRiderResponseDTO(rider) {
    const user = rider.user;
    const zones = Array.isArray(rider.zones) ? rider.zones : [];

    return {
        id: rider.id,
        userId: rider.userId,
        name: user ? user.name : undefined,
        email: user ? user.email : undefined,
        phone: user ? user.phone : undefined,
        role: user ? user.role : undefined,
        vehicleType: rider.vehicleType,
        vehicleNumber: rider.vehicleNumber,
        nidNumber: rider.nidNumber,
        rating: rider.rating,
        totalDeliveries: rider.totalDeliveries,
        totalEarnings: rider.totalEarnings,
        active: rider.active,
        image: rider.image,
        zones: zones.map((zone) => {
            const district = zone.district;
            const division = district ? district.division : null;
            const country = division ? division.country : null;

            return {
                policeStationId: zone.id,
                name: zone.name,
                postalCode: zone.postalCode,
                districtId: district ? district.id : undefined,
                districtName: district ? district.name : undefined,
                divisionId: division ? division.id : undefined,
                divisionName: division ? division.name : undefined,
                countryId: country ? country.id : undefined,
                countryName: country ? country.name : undefined
            };
        }),
        createdAt: rider.createdAt,
        updatedAt: rider.updatedAt
    };
}

module.exports = { toRiderUserRequestDTO, toRiderProfileRequestDTO, toZoneIds, toRiderResponseDTO };