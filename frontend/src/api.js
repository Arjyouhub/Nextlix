const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api'
  : import.meta.env.VITE_API_URL || 'https://nextlix.onrender.com/api';

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
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function trackPageView() {
  const res = await fetch(`${API_BASE}/analytics/view`, { method: 'POST' });
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
