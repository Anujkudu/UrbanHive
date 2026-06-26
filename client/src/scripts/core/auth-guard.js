// Urban Hive - Frontend Auth Guard (Local)

(function () {
    const currentPath = window.location.pathname;
    let requiredRole = null;
    if (currentPath.includes('/resident/')) requiredRole = 'resident';
    else if (currentPath.includes('/manager/')) requiredRole = 'manager';
    else if (currentPath.includes('/worker/')) requiredRole = 'worker';

    const localSession = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    if (!localSession && requiredRole) {
        window.location.href = '../login.html';
        return;
    }

    if (localSession && requiredRole) {
        try {
            const user = JSON.parse(localSession);
            if (user.role !== requiredRole) {
                window.location.href = '../login.html';
            }
        } catch (e) {
            window.location.href = '../login.html';
        }
    }
})();
