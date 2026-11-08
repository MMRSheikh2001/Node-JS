const parcelService = require('../services/parcel.service');
const {
    toParcelBookingRequestDTO,
    toStatusUpdateRequestDTO,
    toParcelResponseDTO
} = require('../dto/parcel.dto');
const { sendError } = require('../utils/httpError');

// The controller stays thin on purpose: read the request, call the service,
// shape the response. All the rules (who may do what, which status changes
// are allowed) live in services/parcel.service.js. Errors thrown there carry
// their own HTTP status and are turned into a response by sendError().

// Express 5 leaves req.body undefined when a request has no body, so the
// endpoints that can be called with only query parameters fall back to {}.
const bodyOf = (req) => req.body || {};

// POST /api/parcel/book
exports.book = async (req, res) => {
    try {
        const parcel = await parcelService.bookByCustomer(toParcelBookingRequestDTO(bodyOf(req)));
        return res.status(201).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error booking parcel');
    }
};

// GET /api/parcel/calculate?weight=2.5&serviceType=EXPRESS&codAmount=1500
exports.calculate = async (req, res) => {
    try {
        return res.status(200).json(parcelService.previewCharge(req.query));
    } catch (error) {
        return sendError(res, error, 'Error calculating charge');
    }
};

// GET /api/parcel
exports.findAll = async (req, res) => {
    try {
        const parcels = await parcelService.getAll();
        return res.status(200).json(parcels.map(toParcelResponseDTO));
    } catch (error) {
        return sendError(res, error, 'Error getting parcels');
    }
};

// GET /api/parcel/:id
exports.findOne = async (req, res) => {
    try {
        const parcel = await parcelService.getById(req.params.id);
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error getting parcel');
    }
};

// GET /api/parcel/track/:trackingCode  (public tracking, no login needed)
exports.track = async (req, res) => {
    try {
        const parcel = await parcelService.track(req.params.trackingCode);
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error tracking parcel');
    }
};

// GET /api/parcel/customer/:customerId
exports.findByCustomer = async (req, res) => {
    try {
        const parcels = await parcelService.getByCustomer(req.params.customerId);
        return res.status(200).json(parcels.map(toParcelResponseDTO));
    } catch (error) {
        return sendError(res, error, 'Error getting parcels for customer');
    }
};

// GET /api/parcel/rider/:riderId
exports.findByRider = async (req, res) => {
    try {
        const parcels = await parcelService.getByRider(req.params.riderId);
        return res.status(200).json(parcels.map(toParcelResponseDTO));
    } catch (error) {
        return sendError(res, error, 'Error getting parcels for rider');
    }
};

// GET /api/parcel/pending/unassigned
exports.findPendingUnassigned = async (req, res) => {
    try {
        const parcels = await parcelService.getPendingUnassigned();
        return res.status(200).json(parcels.map(toParcelResponseDTO));
    } catch (error) {
        return sendError(res, error, 'Error getting unassigned parcels');
    }
};

// PATCH /api/parcel/:id/cancel?customerId=1   (customerId may also be in the body)
exports.cancel = async (req, res) => {
    try {
        const customerId = req.query.customerId ?? bodyOf(req).customerId;
        const parcel = await parcelService.cancel(req.params.id, customerId);
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error cancelling parcel');
    }
};

// PATCH /api/parcel/:id/assign-rider/:riderId
exports.assignRider = async (req, res) => {
    try {
        const parcel = await parcelService.assignRider(req.params.id, req.params.riderId);
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error assigning rider');
    }
};

// PATCH /api/parcel/:id/pickup?riderId=2&note=...&location=...  (or the same fields in the body)
exports.pickup = async (req, res) => {
    try {
        const parcel = await parcelService.pickup(req.params.id, { ...bodyOf(req), ...req.query });
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error picking up parcel');
    }
};

// PATCH /api/parcel/:id/status   body: { status, note, location, riderId, nextHubPoliceStationId }
exports.updateStatus = async (req, res) => {
    try {
        const parcel = await parcelService.updateStatus(req.params.id, toStatusUpdateRequestDTO(bodyOf(req)));
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error updating parcel status');
    }
};

// DELETE /api/parcel/:id
exports.remove = async (req, res) => {
    try {
        await parcelService.remove(req.params.id);
        return res.status(200).json({ message: 'Parcel deleted successfully.' });
    } catch (error) {
        return sendError(res, error, 'Error deleting parcel');
    }
};