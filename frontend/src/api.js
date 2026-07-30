const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api'
  : 'https://nextlix.onrender.com/api';

function getDeviceName(ua) {
  if (!ua) return 'Unknown Device';
  if (/iPhone/i.test(ua)) {
    const match = ua.match(/OS (\d+[\._]\d+)/);
    const ver = match ? match[1].replace('_', '.') : '';
    return `Apple iPhone (iOS ${ver})`.trim();
  }
  if (/iPad/i.test(ua)) return 'Apple iPad';
  if (/Macintosh/i.test(ua)) return 'Apple Mac';
  if (/Android/i.test(ua)) {
    const match = ua.match(/Android\s+([\d\.]+);?\s*([^;)]+)?/i);
    const ver = match ? match[1] : '';
    let model = match && match[2] ? match[2].trim() : '';
    if (model.includes('Build/')) model = model.split('Build/')[0].trim();
    if (model && !model.toLowerCase().includes('k-touch')) {
      return `${model} (Android ${ver})`;
    }
    return `Android Smartphone (v${ver})`;
  }
  if (/Windows/i.test(ua)) return 'Windows PC';
  return 'Mobile / Web Device';
}

// ---------------- PROJECTS ----------------
export async function getProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function addProject(project) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

// ---------------- REVIEWS ----------------
export async function getReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function addReview(review) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function toggleReviewApproval(id) {
  const res = await fetch(`${API_BASE}/reviews/${id}/approve`, { method: 'PUT' });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function deleteReview(id) {
  const res = await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

// ---------------- ANALYTICS ----------------
export async function getAnalytics() {
  try {
    const res = await fetch(`${API_BASE}/analytics`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Analytics fetch error:', e);
  }
  return { totalViews: 0, dailyViews: [] };
}

export async function trackPageView() {
  let detectedIp = '';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const ipRes = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      detectedIp = ipData.ip;
    }
  } catch (e) {
    // Ignore silent error
  }

  // Save to client localStorage immediately for instant Admin Visibility
  if (detectedIp) {
    try {
      const existing = JSON.parse(localStorage.getItem('nextlix_client_visitor_logs') || '[]');
      const newEntry = {
        ip: detectedIp,
        userAgent: navigator.userAgent,
        deviceModel: getDeviceName(navigator.userAgent),
        path: window.location.pathname,
        date: new Date().toISOString()
      };
      const updated = [newEntry, ...existing.filter(item => item.ip !== detectedIp)].slice(0, 50);
      localStorage.setItem('nextlix_client_visitor_logs', JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage save warning:', err);
    }
  }

  try {
    const res = await fetch(`${API_BASE}/analytics/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        path: window.location.pathname,
        clientIp: detectedIp,
        userAgent: navigator.userAgent
      })
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend analytics track error:', e);
  }
  return { totalViews: 1, dailyViews: [] };
}

export async function getVisitorLogs() {
  let serverLogs = [];
  try {
    const res = await fetch(`${API_BASE}/analytics/visitors`);
    if (res.ok) {
      serverLogs = await res.json();
    }
  } catch (e) {
    console.warn('Backend visitor log fetch warning:', e);
  }

  let localLogs = [];
  try {
    localLogs = JSON.parse(localStorage.getItem('nextlix_client_visitor_logs') || '[]');
  } catch (e) {}

  const combinedMap = new Map();
  localLogs.forEach(item => combinedMap.set(item.ip, item));
  serverLogs.forEach(item => combinedMap.set(item.ip, item));

  return Array.from(combinedMap.values());
}

// ---------------- INQUIRIES & LEADS ----------------
export async function getInquiries() {
  const res = await fetch(`${API_BASE}/inquiries`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function submitInquiry(inquiryData) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData)
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function deleteInquiry(id) {
  const res = await fetch(`${API_BASE}/inquiries/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

// ---------------- ADMIN AUTH & SETTINGS ----------------
export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Invalid credentials');
  }
  return await res.json();
}

export async function updateAdminCredentials(username, password) {
  const res = await fetch(`${API_BASE}/admin/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update credentials');
  }
  return await res.json();
}
