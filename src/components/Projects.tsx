import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  number: string;
  title: string;
  year: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    number: '01',
    title: 'OrbitGrasp',
    year: '2026',
    category: 'DEV TOOLS / BROWSER',
    image: '/assets/orbitgrasp.png',
    description: 'Paste a GitHub repo URL and instantly see its dependency graph, health score and security issues. No setup. No login. Runs in your browser. Built because I was tired of cloning repos just to understand them.',
    tech: ['HTML', 'JavaScript', 'GitHub API', 'D3.js'],
    links: [
      { label: 'View Code', url: 'https://github.com/avanishkasar/OrbitGrasp' },
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Playlistify AI',
    year: '2025',
    category: 'AI / FULLSTACK',
    image: '/assets/playlistify.png',
    description: 'Tell it what you feel like and it builds a Spotify playlist. Works in English, Hindi, Tamil and Telugu. Remembers your taste over time so it gets better the more you use it.',
    tech: ['TypeScript', 'Node.js', 'Gemini AI', 'Spotify API', 'SQLite'],
    links: [
      { label: 'View Code', url: 'https://github.com/avanishkasar/Playlistify-AI' },
      { label: 'Live Demo', url: 'https://playlistifyyai.vercel.app' },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'SmartRouter',
    year: '2025',
    category: 'AI / INFRASTRUCTURE',
    image: '/assets/smartrouter.png',
    description: 'A lightweight router that takes a prompt and decides whether to send it to GPT-4, Claude, or Gemini based on cost, speed, and task complexity. Saves money and time for AI agents.',
    tech: ['Python', 'FastAPI', 'LangChain', 'Redis'],
    links: [
      { label: 'View Code', url: 'https://github.com/avanishkasar/SmartRouter' },
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Vision Protect',
    year: '2024',
    category: 'COMPUTER VISION',
    image: '/assets/visionprotect.png',
    description: 'Real-time safety monitoring using camera feeds to detect missing hard hats, restricted area breaches, and fall incidents. Won 1st place at regional tech symposium.',
    tech: ['Python', 'OpenCV', 'YOLOv8', 'PyTorch'],
    links: [
      { label: 'View Code', url: 'https://github.com/avanishkasar' },
    ],
  },
];

export default function ProjectGallery() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeProject = projects.find(p => p.id === activeId) ?? null;

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-label reveal-text">
          <span className="section-number">04</span>
          <span className="section-label-text">FEATURED WORK</span>
        </div>

        <div className="proj-grid">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`proj-card ${activeId === project.id ? 'proj-card--active' : ''}`}
              layout
              onClick={() => setActiveId(activeId === project.id ? null : project.id)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image area */}
              <div className="proj-card__img-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="proj-card__img"
                  loading="lazy"
                />
                <div className="proj-card__overlay">
                  <span className="proj-card__tap-hint">
                    {activeId === project.id ? 'Click to close' : 'Click to expand'}
                  </span>
                </div>
              </div>

              {/* Always-visible footer */}
              <div className="proj-card__footer">
                <div className="proj-card__meta">
                  <span className="proj-card__num">{project.number}</span>
                  <div>
                    <h3 className="proj-card__title">{project.title}</h3>
                    <span className="proj-card__cat">{project.category}</span>
                  </div>
                </div>
                <span className="proj-card__year">{project.year}</span>
              </div>

              {/* Expandable details panel */}
              <AnimatePresence>
                {activeId === project.id && (
                  <motion.div
                    className="proj-card__details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="proj-card__desc">{project.description}</p>

                    <div className="proj-card__tech">
                      {project.tech.map(t => (
                        <span key={t} className="proj-card__tag">{t}</span>
                      ))}
                    </div>

                    <div className="proj-card__links">
                      {project.links.map(link => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-card__link"
                          onClick={e => e.stopPropagation()}
                        >
                          <span>{link.label}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7"/>
                            <polyline points="7 7 17 7 17 17"/>
                          </svg>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="projects-cta reveal-text" style={{ marginTop: '3rem' }}>
          <a href="https://github.com/avanishkasar" target="_blank" rel="noopener noreferrer" className="all-work-link" data-magnetic>
            <span>See more on GitHub</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
