import React from 'react';

const Services = () => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (centerY - y) / 10;
    const tiltY = (x - centerX) / 10;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="services" class="services-section section-padding">
      <div class="container">
        <div class="section-header scroll-anim scroll-anim-fade-up active">
          <span class="section-tag">What We Do</span>
          <h2 class="section-title">Our Technical <span class="gradient-text">Superpowers</span></h2>
          <p class="section-description">We merge state-of-the-art architectures with pixel-perfect designs to build solutions that scale with your business growth.</p>
        </div>
        
        <div class="services-grid">
          {/* Web Dev */}
          <div 
            class="glass-card service-card scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-icon">
              <i class="fa-solid fa-laptop-code"></i>
            </div>
            <h3 class="service-title">Web Development</h3>
            <p class="service-text">Fast, responsive, and SEO-optimized sites. Utilizing modern stacks like React, Next.js, Node.js, and static site generators for maximum throughput.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> Custom Web Apps</li>
              <li><i class="fa-regular fa-circle-check"></i> E-commerce Solutions</li>
              <li><i class="fa-regular fa-circle-check"></i> CMS Implementations</li>
            </ul>
          </div>
          
          {/* Mobile Dev */}
          <div 
            class="glass-card service-card scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-icon">
              <i class="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h3 class="service-title">Mobile App Dev</h3>
            <p class="service-text">Fully native Android apps engineered exclusively using React Native. Seamless cross-platform experiences with zero lag.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> Google Play Deployment</li>
              <li><i class="fa-regular fa-circle-check"></i> Real-time Push & GPS</li>
              <li><i class="fa-regular fa-circle-check"></i> Offline Support</li>
            </ul>
          </div>
          
          {/* UI/UX Architecture */}
          <div 
            class="glass-card service-card scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-icon">
              <i class="fa-solid fa-compass-drafting"></i>
            </div>
            <h3 class="service-title">UI/UX Architecture</h3>
            <p class="service-text">User journeys designed with meticulous detail. We focus on converting traffic into active customers using modern typography, sleek spacing, and micro-interactions.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> High-Fidelity Prototypes</li>
              <li><i class="fa-regular fa-circle-check"></i> Interactive Wireframes</li>
              <li><i class="fa-regular fa-circle-check"></i> Brand Identity Systems</li>
            </ul>
          </div>
          
          {/* Cloud & Scaling */}
          <div 
            class="glass-card service-card scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-icon">
              <i class="fa-solid fa-server"></i>
            </div>
            <h3 class="service-title">Cloud & Scale</h3>
            <p class="service-text">Deploy robust cloud setups with serverless technology, containerized deployments, automated pipelines, and premium database schemas.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> AWS & Vercel Hosting</li>
              <li><i class="fa-regular fa-circle-check"></i> DevSecOps Pipelines</li>
              <li><i class="fa-regular fa-circle-check"></i> Multi-zone Databases</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
