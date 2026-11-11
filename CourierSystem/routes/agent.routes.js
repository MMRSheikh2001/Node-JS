const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');
const agentParcelController = require('../controllers/agent-parcel.controller');
const { createImageUploader } = require('../utils/fileUpload');

const upload = createImageUploader('agent');

router.post('/', upload.single('image'), agentController.create);          // Create (creates User + Agent)
router.get('/', agentController.findAll);                                   // Read all
router.get('/hub/:hubId', agentController.findByHubId);                     // Read all agents at a hub
router.get('/user/:userId', agentController.findByUserId);                  // Read one by user id
router.get('/:id', agentController.findOne);                                 // Read one by agent id
router.put('/:id', upload.single('image'), agentController.update);          // Update
router.delete('/:id', agentController.remove);                               // Delete

// ── Parcel operations by hub staff ──
router.post('/parcels/book', agentParcelController.book);                                   // Walk-in booking at a hub
router.get('/:agentId/parcels', agentParcelController.hubParcels);                          // Parcels at my hub (?status=IN_TRANSIT)
router.get('/:agentId/parcels/status/:status', agentParcelController.hubParcelsByStatus);   // Same, status in the path
router.patch('/:agentId/parcels/:parcelId/status', agentParcelController.updateParcelStatus); // Update a parcel at my hub

module.exports = router;