import React, { useState, useEffect } from 'react';
import { getProjects } from '../api';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      console.error('Error fetching portfolio projects:', e);
    }
  };

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
                    <a 
                      href={project.url || "#contact"} 
                      target={project.url ? "_blank" : "_self"} 
                      rel={project.url ? "noopener noreferrer" : ""} 
                      class="btn btn-secondary btn-sm"
                    >
                      {project.url ? "Visit Website" : "Explore Project"}
                    </a>
                  </div>
                </div>
                {project.image ? (
                  <img src={project.image} alt={project.title} class="project-actual-image" />
                ) : (
                  <div class={`project-placeholder ${project.gradient}`}>
                    <i class={`fa-solid ${project.icon} placeholder-icon`}></i>
                  </div>
                )}
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
