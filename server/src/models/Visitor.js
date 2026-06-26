const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: 'N/A', trim: true },
    visitDate: { type: String, required: true },
    purpose: { type: String, default: 'Guest' },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['requested', 'approved', 'denied', 'entered'], default: 'requested' }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
