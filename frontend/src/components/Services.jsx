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
          {/* Website Development Startup (AVNM Engine) */}
          <div 
            class="glass-card service-card scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-icon">
              <i class="fa-solid fa-laptop-code"></i>
            </div>
            <h3 class="service-title">Website Development Startup</h3>
            <p class="service-text">Full-stack web apps powered by AVNM architecture. Built with React, Next.js, Node.js, and ultra-scalable edge backends for rapid startup growth.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> High-Speed Web Applications</li>
              <li><i class="fa-regular fa-circle-check"></i> Custom AVNM Design System</li>
              <li><i class="fa-regular fa-circle-check"></i> Scalable API Integration</li>
            </ul>
          </div>

          {/* Google #1 SEO & SERP Dominance */}
          <div 
            class="glass-card service-card service-card-highlight scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-badge-glow">Rank #1</div>
            <div class="service-icon">
              <i class="fa-brands fa-google"></i>
            </div>
            <h3 class="service-title">Google #1 SEO Dominance</h3>
            <p class="service-text">Technical SEO engineering to dominate Google SERP #1. We implement JSON-LD Schema markup, sub-second LCP speed, and programmatic keywords.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> 100/100 Core Web Vitals</li>
              <li><i class="fa-regular fa-circle-check"></i> Rich JSON-LD Schema Markup</li>
              <li><i class="fa-regular fa-circle-check"></i> Google SERP Snippet Optimization</li>
            </ul>
          </div>
          
          {/* Mobile App Dev */}
          <div 
            class="glass-card service-card scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-icon">
              <i class="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h3 class="service-title">Mobile App Engineering</h3>
            <p class="service-text">Native mobile apps engineered with React Native. Smooth 60fps cross-platform experiences with offline sync and push notifications.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> Google Play & App Store Ready</li>
              <li><i class="fa-regular fa-circle-check"></i> Real-time Push & Location</li>
              <li><i class="fa-regular fa-circle-check"></i> Sub-Second Native Launch</li>
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
            <p class="service-text">User journeys designed with glassmorphic brilliance. We focus on converting traffic into paying clients with modern typography and fluid interactions.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> High-Fidelity Prototypes</li>
              <li><i class="fa-regular fa-circle-check"></i> High Conversion Funnels</li>
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
            <h3 class="service-title">Cloud & Scale Infrastructure</h3>
            <p class="service-text">Deploy robust cloud setups with serverless technologies, global CDNs, automated CI/CD pipelines, and multi-region database replication.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> AWS, Vercel & Cloudflare Edge</li>
              <li><i class="fa-regular fa-circle-check"></i> Automated CI/CD Pipelines</li>
              <li><i class="fa-regular fa-circle-check"></i> High Availability & SSL</li>
            </ul>
          </div>

          {/* Programmatic SEO & Content Engines */}
          <div 
            class="glass-card service-card scroll-anim scroll-anim-fade-up active"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div class="service-icon">
              <i class="fa-solid fa-chart-pie"></i>
            </div>
            <h3 class="service-title">Programmatic SEO Engines</h3>
            <p class="service-text">Dynamic keyword generation and automated sitemap indexing designed to capture thousands of organic Google search visitors monthly.</p>
            <ul class="service-bullets">
              <li><i class="fa-regular fa-circle-check"></i> Automated XML Sitemap</li>
              <li><i class="fa-regular fa-circle-check"></i> Dynamic OpenGraph Badges</li>
              <li><i class="fa-regular fa-circle-check"></i> Automated Indexing API</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
