// Single source of truth for every enum used by the parcel feature.
// The model uses Object.values(...) to build its DB ENUM columns, and the
// service uses the same lists to validate incoming request values, so the
// two can never drift apart. These mirror the Java enums package.

// makeEnum('A', 'B') -> { A: 'A', B: 'B' } (frozen), so code can say
// ParcelStatus.PENDING instead of typing the string 'PENDING' everywhere.
function makeEnum(...values) {
    return Object.freeze(Object.fromEntries(values.map((v) => [v, v])));
}

const ParcelStatus = makeEnum(
    'PENDING', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY',
    'DELIVERED', 'CANCELLED', 'RETURNED', 'AT_HUB'
);
const ParcelType = makeEnum('DOCUMENT', 'PRODUCT', 'FRAGILE', 'HEAVY', 'PERISHABLE');
const PaymentMethod = makeEnum('COD', 'BKASH', 'NAGAD', 'SSLCOMMERZ', 'PREPAID', 'CASH');
const PaymentStatus = makeEnum('PENDING', 'PAID', 'FAILED', 'REFUNDED');
const Priority = makeEnum('NORMAL', 'HIGH', 'URGENT');
const ServiceType = makeEnum('STANDARD', 'EXPRESS', 'OVERNIGHT', 'SAME_DAY');
const BookingSource = makeEnum('ONLINE', 'AGENT');

module.exports = {
    ParcelStatus,
    ParcelType,
    PaymentMethod,
    PaymentStatus,
    Priority,
    ServiceType,
    BookingSource
};