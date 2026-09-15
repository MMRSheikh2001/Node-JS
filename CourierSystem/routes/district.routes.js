

const express = require('express');
const router = express.Router();
const districtController = require('../controllers/district.controller');


router.post('/', districtController.create);
router.get('/', districtController.findAll);
router.get('/division/:divisionId', districtController.findByDivisionId);
router.get('/:id', districtController.findOne);
router.put('/:id', districtController.update);
router.delete('/:id', districtController.remove);

module.exports = router;