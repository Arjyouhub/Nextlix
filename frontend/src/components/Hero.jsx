import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [arrayIndex, setArrayIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const textArray = [
    "web experiences that scale perfectly.",
    "native mobile apps with absolute speed.",
    "cutting-edge designs that hook attention.",
    "reliable cloud solutions configured to expand."
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
          <span class="badge">Building What's Next</span>
          <h1 class="hero-title">
            Transforming Ideas Into <span class="gradient-text">Stunning Reality</span>
          </h1>
          <p class="hero-subtitle">
            We engineer high-performance {typedText}
            <span class="typed-cursor">|</span>
          </p>
          <div class="hero-actions">
            <a href="#estimator" class="btn btn-primary">
              Estimate Project <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#portfolio" class="btn btn-secondary">
              View Showcase
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
              <div class="subcard-icon"><i class="fa-solid fa-code"></i></div>
              <div class="subcard-info">
                <span class="subcard-title">Clean Code</span>
                <span class="subcard-desc">React & Next.js</span>
              </div>
            </div>
            
            <div class="glass-card floating-subcard subcard-2">
              <div class="subcard-icon"><i class="fa-solid fa-mobile-screen-button"></i></div>
              <div class="subcard-info">
                <span class="subcard-title">Android</span>
                <span class="subcard-desc">Native Speed</span>
              </div>
            </div>
            
            <div class="glass-card floating-subcard subcard-3">
              <div class="subcard-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
              <div class="subcard-info">
                <span class="subcard-title">99+ Perf Score</span>
                <span class="subcard-desc">Optimized UX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
