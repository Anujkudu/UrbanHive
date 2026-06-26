const express = require('express');
const { createComplaint, listComplaints, updateComplaint } = require('../controllers/complaintsController');
const { protect, allowRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', allowRoles('resident'), createComplaint);
router.get('/', allowRoles('resident', 'manager', 'worker'), listComplaints);
router.patch('/:id', allowRoles('manager', 'worker'), updateComplaint);

module.exports = router;
