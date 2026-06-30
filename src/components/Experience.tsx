import React from 'react';

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-label reveal-text">
          <span className="section-number">02</span>
          <span className="section-label-text">EXPERIENCE</span>
        </div>

        <div className="experience-list">
          <div className="experience-item reveal-text">
            <div className="exp-header">
              <div className="exp-role">
                <h3>Lead Organizer</h3>
                <span className="exp-company">Google Developer Groups On Campus APSIT</span>
              </div>
              <span className="exp-date">Aug 2025 to Present</span>
            </div>
            <p className="exp-desc">I run the dev community at APSIT. Hackathons, Study Jams, tech talks, workshops. The goal is simple: make more builders.</p>
            <div className="exp-tags">
              <span>Community</span>
              <span>Leadership</span>
              <span>Event Management</span>
              <span>Google</span>
            </div>
          </div>

          <div className="experience-item reveal-text">
            <div className="exp-header">
              <div className="exp-role">
                <h3>Business Development Intern</h3>
                <span className="exp-company">Metvy</span>
              </div>
              <span className="exp-date">May 2025 to Jun 2025</span>
            </div>
            <p className="exp-desc">Worked on product strategy and data research at an early-stage startup. Helped shape decisions with actual numbers, not gut feelings.</p>
            <div className="exp-tags">
              <span>Data Interpretation</span>
              <span>Python</span>
              <span>Product Strategy</span>
            </div>
          </div>

          <div className="experience-item reveal-text">
            <div className="exp-header">
              <div className="exp-role">
                <h3>Open Source Contributor</h3>
                <span className="exp-company">GirlScript Summer of Code (GSSoC) 2025</span>
              </div>
              <span className="exp-date">2025</span>
            </div>
            <p className="exp-desc">Contributed to open source during GSSoC 2025. Picked up real projects, sent PRs, got reviews, and shipped code that people actually use.</p>
            <div className="exp-tags">
              <span>Open Source</span>
              <span>Collaboration</span>
              <span>Git</span>
            </div>
          </div>

          <div className="experience-item reveal-text">
            <div className="exp-header">
              <div className="exp-role">
                <h3>Cloud Explorer</h3>
                <span className="exp-company">Google Cloud Skills Boost</span>
              </div>
              <span className="exp-date">2025 to Present</span>
            </div>
            <p className="exp-desc">Doing labs on Google Cloud. AI, serverless, Kubernetes, GenAI. Mostly at odd hours but it's been worth it.</p>
            <div className="exp-tags">
              <span>Google Cloud</span>
              <span>Generative AI</span>
              <span>Cloud Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
