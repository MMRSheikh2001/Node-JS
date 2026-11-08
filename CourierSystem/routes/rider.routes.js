const express = require('express');
const router = express.Router();
const riderController = require('../controllers/rider.controller');
const { createImageUploader } = require('../utils/fileUpload');

const upload = createImageUploader('rider');

router.post('/', upload.single('image'), riderController.create);                         // Create (User + Rider + zones)
router.get('/', riderController.findAll);                                                  // Read all
router.get('/police-station/:policeStationId', riderController.findByPoliceStationId);     // Riders covering a zone (?active=true)
router.get('/district/:districtId', riderController.findByDistrictId);                     // Riders covering a district (?active=true)
router.get('/user/:userId', riderController.findByUserId);                                 // Read one by user id
router.get('/:id', riderController.findOne);                                                // Read one by rider id
router.put('/:id', upload.single('image'), riderController.update);                         // Update profile / image / zones
router.patch('/:id/active', riderController.setActive);                                     // Toggle active
router.delete('/:id', riderController.remove);                                              // Delete

module.exports = router;