const parcelService = require('../services/parcel.service');
const {
    toParcelBookingRequestDTO,
    toStatusUpdateRequestDTO,
    toParcelResponseDTO,
    toPublicTrackingDTO
} = require('../dto/parcel.dto');
const { sendError } = require('../utils/httpError');
const { ownProfileId } = require('../middleware/auth');

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
        const dto = toParcelBookingRequestDTO(bodyOf(req));
        // A customer always books as themselves. An admin must say which customer.
        if (req.user.role === 'CUSTOMER') {
            dto.customerId = ownProfileId(req, dto.customerId, 'customer');
        }
        const parcel = await parcelService.bookByCustomer(dto);
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
        // Only the people involved may open a parcel (see assertCanView).
        parcelService.assertCanView(req.user, parcel);
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error getting parcel');
    }
};

// GET /api/parcel/track/:trackingCode  (public tracking, no login needed)
exports.track = async (req, res) => {
    try {
        const parcel = await parcelService.track(req.params.trackingCode);
        // Public endpoint: only the journey, never names, phones, addresses or prices.
        return res.status(200).json(toPublicTrackingDTO(parcel));
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
        const customerId = ownProfileId(req, req.query.customerId ?? bodyOf(req).customerId, 'customer');
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
        const input = { ...bodyOf(req), ...req.query };
        input.riderId = ownProfileId(req, input.riderId, 'rider'); // the rider picking up is always the logged-in rider
        const parcel = await parcelService.pickup(req.params.id, input);
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error picking up parcel');
    }
};

// PATCH /api/parcel/:id/status   body: { status, note, location, riderId, nextHubPoliceStationId }
exports.updateStatus = async (req, res) => {
    try {
        const dto = toStatusUpdateRequestDTO(bodyOf(req));
        if (req.user.role === 'RIDER') {
            // A rider is ALWAYS treated as a rider: their own id is filled in, so
            // leaving riderId out can't be used to skip the "is this parcel
            // assigned to you?" check.
            dto.riderId = ownProfileId(req, dto.riderId, 'rider');
        } else {
            delete dto.riderId; // admin: no rider restrictions
        }
        const parcel = await parcelService.updateStatus(req.params.id, dto);
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