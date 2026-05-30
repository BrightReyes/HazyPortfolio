import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Play,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile, projects, skills } from './data/portfolio';

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

  return (
    <div className="relative min-h-screen overflow-hidden text-stone-100">
      <div className="site-grid fixed inset-0 z-0" />

      <header className={`site-header ${headerScrolled ? 'site-header-scrolled' : ''}`}>
        <div className="header-shell mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <a href="#home" className="brand-lockup group">
            <span className="brand-dot" />
            <span className="brand-name font-display font-black text-white">Hazy</span>
          </a>

          <nav className="desktop-island-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </nav>

          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="header-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="floating-menu" aria-label="Collapsed navigation">
            <div className="floating-menu-inner">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="home" className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-shell relative min-h-screen px-5 lg:px-8">
      <div className="hero-layout hero-layout-centered mx-auto flex max-w-5xl items-center justify-center">
        <div className="hero-copy-block hero-copy-block-centered">
          <h1 className="hero-title font-display font-black text-white">
            <span data-title-text="Software Engineer">Software Engineer</span>
          </h1>

          <p className="hero-copy hero-copy-hud mt-7 leading-6">
            <span className="hud-corner hud-corner-tl" aria-hidden="true" />
            <span className="hud-corner hud-corner-br" aria-hidden="true" />
            Always asking how it works, why it breaks, and how to make it better.
          </p>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">
        <span className="scroll-cue-dot" aria-hidden="true" />
        <span className="scroll-cue-label">scroll down</span>
        <ArrowDown className="scroll-cue-arrow" aria-hidden="true" />
      </a>
      <div className="social-dock">
        {heroSocials.map(({ label, href, Icon }) => (
          <a key={label} href={href} aria-label={label} title={label}>
            <Icon aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-screen px-5 lg:px-8">
      <div className="about-split mx-auto max-w-7xl">
        <div className="about-headline">
          <p className="text-xs font-black uppercase text-accent">About Me</p>
          <h2 className="mt-4 font-display font-black leading-none text-white">
            <span>Hi, I&apos;m</span>
            <span className="about-name">Hazy.</span>
          </h2>
        </div>

        <div className="about-copy-block">
          <p>
            I&apos;m a 20-year-old aspiring software engineer driven by a restless curiosity to
            uncover how systems operate beneath the surface, dissect why things fail, and
            continuously refine performance.
          </p>
          <p className="about-quote">
            &quot;I bring this exact engineering focus, adaptability, and natural curiosity to every
            system I build, proving that great software is engineered rather than just written.&quot;
          </p>
          <div className="about-actions">
            <a href="#contact" className="about-action-button about-action-primary">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </a>
            <a href={profile.resumeUrl} className="about-action-button about-action-secondary" download>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
          </div>
        </div>
      </div>
    </section>
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
      <div className="mx-auto max-w-7xl">
        <div className="section-heading projects-heading mb-16 max-w-3xl">
          <p className="text-xs font-black uppercase text-accent">Projects</p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            Five continuous builds shaped like product demos.
          </h2>
        </div>

        <div className="project-showcase-list">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`project-showcase ${index % 2 === 1 ? 'project-showcase-reverse' : ''}`}
            >
              <div className="project-media">
                <div className="project-video-frame" aria-label={`${project.title} project preview`}>
                  <div className="project-video-screen">
                    <div className="project-video-topbar">
                      <div className="video-dots" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </div>
                      <span>{project.title} preview</span>
                    </div>

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

                    <div className="project-video-control" aria-hidden="true">
                      <span className="project-play-button">
                        <Play className="h-4 w-4" />
                      </span>
                      <span className="project-video-progress">
                        <span />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-copy">
                <p className="project-number">{String(index + 1).padStart(2, '0')}</p>
                <p className="project-type">{project.type}</p>
                <h3 className="font-display font-black text-white">{project.title}</h3>
                <p className="project-description">{project.description}</p>

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
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="project-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="project-modal-close" aria-label="Close project details" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>

        <div className="project-modal-hero">
          <p>{project.type}</p>
          <h2 className="font-display font-black text-white">{project.title}</h2>
          <span>{project.status} / {project.year}</span>
        </div>

        <div className="project-modal-body">
          <section className="project-modal-section project-modal-overview">
            <h3>Project Overview</h3>
            <p>{project.description}</p>
            <p>
              Add the full project story here later: the problem, users, core workflow, design
              decisions, important features, challenges, and final outcome.
            </p>
          </section>

          <section className="project-modal-section">
            <h3>Role</h3>
            <p>{project.role || 'Project role placeholder'}</p>
          </section>

          <section className="project-modal-section">
            <h3>Tech Stack</h3>
            <div className="project-modal-stack">
              {project.stack.map((item) => (
                <span key={item} className="tech-pill">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="project-modal-section">
            <h3>Key Features</h3>
            <ul>
              <li>Feature detail placeholder</li>
              <li>Technical implementation placeholder</li>
              <li>Result or impact placeholder</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="A focused engineering stack for building reliable applications.">
      <div className="timeline-panel">
        {skills.map((skillGroup, index) => (
          <article key={skillGroup.group} className="timeline-row">
            <div className="timeline-index">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <p className="text-sm font-black uppercase text-accent">Core Skill</p>
              <h3 className="mt-2 font-display text-2xl font-black text-white">{skillGroup.group}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span key={item} className="tech-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-screen px-5 lg:px-8">
      <div className="contact-panel mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase text-accent">Contact</p>
          <h2 className="mt-4 font-display text-4xl font-black text-white sm:text-5xl">
            Let&apos;s build something clean and useful.
          </h2>
          <p className="mt-5 leading-8 text-stone-400">
            Update the email and social links, then use this section for internship applications, capstone demos, or client-ready work.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          <a href={`mailto:${profile.email}`} className="contact-link">
            <Mail className="h-5 w-5" />
            Email Me
          </a>
          {profile.socials.slice(0, 2).map((social) => (
            <a key={social.label} href={social.href} className="contact-link">
              <ArrowUpRight className="h-5 w-5" />
              {social.label}
            </a>
          ))}
        </div>

        <div className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-stone-500">
          <GraduationCap className="h-5 w-5 text-accent" />
          {profile.location}
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section-screen px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-heading mb-10 max-w-3xl">
          <p className="text-xs font-black uppercase text-accent">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default App;
