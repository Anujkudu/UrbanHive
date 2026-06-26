const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

function signToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, role, flatNo, designation, workerType, buildingId } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
        flatNo: role === 'resident' ? flatNo || '' : '',
        designation: role === 'manager' ? designation || '' : '',
        workerType: role === 'worker' ? workerType || '' : '',
        buildingId: buildingId || ''
    });

    const token = signToken(user._id);
    res.status(201).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            flatNo: user.flatNo,
            designation: user.designation,
            workerType: user.workerType,
            buildingId: user.buildingId
        }
    });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user._id);
    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            flatNo: user.flatNo,
            designation: user.designation,
            workerType: user.workerType,
            buildingId: user.buildingId
        }
    });
});

exports.me = asyncHandler(async (req, res) => {
    res.json({ user: req.user });
});
