// Resident Dashboard JavaScript

// Get current user
const user = requireAuth();
if (!user || user.role !== 'resident') {
    window.location.href = 'login.html';
}

// Update user info
document.getElementById('userFlatInfo').textContent = `${user.flatNo} • ${user.building}`;

// Filter data for current resident
const myComplaints = data.complaints.filter(c => c.residentId === user.id);
const myPayments = data.payments.filter(p => p.residentId === user.id);
const myVisitors = data.visitors.filter(v => v.residentId === user.id);

// Calculate stats
const openComplaints = myComplaints.filter(c => c.status !== 'Resolved').length;
const pendingPayments = myPayments.filter(p => p.status !== 'Paid');
const totalDue = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
const activeVisitors = myVisitors.filter(v => v.status === 'In').length;

// Update stats
document.getElementById('openComplaintsCount').textContent = openComplaints;
document.getElementById('pendingDues').textContent = formatCurrency(totalDue);
document.getElementById('pendingBills').textContent = `${pendingPayments.length} bills pending`;
document.getElementById('activeVisitors').textContent = activeVisitors;
document.getElementById('noticesCount').textContent = data.notices.length;

// Render notices
function renderNotices() {
    const noticesList = document.getElementById('noticesList');
    const notices = data.notices.slice(0, 3);
    
    noticesList.innerHTML = notices.map(notice => `
        <div class="card-item">
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-sm">${notice.title}</h4>
                ${createBadge(notice.priority)}
            </div>
            <p class="text-sm text-muted" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${notice.content}
            </p>
            <div class="flex items-center gap-2 text-xs text-muted" style="margin-top: 0.5rem;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${formatDate(notice.createdAt)}
                <span>•</span>
                ${notice.createdBy}
            </div>
        </div>
    `).join('');
}

// Render complaints
function renderComplaints() {
    const complaintsList = document.getElementById('complaintsList');
    const complaints = myComplaints.slice(0, 3);
    
    if (complaints.length === 0) {
        complaintsList.innerHTML = '<p class="text-sm text-muted">No complaints yet</p>';
        return;
    }
    
    complaintsList.innerHTML = complaints.map(complaint => `
        <div class="card-item">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                    <div style="width: 2rem; height: 2rem; border-radius: 0.5rem; background: rgba(245, 158, 11, 0.2); display: flex; align-items: center; justify-content: center;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning);">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-medium text-sm">${complaint.category}</h4>
                        <p class="text-xs text-muted">${formatDate(complaint.createdAt)}</p>
                    </div>
                </div>
                ${createBadge(complaint.status)}
            </div>
            <p class="text-sm text-muted" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${complaint.description}
            </p>
            ${complaint.workerName ? `<p class="text-xs" style="color: var(--primary); margin-top: 0.5rem;">Assigned to: ${complaint.workerName}</p>` : ''}
        </div>
    `).join('');
}

// Submit complaint
function submitComplaint() {
    const form = document.getElementById('complaintForm');
    const formData = new FormData(form);
    
    const category = formData.get('category');
    const description = formData.get('description');
    
    if (!category || !description) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    // Create new complaint
    const newComplaint = {
        id: `C${String(data.complaints.length + 1).padStart(3, '0')}`,
        residentId: user.id,
        residentName: user.name,
        flatNo: user.flatNo,
        category: category,
        description: description,
        status: 'Open',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to data
    data.complaints.unshift(newComplaint);
    myComplaints.unshift(newComplaint);
    
    // Update UI
    renderComplaints();
    document.getElementById('openComplaintsCount').textContent = myComplaints.filter(c => c.status !== 'Resolved').length;
    
    // Close modal and reset form
    hideModal('newComplaintModal');
    form.reset();
    
    showToast('Complaint submitted successfully!', 'success');
}

// Initialize
renderNotices();
renderComplaints();
