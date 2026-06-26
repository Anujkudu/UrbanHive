const express = require('express');
const { createVisitor, listVisitors, updateVisitor } = require('../controllers/visitorsController');
const { protect, allowRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', allowRoles('resident'), createVisitor);
router.get('/', allowRoles('resident', 'manager'), listVisitors);
router.patch('/:id', allowRoles('manager'), updateVisitor);

module.exports = router;
