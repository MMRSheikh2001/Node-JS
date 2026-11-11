const parcelService = require('../services/parcel.service');
const {
    toAgentParcelBookingRequestDTO,
    toStatusUpdateRequestDTO,
    toParcelResponseDTO
} = require('../dto/parcel.dto');
const { sendError } = require('../utils/httpError');

// Hub staff's view of parcels. Kept apart from agent.controller.js (which
// manages the agent *profile*) because everything here is parcel logic and
// lives in services/parcel.service.js, just like the customer/rider flows.

// POST /api/agent/parcels/book   body: { agentId, senderName, senderPhone, receiverName, ... }
exports.book = async (req, res) => {
    try {
        const parcel = await parcelService.bookByAgent(toAgentParcelBookingRequestDTO(req.body));
        return res.status(201).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error booking parcel');
    }
};

// GET /api/agent/:agentId/parcels            -> every parcel at the agent's hub
// GET /api/agent/:agentId/parcels?status=AT_HUB
exports.hubParcels = async (req, res) => {
    try {
        const parcels = await parcelService.getHubParcels(req.params.agentId, req.query.status);
        return res.status(200).json(parcels.map(toParcelResponseDTO));
    } catch (error) {
        return sendError(res, error, 'Error getting hub parcels');
    }
};

// GET /api/agent/:agentId/parcels/status/:status
exports.hubParcelsByStatus = async (req, res) => {
    try {
        const parcels = await parcelService.getHubParcels(req.params.agentId, req.params.status);
        return res.status(200).json(parcels.map(toParcelResponseDTO));
    } catch (error) {
        return sendError(res, error, 'Error getting hub parcels');
    }
};

// PATCH /api/agent/:agentId/parcels/:parcelId/status
// body: { status, note, location, riderId, nextHubPoliceStationId }
exports.updateParcelStatus = async (req, res) => {
    try {
        const parcel = await parcelService.updateStatusByAgent(
            req.params.agentId,
            req.params.parcelId,
            toStatusUpdateRequestDTO(req.body)
        );
        return res.status(200).json(toParcelResponseDTO(parcel));
    } catch (error) {
        return sendError(res, error, 'Error updating parcel status');
    }
};