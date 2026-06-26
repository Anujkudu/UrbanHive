const Payment = require('../models/Payment');
const asyncHandler = require('../utils/asyncHandler');

exports.createPayment = asyncHandler(async (req, res) => {
    const { amount, mode, receiptUrl, month, type, dueDate, paidDate } = req.body;
    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }

    const payment = await Payment.create({
        residentId: req.user._id,
        amount,
        type: type || 'Maintenance',
        mode: mode || 'cash',
        receiptUrl: receiptUrl || '',
        month: month || '',
        dueDate: dueDate || '',
        paidDate: paidDate || ''
    });

    res.status(201).json({ payment });
});

exports.listPayments = asyncHandler(async (req, res) => {
    const { role, _id } = req.user;
    const query = {};

    if (role === 'resident') {
        query.residentId = _id;
    }

    const payments = await Payment.find(query)
        .sort({ createdAt: -1 })
        .populate('residentId', 'name email flatNo')
        .populate('managerId', 'name email');

    res.json({ payments });
});

exports.verifyPayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Status must be approved or rejected' });
    }

    const payment = await Payment.findById(id);
    if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = status;
    payment.managerId = req.user._id;
    payment.verifiedAt = new Date();
    await payment.save();

    res.json({ payment });
});
