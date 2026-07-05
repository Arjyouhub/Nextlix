import React, { useState } from 'react';
import LogoText from './LogoText';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setMessage('Subscribed successfully! Thank you.');
      setEmail('');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div className="footer-logo-container" style={{ marginBottom: '20px', display: 'inline-block' }}>
            <LogoText />
          </div>
          <p class="footer-slogan">Crafting next-generation web platforms, native mobile applications, and high-performance digital ecosystems.</p>
          <div class="social-links">
            <a href="#" class="social-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" class="social-btn" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.instagram.com/next.lix?igsh=MTk3Zjh1NDBxZm1rbw==" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="social-btn" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          </div>
        </div>
        
        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services Operations</a></li>
            <li><a href="#estimator">Cost Estimator</a></li>
            <li><a href="#portfolio">Featured Case Studies</a></li>
            <li><a href="#about">Company About</a></li>
            <li><a href="#contact">Contact Support</a></li>
          </ul>
        </div>
        
        <div class="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to our periodic digests on digital tech trends and project releases.</p>
          <form class="newsletter-form" id="newsletterForm" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="email@domain.com" 
              required 
              class="newsletter-input" 
              id="newsletterEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" class="newsletter-btn" aria-label="Subscribe"><i class="fa-solid fa-arrow-right-to-bracket"></i></button>
          </form>
          {message && <span class="newsletter-msg success">{message}</span>}
        </div>
      </div>
      
      <div class="container footer-bottom">
        <p>&copy; 2026 Nextlix. All rights reserved. Built with precision and animations.</p>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
