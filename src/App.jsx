import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Play,
  Send,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, projects, flatSkills } from './data/portfolio';
import ScrollReveal from './ScrollReveal';
import StaggeredMenu from './StaggeredMenu';
import ScrollFloat from './ScrollFloat';

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  }
};



const navItems = ['About', 'Projects', 'Skills', 'Contact'];

const heroSocials = [
  {
    label: 'LinkedIn',
    href: profile.socials.find((social) => social.label === 'LinkedIn')?.href || '#',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: profile.socials.find((social) => social.label === 'GitHub')?.href || '#',
    Icon: Github,
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
];

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setHeaderScrolled(window.scrollY > 72);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  // Back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.14,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frameId = 0;

    const updatePointer = (event) => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        root.style.setProperty('--mouse-x', `${event.clientX}px`);
        root.style.setProperty('--mouse-y', `${event.clientY}px`);
      });
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', updatePointer);
    };
  }, []);

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#home" className="skip-link">
        Skip to main content
      </a>

      <div className="relative min-h-screen overflow-hidden text-stone-100">
        <motion.div
          className="site-grid fixed inset-0 z-0"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          transition={{ delay: 2, duration: 2.0, ease: 'easeInOut' }}
        />

        {/* Light Burst Shockwave */}
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none bg-white/10"
          initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
          animate={{ clipPath: 'circle(50% at 50% 50%)', opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.0, delay: 1, ease: 'easeOut' }}
        />

        {/* Fixed header with pill nav + scroll-aware burger */}
        <motion.header
          className={`site-header ${headerScrolled ? 'site-header-scrolled' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        >
          <div className="header-shell mx-auto max-w-7xl px-5 py-5 lg:px-8">
            <div /> {/* Empty div to maintain grid layout */}

            <nav className="desktop-island-nav" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                  {item}
                </a>
              ))}
            </nav>

            <button
              aria-expanded={menuOpen}
              aria-label="Open navigation"
              className="header-menu-button"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.header>

        {/* Side panel mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="side-panel-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                className="side-panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="side-panel-header">
                  <button
                    aria-label="Close menu"
                    className="side-panel-close"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="side-panel-nav" aria-label="Mobile navigation">
                  <motion.div
                    className="side-panel-links"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                      hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }
                    }}
                  >
                    {navItems.map((item) => (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="mobile-nav-link hover-glow flex items-center justify-end gap-4 text-3xl sm:text-4xl py-3 font-sans font-bold text-stone-400 transition-all duration-300 group hover:-translate-x-4"
                        onClick={() => setMenuOpen(false)}
                        variants={{
                          hidden: { opacity: 0, x: 40 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                        }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent">
                          —
                        </span>
                        {item}
                      </motion.a>
                    ))}
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main id="home" className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />

        {/* Back to Top */}
        <AnimatePresence>
          {showBackToTop && <BackToTop />}
        </AnimatePresence>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero-shell relative min-h-screen px-5 lg:px-8">
      {/* Brand Logo - positioned at the top of hero section so it scrolls away */}
      <motion.div
        className="absolute top-0 left-0 right-0 w-full z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
      >
        <div className="header-shell mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <a href="#home" className="brand-lockup group pointer-events-auto">
            <span className="brand-dot" />
            <span className="brand-name font-display font-black text-white">Hazy</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        className="hero-layout hero-layout-centered mx-auto flex max-w-5xl items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <div className="hero-copy-block hero-copy-block-centered">
          <motion.h1
            className="hero-title font-display font-black text-white"
            initial={{
              opacity: 0,
              scale: 1.05,
              filter: 'blur(8px)',
              clipPath: 'inset(0 50% 0 50%)'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              clipPath: 'inset(0 0% 0 0%)'
            }}
            transition={{
              opacity: { delay: 1.2, duration: 0.2 },
              scale: { delay: 1.2, duration: 2.5, ease: 'easeOut' },
              filter: { delay: 1.2, duration: 1.5, ease: 'easeOut' },
              clipPath: { delay: 1.2, duration: 1.0, ease: 'easeInOut' }
            }}
          >
            <span data-title-text="Software Engineer">Software Engineer</span>
          </motion.h1>

          <motion.p
            className="hero-copy hero-copy-hud mt-7 leading-6"
            initial={{ opacity: 0, y: -15, filter: 'blur(5px)', clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' }}
            transition={{
              opacity: { delay: 1.5, duration: 0.8 },
              y: { delay: 1.5, duration: 1.5, ease: 'easeOut' },
              filter: { delay: 1.5, duration: 1.5, ease: 'easeOut' },
              clipPath: { delay: 1.5, duration: 2.0, ease: 'easeInOut' }
            }}
          >
            <span className="hud-corner hud-corner-tl" aria-hidden="true" />
            <span className="hud-corner hud-corner-br" aria-hidden="true" />
            Always asking how it works, why it breaks, and how to make it better.
          </motion.p>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.0 }}
      >
        <span className="scroll-cue-dot" aria-hidden="true" />
        <span className="scroll-cue-label">scroll down</span>
        <ArrowDown className="scroll-cue-arrow" aria-hidden="true" />
      </motion.a>

      <motion.div
        className="social-dock"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.0 }}
      >
        {heroSocials.map(({ label, href, Icon }) => (
          <a key={label} href={href} aria-label={label} title={label}>
            <Icon aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </motion.div>

      {/* Intro Spark */}
      <motion.div
        className="intro-spark"
        initial={{ x: '-50%', y: '100vh', opacity: 1, scaleY: 2 }}
        animate={{ x: '-50%', y: '50vh', opacity: [1, 1, 0], scaleY: [2, 1, 0] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ top: 0, bottom: 'auto' }}
      />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-screen px-5 lg:px-8">
      <motion.div
        className="about-split mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={revealVariants}
      >
        <div className="about-headline">
          <p className="text-xs font-black uppercase text-accent">About Me</p>
          <motion.h2
            className="mt-4 font-display font-black leading-none text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.6 } }
            }}
          >
            <span>
              <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }} style={{ display: 'inline-block', marginRight: '0.25em' }}>Hi,</motion.span>
              <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }} style={{ display: 'inline-block' }}>I&apos;m</motion.span>
            </span>
            <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }} className="about-name" style={{ display: 'block' }}>Hazy.</motion.span>
          </motion.h2>
        </div>

        <div className="about-copy-block">
          <ScrollFloat
            animationDuration={0.8}
            ease='power3.out'
            scrollStart='top bottom-=10%'
            scrollEnd='center center+=20%'
            stagger={0.015}
            textClassName="text-stone-300 font-sans text-lg sm:text-xl md:text-2xl leading-relaxed"
          >
            I'm a 20-year-old aspiring software engineer driven by a restless curiosity to uncover how systems operate beneath the surface, dissect why things fail, and continuously refine performance.
          </ScrollFloat>
          <ScrollFloat
            containerClassName="mt-8 about-quote"
            animationDuration={0.8}
            ease='power3.out'
            scrollStart='top bottom-=10%'
            scrollEnd='center center+=20%'
            stagger={0.015}
            textClassName="text-stone-300 font-sans text-lg sm:text-xl md:text-2xl leading-relaxed italic"
          >
            I bring this exact engineering focus, adaptability, and natural curiosity to every system I build, proving that great software is engineered rather than just written.
          </ScrollFloat>
          <motion.div
            className="about-actions"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
          >
            <motion.a
              href="#contact"
              className="about-action-button about-action-primary"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </motion.a>
            <motion.a
              href={profile.resumeUrl}
              className="about-action-button about-action-secondary"
              download
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function TypewriterText({ text, className, delay = 10 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let timeout;
    if (isInView) {
      const interval = Math.max(1, Math.floor(2000 / text.length));
      let currentIndex = 0;
      const type = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(type, interval);
        }
      };
      timeout = setTimeout(type, delay);
    } else {
      setDisplayedText('');
    }
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <motion.p
      className={className}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ once: false, amount: 0.2 }}
    >
      {displayedText}
      <span className="invisible">{text.slice(displayedText.length)}</span>
    </motion.p>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="projects-section px-5 lg:px-8">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
        variants={revealVariants}
      >
        <div className="section-heading projects-heading mb-16 max-w-3xl">
          <p className="text-xs font-black uppercase text-accent">Projects</p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Featured Projects
          </h2>
        </div>

        <div className="project-showcase-list">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;

            const mediaVariants = {
              hidden: { opacity: 0, x: isReversed ? 60 : -60 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            };

            const copyVariants = {
              hidden: { opacity: 0, x: isReversed ? -60 : 60 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            };

            return (
              <article
                key={project.title}
                className={`project-showcase ${isReversed ? 'project-showcase-reverse' : ''}`}
              >
                <motion.div
                  className="project-media"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={mediaVariants}
                >
                  <div
                    className="project-video-frame cursor-pointer"
                    aria-label={`${project.title} project preview`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="project-video-screen">
                      {project.videoUrl ? (
                        <video
                          src={project.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="project-preview-ui">
                          <aside className="preview-sidebar">
                            <span className="preview-logo">{project.title.slice(0, 2)}</span>
                            <span />
                            <span />
                            <span />
                            <span />
                          </aside>

                          <div className="preview-main">
                            <div className="preview-hero-bar">
                              <div>
                                <span className="preview-kicker">{project.type}</span>
                                <strong>{project.title}</strong>
                              </div>
                              <span className="preview-status">{project.status}</span>
                            </div>

                            <div className="preview-grid">
                              <div className="preview-panel preview-panel-large">
                                <span />
                                <span />
                                <span />
                                <span />
                              </div>
                              <div className="preview-panel">
                                <span />
                                <span />
                                <span />
                              </div>
                              <div className="preview-panel">
                                <span />
                                <span />
                                <span />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}


                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="project-copy"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={copyVariants}
                >
                  <p className="project-number">{String(index + 1).padStart(2, '0')}</p>
                  <p className="project-type">{project.type}</p>
                  <h3 className="font-display font-black text-white">{project.title}</h3>
                  <p className="text-sm font-bold text-accent/80 mt-1 mb-2">{project.role}</p>
                  <TypewriterText text={project.shortDescription || project.description} className="project-description" />

                  <div className="project-actions">
                    <button
                      type="button"
                      className="project-explore-button"
                      onClick={() => setSelectedProject(project)}
                    >
                      Explore full project
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="project-modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="laptop-container" onMouseDown={(e) => e.stopPropagation()}>
        {/* Animated Lid */}
        <motion.div
          className="laptop-lid"
          initial={{ rotateX: -90, scale: 0.95 }}
          animate={{ rotateX: 0, scale: 1 }}
          exit={{ rotateX: -90, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "bottom center" }}
        >
          <div className="laptop-bezel">
            <div className="laptop-camera" />

            <div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} project details`}
            >
              {/* Close button */}
              <button
                type="button"
                className="project-modal-close"
                aria-label="Close project details"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Scrollable body */}
              <div className="project-modal-layout">
                {/* Header */}
                <header className="project-modal-header">
                  <h2 className="font-display text-5xl font-black text-white sm:text-6xl flex items-center gap-3">
                    {project.title}
                    <ArrowUpRight className="h-8 w-8 text-white/50" />
                  </h2>
                </header>

                {/* Details Grid */}
                <div className="project-modal-details">
                  <section className="project-modal-column">
                    <h3 className="project-modal-col-heading">Technical Breakdown</h3>
                    <p className="project-modal-text">{project.description}</p>
                  </section>

                  <section className="project-modal-column">
                    <h3 className="project-modal-col-heading">Technologies</h3>
                    <ul className="project-modal-tech-list">
                      {project.techList?.map((techGroup) => (
                        <li key={techGroup.category}>
                          <strong>{techGroup.category}:</strong> {techGroup.tech}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Media Player */}
                {project.videoUrl ? (
                  <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black ring-1 ring-white/5 shadow-2xl relative">
                    <video
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="project-modal-image-placeholder">
                    <p className="text-center text-white/20 text-sm">No Media Available</p>
                  </div>
                )}
              </div>

              {/* Footer links */}
              <div className="project-modal-footer">
                {project.links?.demo && project.links.demo !== '#' && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="modal-link-btn modal-link-primary">
                    <ArrowUpRight className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {project.links?.code && project.links.code !== '#' && (
                  <a href={project.links.code} target="_blank" rel="noreferrer" className="modal-link-btn modal-link-secondary">
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Laptop Base (Keyboard Deck) */}
        <div className="laptop-base">
          <div className="laptop-notch-cutout" />
          <div className="laptop-trackpad" />
        </div>
      </div>
    </motion.div>
  );
}

const skillAnimation = {
  animate: (i) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.15,
    },
  }),
};

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Development Stack & Tools">
      <div className="skills-formation-container mt-16 flex flex-col items-center justify-center gap-4 sm:gap-6 w-full max-w-4xl mx-auto py-8">
        {(() => {
          const rows = [3, 4, 4, 4, 3];
          let currentIndex = 0;
          return rows.map((rowCount, rowIndex) => {
            const rowSkills = flatSkills.slice(currentIndex, currentIndex + rowCount);
            currentIndex += rowCount;

            return (
              <div key={rowIndex} className="flex flex-wrap justify-center gap-3 sm:gap-5 w-full">
                {rowSkills.map((skill, index) => {
                  const globalIndex = currentIndex - rowCount + index;
                  return (
                    <div
                      key={skill.name}
                      data-reveal="fade-up"
                      style={{ '--reveal-delay': `${globalIndex * 50}ms` }}
                    >
                      <motion.div
                        custom={globalIndex}
                        variants={skillAnimation}
                        animate="animate"
                        whileHover={{ scale: 1.1 }}
                        className="skill-pill-formation flex items-center gap-3 sm:gap-4 cursor-default"
                      >
                        <img src={skill.icon} alt={skill.name} className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md" />
                        <span className="font-bold text-base sm:text-lg text-white tracking-wide whitespace-nowrap">{skill.name}</span>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            );
          });
        })()}
      </div>
    </Section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error
  const contactVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xqaqjbyl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Open for Opportunities & Collaborations">
      <div className="contact-grid mt-12">
        {/* Left — Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
        >
          <motion.div className="contact-form-field" variants={contactVariants}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </motion.div>
          <motion.div className="contact-form-field" variants={contactVariants}>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </motion.div>
          <motion.div className="contact-form-field" variants={contactVariants}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              placeholder="Tell me about your project or opportunity…"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            />
          </motion.div>
          <motion.button
            type="submit"
            className="contact-submit-btn"
            disabled={formStatus === 'sending'}
            variants={contactVariants}
          >
            {formStatus === 'sending' ? (
              'Sending…'
            ) : formStatus === 'sent' ? (
              'Message sent ✓'
            ) : formStatus === 'error' ? (
              'Failed — try again'
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Right — Socials + Info */}
        <motion.div
          className="contact-info"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          <motion.p
            className="max-w-md leading-8 text-stone-400 text-lg mb-8"
            variants={contactVariants}
          >
            I am currently available for new opportunities focused on creating clean, functional software. Reach out to discuss a collaboration or just connect.
          </motion.p>

          <motion.div className="contact-links-stack" variants={contactVariants}>
            {profile.socials.map((social) => {
              const labelLower = social.label.toLowerCase();
              const Icon = labelLower.includes('github') || labelLower.includes('repo') ? Github
                : labelLower.includes('linkedin') ? Linkedin
                  : labelLower.includes('email') ? Mail
                    : null;

              return (
                <a key={social.label} href={social.href} className="contact-social-btn group">
                  {Icon && <Icon className="h-5 w-5" />}
                  {social.label}
                  <ArrowUpRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-stone-500 bg-[#101010] px-4 py-2 rounded-full border border-white/5"
            variants={contactVariants}
          >
            <MapPin className="w-3.5 h-3.5" />
            Based in {profile.location}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}



function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10">
      <div className="footer-inner mx-auto max-w-7xl px-5 lg:px-8">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-name font-display font-black text-white text-xl">Hazy</span>
            <p className="footer-tagline">{profile.tagline}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="footer-nav-link">
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Hazy Bright P. Reyes. All rights reserved.
          </p>
          <div className="footer-socials">
            {profile.socials.map((social) => {
              const labelLower = social.label.toLowerCase();
              const Icon = labelLower.includes('github') ? Github
                : labelLower.includes('linkedin') ? Linkedin
                  : labelLower.includes('email') ? Mail
                    : null;
              return (
                <a key={social.label} href={social.href} className="footer-social-icon" aria-label={social.label}>
                  {Icon && <Icon className="h-4 w-4" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  return (
    <motion.button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section-screen px-5 lg:px-8">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={revealVariants}
      >
        <div className="section-heading mb-10 max-w-3xl">
          <p className="text-xs font-black uppercase text-accent">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

export default App;

