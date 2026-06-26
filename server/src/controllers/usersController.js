const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.listUsers = asyncHandler(async (req, res) => {
    const { role } = req.query;
    const query = role ? { role } : {};
    const users = await User.find(query).select('-passwordHash').sort({ createdAt: -1 });
    res.json({ users });
});

exports.createUser = asyncHandler(async (req, res) => {
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

    res.status(201).json({
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

exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };
    delete updates.passwordHash;
    delete updates.email;

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-passwordHash');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
});
