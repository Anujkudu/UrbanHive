// Worker Dashboard JavaScript

// Get current user
const user = requireAuth();
if (!user || user.role !== 'worker') {
    window.location.href = 'login.html';
}

// Update worker info
document.getElementById('workerInfo').textContent = `${user.workerType} • Morning Shift`;

// Attendance state
let attendanceMarked = false;

// Filter tasks for current worker
const myTasks = data.tasks.filter(t => t.assignedTo === user.id || t.assignedTo === 'W003' || t.assignedTo === 'W001');

// Mark attendance
function markAttendance() {
    attendanceMarked = true;
    
    // Update button
    const attendanceBtn = document.getElementById('attendanceBtn');
    const attendanceBtnText = document.getElementById('attendanceBtnText');
    attendanceBtn.style.background = 'var(--success)';
    attendanceBtn.disabled = true;
    attendanceBtnText.textContent = 'Attendance Marked';
    
    // Update button icon
    attendanceBtn.querySelector('svg').innerHTML = `
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    `;
    
    // Hide banner
    const banner = document.getElementById('attendanceBanner');
    if (banner) {
        banner.style.display = 'none';
    }
    
    showToast('Attendance marked successfully!', 'success');
}

// Render tasks
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    
    if (myTasks.length === 0) {
        tasksList.innerHTML = '<p class="text-sm text-muted">No tasks assigned yet</p>';
        return;
    }
    
    tasksList.innerHTML = myTasks.map(task => `
        <div class="card-item" style="${task.status === 'Completed' ? 'background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2);' : ''}">
            <div class="flex items-start gap-3">
                <input type="checkbox" ${task.status === 'Completed' ? 'checked' : ''} onchange="toggleTask('${task.id}')" style="margin-top: 0.25rem; width: 1rem; height: 1rem; cursor: pointer;">
                <div style="flex: 1; min-width: 0;">
                    <div class="flex items-start justify-between gap-2 mb-2">
                        <h4 class="font-medium ${task.status === 'Completed' ? 'text-muted' : ''}" style="${task.status === 'Completed' ? 'text-decoration: line-through;' : ''}">
                            ${task.title}
                        </h4>
                        <div class="flex items-center gap-2">
                            ${createBadge(task.priority)}
                            ${createBadge(task.status)}
                        </div>
                    </div>
                    <p class="text-sm text-muted mb-3">${task.description}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4 text-xs text-muted">
                            <span class="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                Due: ${formatDate(task.dueDate)}
                            </span>
                        </div>
                        ${task.status !== 'Completed' ? `
                            <div class="flex gap-2">
                                ${task.status === 'Pending' ? `
                                    <button class="btn btn-outline" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" onclick="startTask('${task.id}')">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                        Start
                                    </button>
                                ` : `
                                    <button class="btn btn-primary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" onclick="completeTask('${task.id}')">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        Complete
                                    </button>
                                `}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle task
function toggleTask(taskId) {
    const task = myTasks.find(t => t.id === taskId);
    if (task) {
        if (task.status === 'Completed') {
            task.status = 'In Progress';
        } else {
            task.status = 'Completed';
        }
        renderTasks();
    }
}

// Start task
function startTask(taskId) {
    const task = myTasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'In Progress';
        renderTasks();
        showToast('Task started!', 'info');
    }
}

// Complete task
function completeTask(taskId) {
    const task = myTasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'Completed';
        renderTasks();
        showToast('Task completed successfully!', 'success');
    }
}

// Initialize
renderTasks();
