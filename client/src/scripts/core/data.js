// Urban Hive - Dummy Data

const data = {
    notices: [
        {
            id: 'N001',
            title: 'Annual General Meeting',
            content: 'The AGM will be held on 20th January 2026 at 6:00 PM in the community hall. All residents are requested to attend.',
            createdAt: '2026-01-10',
            priority: 'important',
            createdBy: 'Society Secretary'
        },
        {
            id: 'N002',
            title: 'Water Tank Cleaning',
            content: 'Water supply will be interrupted on 18th January from 10 AM to 2 PM for tank cleaning.',
            createdAt: '2026-01-12',
            priority: 'urgent',
            createdBy: 'Maintenance Head'
        },
        {
            id: 'N003',
            title: 'Diwali Celebration',
            content: 'Join us for Diwali celebrations on 25th January. Cultural programs and dinner arranged.',
            createdAt: '2026-01-08',
            priority: 'normal',
            createdBy: 'Events Committee'
        },
        {
            id: 'N004',
            title: 'Parking Guidelines Update',
            content: 'New parking slots have been assigned. Please check the notice board for your allocated slot.',
            createdAt: '2026-01-05',
            priority: 'normal',
            createdBy: 'Society Secretary'
        }
    ],

    complaints: [
        {
            id: 'C001',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            category: 'Plumbing',
            description: 'Water leakage in kitchen sink. Urgent attention needed.',
            status: 'Assigned',
            createdAt: '2026-01-14',
            assignedTo: 'W003',
            workerName: 'Raju Plumber'
        },
        {
            id: 'C002',
            residentId: 'R002',
            residentName: 'Anjali Mehta',
            flatNo: 'B-202',
            category: 'Electrical',
            description: 'Corridor lights on 2nd floor not working since 3 days.',
            status: 'In Progress',
            createdAt: '2026-01-13',
            assignedTo: 'W004',
            workerName: 'Suresh Electrician'
        },
        {
            id: 'C003',
            residentId: 'R003',
            residentName: 'Vikram Singh',
            flatNo: 'C-101',
            category: 'Security',
            description: 'CCTV camera near parking is not functioning.',
            status: 'Open',
            createdAt: '2026-01-15'
        },
        {
            id: 'C004',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            category: 'Cleaning',
            description: 'Staircase cleaning not done properly.',
            status: 'Resolved',
            createdAt: '2026-01-10',
            assignedTo: 'W001',
            workerName: 'Ramesh Cleaner'
        },
        {
            id: 'C005',
            residentId: 'R004',
            residentName: 'Sneha Reddy',
            flatNo: 'A-305',
            category: 'Maintenance',
            description: 'Lift in A block making strange noises.',
            status: 'Open',
            createdAt: '2026-01-16'
        }
    ],

    payments: [
        {
            id: 'P001',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            amount: 5500,
            type: 'Maintenance',
            status: 'Pending',
            dueDate: '2026-01-20'
        },
        {
            id: 'P002',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            amount: 800,
            type: 'Water',
            status: 'Paid',
            dueDate: '2026-01-15',
            paidDate: '2026-01-14'
        },
        {
            id: 'P003',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            amount: 2000,
            type: 'Parking',
            status: 'Paid',
            dueDate: '2026-01-01',
            paidDate: '2025-12-28'
        },
        {
            id: 'P004',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            amount: 5500,
            type: 'Maintenance',
            status: 'Overdue',
            dueDate: '2025-12-20'
        },
        {
            id: 'P005',
            residentId: 'R002',
            residentName: 'Anjali Mehta',
            flatNo: 'B-202',
            building: 'Genesis Tower',
            amount: 5500,
            type: 'Maintenance',
            status: 'Paid',
            dueDate: '2026-01-20',
            paidDate: '2026-01-18'
        },
        {
            id: 'P006',
            residentId: 'R002',
            residentName: 'Anjali Mehta',
            flatNo: 'B-202',
            building: 'Genesis Tower',
            amount: 800,
            type: 'Water',
            status: 'Pending',
            dueDate: '2026-01-25'
        },
        {
            id: 'P007',
            residentId: 'R003',
            residentName: 'Vikram Singh',
            flatNo: 'C-101',
            building: 'Horizon Heights',
            amount: 5500,
            type: 'Maintenance',
            status: 'Overdue',
            dueDate: '2025-12-20'
        },
        {
            id: 'P008',
            residentId: 'R003',
            residentName: 'Vikram Singh',
            flatNo: 'C-101',
            building: 'Horizon Heights',
            amount: 1500,
            type: 'Parking',
            status: 'Paid',
            dueDate: '2026-01-01',
            paidDate: '2025-12-30'
        }
    ],

    visitors: [
        {
            id: 'V001',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            name: 'Delivery - Amazon',
            purpose: 'Package Delivery',
            type: 'Delivery',
            entryTime: '2026-01-15 10:30',
            exitTime: '2026-01-15 10:35',
            status: 'Out'
        },
        {
            id: 'V002',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            name: 'Dr. Kapoor',
            purpose: 'Medical Visit',
            type: 'Guest',
            entryTime: '2026-01-15 14:00',
            status: 'In'
        },
        {
            id: 'V003',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            name: 'Swiggy Delivery',
            purpose: 'Food Delivery',
            type: 'Delivery',
            entryTime: '2026-01-14 20:15',
            exitTime: '2026-01-14 20:18',
            status: 'Out'
        },
        {
            id: 'V004',
            residentId: 'R002',
            residentName: 'Anjali Mehta',
            flatNo: 'B-202',
            building: 'Genesis Tower',
            name: 'Priya Mehta',
            purpose: 'Family Visit',
            type: 'Guest',
            entryTime: '2026-01-15 11:00',
            status: 'In'
        },
        {
            id: 'V005',
            residentId: 'R003',
            residentName: 'Vikram Singh',
            flatNo: 'C-101',
            building: 'Horizon Heights',
            name: 'AC Repair Service',
            purpose: 'AC Maintenance',
            type: 'Service',
            entryTime: '2026-01-15 09:00',
            exitTime: '2026-01-15 11:30',
            status: 'Out'
        },
        {
            id: 'V006',
            residentId: 'R002',
            residentName: 'Anjali Mehta',
            flatNo: 'B-202',
            building: 'Genesis Tower',
            name: 'Ola Cab - MH12AB1234',
            purpose: 'Cab Pickup',
            type: 'Cab',
            entryTime: '2026-01-14 08:45',
            exitTime: '2026-01-14 08:50',
            status: 'Out'
        },
        {
            id: 'V007',
            residentId: 'R003',
            residentName: 'Vikram Singh',
            flatNo: 'C-101',
            building: 'Horizon Heights',
            name: 'Flipkart Delivery',
            purpose: 'Package Delivery',
            type: 'Delivery',
            entryTime: '2026-01-15 16:20',
            status: 'In'
        }
    ],

    events: [
        {
            id: 'E001',
            title: 'Annual General Meeting',
            date: '2026-01-20',
            time: '18:00',
            location: 'Community Hall',
            description: 'Yearly society meeting to discuss budget, maintenance plans, and elections.',
            type: 'Meeting'
        },
        {
            id: 'E002',
            title: 'Republic Day Celebration',
            date: '2026-01-26',
            time: '08:00',
            location: 'Main Garden',
            description: 'Flag hoisting ceremony followed by cultural programs and breakfast.',
            type: 'Festival'
        },
        {
            id: 'E003',
            title: 'Fire Safety Drill',
            date: '2026-02-05',
            time: '10:00',
            location: 'All Buildings',
            description: 'Mandatory fire safety drill and evacuation practice for all residents.',
            type: 'Safety'
        },
        {
            id: 'E004',
            title: 'Monthly Maintenance Drive',
            date: '2026-02-10',
            time: '07:00',
            location: 'Society Premises',
            description: 'Deep cleaning, pest control, and general maintenance of common areas.',
            type: 'Maintenance'
        },
        {
            id: 'E005',
            title: 'Kids Summer Camp Registration',
            date: '2026-03-01',
            time: '09:00',
            location: 'Clubhouse',
            description: 'Registration opens for the annual summer camp for society kids.',
            type: 'Community'
        }
    ],

    societySettings: {
        name: 'Urban Hive Residency',
        address: '42, Senapati Bapat Road, Pune, Maharashtra 411016',
        registrationNo: 'MH/PNE/HSG/2019/4521',
        totalUnits: 84,
        establishedYear: 2019,
        buildings: [
            { name: 'Genesis Tower', floors: 14, unitsPerFloor: 4, totalUnits: 56 },
            { name: 'Horizon Heights', floors: 7, unitsPerFloor: 4, totalUnits: 28 }
        ],
        amenities: [
            { name: 'Swimming Pool', active: true },
            { name: 'Gymnasium', active: true },
            { name: 'Garden', active: true },
            { name: 'Covered Parking', active: true },
            { name: 'Clubhouse', active: true },
            { name: 'Children Play Area', active: true },
            { name: 'Indoor Games Room', active: false },
            { name: 'Jogging Track', active: true },
            { name: 'CCTV Surveillance', active: true },
            { name: 'Power Backup', active: true }
        ],
        emergencyContacts: [
            { label: 'Fire Station', number: '101' },
            { label: 'Police Station', number: '100' },
            { label: 'Ambulance', number: '108' },
            { label: 'Society Plumber', number: '+91 98765 43212' },
            { label: 'Society Electrician', number: '+91 98765 43213' }
        ]
    },

    tasks: [
        {
            id: 'T001',
            title: 'Fix Water Leakage - A-404',
            description: 'Kitchen sink pipe needs replacement',
            assignedBy: 'M001',
            assignedTo: 'W003',
            workerName: 'Raju Plumber',
            dueDate: '2026-01-16',
            status: 'In Progress',
            priority: 'High'
        },
        {
            id: 'T002',
            title: 'Replace Corridor Lights - B Block',
            description: '2nd floor corridor lights replacement',
            assignedBy: 'M001',
            assignedTo: 'W004',
            workerName: 'Suresh Electrician',
            dueDate: '2026-01-17',
            status: 'Pending',
            priority: 'Medium'
        },
        {
            id: 'T003',
            title: 'Garden Maintenance',
            description: 'Trim hedges and water plants in main garden',
            assignedBy: 'M001',
            assignedTo: 'W001',
            workerName: 'Ramesh Cleaner',
            dueDate: '2026-01-15',
            status: 'Completed',
            priority: 'Low'
        },
        {
            id: 'T004',
            title: 'Security Round - Night Shift',
            description: 'Complete perimeter check and log entries',
            assignedBy: 'M001',
            assignedTo: 'W002',
            workerName: 'Shankar Security',
            dueDate: '2026-01-15',
            status: 'Pending',
            priority: 'High'
        }
    ],

    workers: [
        {
            id: 'W001',
            name: 'Ramesh Kumar',
            type: 'Cleaner',
            shift: 'Morning',
            phone: '+91 98765 43210',
            status: 'Active',
            joiningDate: '2023-06-15'
        },
        {
            id: 'W002',
            name: 'Shankar Prasad',
            type: 'Security',
            shift: 'Night',
            phone: '+91 98765 43211',
            status: 'Active',
            joiningDate: '2022-11-01'
        },
        {
            id: 'W003',
            name: 'Raju Singh',
            type: 'Plumber',
            shift: 'Morning',
            phone: '+91 98765 43212',
            status: 'Active',
            joiningDate: '2024-02-20'
        },
        {
            id: 'W004',
            name: 'Suresh Yadav',
            type: 'Electrician',
            shift: 'Morning',
            phone: '+91 98765 43213',
            status: 'Active',
            joiningDate: '2023-09-10'
        },
        {
            id: 'W005',
            name: 'Mohan Lal',
            type: 'Maintenance',
            shift: 'Evening',
            phone: '+91 98765 43214',
            status: 'On Leave',
            joiningDate: '2024-01-05'
        }
    ],

    residents: [
        {
            id: 'R001',
            name: 'Rahul Sharma',
            flatNo: 'A-404',
            building: 'Genesis Tower',
            phone: '+91 99999 11111',
            email: 'rahul@email.com',
            type: 'Owner',
            moveInDate: '2022-03-15'
        },
        {
            id: 'R002',
            name: 'Anjali Mehta',
            flatNo: 'B-202',
            building: 'Genesis Tower',
            phone: '+91 99999 22222',
            email: 'anjali@email.com',
            type: 'Tenant',
            moveInDate: '2024-06-01'
        },
        {
            id: 'R003',
            name: 'Vikram Singh',
            flatNo: 'C-101',
            building: 'Horizon Heights',
            phone: '+91 99999 33333',
            email: 'vikram@email.com',
            type: 'Owner',
            moveInDate: '2021-08-20'
        }
    ],

    managerStats: {
        totalResidents: 156,
        totalWorkers: 24,
        openComplaints: 12,
        resolvedThisMonth: 45,
        pendingPayments: 23,
        totalCollection: 856000,
        attendanceRate: 92
    },

    workerStats: {
        tasksToday: 5,
        completedTasks: 3,
        pendingTasks: 2,
        attendanceThisMonth: 22
    },

    workerNotifications: [
        {
            id: 'WN001',
            type: 'Task',
            title: 'New Task Assigned',
            message: 'You have been assigned "Fix Water Leakage - A-404". Priority: High.',
            date: '2026-01-15',
            time: '09:30 AM',
            read: false,
            workerId: 'W001'
        },
        {
            id: 'WN002',
            type: 'Schedule',
            title: 'Shift Changed',
            message: 'Your shift for tomorrow has been changed from Morning to Evening (2 PM - 10 PM).',
            date: '2026-01-14',
            time: '06:00 PM',
            read: false,
            workerId: 'W001'
        },
        {
            id: 'WN003',
            type: 'Payment',
            title: 'Salary Credited',
            message: 'Your salary of ₹18,500 for December 2025 has been credited to your account.',
            date: '2026-01-05',
            time: '11:00 AM',
            read: true,
            workerId: 'W001'
        },
        {
            id: 'WN004',
            type: 'Alert',
            title: 'Emergency Drill Tomorrow',
            message: 'Fire safety drill scheduled for Jan 20 at 10 AM. All staff must participate.',
            date: '2026-01-19',
            time: '03:00 PM',
            read: false,
            workerId: 'W001'
        },
        {
            id: 'WN005',
            type: 'Task',
            title: 'Task Completed — Approved',
            message: 'Your completed task "Garden Maintenance" has been reviewed and approved by the manager.',
            date: '2026-01-16',
            time: '04:15 PM',
            read: true,
            workerId: 'W001'
        },
        {
            id: 'WN006',
            type: 'Schedule',
            title: 'Holiday Notice',
            message: 'Society office will be closed on Jan 26 (Republic Day). Skeleton staff on duty.',
            date: '2026-01-22',
            time: '10:00 AM',
            read: false,
            workerId: 'W001'
        }
    ],

    workerSalary: [
        {
            id: 'WS001',
            workerId: 'W001',
            month: 'January 2026',
            basePay: 15000,
            overtime: 2500,
            bonus: 1000,
            deductions: 500,
            netPay: 18000,
            status: 'Pending',
            payDate: null
        },
        {
            id: 'WS002',
            workerId: 'W001',
            month: 'December 2025',
            basePay: 15000,
            overtime: 3000,
            bonus: 500,
            deductions: 0,
            netPay: 18500,
            status: 'Paid',
            payDate: '2026-01-05'
        },
        {
            id: 'WS003',
            workerId: 'W001',
            month: 'November 2025',
            basePay: 15000,
            overtime: 1500,
            bonus: 0,
            deductions: 500,
            netPay: 16000,
            status: 'Paid',
            payDate: '2025-12-05'
        },
        {
            id: 'WS004',
            workerId: 'W001',
            month: 'October 2025',
            basePay: 15000,
            overtime: 2000,
            bonus: 2000,
            deductions: 0,
            netPay: 19000,
            status: 'Paid',
            payDate: '2025-11-05'
        }
    ],


    amenities: [
        {
            id: 'AM001',
            name: 'Clubhouse',
            icon: '🏛️',
            description: 'Multi-purpose hall for parties, meetings, and gatherings',
            capacity: 80,
            pricePerHour: 500,
            timeslots: ['09:00-12:00', '14:00-17:00', '18:00-22:00'],
            status: 'Available',
            rules: 'No loud music after 10 PM. Cleaning deposit required.'
        },
        {
            id: 'AM002',
            name: 'Gymnasium',
            icon: '🏋️',
            description: 'Fully equipped gym with cardio and weight training zones',
            capacity: 20,
            pricePerHour: 0,
            timeslots: ['06:00-09:00', '09:00-12:00', '16:00-19:00', '19:00-22:00'],
            status: 'Available',
            rules: 'Proper sportswear required. Wipe equipment after use.'
        },
        {
            id: 'AM003',
            name: 'Swimming Pool',
            icon: '🏊',
            description: 'Temperature-controlled pool with kids section',
            capacity: 30,
            pricePerHour: 0,
            timeslots: ['06:00-09:00', '09:00-12:00', '16:00-19:00'],
            status: 'Available',
            rules: 'Swimming cap mandatory. No diving in shallow end.'
        },
        {
            id: 'AM004',
            name: 'Party Hall',
            icon: '🎉',
            description: 'AC banquet hall with stage, sound system, and kitchen access',
            capacity: 120,
            pricePerHour: 1500,
            timeslots: ['10:00-14:00', '15:00-19:00', '19:00-23:00'],
            status: 'Available',
            rules: 'Advance booking required. Security deposit ₹5,000.'
        },
        {
            id: 'AM005',
            name: 'Guest Room',
            icon: '🛏️',
            description: 'Furnished guest rooms for visitors with AC and attached bath',
            capacity: 2,
            pricePerHour: 300,
            timeslots: ['Check-in: 12:00', 'Check-out: 11:00'],
            status: 'Occupied',
            rules: 'Max 2 nights per booking. ID proof of guest required.'
        }
    ],

    amenityBookings: [
        {
            id: 'AB001',
            amenityId: 'AM001',
            amenityName: 'Clubhouse',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            date: '2026-01-25',
            timeslot: '18:00-22:00',
            purpose: 'Birthday Party',
            status: 'Confirmed',
            amount: 2000
        },
        {
            id: 'AB002',
            amenityId: 'AM004',
            amenityName: 'Party Hall',
            residentId: 'R002',
            residentName: 'Anjali Mehta',
            flatNo: 'B-202',
            date: '2026-02-14',
            timeslot: '19:00-23:00',
            purpose: 'Anniversary Celebration',
            status: 'Confirmed',
            amount: 6000
        },
        {
            id: 'AB003',
            amenityId: 'AM005',
            amenityName: 'Guest Room',
            residentId: 'R001',
            residentName: 'Rahul Sharma',
            flatNo: 'A-404',
            date: '2026-01-18',
            timeslot: 'Check-in: 12:00',
            purpose: 'Family Visit',
            status: 'Completed',
            amount: 600
        },
        {
            id: 'AB004',
            amenityId: 'AM002',
            amenityName: 'Gymnasium',
            residentId: 'R003',
            residentName: 'Vikram Singh',
            flatNo: 'C-101',
            date: '2026-01-20',
            timeslot: '06:00-09:00',
            purpose: 'Personal Training',
            status: 'Confirmed',
            amount: 0
        }
    ]
};

// Helper functions
function getStatusBadgeClass(status) {
    const statusMap = {
        'Open': 'badge-warning',
        'Assigned': 'badge-info',
        'In Progress': 'badge-info',
        'Resolved': 'badge-success',
        'Completed': 'badge-success',
        'Pending': 'badge-warning',
        'Paid': 'badge-success',
        'Overdue': 'badge-destructive',
        'Active': 'badge-success',
        'On Leave': 'badge-warning',
        'In': 'badge-success',
        'Out': 'badge',
        'normal': 'badge',
        'important': 'badge-warning',
        'urgent': 'badge-destructive',
        'High': 'badge-destructive',
        'Medium': 'badge-warning',
        'Low': 'badge-info'
    };
    return statusMap[status] || 'badge';
}

function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
