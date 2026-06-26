const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcryptjs');
const { connectDb } = require('./config/db');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const Payment = require('./models/Payment');
const Visitor = require('./models/Visitor');

function pick(list, index) {
    return list[index % list.length];
}

function makeId(prefix, index) {
    return `${prefix}-${String(index + 1).padStart(3, '0')}`;
}

async function seedMore() {
    await connectDb(process.env.MONGODB_URI);

    const passwordHash = await bcrypt.hash('Password@123', 10);
    const existingEmails = new Set(
        (await User.find({}, { email: 1 })).map(u => u.email.toLowerCase())
    );

    const buildings = ['URB-001', 'URB-002'];
    const residentFlats = ['A-101', 'A-102', 'A-201', 'B-104', 'B-204', 'C-305', 'C-405', 'D-110'];
    const workerTypes = ['Plumber', 'Electrician', 'Security', 'Cleaner', 'Maintenance'];

    const newUsers = [];

    // Managers (3)
    for (let i = 0; i < 3; i += 1) {
        const email = `manager${i + 1}@urbanhive.local`;
        if (existingEmails.has(email)) continue;
        newUsers.push({
            name: `Manager ${i + 1}`,
            email,
            passwordHash,
            role: 'manager',
            designation: 'Society Manager',
            buildingId: pick(buildings, i)
        });
    }

    // Workers (10)
    for (let i = 0; i < 10; i += 1) {
        const email = `worker${i + 1}@urbanhive.local`;
        if (existingEmails.has(email)) continue;
        newUsers.push({
            name: `Worker ${i + 1}`,
            email,
            passwordHash,
            role: 'worker',
            workerType: pick(workerTypes, i),
            buildingId: pick(buildings, i)
        });
    }

    // Residents (17)
    for (let i = 0; i < 17; i += 1) {
        const email = `resident${i + 1}@urbanhive.local`;
        if (existingEmails.has(email)) continue;
        newUsers.push({
            name: `Resident ${i + 1}`,
            email,
            passwordHash,
            role: 'resident',
            flatNo: pick(residentFlats, i),
            buildingId: pick(buildings, i)
        });
    }

    if (newUsers.length) {
        await User.insertMany(newUsers);
    }

    const allUsers = await User.find({});
    const managers = allUsers.filter(u => u.role === 'manager');
    const residents = allUsers.filter(u => u.role === 'resident');
    const workers = allUsers.filter(u => u.role === 'worker');

    const complaintTitles = ['Plumbing', 'Electrical', 'Cleaning', 'Security', 'Maintenance'];
    const complaintNotes = [
        'Leakage in kitchen sink.',
        'Power fluctuation in living room.',
        'Staircase cleaning missed.',
        'CCTV camera offline.',
        'Lift making noise.',
        'Water pressure is low.',
        'Light flickering in hallway.',
        'Gate security issue reported.'
    ];

    const complaints = [];
    for (let i = 0; i < 40; i += 1) {
        const resident = pick(residents, i);
        const manager = pick(managers, i);
        const worker = pick(workers, i);
        const statusOptions = ['new', 'assigned', 'in_progress', 'resolved'];
        const status = pick(statusOptions, i);
        const priorityOptions = ['low', 'medium', 'high'];
        const priority = pick(priorityOptions, i);

        const timeline = [
            { status: 'new', message: 'Complaint created', updatedBy: resident._id }
        ];
        if (status !== 'new') {
            timeline.push({
                status,
                message: `Status updated to ${status}`,
                updatedBy: manager._id
            });
        }

        complaints.push({
            title: pick(complaintTitles, i),
            description: pick(complaintNotes, i),
            residentId: resident._id,
            managerId: status === 'new' ? undefined : manager._id,
            workerId: status === 'assigned' || status === 'in_progress' || status === 'resolved' ? worker._id : undefined,
            status,
            priority,
            buildingId: resident.buildingId || pick(buildings, i),
            timeline
        });
    }
    if (complaints.length) {
        await Complaint.insertMany(complaints);
    }

    const payments = [];
    for (let i = 0; i < 30; i += 1) {
        const resident = pick(residents, i);
        const manager = pick(managers, i);
        const statusOptions = ['pending', 'approved', 'rejected'];
        const status = pick(statusOptions, i);
        const types = ['Maintenance', 'Water', 'Parking'];
        const modeOptions = ['cash', 'upi', 'card', 'bank'];

        payments.push({
            residentId: resident._id,
            managerId: status === 'pending' ? undefined : manager._id,
            amount: 800 + (i % 5) * 500,
            type: pick(types, i),
            status,
            mode: pick(modeOptions, i),
            receiptUrl: '',
            month: 'April 2026',
            dueDate: `2026-04-${String((i % 20) + 1).padStart(2, '0')}`,
            paidDate: status === 'pending' ? '' : `2026-04-${String((i % 20) + 1).padStart(2, '0')}`,
            verifiedAt: status === 'pending' ? undefined : new Date()
        });
    }
    if (payments.length) {
        await Payment.insertMany(payments);
    }

    const visitors = [];
    for (let i = 0; i < 30; i += 1) {
        const resident = pick(residents, i);
        const manager = pick(managers, i);
        const statusOptions = ['requested', 'approved', 'denied', 'entered'];
        const status = pick(statusOptions, i);

        visitors.push({
            residentId: resident._id,
            managerId: status === 'requested' ? undefined : manager._id,
            name: `Visitor ${i + 1}`,
            phone: `99900${String(1000 + i).slice(-4)}`,
            visitDate: `2026-04-${String((i % 20) + 1).padStart(2, '0')}`,
            purpose: pick(['Guest', 'Delivery', 'Service', 'Maintenance'], i),
            notes: `Reference ${makeId('VIS', i)}`,
            status
        });
    }
    if (visitors.length) {
        await Visitor.insertMany(visitors);
    }

    console.log('Seed more complete.');
    console.log(`Inserted users: ${newUsers.length}`);
    console.log('Inserted complaints: 40');
    console.log('Inserted payments: 30');
    console.log('Inserted visitors: 30');
    process.exit(0);
}

seedMore().catch(error => {
    console.error('Seed more failed:', error);
    process.exit(1);
});
