const Visitor = require('../models/Visitor');
const asyncHandler = require('../utils/asyncHandler');

exports.createVisitor = asyncHandler(async (req, res) => {
    const { name, phone, visitDate, purpose, notes } = req.body;
    if (!name || !visitDate) {
        return res.status(400).json({ message: 'Name and visit date are required' });
    }

    const visitor = await Visitor.create({
        residentId: req.user._id,
        name,
        phone: phone || 'N/A',
        visitDate,
        purpose: purpose || 'Guest',
        notes: notes || ''
    });

    res.status(201).json({ visitor });
});

exports.listVisitors = asyncHandler(async (req, res) => {
    const { role, _id } = req.user;
    const query = {};

    if (role === 'resident') {
        query.residentId = _id;
    }

    const visitors = await Visitor.find(query)
        .sort({ createdAt: -1 })
        .populate('residentId', 'name email flatNo')
        .populate('managerId', 'name email');

    res.json({ visitors });
});

exports.updateVisitor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['approved', 'denied', 'entered'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const visitor = await Visitor.findById(id);
    if (!visitor) {
        return res.status(404).json({ message: 'Visitor not found' });
    }

    visitor.status = status;
    visitor.managerId = req.user._id;
    await visitor.save();

    res.json({ visitor });
});
