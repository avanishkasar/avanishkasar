import React from 'react';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-label reveal-text">
          <span className="section-number">01</span>
          <span className="section-label-text">ABOUT</span>
        </div>

        <div className="about-grid">
          <div className="about-left">
            <h2 className="about-heading">
              <div className="reveal-wrap"><span className="reveal-text">Just a guy who</span></div>
              <div className="reveal-wrap"><span className="reveal-text">really likes</span></div>
              <div className="reveal-wrap"><span className="reveal-text"><em>building things.</em></span></div>
            </h2>
          </div>
          <div className="about-right">
            <div className="about-bio reveal-text">
              <p>I study CS at <strong>APSIT, Mumbai</strong> and lead <strong>GDG On Campus APSIT</strong> where I run hackathons, workshops and study jams for the campus community.</p>
              <p>Right now I'm deep into AI and developer tooling. I built <strong>OrbitGrasp</strong> (repo health scores in your browser), <strong>SmartRouter</strong> (picks the right AI model for any task), and keep shipping more. I learn by building, not by waiting.</p>
              <p>Outside code: you'll find me at hackathons, contributing to open source, or on Google Cloud doing labs at 2am.</p>
            </div>
            
            <div className="about-stats reveal-text">
              <div className="stat">
                <span className="stat-number">15</span><span className="stat-plus">+</span>
                <span className="stat-label">Events Organized</span>
              </div>
              <div className="stat">
                <span className="stat-number">10</span><span className="stat-plus">+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat">
                <span className="stat-number">500</span><span className="stat-plus">+</span>
                <span className="stat-label">Community Members</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-image-section reveal-text">
          <div className="about-image-wrapper">
            <img src="assets/Monochrome Simple Memories Photo Collage.png" alt="Avanish Kasar" className="about-img" loading="lazy" />
            <div className="about-image-caption">
              <span>AVANISH KASAR</span>
              <span>MUMBAI, IN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
