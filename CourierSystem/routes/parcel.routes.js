const express = require('express');
const router = express.Router();
const parcelController = require('../controllers/parcel.controller');

// Order matters: fixed paths like /calculate and /track/... must be declared
// BEFORE '/:id', otherwise Express would read "calculate" as an id.
router.post('/book', parcelController.book);                                  // Customer books a parcel
router.get('/calculate', parcelController.calculate);                         // Price preview
router.get('/pending/unassigned', parcelController.findPendingUnassigned);    // Parcels waiting for a rider
router.get('/track/:trackingCode', parcelController.track);                   // Public tracking
router.get('/customer/:customerId', parcelController.findByCustomer);         // A customer's parcels
router.get('/rider/:riderId', parcelController.findByRider);                  // A rider's parcels
router.get('/', parcelController.findAll);                                    // All parcels
router.get('/:id', parcelController.findOne);                                 // One parcel
router.patch('/:id/cancel', parcelController.cancel);                         // Customer cancels (PENDING only)
router.patch('/:id/assign-rider/:riderId', parcelController.assignRider);     // Admin assigns a rider
router.patch('/:id/pickup', parcelController.pickup);                         // Rider picks up
router.patch('/:id/status', parcelController.updateStatus);                   // Rider/admin updates status
router.delete('/:id', parcelController.remove);                               // Delete

module.exports = router;