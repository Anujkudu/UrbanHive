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

function randomDate() {
    const start = new Date(2026, 2, 1);
    const end = new Date(2026, 3, 6);
    const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return d.toISOString().split('T')[0];
}

async function seedAppend() {
    await connectDb(process.env.MONGODB_URI);

    const passwordHash = await bcrypt.hash('Password@123', 10);
    const existingEmails = new Set(
        (await User.find({}, { email: 1 })).map(u => u.email.toLowerCase())
    );

    const buildings = ['URB-001'];
    const residentNames = [
        { name: 'Amit Patel', email: 'amit.patel@urbanhive.local', flat: 'D-113' },
        { name: 'Priya Gupta', email: 'priya.gupta@urbanhive.local', flat: 'D-213' },
        { name: 'Rahul Verma', email: 'rahul.verma@urbanhive.local', flat: 'D-313' },
        { name: 'Sneha Desai', email: 'sneha.desai@urbanhive.local', flat: 'D-413' },
        { name: 'Vikram Malhotra', email: 'vikram.malhotra@urbanhive.local', flat: 'A-120' },
        { name: 'Anita Rao', email: 'anita.rao@urbanhive.local', flat: 'A-220' },
        { name: 'Deepak Nair', email: 'deepak.nair@urbanhive.local', flat: 'B-115' },
        { name: 'Kavita Joshi', email: 'kavita.joshi@urbanhive.local', flat: 'B-215' },
        { name: 'Sanjay Mehta', email: 'sanjay.mehta@urbanhive.local', flat: 'C-118' },
        { name: 'Pooja Sharma', email: 'pooja.sharma@urbanhive.local', flat: 'C-218' },
        { name: 'Rajesh Iyer', email: 'rajesh.iyer@urbanhive.local', flat: 'A-320' },
        { name: 'Meena Kumari', email: 'meena.kumari@urbanhive.local', flat: 'B-315' },
        { name: 'Arun Reddy', email: 'arun.reddy@urbanhive.local', flat: 'C-318' },
        { name: 'Shalini Singh', email: 'shalini.singh@urbanhive.local', flat: 'D-123' },
        { name: 'Manoj Tiwari', email: 'manoj.tiwari@urbanhive.local', flat: 'D-223' }
    ];
    const workerNames = [
        { name: 'Sunil Yadav', email: 'sunil.yadav@urbanhive.local', type: 'Plumber' },
        { name: 'Ravi Shankar', email: 'ravi.shankar@urbanhive.local', type: 'Electrician' },
        { name: 'Mohan Das', email: 'mohan.das@urbanhive.local', type: 'Cleaner' },
        { name: 'Krishna Gopal', email: 'krishna.gopal@urbanhive.local', type: 'Security' },
        { name: 'Balram Kumar', email: 'balram.kumar@urbanhive.local', type: 'Maintenance' },
        { name: 'Hari Prasad', email: 'hari.prasad@urbanhive.local', type: 'Gardener' },
        { name: 'Ganesh Patil', email: 'ganesh.patil@urbanhive.local', type: 'Painter' },
        { name: 'Suresh Mali', email: 'suresh.mali@urbanhive.local', type: 'Carpenter' }
    ];

    const newUsers = [];

    // New residents
    for (const r of residentNames) {
        if (existingEmails.has(r.email)) continue;
        newUsers.push({
            name: r.name,
            email: r.email.toLowerCase(),
            passwordHash,
            role: 'resident',
            flatNo: r.flat,
            buildingId: pick(buildings, 0)
        });
    }

    // New workers
    for (const w of workerNames) {
        if (existingEmails.has(w.email)) continue;
        newUsers.push({
            name: w.name,
            email: w.email.toLowerCase(),
            passwordHash,
            role: 'worker',
            workerType: w.type,
            buildingId: pick(buildings, 0)
        });
    }

    if (newUsers.length) {
        await User.insertMany(newUsers);
        console.log(`Inserted ${newUsers.length} new users.`);
    }

    const allUsers = await User.find({});
    const managers = allUsers.filter(u => u.role === 'manager');
    const residents = allUsers.filter(u => u.role === 'resident');
    const workers = allUsers.filter(u => u.role === 'worker');

    // --- Complaints ---
    const complaintData = [
        { title: 'Water Leakage', desc: 'Bathroom pipe leaking in flat D-113', priority: 'high' },
        { title: 'Power Trip', desc: 'Frequent power cuts in B-215', priority: 'high' },
        { title: 'Lift Breakdown', desc: 'Lift in Building A not working since yesterday', priority: 'high' },
        { title: 'Parking Issue', desc: 'Unauthorized vehicle parked in my slot', priority: 'medium' },
        { title: 'Noise Complaint', desc: 'Construction noise after 10 PM in C-218', priority: 'low' },
        { title: 'Garbage Overflow', desc: 'Garbage bins not emptied on time', priority: 'medium' },
        { title: 'Door Lock Issue', desc: 'Main door lock jammed in D-223', priority: 'high' },
        { title: 'AC Not Cooling', desc: 'AC making noise, not cooling properly', priority: 'medium' },
        { title: 'Seepage Problem', desc: 'Wall seepage in living room B-115', priority: 'medium' },
        { title: 'Intercom Down', desc: 'Intercom not working for flat A-120', priority: 'low' }
    ];

    const complaintStatuses = ['new', 'assigned', 'in_progress', 'resolved', 'assigned'];
    const newComplaints = [];

    for (let i = 0; i < complaintData.length; i++) {
        const resident = pick(residents, i);
        const manager = pick(managers, i);
        const worker = pick(workers, i);
        const cd = complaintData[i];
        const status = pick(complaintStatuses, i);

        const timeline = [{ status: 'new', message: 'Complaint created', updatedBy: resident._id }];
        if (status === 'assigned') {
            timeline.push({ status: 'assigned', message: 'Assigned to ' + (workers[i % workers.length]?.workerType || 'worker'), updatedBy: manager?._id || resident._id });
        }
        if (status === 'in_progress') {
            timeline.push(
                { status: 'assigned', message: 'Work assigned', updatedBy: manager?._id || resident._id },
                { status: 'in_progress', message: 'Work in progress', updatedBy: worker?._id || resident._id }
            );
        }
        if (status === 'resolved') {
            timeline.push(
                { status: 'assigned', message: 'Assigned', updatedBy: manager?._id || resident._id },
                { status: 'in_progress', message: 'In progress', updatedBy: worker?._id || resident._id },
                { status: 'resolved', message: 'Issue resolved', updatedBy: worker?._id || resident._id }
            );
        }

        newComplaints.push({
            title: cd.title,
            description: cd.desc,
            residentId: resident._id,
            managerId: manager?._id,
            workerId: worker?._id,
            status,
            priority: cd.priority,
            buildingId: resident.buildingId,
            timeline
        });
    }

    if (newComplaints.length) await Complaint.insertMany(newComplaints);
    console.log(`Inserted ${newComplaints.length} complaints.`);

    // --- Payments ---
    const paymentData = [];
    const paymentTypes = ['Maintenance', 'Water', 'Parking', 'Electricity', 'Society Fee'];
    const paymentStatuses = ['pending', 'approved', 'approved', 'pending', 'rejected', 'approved'];
    const paymentModes = ['upi', 'cash', 'bank', 'card', 'upi', 'bank'];
    const amounts = [5500, 900, 2000, 3200, 8000, 1500];

    for (let i = 0; i < Math.min(residents.length * 2, 20); i++) {
        const resident = pick(residents, i);
        const manager = pick(managers, i);
        const status = pick(paymentStatuses, i);
        const amount = pick(amounts, i);
        const type = pick(paymentTypes, i);
        const mode = pick(paymentModes, i);
        const dueDate = randomDate();
        const paidDate = status !== 'pending' ? randomDate() : '';

        paymentData.push({
            residentId: resident._id,
            managerId: status === 'approved' ? manager?._id : undefined,
            amount,
            type,
            status,
            mode,
            month: pick(['March 2026', 'April 2026', 'May 2026'], i),
            dueDate,
            paidDate,
            verifiedAt: status === 'approved' ? new Date() : undefined
        });
    }

    if (paymentData.length) await Payment.insertMany(paymentData);
    console.log(`Inserted ${paymentData.length} payments.`);

    // --- Visitors ---
    const visitorData = [
        { name: 'Amazon Delivery', purpose: 'Package Delivery' },
        { name: 'Dr. Kapoor', purpose: 'Medical Visit' },
        { name: 'Swiggy - Food Order', purpose: 'Food Delivery' },
        { name: 'Flipkart - Electronics', purpose: 'Package Delivery' },
        { name: 'AC Service Team', purpose: 'Maintenance' },
        { name: 'Priya Jain', purpose: 'Family Visit' },
        { name: 'BlueDart Courier', purpose: 'Document Delivery' },
        { name: 'Electricity Inspector', purpose: 'Meter Reading' },
        { name: 'Plumber - Emergency', purpose: 'Repair Work' },
        { name: 'CCTV Technician', purpose: 'Camera Repair' },
        { name: 'Zomato Delivery', purpose: 'Food Delivery' },
        { name: 'Paint Contractor', purpose: 'Painting Estimate' }
    ];

    const visitorStatuses = ['approved', 'entered', 'approved', 'requested', 'entered', 'denied'];

    const visitors = [];
    for (let i = 0; i < visitorData.length; i++) {
        const resident = pick(residents, i);
        const manager = pick(managers, i);
        const vd = visitorData[i];
        const status = pick(visitorStatuses, i);

        visitors.push({
            residentId: resident._id,
            managerId: ['approved', 'entered'].includes(status) ? manager?._id : undefined,
            name: vd.name,
            phone: `98${String(Math.floor(Math.random() * 1000000000)).padStart(8, '0')}`,
            visitDate: randomDate(),
            purpose: vd.purpose,
            notes: '',
            status
        });
    }

    if (visitors.length) await Visitor.insertMany(visitors);
    console.log(`Inserted ${visitors.length} visitors.`);

    // --- Summary ---
    const finalUsers = await User.find({});
    console.log('\n=== Database Summary ===');
    console.log(`Total Users: ${finalUsers.length}`);
    console.log(`  Managers: ${finalUsers.filter(u => u.role === 'manager').length}`);
    console.log(`  Residents: ${finalUsers.filter(u => u.role === 'resident').length}`);
    console.log(`  Workers: ${finalUsers.filter(u => u.role === 'worker').length}`);
    console.log(`Total Complaints: ${await Complaint.countDocuments()}`);
    console.log(`Total Payments: ${await Payment.countDocuments()}`);
    console.log(`Total Visitors: ${await Visitor.countDocuments()}`);

    process.exit(0);
}

seedAppend().catch(error => {
    console.error('Append seed failed:', error);
    process.exit(1);
});
