import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface ProjectCard {
  id: number;
  title: string;
  year: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
}

// ─── Individual card with click-to-expand ──────────────────────────────────────

function ProjectCardContent({
  project,
  isOpen,
}: {
  project: ProjectCard;
  isOpen: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  React.useEffect(() => {
    if (!isOpen) setExpanded(false);
  }, [isOpen]);

  return (
    <div
      className="w-full h-full relative overflow-hidden rounded-xl"
      style={{ cursor: isOpen ? "pointer" : "default" }}
      onClick={(e) => {
        e.stopPropagation();
        if (isOpen) setExpanded((p) => !p);
      }}
    >
      {/* Project image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover pointer-events-none transition-all duration-500"
        style={{ filter: expanded ? "brightness(0.2)" : "brightness(0.8)" }}
      />

      {/* Bottom title strip – always visible */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#00f0ff",
            opacity: 0.7,
            marginBottom: "2px",
          }}
        >
          {project.category}
        </p>
        <p
          style={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </p>
        {isOpen && (
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              color: "#00f0ff",
              opacity: 0.6,
              marginTop: "4px",
            }}
          >
            {expanded ? "tap to close ↑" : "tap for details ↓"}
          </p>
        )}
      </div>

      {/* Expanded details overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-center p-4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#00f0ff",
                marginBottom: "6px",
              }}
            >
              {project.year} · {project.category}
            </p>
            <h3
              style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#fff",
                marginBottom: "8px",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "0.75rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "10px",
              }}
            >
              {project.description}
            </p>

            {/* Tech tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginBottom: "12px",
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "2px 8px",
                    fontSize: "0.6rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                    color: "#00f0ff",
                    background: "rgba(0,240,255,0.08)",
                    border: "1px solid rgba(0,240,255,0.2)",
                    borderRadius: "6px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "5px 12px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "#00f0ff";
                    (e.currentTarget as HTMLElement).style.color = "#0c0c0c";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#00f0ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.25)";
                  }}
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
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

// ─── Project Folder Gallery ────────────────────────────────────────────────────

const projects: ProjectCard[] = [
  {
    id: 1,
    title: "ML Research",
    year: "2025",
    category: "MACHINE LEARNING",
    image: "/assets/mlresearch.png",
    description:
      "A collection of ML experiments and research implementations. Covers supervised learning, clustering, neural nets, and model evaluation. Built to learn by doing — every notebook is a real experiment.",
    tech: ["Python", "NumPy", "scikit-learn", "Matplotlib", "PyTorch"],
    links: [
      {
        label: "View Code",
        url: "https://github.com/avanishkasar/ML-Research",
      },
    ],
  },
  {
    id: 2,
    title: "Playlistify AI",
    year: "2025",
    category: "AI / FULLSTACK",
    image: "/assets/playlistify.png",
    description:
      "Tell it what you feel like and it builds a Spotify playlist. Works in English, Hindi, Tamil and Telugu. Remembers your taste over time so it gets better the more you use it.",
    tech: ["TypeScript", "Node.js", "Gemini AI", "Spotify API", "SQLite"],
    links: [
      {
        label: "View Code",
        url: "https://github.com/avanishkasar/Playlistify-AI",
      },
      { label: "Live Demo", url: "https://playlistifyyai.vercel.app" },
    ],
  },
  {
    id: 3,
    title: "SmartRouter",
    year: "2025",
    category: "AI / INFRASTRUCTURE",
    image: "/assets/smartrouter.png",
    description:
      "A lightweight router that picks between GPT-4, Claude, or Gemini based on cost, speed, and task complexity. Saves money and time for AI agents without sacrificing quality.",
    tech: ["Python", "FastAPI", "LangChain", "Redis"],
    links: [
      {
        label: "View Code",
        url: "https://github.com/avanishkasar/SmartRouter",
      },
    ],
  },
  {
    id: 4,
    title: "Vision Protect",
    year: "2024",
    category: "COMPUTER VISION",
    image: "/assets/visionprotect.png",
    description:
      "Real-time safety monitoring using camera feeds — detects missing hard hats, restricted area breaches, and fall incidents using YOLOv8. Won 1st at a regional tech symposium.",
    tech: ["Python", "OpenCV", "YOLOv8", "PyTorch"],
    links: [{ label: "View Code", url: "https://github.com/avanishkasar" }],
  },
];

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

        {/* ── Folder Gallery ── */}
        <div className="w-full py-16 relative">
          <div
            className="relative w-full flex flex-col items-center justify-center"
            style={{ minHeight: "600px" }}
          >
            <div
              className="relative flex justify-center pointer-events-none"
              style={{ width: "700px", height: "520px" }}
            >
              {/* Folder back body */}
              <motion.div
                className="absolute drop-shadow-2xl"
                style={{ bottom: "24px", width: "320px", height: "224px" }}
                animate={{
                  opacity: isFolderOpen ? 0 : 1,
                  scale: isFolderOpen ? 0.9 : 1,
                }}
              >
                <div
                  className="absolute top-0 left-0 rounded-t-xl border-t border-l border-r border-white/10"
                  style={{
                    width: "128px",
                    height: "40px",
                    background: "linear-gradient(to top, #1e1e1e, #2a2a2a)",
                  }}
                />
                <div
                  className="absolute rounded-b-xl rounded-tr-xl border border-white/10"
                  style={{
                    top: "32px",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to bottom, #1e1e1e, #0a0a0a)",
                    boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)",
                  }}
                />
                <div
                  className="absolute bg-black rounded-lg pointer-events-none"
                  style={{
                    top: "40px",
                    left: "8px",
                    right: "8px",
                    bottom: "8px",
                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)",
                  }}
                />
              </motion.div>

              {/* Project cards fanned in the folder */}
              <div
                className="absolute flex justify-center"
                style={{ bottom: "40px", zIndex: 10 }}
              >
                {projects.map((project, i) => {
                  // Center offset across 4 cards: -1.5, -0.5, 0.5, 1.5
                  const offset = i - (projects.length - 1) / 2;

                  const stackY = hoverFolder ? offset * -8 - 35 : offset * -4;
                  const stackX = hoverFolder ? offset * 22 : offset * 2;
                  const stackRotate = hoverFolder ? offset * 6 : offset * 2;
                  const stackScale = 1 - Math.abs(offset) * 0.025;

                  // Open: spread cards wide
                  const openY = -140;
                  const openX = offset * 160;
                  const openScale = 1.04;

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
                      className={`absolute rounded-xl border border-white/20 origin-bottom overflow-hidden ${
                        isFolderOpen
                          ? "pointer-events-auto cursor-grab active:cursor-grabbing"
                          : "pointer-events-none"
                      }`}
                      style={{
                        bottom: 0,
                        width: "168px",
                        height: "224px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                      }}
                      animate={
                        !isFolderOpen
                          ? {
                              y: stackY,
                              x: stackX,
                              rotate: stackRotate,
                              scale: stackScale,
                              zIndex: i + 10,
                            }
                          : {
                              y: openY,
                              x: openX,
                              rotate: 0,
                              scale: openScale,
                              zIndex: 50,
                            }
                      }
                      whileHover={
                        isFolderOpen
                          ? { scale: openScale + 0.04, zIndex: 100, y: openY - 8 }
                          : {}
                      }
                      whileDrag={
                        isFolderOpen
                          ? { scale: openScale + 0.08, rotate: 4, zIndex: 150 }
                          : {}
                      }
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    >
                      <ProjectCardContent
                        project={project}
                        isOpen={isFolderOpen}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Folder front (clickable lid) */}
              <motion.div
                className="absolute cursor-pointer pointer-events-auto"
                style={{
                  bottom: 0,
                  width: "340px",
                  height: "176px",
                  transformOrigin: "bottom",
                  zIndex: 20,
                  filter: "drop-shadow(0 -20px 40px rgba(0,0,0,0.8))",
                }}
                animate={{
                  opacity: isFolderOpen ? 0 : 1,
                  rotateX: hoverFolder ? -25 : 0,
                  y: hoverFolder ? 10 : 0,
                  pointerEvents: isFolderOpen ? "none" : "auto",
                }}
                onMouseEnter={() => setHoverFolder(true)}
                onMouseLeave={() => setHoverFolder(false)}
                onClick={() => setIsFolderOpen(true)}
              >
                <div
                  className="w-full h-full rounded-2xl border border-white/20 relative overflow-hidden flex items-end justify-center pb-8"
                  style={{
                    background: "linear-gradient(to bottom, #2a2a2a, #111)",
                    boxShadow: "inset 0 2px 10px rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: "1px",
                      background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
                    }}
                  />
                  <div className="px-5 py-2.5 bg-black rounded-lg border border-black/80 shadow-inner flex items-center justify-center backdrop-blur-md">
                    <span className="text-white/90 text-sm font-medium tracking-wide">
                      Projects.gallery
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hint text */}
            <motion.div
              animate={{
                opacity: isFolderOpen ? 1 : 0,
                y: isFolderOpen ? 0 : 20,
              }}
              className="absolute pointer-events-none text-xs font-medium uppercase tracking-widest"
              style={{
                bottom: "16px",
                padding: "10px 24px",
                borderRadius: "100px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Drag a card down to close · Tap a card for details
            </motion.div>
          </div>

          {/* Close button */}
          <AnimatePresence>
            {isFolderOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center mt-2"
              >
                <button
                  onClick={() => {
                    setIsFolderOpen(false);
                    setHoverFolder(false);
                  }}
                  className="text-xs font-mono uppercase tracking-widest transition-colors"
                  style={{
                    padding: "8px 20px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.4)")
                  }
                >
                  ← Close folder
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <div className="projects-cta reveal-text">
          <a
            href="https://github.com/avanishkasar"
            target="_blank"
            rel="noopener noreferrer"
            className="all-work-link"
          >
            <span>See more on GitHub</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
