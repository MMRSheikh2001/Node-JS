const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');
const agentParcelController = require('../controllers/agent-parcel.controller');
const { createImageUploader } = require('../utils/fileUpload');
const { protect, protectOrSelf } = require('../middleware/auth');

const upload = createImageUploader('agent');

const adminOrSelfAgent = protectOrSelf(['ADMIN'], { role: 'AGENT', param: 'id', field: 'profileId' });
const adminOrSelfUser = protectOrSelf(['ADMIN'], { role: 'AGENT', param: 'userId', field: 'id' });
const adminOrSelfAgentParcels = protectOrSelf(['ADMIN'], { role: 'AGENT', param: 'agentId', field: 'profileId' });
const onlySelfAgent = protectOrSelf([], { role: 'AGENT', param: 'agentId', field: 'profileId' });

// ── Managing agents (admin) ──
router.post('/', protect('ADMIN'), upload.single('image'), agentController.create);     // Admin: create (User + Agent)
router.get('/', protect('ADMIN'), agentController.findAll);                             // Admin: list all
router.get('/hub/:hubId', protect('ADMIN'), agentController.findByHubId);               // Admin: agents at a hub
router.get('/user/:userId', adminOrSelfUser, agentController.findByUserId);             // Admin or that agent
router.get('/:id', adminOrSelfAgent, agentController.findOne);                          // Admin or that agent
router.put('/:id', protect('ADMIN'), upload.single('image'), agentController.update);   // Admin only (hub, designation, active)
router.delete('/:id', protect('ADMIN'), agentController.remove);                        // Admin only

// ── Parcel operations by hub staff ──
router.post('/parcels/book', protect('AGENT'), agentParcelController.book);                           // Agent: walk-in booking
router.get('/:agentId/parcels', adminOrSelfAgentParcels, agentParcelController.hubParcels);           // That agent (or admin): parcels at the hub
router.get('/:agentId/parcels/status/:status', adminOrSelfAgentParcels, agentParcelController.hubParcelsByStatus);
router.patch('/:agentId/parcels/:parcelId/status', onlySelfAgent, agentParcelController.updateParcelStatus); // Only that agent

module.exports = router;
