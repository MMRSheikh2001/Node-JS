const express = require('express');
const router = express.Router();
const riderController = require('../controllers/rider.controller');
const { createImageUploader } = require('../utils/fileUpload');
const { protect, protectOrSelf } = require('../middleware/auth');

const upload = createImageUploader('rider');

// Agents may look riders up (they assign riders to parcels at their hub).
const adminAgentOrSelfRider = protectOrSelf(['ADMIN', 'AGENT'], { role: 'RIDER', param: 'id', field: 'profileId' });
const adminAgentOrSelfUser = protectOrSelf(['ADMIN', 'AGENT'], { role: 'RIDER', param: 'userId', field: 'id' });

router.post('/', protect('ADMIN'), upload.single('image'), riderController.create);                 // Admin: create (User + Rider + zones)
router.get('/', protect('ADMIN'), riderController.findAll);                                          // Admin: list all
router.get('/police-station/:policeStationId', protect('ADMIN', 'AGENT'), riderController.findByPoliceStationId); // Riders covering a zone (?active=true)
router.get('/district/:districtId', protect('ADMIN', 'AGENT'), riderController.findByDistrictId);   // Riders covering a district (?active=true)
router.get('/user/:userId', adminAgentOrSelfUser, riderController.findByUserId);                     // Admin, agent, or that rider
router.get('/:id', adminAgentOrSelfRider, riderController.findOne);                                  // Admin, agent, or that rider
router.put('/:id', protect('ADMIN'), upload.single('image'), riderController.update);                // Admin only (vehicle, zones)
router.patch('/:id/active', protect('ADMIN'), riderController.setActive);                            // Admin only: on/off duty
router.delete('/:id', protect('ADMIN'), riderController.remove);                                     // Admin only

module.exports = router;
