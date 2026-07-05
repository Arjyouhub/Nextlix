import React, { useState, useEffect } from 'react';
import CanvasParticles from './components/CanvasParticles';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Estimator from './components/Estimator';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { trackPageView } from './api';

function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(() => window.location.pathname === '/admin');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => sessionStorage.getItem('isAdminAuthenticated') === 'true');

  // Page tracking and navigation
  useEffect(() => {
    trackPageView().catch(e => console.warn('Analytics error:', e));

    const handlePopState = () => {
      setIsAdminView(window.location.pathname === '/admin');
      setIsAdminAuthenticated(sessionStorage.getItem('isAdminAuthenticated') === 'true');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setIsAdminView(path === '/admin');
    setIsAdminAuthenticated(sessionStorage.getItem('isAdminAuthenticated') === 'true');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAdminAuthenticated(false);
    navigateTo('/');
  };

  // Estimator data hook states
  const [estimateSummary, setEstimateSummary] = useState('');
  const [projectCategory, setProjectCategory] = useState('');

  // Modal Dialog states
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Cursor coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Theme synchronization
  useEffect(() => {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Cursor mousemove tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cursor Lerp Trail loop
  useEffect(() => {
    let animationFrameId;
    
    const updateCursorPositions = () => {
      setDotPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.25,
        y: prev.y + (mousePos.y - prev.y) * 0.25
      }));

      setGlowPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.12,
        y: prev.y + (mousePos.y - prev.y) * 0.12
      }));

      animationFrameId = requestAnimationFrame(updateCursorPositions);
    };

    updateCursorPositions();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Set up hover highlight hooks for custom cursor on interactive nodes
  useEffect(() => {
    const handleMouseEnter = () => setCursorHovered(true);
    const handleMouseLeave = () => setCursorHovered(false);

    // Run this whenever the DOM renders/updates
    const interactives = document.querySelectorAll(
      'a, button, select, input, textarea, .platform-btn, .design-btn, .checkbox-container, .currency-btn'
    );
    
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [showModal, estimateSummary, isAdminView, isAdminAuthenticated]);

  // Event callbacks: estimator passes variables to contact form
  const handleApplyEstimate = (summary, category) => {
    setEstimateSummary(summary);
    setProjectCategory(category);

    // Scroll to contact form smoothly
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Auto-focus name field
      const nameInput = document.getElementById('formName');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 800);
      }
    }
  };

  // Form submit callback triggers modal recap details
  const handleFormSubmitSuccess = (formData) => {
    setModalData(formData);
    setShowModal(true);
  };

  return (
    <>
      {/* Custom Glowing Cursor */}
      {!isAdminView && (
        <>
          <div 
            id="customCursor" 
            class="custom-cursor" 
            style={{ left: `${dotPos.x}px`, top: `${dotPos.y}px` }}
          ></div>
          <div 
            id="customCursorGlow" 
            class="custom-cursor-glow" 
            style={{ left: `${glowPos.x}px`, top: `${glowPos.y}px` }}
          ></div>
        </>
      )}

      {/* Particle Canvas background */}
      <CanvasParticles theme={theme} />

      {isAdminView ? (
        isAdminAuthenticated ? (
          <AdminPanel onClose={() => navigateTo('/')} onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} onBackToHome={() => navigateTo('/')} />
        )
      ) : (
        <>
          {/* Navigation Header */}
          <Header 
            theme={theme} 
            setTheme={setTheme} 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          <main onClick={() => setMobileMenuOpen(false)}>
            {/* Sections composition */}
            <Hero />
            <Services />
            <Estimator onApplyEstimate={handleApplyEstimate} />
            <Portfolio />
            <Testimonials />
            <About />
            <Contact 
              estimateSummary={estimateSummary}
              projectCategory={projectCategory}
              onClearEstimate={() => setEstimateSummary('')}
              onSubmitSuccess={handleFormSubmitSuccess}
            />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Success Modal PopupRecap */}
      <div class={`success-modal-overlay ${showModal ? 'active' : ''}`} id="successModal">
        <div class="glass-card success-modal-content">
          <div class="success-icon-badge">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for initiating contact with Nextlix. One of our lead technical architects will review your project parameters and respond within 12 business hours.</p>
          
          {modalData && (
            <div id="modalSummaryDetails" class="modal-summary-details">
              <strong>Sender:</strong> {modalData.name} ({modalData.email})<br />
              <strong>Category:</strong> {
                modalData.projectType === 'web' ? 'Web Application Development' :
                modalData.projectType === 'mobile' ? 'Mobile Application Development' :
                modalData.projectType === 'both' ? 'Both Platforms (Web & Mobile)' :
                'UI/UX Redesign / Consulting'
              }<br />
              {modalData.estimate && (
                <>
                  <strong>Selected Parameters:</strong><br />
                  {modalData.estimate}
                </>
              )}
            </div>
          )}
          
          <button class="btn btn-primary" id="btnModalClose" onClick={() => setShowModal(false)}>Done</button>
        </div>
      </div>
    </>
  );
}

export default App;
