const express = require('express');
const { listUsers, createUser, updateUser } = require('../controllers/usersController');
const { protect, allowRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect, allowRoles('manager'));

router.get('/', listUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);

module.exports = router;
