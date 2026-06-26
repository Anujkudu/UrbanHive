// Manager Dashboard JavaScript

// Get current user
const user = requireAuth();
if (!user || user.role !== 'manager') {
    window.location.href = 'login.html';
}

// Render complaints table
function renderComplaintsTable() {
    const complaintsTable = document.getElementById('complaintsTable');
    const complaints = data.complaints.slice(0, 10);
    
    complaintsTable.innerHTML = complaints.map(complaint => `
        <tr>
            <td>${complaint.id}</td>
            <td>${complaint.residentName}</td>
            <td>${complaint.flatNo}</td>
            <td>${complaint.category}</td>
            <td>${createBadge(complaint.status)}</td>
            <td>${formatDate(complaint.createdAt)}</td>
            <td>
                <button class="btn btn-outline" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" onclick="viewComplaint('${complaint.id}')">
                    ${complaint.status === 'Open' ? 'Assign' : 'View'}
                </button>
            </td>
        </tr>
    `).join('');
}

// View complaint
function viewComplaint(id) {
    const complaint = data.complaints.find(c => c.id === id);
    if (complaint) {
        alert(`Complaint Details:\n\nID: ${complaint.id}\nResident: ${complaint.residentName}\nFlat: ${complaint.flatNo}\nCategory: ${complaint.category}\nDescription: ${complaint.description}\nStatus: ${complaint.status}\nDate: ${formatDate(complaint.createdAt)}`);
    }
}

// Submit notice
function submitNotice() {
    const form = document.getElementById('noticeForm');
    const formData = new FormData(form);
    
    const title = formData.get('title');
    const priority = formData.get('priority');
    const content = formData.get('content');
    
    if (!title || !priority || !content) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    // Create new notice
    const newNotice = {
        id: `N${String(data.notices.length + 1).padStart(3, '0')}`,
        title: title,
        content: content,
        createdAt: new Date().toISOString().split('T')[0],
        priority: priority,
        createdBy: user.name
    };
    
    // Add to data
    data.notices.unshift(newNotice);
    
    // Close modal and reset form
    hideModal('newNoticeModal');
    form.reset();
    
    showToast('Notice published successfully!', 'success');
}

// Initialize
renderComplaintsTable();
