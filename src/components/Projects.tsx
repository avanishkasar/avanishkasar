import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Project data ──────────────────────────────────────────────────────────────
interface Project {
  id: number;
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
    title: 'ML Research',
    year: '2025',
    category: 'MACHINE LEARNING',
    image: '/assets/mlresearch.png',
    description: 'A collection of ML experiments and research implementations. Covers supervised learning, clustering, neural nets, and model evaluation. Built to learn by doing — every notebook is a real experiment.',
    tech: ['Python', 'NumPy', 'scikit-learn', 'Matplotlib', 'PyTorch'],
    links: [
      { label: 'View Code', url: 'https://github.com/avanishkasar/ML-Research' },
    ],
  },
  {
    id: 2,
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
    title: 'SmartRouter',
    year: '2025',
    category: 'AI / INFRASTRUCTURE',
    image: '/assets/smartrouter.png',
    description: 'A lightweight router that picks between GPT-4, Claude, or Gemini based on cost, speed, and task complexity. Saves money and time for AI agents without sacrificing quality.',
    tech: ['Python', 'FastAPI', 'LangChain', 'Redis'],
    links: [
      { label: 'View Code', url: 'https://github.com/avanishkasar/SmartRouter' },
    ],
  },
  {
    id: 4,
    title: 'Vision Protect',
    year: '2024',
    category: 'COMPUTER VISION',
    image: '/assets/visionprotect.png',
    description: 'Real-time safety monitoring using camera feeds — detects missing hard hats, restricted area breaches, and fall incidents using YOLOv8. Won 1st at a regional tech symposium.',
    tech: ['Python', 'OpenCV', 'YOLOv8', 'PyTorch'],
    links: [
      { label: 'View Code', url: 'https://github.com/avanishkasar' },
    ],
  },
];

