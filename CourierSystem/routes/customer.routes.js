

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const { createImageUploader } = require('../utils/fileUpload');


const upload = createImageUploader('customer');

router.post('/register', upload.single('image'), customerController.register); // Register (creates User + Customer)
router.get('/', customerController.findAll);                   // Read all
router.get('/user/:userId', customerController.findByUserId);  // Read one by user id
router.get('/:id', customerController.findOne);                 // Read one by customer id
router.put('/:id', upload.single('image'), customerController.update); // Update profile (image optional)
router.delete('/:id', customerController.remove);               // Delete

module.exports = router;