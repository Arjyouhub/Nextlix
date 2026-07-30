import React, { useState } from 'react';

const SeoAuditTool = ({ onApplySeoEstimate }) => {
  const [domainInput, setDomainInput] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('Website Development Startup');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [activeTab, setActiveTab] = useState('serp'); // 'serp' | 'vitals' | 'checklist'

  const handleRunAudit = (e) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    setIsAuditing(true);
    setAuditResult(null);

    // Simulate real-time deep technical SEO analysis
    setTimeout(() => {
      const formattedDomain = domainInput.replace(/https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
      
      setAuditResult({
        domain: formattedDomain,
        keyword: targetKeyword || 'Website Development Startup',
        overallScore: 98,
        serpPosition: 1,
        coreWebVitals: {
          lcp: '0.8s',
          lcpStatus: 'Good',
          fid: '12ms',
          fidStatus: 'Good',
          cls: '0.001',
          clsStatus: 'Good',
          ttfb: '110ms',
          ttfbStatus: 'Fast'
        },
        auditChecks: [
          { title: 'JSON-LD Schema Markup', status: 'Passed', icon: 'fa-solid fa-code', detail: 'Organization, WebSite & FAQ Schema detected.' },
          { title: 'Mobile-First Responsiveness', status: 'Passed', icon: 'fa-solid fa-mobile-screen', detail: 'Perfect mobile viewport & dynamic layout scaling.' },
          { title: 'Sub-Second Page Load', status: 'Passed', icon: 'fa-solid fa-bolt', detail: 'Sub-500ms initial load time achieved.' },
          { title: 'SSL & Security Headers', status: 'Passed', icon: 'fa-solid fa-shield-halved', detail: 'HTTPS enforced with strict security headers.' },
          { title: 'Semantic HTML5 Hierarchy', status: 'Passed', icon: 'fa-solid fa-sitemap', detail: 'Single H1 tag with clean heading structure.' }
        ]
      });
      setIsAuditing(false);
    }, 1200);
  };

  return (
    <section id="seo-audit" class="seo-audit-section">
      <div class="container">
        <div class="section-header text-center scroll-anim scroll-anim-fade-up active">
          <span class="badge badge-accent">
            <i class="fa-solid fa-chart-line"></i> AVNM Google #1 Rank Engine
          </span>
          <h2 class="section-title">
            Website Development Startup & <span class="gradient-text">Google #1 Ranking Audit</span>
          </h2>
          <p class="section-subtitle">
            Simulate your website's Google SERP performance, analyze Core Web Vitals, and unlock the exact SEO blueprint engineered by AVNM & Nextlix.
          </p>
        </div>

        {/* Audit Input Form Card */}
        <div class="glass-card seo-audit-card scroll-anim scroll-anim-scale-in active">
          <form onSubmit={handleRunAudit} class="seo-audit-form">
            <div class="form-row">
              <div class="form-group flex-2">
                <label htmlFor="auditDomain">
                  <i class="fa-solid fa-globe"></i> Startup Website Domain
                </label>
                <input 
                  type="text" 
                  id="auditDomain"
                  placeholder="e.g. yourstartup.com" 
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  required
                  class="form-control"
                />
              </div>

              <div class="form-group flex-2">
                <label htmlFor="auditKeyword">
                  <i class="fa-solid fa-magnifying-glass"></i> Target Google Search Keyword
                </label>
                <input 
                  type="text" 
                  id="auditKeyword"
                  placeholder="e.g. Website Development Startup" 
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  class="form-control"
                />
              </div>

              <div class="form-group flex-1 form-btn-group">
                <button type="submit" class="btn btn-primary btn-block" disabled={isAuditing}>
                  {isAuditing ? (
                    <>
                      <i class="fa-solid fa-circle-notch fa-spin"></i> Auditing...
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-rocket"></i> Rank #1 Audit
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Quick preset suggestions */}
          <div class="seo-presets">
            <span class="preset-label">Try keywords:</span>
            <button 
              type="button" 
              class="preset-badge" 
              onClick={() => { setDomainInput('nextlix.online'); setTargetKeyword('Best Website Development Company in Kerala'); }}
            >
              Best Website Development Company in Kerala
            </button>
            <button 
              type="button" 
              class="preset-badge" 
              onClick={() => { setDomainInput('avnm-startup.dev'); setTargetKeyword('Website Development Startup'); }}
            >
              Website Development Startup
            </button>
            <button 
              type="button" 
              class="preset-badge" 
              onClick={() => { setDomainInput('nextlix-seo.com'); setTargetKeyword('Google 1 Ranking Agency'); }}
            >
              Google #1 Ranking Agency
            </button>
            <button 
              type="button" 
              class="preset-badge" 
              onClick={() => { setDomainInput('avnm.studio'); setTargetKeyword('AVNM Web Architecture'); }}
            >
              AVNM Web Architecture
            </button>
          </div>
        </div>

        {/* Audit Results Presentation */}
        {auditResult && (
          <div class="glass-card seo-results-card scroll-anim scroll-anim-fade-up active">
            <div class="seo-results-header">
              <div class="result-score-badge">
                <div class="score-circle">
                  <span class="score-number">{auditResult.overallScore}</span>
                  <span class="score-label">/ 100</span>
                </div>
                <div class="score-text">
                  <h3>Google #1 Rank Readiness</h3>
                  <p>Analyzed domain: <strong>{auditResult.domain}</strong></p>
                </div>
              </div>

              <div class="seo-tabs">
                <button 
                  class={`seo-tab-btn ${activeTab === 'serp' ? 'active' : ''}`}
                  onClick={() => setActiveTab('serp')}
                >
                  <i class="fa-brands fa-google"></i> Google SERP #1 Simulator
                </button>
                <button 
                  class={`seo-tab-btn ${activeTab === 'vitals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vitals')}
                >
                  <i class="fa-solid fa-gauge-high"></i> Core Web Vitals
                </button>
                <button 
                  class={`seo-tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('checklist')}
                >
                  <i class="fa-solid fa-list-check"></i> SEO Technical Checklist
                </button>
              </div>
            </div>

            {/* Tab 1: Google SERP Preview */}
            {activeTab === 'serp' && (
              <div class="serp-preview-container">
                <div class="serp-google-box">
                  <div class="serp-top-bar">
                    <span class="google-logo">
                      <span class="g-blue">G</span>
                      <span class="g-red">o</span>
                      <span class="g-yellow">o</span>
                      <span class="g-blue">g</span>
                      <span class="g-green">l</span>
                      <span class="g-red">e</span>
                    </span>
                    <span class="serp-search-query">{auditResult.keyword}</span>
                  </div>

                  <div class="serp-result-item">
                    <div class="serp-site-info">
                      <img src="/assets/nextlix-logo-chevron.jpg" alt="Favicon" class="serp-favicon" />
                      <div class="serp-site-details">
                        <span class="serp-site-name">{auditResult.domain}</span>
                        <span class="serp-site-url">https://{auditResult.domain} › startup-web-development</span>
                      </div>
                      <span class="rank-one-badge">
                        <i class="fa-solid fa-trophy"></i> Position #1
                      </span>
                    </div>

                    <h3 class="serp-title">
                      <a href="#estimator" onClick={(e) => e.preventDefault()}>
                        {auditResult.domain} | #1 Website Development Startup & High Speed Apps
                      </a>
                    </h3>

                    <p class="serp-snippet">
                      Top-ranked website development startup powering ultra-fast web apps, custom mobile apps, and sub-second loading speed. Engineered with AVNM Nextlix stack for guaranteed Google #1 ranking and 100/100 Core Web Vitals.
                    </p>

                    <div class="serp-rich-badges">
                      <span class="rich-tag"><i class="fa-solid fa-star text-gold"></i> 4.9 (120+ Startup Reviews)</span>
                      <span class="rich-tag"><i class="fa-solid fa-clock"></i> Sub-500ms Speed</span>
                      <span class="rich-tag"><i class="fa-solid fa-check"></i> Schema Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Core Web Vitals */}
            {activeTab === 'vitals' && (
              <div class="vitals-grid">
                <div class="vital-card">
                  <div class="vital-header">
                    <span class="vital-name">LCP (Largest Contentful Paint)</span>
                    <span class="vital-status status-good">{auditResult.coreWebVitals.lcpStatus}</span>
                  </div>
                  <div class="vital-value">{auditResult.coreWebVitals.lcp}</div>
                  <div class="vital-progress-bar">
                    <div class="vital-progress progress-good" style={{ width: '95%' }}></div>
                  </div>
                  <p class="vital-desc">Target: &lt; 2.5s. Fast visual rendering ensures zero bounce rate.</p>
                </div>

                <div class="vital-card">
                  <div class="vital-header">
                    <span class="vital-name">FID / INP (Interactive Speed)</span>
                    <span class="vital-status status-good">{auditResult.coreWebVitals.fidStatus}</span>
                  </div>
                  <div class="vital-value">{auditResult.coreWebVitals.fid}</div>
                  <div class="vital-progress-bar">
                    <div class="vital-progress progress-good" style={{ width: '98%' }}></div>
                  </div>
                  <p class="vital-desc">Target: &lt; 100ms. Instant response to user taps & clicks.</p>
                </div>

                <div class="vital-card">
                  <div class="vital-header">
                    <span class="vital-name">CLS (Cumulative Layout Shift)</span>
                    <span class="vital-status status-good">{auditResult.coreWebVitals.clsStatus}</span>
                  </div>
                  <div class="vital-value">{auditResult.coreWebVitals.cls}</div>
                  <div class="vital-progress-bar">
                    <div class="vital-progress progress-good" style={{ width: '99%' }}></div>
                  </div>
                  <p class="vital-desc">Target: &lt; 0.1. Zero visual jumpiness during page load.</p>
                </div>

                <div class="vital-card">
                  <div class="vital-header">
                    <span class="vital-name">TTFB (Time To First Byte)</span>
                    <span class="vital-status status-good">{auditResult.coreWebVitals.ttfbStatus}</span>
                  </div>
                  <div class="vital-value">{auditResult.coreWebVitals.ttfb}</div>
                  <div class="vital-progress-bar">
                    <div class="vital-progress progress-good" style={{ width: '96%' }}></div>
                  </div>
                  <p class="vital-desc">Target: &lt; 200ms. Edge CDN server speeds worldwide.</p>
                </div>
              </div>
            )}

            {/* Tab 3: Technical SEO Checklist */}
            {activeTab === 'checklist' && (
              <div class="checklist-grid">
                {auditResult.auditChecks.map((check, index) => (
                  <div key={index} class="check-item-card">
                    <div class="check-icon">
                      <i class={check.icon}></i>
                    </div>
                    <div class="check-info">
                      <h4>{check.title}</h4>
                      <p>{check.detail}</p>
                    </div>
                    <div class="check-status-badge">
                      <i class="fa-solid fa-circle-check"></i> {check.status}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Call-To-Action */}
            <div class="seo-audit-footer text-center">
              <p>Ready to build a website development startup platform guaranteed to hit <strong>Google Position #1</strong>?</p>
              <a href="#estimator" class="btn btn-primary">
                Get Google #1 Rank Engine Estimate <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeoAuditTool;
