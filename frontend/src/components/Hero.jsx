import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [arrayIndex, setArrayIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const textArray = [
    "Google #1 ranking web apps with AVNM architecture.",
    "website development startup platforms built for speed.",
    "native mobile apps with sub-second performance.",
    "100/100 Core Web Vitals software for fast scaling."
  ];

  useEffect(() => {
    let timer;
    const currentString = textArray[arrayIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentString.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentString.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 75);
    }

    if (!isDeleting && charIndex === currentString.length) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setArrayIndex(prev => (prev + 1) % textArray.length);
      timer = setTimeout(() => {}, 500);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, arrayIndex]);

  return (
    <section id="home" class="hero-section">
      <div class="container hero-container">
        <div class="hero-content scroll-anim scroll-anim-fade-up active">
          <span class="badge badge-accent">
            <i class="fa-solid fa-trophy"></i> AVNM Website Development Startup
          </span>
          <h1 class="hero-title">
            Engineered For <span class="gradient-text">Google #1 Ranking</span> & Scale
          </h1>
          <p class="hero-subtitle">
            We build high-performance {typedText}
            <span class="typed-cursor">|</span>
          </p>
          <div class="hero-actions">
            <a href="#seo-audit" class="btn btn-primary">
              Run Rank #1 Audit <i class="fa-solid fa-chart-line"></i>
            </a>
            <a href="#estimator" class="btn btn-secondary">
              Estimate Project <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
        
        {/* Hero Interactive Graphic */}
        <div class="hero-visual scroll-anim scroll-anim-scale-in active">
          <div class="floating-card-wrapper">
            <div class="glass-card visual-card main-visual-card">
              <img src="/assets/nextlix-logo-chevron.jpg" alt="Nextlix Logo Symbol" class="floating-logo" />
              <div class="visual-card-bg-glow"></div>
            </div>
            
            <div class="glass-card floating-subcard subcard-1">
              <div class="subcard-icon"><i class="fa-brands fa-google"></i></div>
              <div class="subcard-info">
                <span class="subcard-title">Google #1 Rank</span>
                <span class="subcard-desc">Schema & SEO</span>
              </div>
            </div>
            
            <div class="glass-card floating-subcard subcard-2">
              <div class="subcard-icon"><i class="fa-solid fa-microchip"></i></div>
              <div class="subcard-info">
                <span class="subcard-title">AVNM Engine</span>
                <span class="subcard-desc">React & Next.js</span>
              </div>
            </div>
            
            <div class="glass-card floating-subcard subcard-3">
              <div class="subcard-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
              <div class="subcard-info">
                <span class="subcard-title">100/100 Speed</span>
                <span class="subcard-desc">Core Web Vitals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
