const express = require('express');
const router = express.Router();
const parcelController = require('../controllers/parcel.controller');
const { protect, protectOrSelf } = require('../middleware/auth');

// Order matters: fixed paths like /calculate and /track/... must be declared
// BEFORE '/:id', otherwise Express would read "calculate" as an id.
router.post('/book', protect('CUSTOMER', 'ADMIN'), parcelController.book);                    // Customer books (admin may book for a customer)
router.get('/calculate', parcelController.calculate);                                          // PUBLIC: price preview
router.get('/pending/unassigned', protect('ADMIN', 'AGENT'), parcelController.findPendingUnassigned); // Parcels waiting for a rider
router.get('/track/:trackingCode', parcelController.track);                                    // PUBLIC: tracking (limited info, no personal data)
router.get('/customer/:customerId',
    protectOrSelf(['ADMIN'], { role: 'CUSTOMER', param: 'customerId', field: 'profileId' }),
    parcelController.findByCustomer);                                                          // Admin or that customer
router.get('/rider/:riderId',
    protectOrSelf(['ADMIN'], { role: 'RIDER', param: 'riderId', field: 'profileId' }),
    parcelController.findByRider);                                                             // Admin or that rider
router.get('/', protect('ADMIN'), parcelController.findAll);                                   // Admin: every parcel
router.get('/:id', protect(), parcelController.findOne);                                       // Logged in; the controller checks it's YOUR parcel
router.patch('/:id/cancel', protect('CUSTOMER'), parcelController.cancel);                     // Customer cancels their own (PENDING only)
router.patch('/:id/assign-rider/:riderId', protect('ADMIN'), parcelController.assignRider);    // Admin assigns a rider
router.patch('/:id/pickup', protect('RIDER'), parcelController.pickup);                        // The assigned rider picks up
router.patch('/:id/status', protect('ADMIN', 'RIDER'), parcelController.updateStatus);         // Rider (own parcels) or admin
router.delete('/:id', protect('ADMIN'), parcelController.remove);                              // Admin only

module.exports = router;
