const express = require('express');
const { createPayment, listPayments, verifyPayment } = require('../controllers/paymentsController');
const { protect, allowRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', allowRoles('resident'), createPayment);
router.get('/', allowRoles('resident', 'manager'), listPayments);
router.patch('/:id/verify', allowRoles('manager'), verifyPayment);

module.exports = router;
