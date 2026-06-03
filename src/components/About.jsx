import React, { useState, useEffect, useRef } from 'react';

const StatCard = ({ target, suffix, label, glowClass }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    let observer;
    let timer;
    
    if (cardRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const steps = 30;
          const stepTime = 40; // 40ms per step = 1.2s total
          const increment = Math.ceil(target / steps);

          timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);

          observer.disconnect();
        }
      }, { threshold: 0.1 });

      observer.observe(cardRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [target]);

  return (
    <div ref={cardRef} class={`glass-card stat-card ${glowClass} scroll-anim scroll-anim-scale-in active`}>
      <span class="stat-number">{count}</span>
      <span class="stat-plus">{suffix}</span>
      <span class="stat-label">{label}</span>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" class="about-section section-padding">
      <div class="container about-grid">
        <div class="about-content scroll-anim scroll-anim-fade-up active">
          <span class="section-tag">Who We Are</span>
          <h2 class="section-title">We engineer the future, <span class="gradient-text">pixel by pixel</span></h2>
          <p class="about-para">Nextlix is an agile software engineering boutique. We collaborate with bold visionaries to design and code products that command attention and drive growth.</p>
          <p class="about-para">We refuse standard layouts, boring animations, and heavy setups. Every project we launch runs fast, responds fluidly, and utilizes clean layouts optimized for all browser standards.</p>
          
          <div class="values-list">
            <div class="value-item">
              <div class="value-badge"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
              <div class="value-details">
                <h4>Premium Aesthetics</h4>
                <p>We blend color gradients, glass surfaces, and micro-interactions for a WOW-inducing layout.</p>
              </div>
            </div>
            
            <div class="value-item">
              <div class="value-badge"><i class="fa-solid fa-gauge-high"></i></div>
              <div class="value-details">
                <h4>Blazing Performance</h4>
                <p>99+ Google Lighthouse optimization, clean asset compression, and clean JS logic.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-stats">
          <StatCard target={50} suffix="+" label="Projects Completed" glowClass="glow-cyan" />
          <StatCard target={98} suffix="%" label="Client Satisfaction" glowClass="glow-purple" />
          <StatCard target={15} suffix="+" label="Tech Architects" glowClass="glow-cyan" />
          <StatCard target={4} suffix="M+" label="Lines of Code" glowClass="glow-purple" />
        </div>
      </div>
    </section>
  );
};

export default About;
