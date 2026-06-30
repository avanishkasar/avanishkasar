import React, { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <a href="#home" className="nav-logo" data-magnetic>
            <span>AK</span>
          </a>
          
          <div className="nav-links">
            <a href="#about" className="nav-link" data-magnetic><span>About</span></a>
            <a href="#experience" className="nav-link" data-magnetic><span>Experience</span></a>
            <a href="#projects" className="nav-link" data-magnetic><span>Work</span></a>
            <a href="Avanish_Kasar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link" data-magnetic><span>Resume</span></a>
            <a href="#contact" className="nav-link nav-link--cta" data-magnetic><span>Let's Talk</span></a>
          </div>

          <button 
            className={`nav-toggle ${mobileActive ? 'active' : ''}`} 
            onClick={() => setMobileActive(!mobileActive)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileActive ? 'active' : ''}`} id="mobileMenu">
        <div className="mobile-menu-inner">
          <div className="mobile-menu-links">
            <a href="#home" className="mobile-link" onClick={() => setMobileActive(false)}><span>Home</span></a>
            <a href="#about" className="mobile-link" onClick={() => setMobileActive(false)}><span>About</span></a>
            <a href="#experience" className="mobile-link" onClick={() => setMobileActive(false)}><span>Experience</span></a>
            <a href="#projects" className="mobile-link" onClick={() => setMobileActive(false)}><span>Work</span></a>
            <a href="Avanish_Kasar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="mobile-link" onClick={() => setMobileActive(false)}><span>Resume</span></a>
            <a href="#contact" className="mobile-link" onClick={() => setMobileActive(false)}><span>Contact</span></a>
          </div>
          <div className="mobile-menu-footer">
            <a href="https://github.com/avanishkasar" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/avanishkasar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/only_avanish" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </>
  );
}
