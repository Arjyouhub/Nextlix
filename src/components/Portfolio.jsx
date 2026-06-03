import React, { useState } from 'react';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Apex FinTech Dashboard',
      category: 'web',
      tech: 'React • Next.js • Tailwind',
      desc: 'High-performance trading dashboard boasting real-time SVG charting and serverless transaction API pipes.',
      icon: 'fa-chart-line',
      gradient: 'bg-gradient-cyan'
    },
    {
      id: 2,
      title: 'Novus Delivery & GPS',
      category: 'mobile',
      tech: 'React Native • Node.js • Maps',
      desc: 'Cross-platform logistics and courier tracking client with background tracking and geofencing.',
      icon: 'fa-truck-fast',
      gradient: 'bg-gradient-purple'
    },
    {
      id: 3,
      title: 'Volt E-Commerce & 3D',
      category: 'web',
      tech: 'SvelteKit • Node.js • WebGL',
      desc: 'Next-gen apparel boutique featuring custom 3D model customizers and localized currency workflows.',
      icon: 'fa-bag-shopping',
      gradient: 'bg-gradient-pink'
    },
    {
      id: 4,
      title: 'Zenith Telehealth Client',
      category: 'mobile',
      tech: 'React Native • Firebase • WebRTC',
      desc: 'HIPAA-compliant telemedicine app allowing secure peer-to-peer audio-video consultation rooms.',
      icon: 'fa-house-chimney-medical',
      gradient: 'bg-gradient-blue'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" class="portfolio-section section-padding">
      <div class="container">
        <div class="section-header scroll-anim scroll-anim-fade-up active">
          <span class="section-tag">Case Studies</span>
          <h2 class="section-title">Crafting digital <span class="gradient-text">Masterpieces</span></h2>
          <p class="section-description">A curated selection of modern platforms, dynamic interfaces, and mobile architectures developed for startups and enterprises.</p>
        </div>
        
        {/* Filter Tabs */}
        <div class="portfolio-tabs scroll-anim scroll-anim-fade-up active">
          <button 
            class={`tab-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            class={`tab-btn ${filter === 'web' ? 'active' : ''}`} 
            onClick={() => setFilter('web')}
          >
            Web Sites/Apps
          </button>
          <button 
            class={`tab-btn ${filter === 'mobile' ? 'active' : ''}`} 
            onClick={() => setFilter('mobile')}
          >
            Mobile Apps
          </button>
        </div>
        
        {/* Portfolio Projects Grid */}
        <div class="portfolio-grid">
          {filteredProjects.map(project => (
            <div key={project.id} class="glass-card project-card scroll-anim scroll-anim-fade-up active">
              <div class="project-image-wrapper">
                <div class="project-overlay">
                  <div class="project-overlay-content">
                    <span class="project-tech">{project.tech}</span>
                    <h4 class="project-card-title">{project.title}</h4>
                    <p class="project-card-desc">{project.desc}</p>
                    <a href="#contact" class="btn btn-secondary btn-sm">Explore Project</a>
                  </div>
                </div>
                <div class={`project-placeholder ${project.gradient}`}>
                  <i class={`fa-solid ${project.icon} placeholder-icon`}></i>
                </div>
              </div>
              <div class="project-info">
                <h3 class="project-title">{project.title}</h3>
                <span class="project-category">{project.category === 'web' ? 'Web Platform' : 'Mobile Application'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
