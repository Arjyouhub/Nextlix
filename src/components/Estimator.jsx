import React, { useState, useEffect } from 'react';

const Estimator = ({ onApplyEstimate }) => {
  // Input states
  const [platform, setPlatform] = useState('web');
  const [screenCount, setScreenCount] = useState(5);
  const [designLevel, setDesignLevel] = useState('standard');
  const [selectedFeatures, setSelectedFeatures] = useState(['db']); // DB checked by default
  const [currency, setCurrency] = useState('INR'); // INR default

  // Display states
  const [price, setPrice] = useState(0);
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(0);
  const [timeline, setTimeline] = useState(3);

  // Currency configuration
  const currencyConfigs = {
    INR: { symbol: '₹', rate: 1.0, label: 'INR (₹)' },
    USD: { symbol: '$', rate: 1 / 83, label: 'USD ($)' },
    EUR: { symbol: '€', rate: 1 / 90, label: 'EUR (€)' },
    GBP: { symbol: '£', rate: 1 / 105, label: 'GBP (£)' }
  };

  // Base pricing configurations (in INR)
  const baseRates = {
    platform: {
      web: 10000,
      mobile: 15000,
      both: 25000
    },
    screen: 1000,
    features: {
      auth: 2000,
      db: 2000,
      payments: 3000,
      chat: 4000,
      dashboard: 5000,
      geo: 2500
    },
    design: {
      standard: 1.0,
      premium: 1.25,
      expert: 1.5
    }
  };

  // Calculate timelines configurations
  const baseTimeWeeks = {
    web: 2.0,
    mobile: 3.0,
    both: 4.5
  };

  const calculateEstimate = () => {
    // 1. Calculate Base Platform Price
    let priceSum = baseRates.platform[platform];
    let timeSum = baseTimeWeeks[platform];

    // 2. Calculate Screens Price
    priceSum += screenCount * baseRates.screen;
    timeSum += screenCount * 0.15; // 0.15 weeks per screen

    // 3. Features Prices
    selectedFeatures.forEach(feat => {
      priceSum += baseRates.features[feat] || 0;
      
      switch (feat) {
        case 'auth': timeSum += 0.5; break;
        case 'db': timeSum += 0.6; break;
        case 'payments': timeSum += 0.5; break;
        case 'chat': timeSum += 1.0; break;
        case 'dashboard': timeSum += 0.8; break;
        case 'geo': timeSum += 0.4; break;
      }
    });

    // 4. Incorporate Design Level
    const designMod = baseRates.design[designLevel];
    const finalPriceInr = Math.round(priceSum * designMod);
    const finalTimeWeeks = Math.round(timeSum * (designLevel === 'expert' ? 1.25 : 1.0));

    // Convert currencies
    const currConfig = currencyConfigs[currency];
    const convertedPrice = Math.round(finalPriceInr * currConfig.rate);
    const convertedLow = Math.round(convertedPrice * 0.9);
    const convertedHigh = Math.round(convertedPrice * 1.1);

    setPrice(convertedPrice);
    setPriceLow(convertedLow);
    setPriceHigh(convertedHigh);
    setTimeline(finalTimeWeeks);
  };

  // Calculate pricing whenever values change
  useEffect(() => {
    calculateEstimate();
  }, [platform, screenCount, designLevel, selectedFeatures, currency]);

  // Handle Feature Checkbox Change
  const handleFeatureToggle = (feat) => {
    setSelectedFeatures(prev => {
      if (prev.includes(feat)) {
        return prev.filter(f => f !== feat);
      } else {
        return [...prev, feat];
      }
    });
  };

  // Apply Estimate to Contact Form action
  const handleApply = () => {
    const symbol = currencyConfigs[currency].symbol;
    const formattedPrice = price.toLocaleString('en-US');
    const projectCategoryStr = platform === 'both' ? 'both' : (platform === 'mobile' ? 'mobile' : 'web');
    
    // Design Labels
    let designLabel = 'Clean & Functional';
    if (designLevel === 'premium') designLabel = 'Premium Animated';
    else if (designLevel === 'expert') designLabel = 'Cutting Edge 3D & GL';

    const summaryStr = `${platform === 'both' ? 'Web & Mobile Platforms' : (platform === 'mobile' ? 'Mobile App' : 'Web Application')} | Size: ${screenCount} Screens | Design: ${designLabel} | Estimate: ${symbol}${formattedPrice} ${currency} | Duration: ${timeline} ${timeline === 1 ? 'Week' : 'Weeks'}`;
    
    onApplyEstimate(summaryStr, projectCategoryStr);
  };

  const currConfig = currencyConfigs[currency];

  return (
    <section id="estimator" class="estimator-section section-padding">
      <div class="container">
        <div class="section-header scroll-anim scroll-anim-fade-up active">
          <span class="section-tag">Interactive Planner</span>
          <h2 class="section-title">Build Your <span class="gradient-text">Project Estimate</span></h2>
          <p class="section-description">Select your requirements below and receive a transparent, dynamic estimation of budget and delivery timelines instantly.</p>
        </div>
        
        <div class="estimator-grid">
          {/* Settings Controls */}
          <div class="glass-card estimator-controls scroll-anim scroll-anim-fade-up active">
            
            {/* Currency Selector (Default INR, choices: USD, EUR, GBP) */}
            <div class="input-group currency-selector-container">
              <label class="input-label">Project Currency</label>
              <div class="currency-selector">
                {Object.keys(currencyConfigs).map(key => (
                  <button 
                    key={key}
                    type="button"
                    class={`currency-btn ${currency === key ? 'active' : ''}`}
                    onClick={() => setCurrency(key)}
                  >
                    {currencyConfigs[key].label}
                  </button>
                ))}
              </div>
            </div>

            <h3 class="estimator-subtitle">1. Choose Platform & Scope</h3>
            
            <div class="input-group">
              <label class="input-label">Project Platform</label>
              <div class="platform-selector">
                <button 
                  type="button"
                  class={`platform-btn ${platform === 'web' ? 'active' : ''}`}
                  onClick={() => setPlatform('web')}
                >
                  <i class="fa-solid fa-laptop"></i>
                  <span>Web App</span>
                </button>
                
                <button 
                  type="button"
                  class={`platform-btn ${platform === 'mobile' ? 'active' : ''}`}
                  onClick={() => setPlatform('mobile')}
                >
                  <i class="fa-solid fa-mobile-screen"></i>
                  <span>Mobile App</span>
                </button>
                
                <button 
                  type="button"
                  class={`platform-btn ${platform === 'both' ? 'active' : ''}`}
                  onClick={() => setPlatform('both')}
                >
                  <i class="fa-solid fa-network-wired"></i>
                  <span>Both Platforms</span>
                </button>
              </div>
            </div>
            
            <div class="input-group">
              <div class="slider-header">
                <label class="input-label" for="screenSlider">Project Size (Approx. Screens/Pages)</label>
                <span class="slider-value" id="screenSliderValue">{screenCount} {screenCount === 1 ? 'Page / Screen' : 'Pages / Screens'}</span>
              </div>
              <input 
                type="range" 
                id="screenSlider" 
                min="1" 
                max="30" 
                value={screenCount} 
                class="custom-slider"
                onChange={(e) => setScreenCount(parseInt(e.target.value, 10))}
              />
            </div>
            
            <h3 class="estimator-subtitle spacing-top">2. Choose Key Features</h3>
            <div class="features-checklist">
              {[
                { id: 'auth', label: 'Secure User Auth', icon: 'fa-shield-halved' },
                { id: 'db', label: 'Database Integration', icon: 'fa-database' },
                { id: 'payments', label: 'Stripe & Online Payments', icon: 'fa-credit-card' },
                { id: 'chat', label: 'Live Chat & Messaging', icon: 'fa-comments' },
                { id: 'dashboard', label: 'Admin Dashboard & Metrics', icon: 'fa-chart-line' },
                { id: 'geo', label: 'Map & Geolocation APIs', icon: 'fa-location-dot' }
              ].map(feat => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <label key={feat.id} class={`checkbox-container ${isChecked ? 'checked' : ''}`}>
                    <input 
                      type="checkbox" 
                      value={feat.id}
                      checked={isChecked}
                      onChange={() => handleFeatureToggle(feat.id)}
                    />
                    <span class="checkmark"></span>
                    <span class="checkbox-label">
                      <i class={`fa-solid ${feat.icon}`}></i>
                      <span>{feat.label}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            
            <h3 class="estimator-subtitle spacing-top">3. Design Standard</h3>
            <div class="design-selector">
              <button 
                type="button" 
                class={`design-btn ${designLevel === 'standard' ? 'active' : ''}`}
                onClick={() => setDesignLevel('standard')}
              >
                Clean & Functional
              </button>
              
              <button 
                type="button" 
                class={`design-btn ${designLevel === 'premium' ? 'active' : ''}`}
                onClick={() => setDesignLevel('premium')}
              >
                Premium Animated
              </button>
              
              <button 
                type="button" 
                class={`design-btn ${designLevel === 'expert' ? 'active' : ''}`}
                onClick={() => setDesignLevel('expert')}
              >
                Cutting Edge 3D & GL
              </button>
            </div>
          </div>
          
          {/* Results Screen */}
          <div class="estimator-results-card scroll-anim scroll-anim-fade-up active">
            <div class="results-glow"></div>
            <div class="results-inner">
              <h3 class="results-heading">Your Custom Estimate</h3>
              
              <div class="price-display">
                <span class="price-currency">{currConfig.symbol}</span>
                <span class="price-amount" id="calcPrice">{price.toLocaleString('en-US')}</span>
                <span class="price-suffix">{currency}</span>
              </div>
              
              <p class="price-subtext">Estimated project cost range: <strong id="priceRange">{currConfig.symbol}{priceLow.toLocaleString('en-US')} - {currConfig.symbol}{priceHigh.toLocaleString('en-US')} {currency}</strong></p>
              
              <hr class="results-divider" />
              
              <div class="timeline-display">
                <div class="timeline-item">
                  <i class="fa-regular fa-clock"></i>
                  <div class="timeline-details">
                    <span class="timeline-title">Delivery Time</span>
                    <span class="timeline-val" id="calcTime">{timeline} {timeline === 1 ? 'Week' : 'Weeks'}</span>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <i class="fa-regular fa-handshake"></i>
                  <div class="timeline-details">
                    <span class="timeline-title">Support Included</span>
                    <span class="timeline-val">3 Months Free</span>
                  </div>
                </div>
              </div>
              
              <div class="results-actions">
                <button 
                  type="button" 
                  class="btn btn-primary btn-full-width" 
                  id="btnApplyEstimate"
                  onClick={handleApply}
                >
                  Apply Estimate to Contact Form <i class="fa-solid fa-arrow-down-long"></i>
                </button>
                <span class="cta-disclaimer">*Note: This is an automated preliminary estimate. Final contract details may vary.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Estimator;
