// Urban Hive - Authentication

// Demo users
const demoUsers = {
    'resident@urbanhive.com': {
        id: 'R001',
        name: 'Rahul Sharma',
        email: 'resident@urbanhive.com',
        role: 'resident',
        flatNo: 'A-404',
        building: 'Genesis Tower',
        password: 'resident123'
    },
    'manager@urbanhive.com': {
        id: 'M001',
        name: 'Priya Patel',
        email: 'manager@urbanhive.com',
        role: 'manager',
        designation: 'Society Secretary',
        password: 'manager123'
    },
    'worker@urbanhive.com': {
        id: 'W001',
        name: 'Vijay Kumar',
        email: 'worker@urbanhive.com',
        role: 'worker',
        workerType: 'Maintenance',
        password: 'worker123'
    }
};

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
}

// Fill demo credentials
function fillDemo(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    
    // Hide error if visible
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    const errorText = document.getElementById('loginErrorText');
    const loginBtn = document.querySelector('#loginForm button[type="submit"]');
    const loginBtnText = document.getElementById('loginBtnText');
    
    // Show loading state
    loginBtn.disabled = true;
    loginBtnText.textContent = 'Signing in...';
    
    // Hide previous errors
    errorDiv.style.display = 'none';
    
    // Simulate API call delay
    setTimeout(() => {
        const user = demoUsers[email];
        
        if (user && user.password === password) {
            // Remove password before storing
            const { password: _, ...userWithoutPassword } = user;
            
            // Store user in session
            sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            
            // Redirect based on role
            window.location.href = `${user.role}-dashboard.html`;
        } else {
            // Show error
            errorText.textContent = 'Invalid email or password. Please try again.';
            errorDiv.style.display = 'flex';
            
            // Reset button
            loginBtn.disabled = false;
            loginBtnText.textContent = 'Sign In';
        }
    }, 800);
});

// Check if user is already logged in
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        // Redirect to appropriate dashboard
        window.location.href = `${user.role}-dashboard.html`;
    }
}

// Run auth check on page load
if (window.location.pathname.includes('login.html')) {
    checkAuth();
}
