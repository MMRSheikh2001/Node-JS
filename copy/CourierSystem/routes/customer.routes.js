const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const { createImageUploader } = require('../utils/fileUpload');
const { protect, protectOrSelf } = require('../middleware/auth');

const upload = createImageUploader('customer');

// "Self" = a CUSTOMER looking at / editing their own record. Admins can see any.
// NOTE: the guard comes BEFORE upload.single(), so someone who isn't allowed in
// never gets a file written to disk.
const adminOrSelfCustomer = protectOrSelf(['ADMIN'], { role: 'CUSTOMER', param: 'id', field: 'profileId' });
const adminOrSelfUser = protectOrSelf(['ADMIN'], { role: 'CUSTOMER', param: 'userId', field: 'id' });

router.post('/register', upload.single('image'), customerController.register);         // PUBLIC: anyone can sign up as a customer
router.get('/', protect('ADMIN'), customerController.findAll);                          // Admin: list all
router.get('/user/:userId', adminOrSelfUser, customerController.findByUserId);          // Admin or that customer
router.get('/:id', adminOrSelfCustomer, customerController.findOne);                    // Admin or that customer
router.put('/:id', adminOrSelfCustomer, upload.single('image'), customerController.update); // Admin or that customer
router.delete('/:id', protect('ADMIN'), customerController.remove);                     // Admin only

module.exports = router;
