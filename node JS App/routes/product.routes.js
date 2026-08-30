const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');


router.post('/', productController.create);       // Create
router.get('/', productController.findAll);        // Read all
router.get('/:id', productController.findOne);      // Read one
router.put('/:id', productController.update);       // Update
router.delete('/:id', productController.remove);    // Delete

module.exports = router;