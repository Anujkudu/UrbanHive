// Urban Hive - Dashboard Common Functions

// Check authentication
function requireAuth() {
    const currentUser = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '../login.html';
        return null;
    }
    return JSON.parse(currentUser);
}

// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('authToken');
    window.location.href = '../login.html';
}

// Toggle sidebar on mobile — with overlay & body scroll lock
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!sidebar) return;

    const isOpen = sidebar.classList.toggle('open');

    if (overlay) {
        overlay.classList.toggle('active', isOpen);
    }

    // Lock/unlock body scroll
    document.body.classList.toggle('sidebar-open', isOpen);
}

// Close sidebar helper
function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
}

// Create sidebar overlay element if it doesn't exist
function ensureSidebarOverlay() {
    if (!document.querySelector('.sidebar-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.addEventListener('click', closeSidebar);
        overlay.addEventListener('touchstart', closeSidebar, { passive: true });
        document.body.appendChild(overlay);
    }
}

// Close sidebar on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});

// Close sidebar on resize to desktop
window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
        closeSidebar();
    }
});

// Set active nav link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Create status badge
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
        'Rejected': 'badge-destructive',
        'Active': 'badge-success',
        'On Leave': 'badge-warning',
        'In': 'badge-success',
        'Out': 'badge',
        'normal': 'badge',
        'important': 'badge-warning',
        'urgent': 'badge-destructive',
        'High': 'badge-destructive',
        'Medium': 'badge-warning',
        'Low': 'badge-info',
        // DB status values
        'new': 'badge-warning',
        'assigned': 'badge-info',
        'in_progress': 'badge-info',
        'resolved': 'badge-success',
        'closed': 'badge-success',
        'pending': 'badge-warning',
        'approved': 'badge-success',
        'rejected': 'badge-destructive',
        'requested': 'badge-info',
        'denied': 'badge-destructive',
        'entered': 'badge-success'
    };
    return statusMap[status] || 'badge';
}

function createBadge(status) {
    const badgeClass = getStatusBadgeClass(status);
    return `<span class="badge ${badgeClass}">${status}</span>`;
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking overlay
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize dashboard
function initDashboard(user) {
    // Create overlay for sidebar
    ensureSidebarOverlay();

    // Set user info in sidebar
    const userAvatar = document.querySelector('.user-avatar');
    const userName = document.querySelector('.user-name');
    const userRole = document.querySelector('.user-role');

    if (userAvatar && userName && userRole) {
        userAvatar.textContent = user.name.charAt(0).toUpperCase();
        userName.textContent = user.name;
        userRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    }

    // Set active nav link
    setActiveNavLink();

    // Add logout button handler
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Menu toggle is handled via onclick="toggleSidebar()" in HTML
}

// Format time ago
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
}

// Show toast notification — mobile-responsive positioning
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize on page load
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const user = requireAuth();
    if (user) {
        initDashboard(user);
    }
});
