import React, { useState, useEffect } from 'react';
import { getProjects, addProject, deleteProject, getReviews, addReview, toggleReviewApproval, deleteReview, getAnalytics, updateAdminCredentials } from '../api';

const AdminPanel = ({ onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState({ totalViews: 0, dailyViews: [] });
  const [statusMessage, setStatusMessage] = useState('');
  
  // Project Form State
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('web');
  const [projTech, setProjTech] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projIcon, setProjIcon] = useState('fa-globe');
  const [projGradient, setProjGradient] = useState('bg-gradient-cyan');
  const [projUrl, setProjUrl] = useState('');

  // Manual Review Form State
  const [revName, setRevName] = useState('');
  const [revCompany, setRevCompany] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');

  // Security Settings Form State
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projs = await getProjects();
      const revs = await getReviews();
      const stats = await getAnalytics();
      setProjects(projs);
      setReviews(revs);
      setAnalytics(stats);
    } catch (e) {
      console.error('Error loading admin data:', e);
    }
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projTitle || !projTech || !projDesc) {
      alert('Please fill out all required fields');
      return;
    }
    
    const newProj = {
      title: projTitle,
      category: projCategory,
      tech: projTech,
      desc: projDesc,
      icon: projIcon,
      gradient: projGradient,
      url: projUrl
    };

    try {
      await addProject(newProj);
      showStatus('Project added successfully!');
      // Reset form
      setProjTitle('');
      setProjTech('');
      setProjDesc('');
      setProjUrl('');
      fetchData();
    } catch (e) {
      showStatus('Failed to add project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      showStatus('Project deleted successfully');
      fetchData();
    } catch (e) {
      showStatus('Failed to delete project');
    }
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      alert('Please fill out all required fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      await updateAdminCredentials(newUsername, newPassword);
      showStatus('Credentials updated successfully!');
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e) {
      showStatus(e.message || 'Failed to update credentials');
    }
  };

  const handleAddReviewManual = async (e) => {
    e.preventDefault();
    if (!revName || !revComment) {
      alert('Please fill out all required fields');
      return;
    }

    const newRev = {
      name: revName,
      company: revCompany || 'Independent Client',
      rating: revRating,
      comment: revComment,
      approved: true
    };

    try {
      await addReview(newRev);
      showStatus('Review added successfully!');
      setRevName('');
      setRevCompany('');
      setRevComment('');
      fetchData();
    } catch (e) {
      showStatus('Failed to add review');
    }
  };

  const handleToggleApprove = async (id) => {
    try {
      await toggleReviewApproval(id);
      showStatus('Review approval toggled');
      fetchData();
    } catch (e) {
      showStatus('Failed to toggle approval');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(id);
      showStatus('Review deleted successfully');
      fetchData();
    } catch (e) {
      showStatus('Failed to delete review');
    }
  };

  return (
    <div class="admin-panel-container container section-padding" style={{ minHeight: '100vh', position: 'relative', zIndex: 100 }}>
      <div class="section-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%' }}>
        <div style={{ textAlign: 'left' }}>
          <span class="section-tag">Nextlix Backend Console</span>
          <h2 class="section-title" style={{ margin: 0 }}>Startup <span class="gradient-text">Admin Panel</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button class="btn btn-secondary" onClick={onClose}>
            <i class="fa-solid fa-house"></i> Exit Dashboard
          </button>
          <button class="btn btn-secondary" onClick={onLogout} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <i class="fa-solid fa-power-off"></i> Logout
          </button>
        </div>
      </div>

      {statusMessage && (
        <div class="glass-card" style={{ padding: '12px 20px', borderLeft: '4px solid var(--accent-cyan)', marginBottom: '24px', color: 'var(--accent-cyan)', fontWeight: '600' }}>
          <i class="fa-solid fa-circle-info" style={{ marginRight: '8px' }}></i> {statusMessage}
        </div>
      )}

      <div class="estimator-grid">
        {/* Navigation Tabs card */}
        <div class="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 class="estimator-subtitle" style={{ margin: '0 0 10px 0' }}>Dashboard Controls</h3>
          <button 
            type="button" 
            class={`platform-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
            style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', padding: '14px 20px', gap: '15px' }}
          >
            <i class="fa-solid fa-chart-simple"></i>
            <span>Overview & Analytics</span>
          </button>
          
          <button 
            type="button" 
            class={`platform-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
            style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', padding: '14px 20px', gap: '15px' }}
          >
            <i class="fa-solid fa-folder-plus"></i>
            <span>Manage Showcase Projects</span>
          </button>
          
          <button 
            type="button" 
            class={`platform-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
            style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', padding: '14px 20px', gap: '15px' }}
          >
            <i class="fa-solid fa-comment-medical"></i>
            <span>Moderate Testimonials</span>
          </button>
          
          <button 
            type="button" 
            class={`platform-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
            style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', padding: '14px 20px', gap: '15px' }}
          >
            <i class="fa-solid fa-shield-halved"></i>
            <span>Console Security</span>
          </button>
        </div>

        {/* Tab Contents card */}
        <div class="glass-card" style={{ padding: '30px' }}>
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'analytics' && (
            <div>
              <h3 class="estimator-subtitle">Visitor Analytics Overview</h3>
              
              <div class="about-stats" style={{ marginBottom: '40px', marginTop: '20px' }}>
                <div class="glass-card stat-card glow-cyan">
                  <span class="stat-number">{analytics.totalViews}</span>
                  <span class="stat-plus"></span>
                  <span class="stat-label">Total Site Visits</span>
                </div>
                <div class="glass-card stat-card glow-purple">
                  <span class="stat-number">{projects.length}</span>
                  <span class="stat-plus"></span>
                  <span class="stat-label">Active Portfolio Projects</span>
                </div>
                <div class="glass-card stat-card glow-cyan">
                  <span class="stat-number">{reviews.filter(r => r.approved).length}</span>
                  <span class="stat-plus"></span>
                  <span class="stat-label">Approved Testimonials</span>
                </div>
                <div class="glass-card stat-card glow-purple">
                  <span class="stat-number">{reviews.filter(r => !r.approved).length}</span>
                  <span class="stat-plus"></span>
                  <span class="stat-label">Pending Reviews</span>
                </div>
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '15px' }}>Daily Traffic History</h4>
              <div class="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Date</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Page Views / Unique Hits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(analytics.dailyViews || []).length === 0 ? (
                      <tr>
                        <td colSpan="2" style={{ padding: '18px', textAlign: 'center', color: 'var(--text-muted)' }}>No traffic recorded yet.</td>
                      </tr>
                    ) : (
                      [...(analytics.dailyViews || [])].reverse().map((dv, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '12px 18px', color: 'var(--text-secondary)' }}>{dv.date}</td>
                          <td style={{ padding: '12px 18px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{dv.count} views</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div>
              <h3 class="estimator-subtitle">Manage Portfolio Projects</h3>
              
              {/* Add Project Form */}
              <form onSubmit={handleAddProject} class="glass-card" style={{ padding: '24px', marginBottom: '40px', background: 'rgba(0,0,0,0.15)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', marginBottom: '20px' }}>Add New Startup Showcase</h4>
                
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Project Title *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Loria Trading" 
                      class="form-input" 
                      value={projTitle} 
                      onChange={e => setProjTitle(e.target.value)} 
                      required
                    />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Category *</label>
                    <select 
                      class="form-input" 
                      value={projCategory} 
                      onChange={e => setProjCategory(e.target.value)}
                    >
                      <option value="web">Web Site/Application</option>
                      <option value="mobile">Mobile Application</option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Tech Stack (dot separated) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. React • Next.js • Tailwind" 
                      class="form-input" 
                      value={projTech} 
                      onChange={e => setProjTech(e.target.value)} 
                      required
                    />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Website URL (optional)</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://loriauae.com/" 
                      class="form-input" 
                      value={projUrl} 
                      onChange={e => setProjUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">FontAwesome Icon *</label>
                    <select class="form-input" value={projIcon} onChange={e => setProjIcon(e.target.value)}>
                      <option value="fa-hotel">Hotel / Hospitality (fa-hotel)</option>
                      <option value="fa-chart-line">Analytics / Chart (fa-chart-line)</option>
                      <option value="fa-truck-fast">Logistics / Delivery (fa-truck-fast)</option>
                      <option value="fa-bag-shopping">E-Commerce / Shopping (fa-bag-shopping)</option>
                      <option value="fa-house-chimney-medical">Medical / Health (fa-house-chimney-medical)</option>
                      <option value="fa-globe">Web / Global (fa-globe)</option>
                      <option value="fa-laptop-code">Coding / Technical (fa-laptop-code)</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Background Gradient Theme *</label>
                    <select class="form-input" value={projGradient} onChange={e => setProjGradient(e.target.value)}>
                      <option value="bg-gradient-amber">Amber Gold (bg-gradient-amber)</option>
                      <option value="bg-gradient-cyan">Cyan Teal (bg-gradient-cyan)</option>
                      <option value="bg-gradient-purple">Purple Violet (bg-gradient-purple)</option>
                      <option value="bg-gradient-pink">Red Pink (bg-gradient-pink)</option>
                      <option value="bg-gradient-blue">Deep Blue (bg-gradient-blue)</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Short Description *</label>
                  <textarea 
                    rows="3" 
                    placeholder="Provide a brief summary of what you did..." 
                    class="form-input form-textarea" 
                    value={projDesc} 
                    onChange={e => setProjDesc(e.target.value)} 
                    required
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-full-width">
                  <i class="fa-solid fa-plus"></i> Save Project to Portfolio
                </button>
              </form>

              {/* Projects List */}
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '15px' }}>Current Showcase List</h4>
              <div class="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Title</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Category</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Tech Stack</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>URL</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(proj => (
                      <tr key={proj.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 18px', color: 'var(--text-primary)', fontWeight: '600' }}>{proj.title}</td>
                        <td style={{ padding: '12px 18px', color: 'var(--text-secondary)' }}>
                          <span class="badge" style={{ margin: 0, padding: '3px 10px', fontSize: '0.75rem' }}>{proj.category === 'web' ? 'Web' : 'Mobile'}</span>
                        </td>
                        <td style={{ padding: '12px 18px', color: 'var(--text-secondary)' }}>{proj.tech}</td>
                        <td style={{ padding: '12px 18px', color: 'var(--accent-cyan)' }}>
                          {proj.url ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>Link <i class="fa-solid fa-up-right-from-square" style={{ fontSize: '0.75rem' }}></i></a> : 'None'}
                        </td>
                        <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                          <button class="btn btn-secondary btn-sm" onClick={() => handleDeleteProject(proj.id)} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <i class="fa-solid fa-trash-can"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TESTIMONIALS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div>
              <h3 class="estimator-subtitle">Moderate Client Testimonials</h3>
              
              {/* Manual Add Testimonial */}
              <form onSubmit={handleAddReviewManual} class="glass-card" style={{ padding: '24px', marginBottom: '40px', background: 'rgba(0,0,0,0.15)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', marginBottom: '20px' }}>Add Review Manually</h4>
                
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Client Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sarah Jenkins" 
                      class="form-input" 
                      value={revName} 
                      onChange={e => setRevName(e.target.value)} 
                      required
                    />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Company / Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Apex FinTech CEO" 
                      class="form-input" 
                      value={revCompany} 
                      onChange={e => setRevCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Rating *</label>
                  <select 
                    class="form-input" 
                    value={revRating} 
                    onChange={e => setRevRating(parseInt(e.target.value, 10))}
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                    <option value="2">★★☆☆☆ (2 Stars)</option>
                    <option value="1">★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Client Review Comment *</label>
                  <textarea 
                    rows="3" 
                    placeholder="Enter the client testimonial text here..." 
                    class="form-input form-textarea" 
                    value={revComment} 
                    onChange={e => setRevComment(e.target.value)} 
                    required
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-full-width">
                  <i class="fa-solid fa-check"></i> Save & Approve Testimonial
                </button>
              </form>

              {/* Reviews List */}
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '15px' }}>Submitted Reviews Moderation</h4>
              <div class="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Client</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Comment</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Rating</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>Status</th>
                      <th style={{ padding: '12px 18px', color: 'var(--text-primary)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map(rev => (
                      <tr key={rev.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 18px', color: 'var(--text-primary)' }}>
                          <strong>{rev.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{rev.company}</span>
                        </td>
                        <td style={{ padding: '12px 18px', color: 'var(--text-secondary)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {rev.comment}
                        </td>
                        <td style={{ padding: '12px 18px', color: '#ffc107', fontWeight: 'bold' }}>
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <span class="badge" style={{ 
                            margin: 0, 
                            padding: '3px 10px', 
                            fontSize: '0.75rem', 
                            color: rev.approved ? 'var(--accent-cyan)' : '#f59e0b',
                            borderColor: rev.approved ? 'rgba(0, 242, 254, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                            background: rev.approved ? 'rgba(0, 242, 254, 0.05)' : 'rgba(245, 158, 11, 0.05)'
                          }}>
                            {rev.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 18px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end', borderBottom: 'none' }}>
                          <button class="btn btn-secondary btn-sm" onClick={() => handleToggleApprove(rev.id)}>
                            {rev.approved ? 'Reject' : 'Approve'}
                          </button>
                          <button class="btn btn-secondary btn-sm" onClick={() => handleDeleteReview(rev.id)} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CONSOLE SECURITY */}
          {activeTab === 'security' && (
            <div>
              <h3 class="estimator-subtitle">Console Security Settings</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '30px' }}>
                Change the username and password required to access this administrative console. Credentials will be securely saved directly in the database.
              </p>
              
              <form onSubmit={handleUpdateCredentials} class="glass-card" style={{ padding: '24px', background: 'rgba(0,0,0,0.15)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', marginBottom: '20px' }}>Update Admin Credentials</h4>
                
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">New Username *</label>
                    <input 
                      type="text" 
                      placeholder="Enter new username" 
                      class="form-input" 
                      value={newUsername} 
                      onChange={e => setNewUsername(e.target.value)} 
                      required
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">New Password *</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••" 
                      class="form-input" 
                      value={newPassword} 
                      onChange={e => setNewPassword(e.target.value)} 
                      required
                    />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Confirm New Password *</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••" 
                      class="form-input" 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)} 
                      required
                    />
                  </div>
                </div>

                <button type="submit" class="btn btn-primary btn-full-width">
                  <i class="fa-solid fa-save"></i> Save Security Credentials
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
