import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content reveal-text">
          <h2 className="contact-heading">
            Let's build something <br />
            <em>amazing.</em>
          </h2>
          
          <p className="contact-subtext">
            Currently looking for software engineering internships and open to exciting projects. If you want to talk about code, AI, or just say hi, my inbox is always open.
          </p>

          <a href="mailto:avanishkasar2005@gmail.com" className="contact-email" data-magnetic>
            <span>avanishkasar2005@gmail.com</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>

          <div className="contact-links">
            <a href="https://github.com/avanishkasar" target="_blank" rel="noopener noreferrer" data-magnetic>GitHub</a>
            <a href="https://www.linkedin.com/in/avanishkasar/" target="_blank" rel="noopener noreferrer" data-magnetic>LinkedIn</a>
            <a href="https://x.com/only_avanish" target="_blank" rel="noopener noreferrer" data-magnetic>Twitter / X</a>
            <a href="https://devfolio.co/@avanishkasar" target="_blank" rel="noopener noreferrer" data-magnetic>Devfolio</a>
          </div>
        </div>
      </div>
    </section>
  );
}
