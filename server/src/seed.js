const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcryptjs');
const { connectDb } = require('./config/db');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const Payment = require('./models/Payment');
const Visitor = require('./models/Visitor');

async function seed() {
    await connectDb(process.env.MONGODB_URI);

    await Promise.all([
        User.deleteMany({}),
        Complaint.deleteMany({}),
        Payment.deleteMany({}),
        Visitor.deleteMany({})
    ]);

    const passwordHash = await bcrypt.hash('Password@123', 10);

    const users = await User.insertMany([
        {
            name: 'Aarav Mehta',
            email: 'manager@urbanhive.local',
            passwordHash,
            role: 'manager',
            designation: 'Society Manager',
            buildingId: 'URB-001'
        },
        {
            name: 'Riya Sharma',
            email: 'riya@urbanhive.local',
            passwordHash,
            role: 'resident',
            flatNo: 'A-101',
            buildingId: 'URB-001'
        },
        {
            name: 'Kabir Jain',
            email: 'kabir@urbanhive.local',
            passwordHash,
            role: 'resident',
            flatNo: 'B-204',
            buildingId: 'URB-001'
        },
        {
            name: 'Sana Iyer',
            email: 'sana@urbanhive.local',
            passwordHash,
            role: 'resident',
            flatNo: 'C-305',
            buildingId: 'URB-001'
        },
        {
            name: 'Ramesh Kumar',
            email: 'ramesh@urbanhive.local',
            passwordHash,
            role: 'worker',
            workerType: 'Plumber',
            buildingId: 'URB-001'
        },
        {
            name: 'Neha Singh',
            email: 'neha@urbanhive.local',
            passwordHash,
            role: 'worker',
            workerType: 'Electrician',
            buildingId: 'URB-001'
        }
    ]);

    const manager = users.find(u => u.role === 'manager');
    const residents = users.filter(u => u.role === 'resident');
    const workers = users.filter(u => u.role === 'worker');

    await Complaint.insertMany([
        {
            title: 'Plumbing',
            description: 'Kitchen sink leakage in A-101.',
            residentId: residents[0]._id,
            managerId: manager._id,
            workerId: workers[0]._id,
            status: 'assigned',
            priority: 'high',
            buildingId: 'URB-001',
            timeline: [
                { status: 'new', message: 'Complaint created', updatedBy: residents[0]._id },
                { status: 'assigned', message: 'Assigned to plumber', updatedBy: manager._id }
            ]
        },
        {
            title: 'Electrical',
            description: 'Power fluctuation in B-204 living room.',
            residentId: residents[1]._id,
            managerId: manager._id,
            workerId: workers[1]._id,
            status: 'in_progress',
            priority: 'medium',
            buildingId: 'URB-001',
            timeline: [
                { status: 'new', message: 'Complaint created', updatedBy: residents[1]._id },
                { status: 'assigned', message: 'Assigned to electrician', updatedBy: manager._id }
            ]
        },
        {
            title: 'Cleaning',
            description: 'Staircase cleaning missed on 3rd floor.',
            residentId: residents[2]._id,
            status: 'new',
            priority: 'low',
            buildingId: 'URB-001',
            timeline: [
                { status: 'new', message: 'Complaint created', updatedBy: residents[2]._id }
            ]
        },
        {
            title: 'Maintenance',
            description: 'Lift noise issue in Tower C.',
            residentId: residents[2]._id,
            managerId: manager._id,
            status: 'assigned',
            priority: 'high',
            buildingId: 'URB-001',
            timeline: [
                { status: 'new', message: 'Complaint created', updatedBy: residents[2]._id },
                { status: 'assigned', message: 'Assigned to maintenance', updatedBy: manager._id }
            ]
        },
        {
            title: 'Security',
            description: 'CCTV camera offline near parking entry.',
            residentId: residents[0]._id,
            status: 'new',
            priority: 'medium',
            buildingId: 'URB-001',
            timeline: [
                { status: 'new', message: 'Complaint created', updatedBy: residents[0]._id }
            ]
        }
    ]);

    await Payment.insertMany([
        {
            residentId: residents[0]._id,
            managerId: manager._id,
            amount: 5200,
            type: 'Maintenance',
            status: 'approved',
            mode: 'upi',
            month: 'March 2026',
            dueDate: '2026-03-10',
            paidDate: '2026-03-08',
            verifiedAt: new Date()
        },
        {
            residentId: residents[1]._id,
            amount: 5200,
            type: 'Maintenance',
            status: 'pending',
            mode: 'cash',
            month: 'March 2026',
            dueDate: '2026-03-10'
        },
        {
            residentId: residents[2]._id,
            amount: 900,
            type: 'Water',
            status: 'approved',
            mode: 'bank',
            month: 'March 2026',
            dueDate: '2026-03-05',
            paidDate: '2026-03-04',
            verifiedAt: new Date()
        },
        {
            residentId: residents[0]._id,
            amount: 1500,
            type: 'Parking',
            status: 'rejected',
            mode: 'card',
            month: 'March 2026',
            dueDate: '2026-03-12',
            paidDate: '2026-03-12',
            verifiedAt: new Date()
        }
    ]);

    await Visitor.insertMany([
        {
            residentId: residents[0]._id,
            managerId: manager._id,
            name: 'Delivery - Amazon',
            phone: '99988 77665',
            visitDate: '2026-04-05',
            purpose: 'Package Delivery',
            notes: 'Leave at security if unavailable',
            status: 'approved'
        },
        {
            residentId: residents[1]._id,
            name: 'Priya Jain',
            phone: '99887 66554',
            visitDate: '2026-04-06',
            purpose: 'Family Visit',
            notes: '',
            status: 'requested'
        },
        {
            residentId: residents[2]._id,
            managerId: manager._id,
            name: 'AC Service',
            phone: '99776 55443',
            visitDate: '2026-04-04',
            purpose: 'Maintenance',
            notes: 'Service call for flat C-305',
            status: 'entered'
        },
        {
            residentId: residents[0]._id,
            managerId: manager._id,
            name: 'Courier - BlueDart',
            phone: '99665 44332',
            visitDate: '2026-04-03',
            purpose: 'Package Delivery',
            notes: '',
            status: 'denied'
        }
    ]);

    console.log('Seed complete: 6 users, 5 complaints, 4 payments, 4 visitors.');
    process.exit(0);
}

seed().catch(error => {
    console.error('Seed failed:', error);
    process.exit(1);
});
