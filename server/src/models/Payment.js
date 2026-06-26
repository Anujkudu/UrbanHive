const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    type: { type: String, default: 'Maintenance' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    mode: { type: String, enum: ['cash', 'upi', 'card', 'bank'], default: 'cash' },
    receiptUrl: { type: String, default: '' },
    month: { type: String, default: '' },
    dueDate: { type: String, default: '' },
    paidDate: { type: String, default: '' },
    verifiedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
