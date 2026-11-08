const crypto = require('crypto');
const { ServiceType } = require('./enums');

// Base price covers the first kilogram; every extra kg adds perKg.
const RATES = {
    [ServiceType.STANDARD]: { base: 60, perKg: 20 },
    [ServiceType.EXPRESS]: { base: 100, perKg: 35 },
    [ServiceType.OVERNIGHT]: { base: 180, perKg: 50 },
    [ServiceType.SAME_DAY]: { base: 250, perKg: 60 }
};

const COD_FEE_RATE = 0.015; // 1.5% of the cash-on-delivery amount

// e.g. TRN-1794078971493-4821. The Java version used the bare millisecond
// timestamp, which can collide if two parcels are booked in the same
// millisecond; the random suffix prevents that.
function generateTrackingCode() {
    return `TRN-${Date.now()}-${crypto.randomInt(1000, 10000)}`;
}

// Delivery charge = base + (extra kg beyond the first) * perKg + COD fee.
//
// NOTE: the Java version wrote `base + (weight - 1 * perKg)`. Because `*`
// binds tighter than `-`, that computes weight - perKg, so a heavier parcel
// could end up CHEAPER than a light one (e.g. STANDARD, 2 kg -> 42 instead
// of 80). The intended formula is (weight - 1) * perKg, used here.
function calculateCharge(weight, serviceType, codAmount = 0) {
    const rate = RATES[serviceType];
    if (!rate) {
        throw new Error(`Unknown service type: ${serviceType}`);
    }

    let charge = weight < 1 ? rate.base : rate.base + (weight - 1) * rate.perKg;

    if (codAmount > 0) {
        charge += codAmount * COD_FEE_RATE;
    }

    return Math.round(charge * 100) / 100; // money: keep 2 decimals
}

// Local calendar date as "YYYY-MM-DD" (what a DATEONLY column wants).
// toISOString() would use UTC and can land on the wrong day near midnight.
function toDateOnly(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// SAME_DAY = today, EXPRESS/OVERNIGHT = tomorrow, STANDARD = in 3 days.
function estimateDelivery(serviceType) {
    let days;
    switch (serviceType) {
        case ServiceType.SAME_DAY:
            days = 0;
            break;
        case ServiceType.EXPRESS:
        case ServiceType.OVERNIGHT:
            days = 1;
            break;
        default:
            days = 3;
    }

    const date = new Date();
    date.setDate(date.getDate() + days);
    return toDateOnly(date);
}

module.exports = { generateTrackingCode, calculateCharge, estimateDelivery };