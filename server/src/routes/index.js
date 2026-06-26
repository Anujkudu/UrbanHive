const express = require('express');

const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const complaintsRoutes = require('./complaintsRoutes');
const paymentsRoutes = require('./paymentsRoutes');
const visitorsRoutes = require('./visitorsRoutes');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Urban Hive API' });
});

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/complaints', complaintsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/visitors', visitorsRoutes);

module.exports = router;
