

const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/division.controller');


router.post('/', divisionController.create);
router.get('/', divisionController.findAll);
router.get('/country/:countryId', divisionController.findByCountryId);
router.get('/:id', divisionController.findOne);
router.put('/:id', divisionController.update);
router.delete('/:id', divisionController.remove);

module.exports = router;