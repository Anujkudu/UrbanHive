const Complaint = require('../models/Complaint');
const asyncHandler = require('../utils/asyncHandler');

exports.createComplaint = asyncHandler(async (req, res) => {
    const { title, description, priority } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const complaint = await Complaint.create({
        title,
        description,
        priority: priority || 'medium',
        residentId: req.user._id,
        buildingId: req.user.buildingId || '',
        timeline: [{
            status: 'new',
            message: 'Complaint created',
            updatedBy: req.user._id
        }]
    });

    res.status(201).json({ complaint });
});

exports.listComplaints = asyncHandler(async (req, res) => {
    const { role, _id } = req.user;
    const query = {};

    if (role === 'resident') {
        query.residentId = _id;
    } else if (role === 'worker') {
        query.workerId = _id;
    }

    const complaints = await Complaint.find(query)
        .sort({ createdAt: -1 })
        .populate('residentId', 'name email flatNo')
        .populate('managerId', 'name email')
        .populate('workerId', 'name email workerType');

    res.json({ complaints });
});

exports.updateComplaint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, workerId, managerId, message, priority } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
    }

    const userRole = req.user.role;

    if (userRole === 'manager') {
        if (workerId) complaint.workerId = workerId;
        if (managerId) complaint.managerId = managerId;
        if (status) complaint.status = status;
        if (priority) complaint.priority = priority;
    } else if (userRole === 'worker') {
        if (String(complaint.workerId || '') !== String(req.user._id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (status) complaint.status = status;
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if (status || message) {
        complaint.timeline.push({
            status: complaint.status,
            message: message || '',
            updatedBy: req.user._id
        });
    }

    await complaint.save();
    res.json({ complaint });
});
