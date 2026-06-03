import React from 'react';
import LogoText from './LogoText';

const Header = ({ theme, setTheme, mobileMenuOpen, setMobileMenuOpen }) => {
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <header id="siteHeader">
      <div class="container navbar">
        <a href="#home" class="logo-container" id="navLogoLink">
          <LogoText />
        </a>
        
        <nav class={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} id="navMenu">
          <ul>
            <li><a href="#home" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#services" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
            <li><a href="#estimator" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Estimator</a></li>
            <li><a href="#portfolio" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Portfolio</a></li>
            <li><a href="#about" class="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#contact" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        <div class="nav-actions">
          {/* Theme Toggle Button */}
          <button id="themeToggleBtn" aria-label="Toggle Theme" class="btn-icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <i class="fa-solid fa-sun sun-icon" style={{display: 'block'}}></i>
            ) : (
              <i class="fa-solid fa-moon moon-icon" style={{display: 'block'}}></i>
            )}
          </button>
          
          {/* Call to Action */}
          <a href="#estimator" class="btn btn-primary btn-nav-cta">Build Your App</a>
          
          {/* Mobile Menu Toggle */}
          <button 
            id="mobileMenuToggle" 
            aria-label="Toggle Mobile Menu" 
            class={`btn-icon mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen ? (
              <i class="fa-solid fa-xmark menu-close" style={{display: 'block'}}></i>
            ) : (
              <i class="fa-solid fa-bars-staggered menu-bars"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