// ─── Expandable Project Card (inside the folder) ───────────────────────────────
function ProjectCard({ project, isOpen }: { project: Project; isOpen: boolean }) {
  const [expanded, setExpanded] = useState(false);

  // Reset expanded state when folder closes
  React.useEffect(() => {
    if (!isOpen) setExpanded(false);
  }, [isOpen]);

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden relative cursor-pointer select-none"
      onClick={(e) => {
        e.stopPropagation();
        if (isOpen) setExpanded(prev => !prev);
      }}
    >
      {/* Project image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover pointer-events-none"
        style={{ filter: expanded ? 'brightness(0.25)' : 'brightness(0.85)' }}
      />

      {/* Always-visible title bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
        <div className="text-white text-xs font-mono uppercase tracking-wider opacity-60 mb-0.5">{project.category}</div>
        <div className="text-white font-bold text-base leading-tight">{project.title}</div>
        {isOpen && (
          <div className="text-cyan-400 text-[10px] font-mono mt-1 opacity-70">
            {expanded ? 'tap to close ↑' : 'tap for details ↓'}
          </div>
        )}
      </div>

      {/* Expanded overlay with details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center p-4 overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-2">{project.year} · {project.category}</div>
            <h3 className="text-white font-bold text-lg mb-2 leading-tight">{project.title}</h3>
            <p className="text-white/70 text-xs leading-relaxed mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] font-mono rounded-md text-cyan-300"
                  style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)' }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#00f0ff';
                    (e.currentTarget as HTMLElement).style.color = '#0c0c0c';
                    (e.currentTarget as HTMLElement).style.borderColor = '#00f0ff';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Interactive Folder Gallery ────────────────────────────────────────────────
export default function Projects() {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-label reveal-text">
          <span className="section-number">04</span>
          <span className="section-label-text">FEATURED WORK</span>
        </div>

        <div className="w-full py-8 relative flex flex-col items-center reveal-text">
          <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center">

            {/* Card stack */}
            <div className="relative w-[400px] h-[500px] flex justify-center pointer-events-none z-0">

              {/* Folder body (back) */}
              <motion.div
                className="absolute bottom-6 w-80 h-56 drop-shadow-2xl"
                animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
              >
                <div className="absolute top-0 left-0 w-32 h-10 rounded-t-xl border-t border-l border-r border-white/10"
                  style={{ background: 'linear-gradient(to top, #1e1e1e, #2a2a2a)' }} />
                <div className="absolute top-8 left-0 right-0 bottom-0 rounded-b-xl rounded-tr-xl border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
                  style={{ background: 'linear-gradient(to bottom, #1e1e1e, #0a0a0a)' }} />
                <div className="absolute top-10 left-2 right-2 bottom-2 bg-black rounded-lg shadow-inner pointer-events-none" />
              </motion.div>

              {/* Project cards fanned out */}
              <div className="absolute bottom-10 z-10 flex justify-center">
                {projects.map((project, i) => {
                  const offset = i - (projects.length / 2 - 0.5);
                  const stackY = hoverFolder ? offset * -10 - 40 : offset * -5;
                  const stackX = hoverFolder ? offset * 30 : offset * 3;
                  const stackRotate = hoverFolder ? offset * 8 : offset * 3;
                  const stackScale = 1 - Math.abs(offset) * 0.03;

                  const openY = -130;
                  const openX = (i - (projects.length - 1) / 2) * 145;
                  const openRotate = 0;
                  const openScale = 1.02;

                  return (
                    <motion.div
                      key={project.id}
                      drag={isFolderOpen}
                      dragSnapToOrigin
                      onDragEnd={(_e, info) => {
                        if (info.offset.y > 100 && isFolderOpen) {
                          setIsFolderOpen(false);
                          setHoverFolder(false);
                        }
                      }}
                      className={`absolute bottom-0 w-44 h-64 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 origin-bottom ${
                        isFolderOpen ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'
                      }`}
                      animate={
                        !isFolderOpen
                          ? { y: stackY, x: stackX, rotate: stackRotate, scale: stackScale, zIndex: i + 10 }
                          : { y: openY, x: openX, rotate: openRotate, scale: openScale, zIndex: 50 }
                      }
                      whileHover={isFolderOpen ? { scale: openScale + 0.05, zIndex: 100, y: openY - 10 } : {}}
                      whileDrag={isFolderOpen ? { scale: openScale + 0.1, rotate: 5, zIndex: 150 } : {}}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    >
                      <ProjectCard project={project} isOpen={isFolderOpen} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Folder front (clickable) */}
              <motion.div
                className="absolute bottom-0 w-[340px] h-44 drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)] cursor-pointer z-20 pointer-events-auto"
                style={{ transformOrigin: 'bottom' }}
                animate={{
                  opacity: isFolderOpen ? 0 : 1,
                  rotateX: hoverFolder ? -25 : 0,
                  y: hoverFolder ? 10 : 0,
                  pointerEvents: isFolderOpen ? 'none' : 'auto',
                }}
                onMouseEnter={() => setHoverFolder(true)}
                onMouseLeave={() => setHoverFolder(false)}
                onClick={() => setIsFolderOpen(true)}
              >
                <div className="w-full h-full rounded-2xl border border-white/20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] relative overflow-hidden flex items-end justify-center pb-8"
                  style={{ background: 'linear-gradient(to bottom, #2a2a2a, #111)' }}>
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)' }} />
                  <div className="px-5 py-2.5 bg-black rounded-lg border border-black/80 shadow-inner flex items-center justify-center backdrop-blur-md">
                    <span className="text-white/90 text-sm font-medium tracking-wide">
                      Projects.gallery
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hint text when open */}
            <motion.div
              animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 50 }}
              className="absolute bottom-4 px-6 py-3 rounded-full backdrop-blur-md text-white/50 text-xs font-medium uppercase tracking-widest pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Drag a card down to close • Tap a card for details
            </motion.div>
          </div>

          {/* Close folder button (visible when open) */}
          <AnimatePresence>
            {isFolderOpen && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-white/50 transition-colors hover:text-white"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                onClick={() => { setIsFolderOpen(false); setHoverFolder(false); }}
              >
                ← Close folder
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="projects-cta reveal-text">
          <a href="https://github.com/avanishkasar" target="_blank" rel="noopener noreferrer" className="all-work-link" data-magnetic>
            <span>See more on GitHub</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
