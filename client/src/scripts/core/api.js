const API_BASE =
  window.__URBANHIVE_API_BASE__ ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3001/api"
    : "https://urbanhive-1.onrender.com/api");

function getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '';
}

async function apiRequest(path, options = {}) {
    const headers = options.headers ? { ...options.headers } : {};
    const token = getAuthToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    if (options.body && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
    }
    return res.json();
}

function apiGet(path) {
    return apiRequest(path);
}

function apiPost(path, data) {
    return apiRequest(path, { method: 'POST', body: JSON.stringify(data) });
}

function apiPatch(path, data) {
    return apiRequest(path, { method: 'PATCH', body: JSON.stringify(data) });
}

window.UrbanHiveApi = { apiGet, apiPost, apiPatch, getAuthToken };
