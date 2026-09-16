const express = require('express');
const router = express.Router();
const policeStationController = require('../controllers/police-station.controller');


router.post('/', policeStationController.create);
router.get('/', policeStationController.findAll);
router.get('/district/:districtId', policeStationController.findByDistrictId);
router.get('/:id', policeStationController.findOne);
router.put('/:id', policeStationController.update);
router.delete('/:id', policeStationController.remove);

module.exports = router;