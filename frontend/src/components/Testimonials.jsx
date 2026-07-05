import React, { useState, useEffect } from 'react';
import { getReviews, addReview } from '../api';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      // Only display approved reviews
      setReviews(data.filter(r => r.approved));
    } catch (e) {
      console.error('Error fetching reviews:', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) {
      alert('Please fill out all required fields');
      return;
    }

    setSubmitting(true);
    const payload = {
      name,
      company: company || 'Visitor Client',
      rating,
      comment
    };

    try {
      await addReview(payload);
      setSuccessMsg('Thank you! Your testimonial has been submitted successfully.');
      setName('');
      setCompany('');
      setRating(5);
      setComment('');
      
      // Refresh list after brief delay
      setTimeout(() => {
        setSuccessMsg('');
        setShowForm(false);
        fetchReviews();
      }, 3000);
    } catch (err) {
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" class="testimonials-section section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div class="container">
        <div class="section-header scroll-anim scroll-anim-fade-up active">
          <span class="section-tag">Client Feedback</span>
          <h2 class="section-title">What Our Clients <span class="gradient-text">Say About Us</span></h2>
          <p class="section-description">We take pride in delivering clean architectures, animations, and bespoke web platforms for startups and corporations globally.</p>
        </div>

        {/* Reviews Grid */}
        <div class="services-grid" style={{ marginBottom: '50px' }}>
          {reviews.length === 0 ? (
            <div class="glass-card" style={{ padding: '40px', width: '100%', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No testimonials yet. Be the first to write a review below!</p>
            </div>
          ) : (
            reviews.map(rev => (
              <div key={rev.id} class="glass-card service-card scroll-anim scroll-anim-fade-up active" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '15px' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>{rev.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{rev.company}</span>
                  </div>
                  <div style={{ color: '#ffc107', fontSize: '0.9rem' }}>
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineSpacing: '1.5', fontStyle: 'italic', flexGrow: 1, margin: 0 }}>
                  "{rev.comment}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <i class="fa-regular fa-calendar-check"></i>
                  <span>Verified Client on {rev.date}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Toggle Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          {!showForm ? (
            <button class="btn btn-primary" onClick={() => setShowForm(true)}>
              Write a Client Review <i class="fa-solid fa-pen-nib"></i>
            </button>
          ) : (
            <button class="btn btn-secondary" onClick={() => setShowForm(false)}>
              Close Form
            </button>
          )}
        </div>

        {/* Expandable Review Form */}
        {showForm && (
          <div class="glass-card scroll-anim scroll-anim-fade-up active" style={{ maxWidth: '650px', margin: '0 auto', padding: '40px' }}>
            <h3 class="estimator-subtitle" style={{ marginTop: 0 }}>Submit Your Startup Experience</h3>
            
            {successMsg ? (
              <div style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: 'rgba(0, 242, 254, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px dashed var(--accent-cyan)' }}>
                <i class="fa-solid fa-circle-check" style={{ fontSize: '1.2rem' }}></i>
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      class="form-input" 
                      required 
                      value={name} 
                      onChange={e => setName(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Company & Designation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. CEO at Startup" 
                      class="form-input" 
                      value={company} 
                      onChange={e => setCompany(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Stars Selector */}
                <div class="form-group" style={{ marginBottom: '24px' }}>
                  <label class="form-label">Client Rating *</label>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '1.8rem', cursor: 'pointer' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star} 
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{ color: (hoverRating || rating) >= star ? '#ffc107' : 'var(--text-muted)', transition: 'color 0.15s ease' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Click to select {rating} stars rating
                  </span>
                </div>

                <div class="form-group">
                  <label class="form-label">Review Description *</label>
                  <textarea 
                    rows="4" 
                    placeholder="Describe your design, development, and engineering experience with Nextlix..." 
                    class="form-input form-textarea" 
                    required 
                    value={comment} 
                    onChange={e => setComment(e.target.value)}
                    disabled={submitting}
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-submit" disabled={submitting}>
                  {submitting ? 'Submitting Review...' : 'Post Verified Testimonial'} <i class="fa-solid fa-paper-plane" style={{ marginLeft: '8px' }}></i>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
