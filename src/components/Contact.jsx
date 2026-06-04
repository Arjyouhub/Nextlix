import React, { useState, useEffect } from 'react';

const Contact = ({ estimateSummary, projectCategory, onClearEstimate, onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [projectType, setProjectType] = useState('web');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Align projectCategory selection from Estimator
  useEffect(() => {
    if (projectCategory) {
      setProjectType(projectCategory);
    }
  }, [projectCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch("https://formsubmit.co/ajax/dev.nextlix@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          category: projectType,
          project_estimate: estimateSummary || 'None',
          message,
          _captcha: "false"
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true)) {
        // Trigger the success modal in App.jsx
        if (onSubmitSuccess) {
          onSubmitSuccess({
            name,
            email,
            projectType,
            estimate: estimateSummary
          });
        }
        // Clear fields
        setName('');
        setEmail('');
        setMessage('');
        if (onClearEstimate) {
          onClearEstimate();
        }
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError('Failed to connect to the server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" class="contact-section section-padding">
      <div class="container">
        <div class="section-header scroll-anim scroll-anim-fade-up active">
          <span class="section-tag">Let's Connect</span>
          <h2 class="section-title">Initiate Your <span class="gradient-text">Digital Legacy</span></h2>
          <p class="section-description">Fill out our form below to send an inquiry directly to our inbox. If you used the estimator above, your project estimate details will automatically attach!</p>
        </div>
        
        <div class="contact-grid">
          {/* Contact Info Cards */}
          <div class="contact-info-panel scroll-anim scroll-anim-fade-up active">
            <div class="glass-card contact-info-card">
              <div class="info-icon"><i class="fa-solid fa-envelope"></i></div>
              <div class="info-text">
                <span class="info-label">Write to us</span>
                <a href="mailto:dev.nextlix@gmail.com" class="info-link">dev.nextlix@gmail.com</a>
              </div>
            </div>
            
            <div class="glass-card contact-info-card">
              <div class="info-icon"><i class="fa-solid fa-phone-volume"></i></div>
              <div class="info-text">
  <span class="info-label">Call our team</span>
  <a href="tel:+918921382414" class="info-link">+91 89213 82414</a>
</div>
            </div>
            
            <div class="glass-card contact-info-card">
              <div class="info-icon" style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}>
                <i class="fa-brands fa-whatsapp"></i>
              </div>
              <div class="info-text">
                <span class="info-label">WhatsApp Chat</span>
                <a href="https://wa.me/918921382414" target="_blank" rel="noopener noreferrer" class="info-link">Chat with dev team</a>
              </div>
            </div>
            
            <div class="logo-display-wrapper">
              <img src="/assets/nextlix-logo-chevron.jpg" alt="Chevron Logo mark" class="contact-chevron-logo" />
            </div>
          </div>
          
          {/* Contact Form Card using FormSubmit.co AJAX */}
          <div class="glass-card contact-form-card scroll-anim scroll-anim-fade-up active">
            <form onSubmit={handleSubmit}>
              <div class="form-row">
                <div class="form-group">
                  <label for="formName" class="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    id="formName" 
                    name="name"
                    required 
                    placeholder="John Doe" 
                    class="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div class="form-group">
                  <label for="formEmail" class="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    id="formEmail" 
                    name="email"
                    required 
                    placeholder="john@example.com" 
                    class="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="formProject" class="form-label">Project Category</label>
                <select 
                  id="formProject" 
                  name="category"
                  class="form-input"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="web">Web Application Development</option>
                  <option value="mobile">Mobile Application Development</option>
                  <option value="both">Both Platforms (Web & Mobile)</option>
                  <option value="uiux">UI/UX Redesign / Consulting</option>
                </select>
              </div>
              
              {estimateSummary && (
                <div class="form-group" id="estimateFields">
                  <label class="form-label">Attached Estimate Details</label>
                  <div class="estimate-pill">
                    <span id="estimateSummaryText">{estimateSummary}</span>
                    <button 
                      type="button" 
                      class="btn-clear-estimate" 
                      id="btnClearEstimate" 
                      title="Clear Estimate"
                      onClick={onClearEstimate}
                      disabled={isSubmitting}
                    >
                      <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>
                </div>
              )}
              
              <div class="form-group">
                <label for="formMessage" class="form-label">Project Details & Goals *</label>
                <textarea 
                  id="formMessage" 
                  name="message"
                  required
                  rows="5" 
                  placeholder="Describe the application scope, timeline requirements, and target users..." 
                  class="form-input form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              {submitError && (
                <div style={{ color: '#ef4444', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <span>{submitError}</span>
                </div>
              )}

              <button 
                type="submit" 
                class="btn btn-primary btn-submit" 
                id="btnSubmitForm" 
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? (
                  <>Sending... <i class="fa-solid fa-spinner fa-spin" style={{ marginLeft: '8px' }}></i></>
                ) : (
                  <>Send Project Request <i class="fa-solid fa-paper-plane" style={{ marginLeft: '8px' }}></i></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
