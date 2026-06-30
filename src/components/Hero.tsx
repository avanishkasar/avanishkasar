import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Animated grid background */}
      <div className="hero-grid-bg" aria-hidden="true"></div>
      {/* Floating orbs */}
      <div className="hero-orb hero-orb--1" aria-hidden="true"></div>
      <div className="hero-orb hero-orb--2" aria-hidden="true"></div>

      <div className="hero-content">
        <div className="hero-tag">
          <span className="hero-tag-line"></span>
          <span className="hero-tag-text reveal-text">Software Developer &amp; AI Engineer</span>
        </div>

        <h1 className="hero-title">
          <div className="hero-title-line">
            <span className="reveal-text">AVANISH</span>
          </div>
          <div className="hero-title-line hero-title-line--indent">
            <span className="reveal-text">KASAR<span className="hero-dot">.</span></span>
          </div>
        </h1>

        <div className="hero-bottom">
          <div className="hero-description">
            <p className="reveal-text">CS undergrad from Mumbai. I build things with AI, break stuff, learn fast, and ship. Currently running GDG On Campus APSIT and obsessing over developer tools.</p>
          </div>
          
          <div className="hero-actions reveal-text">
            <a href="Avanish_Kasar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hero-resume-btn" data-magnetic>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Resume</span>
            </a>
            <div className="hero-socials">
              <a href="https://github.com/avanishkasar" target="_blank" rel="noopener noreferrer" className="hero-social-link" data-magnetic>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GH</span>
              </a>
              <a href="https://www.linkedin.com/in/avanishkasar/" target="_blank" rel="noopener noreferrer" className="hero-social-link" data-magnetic>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LI</span>
              </a>
              <a href="https://x.com/only_avanish" target="_blank" rel="noopener noreferrer" className="hero-social-link" data-magnetic>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>X</span>
              </a>
              <a href="https://devfolio.co/@avanishkasar" target="_blank" rel="noopener noreferrer" className="hero-social-link" data-magnetic>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.93-6-4.46-6-8v-6.5l6-3 6 3V12c0 3.54-2.14 7.07-6 8z"/></svg>
                <span>DF</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
