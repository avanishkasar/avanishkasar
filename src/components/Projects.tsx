import React from 'react';
import { InteractiveFolderGallery } from './ui/interactive-folder-gallery';

export default function Projects() {
  // Convert existing projects to photos array for the InteractiveFolderGallery
  // Since we don't have screenshots for all, we use unsplash placeholders
  // Ideally, the user should provide real screenshots in the assets/ folder
  const projectPhotos = [
    { id: 1, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" }, // OrbitGrasp
    { id: 2, image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop" }, // Playlistify AI
    { id: 3, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" }, // SmartRouter
    { id: 4, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop" }, // Vision Protect
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-label reveal-text">
          <span className="section-number">04</span>
          <span className="section-label-text">FEATURED WORK</span>
        </div>

        {/* The new Interactive Folder Gallery replacing the old project list */}
        <div className="w-full flex items-center justify-center pt-10 pb-20 reveal-text">
          <InteractiveFolderGallery 
            photos={projectPhotos} 
            folderName="Projects.gallery" 
            dragHintText="Drag cards down to close folder"
          />
        </div>

        {/* Keep the detail list below for accessibility and SEO, but can redesign if wanted */}
        <div className="projects-list mt-8">
          {/* Project 1: OrbitGrasp */}
          <div className="project-item reveal-text">
            <div className="project-visual">
              <div className="project-number">01</div>
              <div className="project-icon-large">🔍</div>
            </div>
            <div className="project-info">
              <div className="project-meta">
                <span className="project-year">2026</span>
                <span className="project-category">DEV TOOLS / BROWSER</span>
              </div>
              <h3 className="project-name">OrbitGrasp</h3>
              <p className="project-description">Paste a GitHub repo URL and instantly see its dependency graph, health score and security issues. No setup. No login. Runs in your browser. Built because I was tired of cloning repos just to understand them.</p>
              <div className="project-tech-stack">
                <span>HTML</span>
                <span>JavaScript</span>
                <span>GitHub API</span>
                <span>D3.js</span>
              </div>
              <div className="project-actions">
                <a href="https://github.com/avanishkasar/OrbitGrasp" target="_blank" rel="noopener noreferrer" className="project-link" data-magnetic>
                  <span>View Code</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Project 2: Playlistify AI */}
          <div className="project-item reveal-text">
            <div className="project-visual">
              <div className="project-number">02</div>
              <div className="project-icon-large">🎵</div>
            </div>
            <div className="project-info">
              <div className="project-meta">
                <span className="project-year">2025</span>
                <span className="project-category">AI / FULLSTACK</span>
              </div>
              <h3 className="project-name">Playlistify AI</h3>
              <p className="project-description">Tell it what you feel like and it builds a Spotify playlist. Works in English, Hindi, Tamil and Telugu. It also remembers your taste over time so it gets better the more you use it.</p>
              <div className="project-tech-stack">
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>Gemini AI</span>
                <span>Spotify API</span>
                <span>SQLite</span>
              </div>
              <div className="project-actions">
                <a href="https://github.com/avanishkasar/Playlistify-AI" target="_blank" rel="noopener noreferrer" className="project-link" data-magnetic>
                  <span>View Code</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
                <a href="https://playlistifyyai.vercel.app" target="_blank" rel="noopener noreferrer" className="project-link" data-magnetic>
                  <span>Live Demo</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Project 3: SmartRouter */}
          <div className="project-item reveal-text">
            <div className="project-visual">
              <div className="project-number">03</div>
              <div className="project-icon-large">⚡</div>
            </div>
            <div className="project-info">
              <div className="project-meta">
                <span className="project-year">2025</span>
                <span className="project-category">AI / INFRASTRUCTURE</span>
              </div>
              <h3 className="project-name">SmartRouter</h3>
              <p className="project-description">A lightweight router that takes a prompt and decides whether to send it to GPT-4, Claude, or Gemini based on cost, speed, and task complexity. Saves money and time for AI agents.</p>
              <div className="project-tech-stack">
                <span>Python</span>
                <span>FastAPI</span>
                <span>LangChain</span>
                <span>Redis</span>
              </div>
              <div className="project-actions">
                <a href="https://github.com/avanishkasar/SmartRouter" target="_blank" rel="noopener noreferrer" className="project-link" data-magnetic>
                  <span>View Code</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Project 4: Vision Protect */}
          <div className="project-item reveal-text">
            <div className="project-visual">
              <div className="project-number">04</div>
              <div className="project-icon-large">👁️</div>
            </div>
            <div className="project-info">
              <div className="project-meta">
                <span className="project-year">2024</span>
                <span className="project-category">COMPUTER VISION / HACKATHON</span>
              </div>
              <h3 className="project-name">Vision Protect</h3>
              <p className="project-description">A real-time safety monitoring system using camera feeds to detect missing hard hats, restricted area breaches, and fall incidents. Won 1st place at regional tech symposium.</p>
              <div className="project-tech-stack">
                <span>Python</span>
                <span>OpenCV</span>
                <span>YOLOv8</span>
                <span>PyTorch</span>
              </div>
              <div className="project-actions">
                <a href="https://github.com/avanishkasar" target="_blank" rel="noopener noreferrer" className="project-link" data-magnetic>
                  <span>View Code</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="projects-cta reveal-text">
          <a href="https://github.com/avanishkasar" target="_blank" rel="noopener noreferrer" className="all-work-link" data-magnetic>
            <span>See more on GitHub</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
