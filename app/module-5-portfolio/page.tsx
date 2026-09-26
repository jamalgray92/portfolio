"use client";

import React, { useState, useEffect } from "react";

// Use an asset base so images work on GitHub Pages under /portfolio and locally
const assetBase = process.env.NODE_ENV === "production" ? "/portfolio" : "";

type Project = {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
};

const projects: Project[] = [
  {
    id: "sumarist-clone",
    title: "Summarist Clone",
    description: "A responsive reading and audiobook platform with book discovery, library features, search, and premium-style functionality built in React.",
    image: assetBase + "/images/summarist.png",
    url: "https://jamalgray92.github.io/summarist-clone/",
  },
  {
    id: "website-clone",
    title: "Website Clone",
    description: "A responsive front-end recreation that matches modern landing page design, spacing, typography, and responsive behavior.",
    image: assetBase + "/images/website-clone.png",
    url: "https://jamalgray92.github.io/website-clone/",
  },
  {
    id: "react-movie-app",
    title: "React Movie App",
    description: "A React movie search application with live results, sorting, ratings, responsive layouts, and movie detail navigation.",
    image: assetBase + "/images/react-movie-app.png",
    url: "https://jamalgray92.github.io/react-movie-app/",
  },
];

function Header({ dark, setDark }: { dark: boolean; setDark: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <h1 style={styles.logo}>Jamal Gray</h1>
        <nav style={{ display: "flex", alignItems: "center" }}>
          <a href="#projects" style={styles.navLink}>
            Projects
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact
          </a>
          <a href="#about" style={styles.cta}>
            Resume
          </a>

          <button
            onClick={() => setDark(!dark)}
            aria-pressed={dark}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={styles.toggleButton}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.clearTimeout(id);
  }, []);

  const heroStyle: React.CSSProperties = {
    ...styles.hero,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 600ms ease, transform 600ms ease",
  };

  return (
    <section style={heroStyle}>
      <div style={styles.heroInner}>
        <h1 style={styles.heroTitle}>Jamal Gray</h1>
        <p style={styles.heroSubtitle}>Front-end developer — building accessible, high-performance interfaces.</p>
        <div style={styles.heroActions}>
          <a href="#projects" style={{ ...styles.button, ...styles.ghostButton }}>
            View Projects
          </a>
          <a href="mailto:hello@example.com" style={{ ...styles.button, ...styles.primaryButton }}>
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
      style={styles.card}
      aria-labelledby={`project-${project.id}`}
    >
      <a href={project.url ?? "#"} style={{ textDecoration: "none", color: "inherit" }}>
        {project.image && (
          <img src={project.image} alt={project.title} style={styles.cardImage} />
        )}

        <div style={styles.cardBody}>
          <h3 id={`project-${project.id}`} style={styles.cardTitle}>
            {project.title}
          </h3>
          <p style={styles.cardDesc}>{project.description}</p>
        </div>
      </a>

      <div style={styles.cardFooter}>
        <a href={project.url ?? "#"} style={styles.cardLink}>
          View
        </a>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const [dark, setDark] = useState(false);

  const lightVars: React.CSSProperties = {
    // CSS variables for light theme
    ["--page-bg"]: "#ffffff",
    ["--surface"]: "#ffffff",
    ["--text"]: "#0f172a",
    ["--muted"]: "#475569",
    ["--border"]: "#e6eef8",
    ["--primary"]: "#0f172a",
    ["--button-text"]: "#ffffff",
    ["--hero"]: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    ["--footer-text"]: "#64748b",
  } as any;

  const darkVars: React.CSSProperties = {
    // CSS variables for dark theme
    ["--page-bg"]: "#071029",
    ["--surface"]: "#0b1220",
    ["--text"]: "#e6eef8",
    ["--muted"]: "#94a3b8",
    ["--border"]: "#10233a",
    ["--primary"]: "#60a5fa",
    ["--button-text"]: "#06202a",
    ["--hero"]: "linear-gradient(180deg, #071029 0%, #071b2a 100%)",
    ["--footer-text"]: "#94a3b8",
  } as any;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const err: { [k: string]: string } = {};
    if (!name.trim()) err.name = "Name is required";
    if (!email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Email is invalid";
    if (!message.trim()) err.message = "Message is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!validate()) return;
    // Here you would send the data to a server. For now, just log and show a success message.
    console.log({ name, email, message });
    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  };

  const isFormValid = name.trim() !== '' && /^\S+@\S+\.\S+$/.test(email) && message.trim() !== '';
  const themeVars = dark ? darkVars : lightVars;

  return (
    <div style={{ ...styles.page, ...themeVars }}>
      <Header dark={dark} setDark={setDark} />
      <main style={styles.main}>
        <Hero />

        <section id="about" style={{ padding: "64px 20px", background: "var(--hero)" }}>
          <div style={styles.sectionInner}>
            <div style={styles.aboutGrid}>
              <div style={styles.profileWrap}>
                <img
  src={`${assetBase}/images/jamal-profile.jpeg`}
  alt="Jamal Gray"
  style={styles.profileImage}
/>
              </div>

              <div style={styles.aboutContent}>
                <h2 style={styles.sectionTitle}>About</h2>
                <p style={styles.sectionLead}>
                  Jamal Gray is a front-end developer who builds accessible, high-performance
                  interfaces. With a background in design and engineering, Jamal focuses on
                  creating maintainable user experiences that scale across devices.
                </p>

                <h3 style={{ margin: "16px 0 8px" }}>Skills</h3>
                <ul style={styles.skillsList}>
                  <li style={styles.skillItem}>HTML</li>
                  <li style={styles.skillItem}>CSS</li>
                  <li style={styles.skillItem}>JavaScript</li>
                  <li style={styles.skillItem}>React</li>
                  <li style={styles.skillItem}>Tailwind CSS</li>
                  <li style={styles.skillItem}>Git</li>
                  <li style={styles.skillItem}>Responsive web design</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" style={styles.section}>
          <div style={styles.sectionInner}>
            <h2 style={styles.sectionTitle}>Selected Projects</h2>
            <p style={styles.sectionLead}>A few recent projects, prototypes, and experiments.</p>

            <div style={styles.grid}>
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" style={styles.section}>
          <div style={styles.sectionInner}>
            <h2 style={styles.sectionTitle}>Contact</h2>
            <p style={styles.sectionLead}>Interested in working together? Fill out the form below or email <a href="mailto:hello@example.com" style={styles.footerLink}>hello@example.com</a></p>

            <form onSubmit={handleSubmit} noValidate style={styles.contactForm}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.formLabel}>Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.inputField}
                />
                {errors.name && <div style={styles.errorText}>{errors.name}</div>}
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.inputField}
                />
                {errors.email && <div style={styles.errorText}>{errors.email}</div>}
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.formLabel}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={styles.textareaField}
                  rows={6}
                />
                {errors.message && <div style={styles.errorText}>{errors.message}</div>}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    ...styles.submitButton,
                    ...(isFormValid ? {} : styles.disabledButton),
                    opacity: !isFormValid ? 0.6 : undefined,
                    cursor: !isFormValid ? "not-allowed" : undefined,
                  }}
                >
                  Send Message
                </button>
                {success && <div style={{ color: "var(--primary)", fontWeight: 600 }}>Message sent — thanks!</div>}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>© {new Date().getFullYear()} Jamal Gray. All rights reserved.</div>
          <div>
            <a href="https://github.com/jamalgray" style={styles.footerLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/jamalgray" style={styles.footerLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="https://twitter.com/jamalgray" style={styles.footerLink} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  page: {
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: "var(--text)",
    background: "var(--page-bg)",
    lineHeight: 1.5,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    borderBottom: "1px solid var(--border)",
    background: "var(--surface)",
    position: "sticky",
    top: 0,
    zIndex: 40,
  },
  headerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
  },
  navLink: {
    marginLeft: 16,
    color: "var(--text)",
    textDecoration: "none",
    fontSize: 14,
  },
  cta: {
    marginLeft: 16,
    padding: "8px 12px",
    background: "var(--primary)",
    color: "var(--button-text)",
    textDecoration: "none",
    borderRadius: 6,
    fontSize: 14,
  },
  toggleButton: {
    marginLeft: 12,
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--text)",
    cursor: "pointer",
    fontSize: 16,
  },
  main: {
    flex: "1 0 auto",
  },
  hero: {
    padding: "64px 20px",
    background: "var(--hero)",
  },
  heroInner: {
    maxWidth: 900,
    margin: "0 auto",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 32,
    margin: "0 0 12px",
    lineHeight: 1.15,
  },
  heroSubtitle: {
    fontSize: 16,
    margin: "0 0 20px",
    color: "var(--muted)",
  },
  heroActions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginTop: 8,
  },
  button: {
    padding: "10px 14px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    display: "inline-block",
  },
  primaryButton: {
    background: "var(--primary)",
    color: "var(--button-text)",
  },
  ghostButton: {
    background: "transparent",
    color: "var(--text)",
    border: "1px solid var(--border)",
  },
  section: {
    padding: "48px 20px",
  },
  sectionInner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: 22,
    margin: "0 0 8px",
  },
  sectionLead: {
    margin: "0 0 20px",
    color: "var(--muted)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
    marginTop: 12,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: 16,
    boxShadow: "0 1px 2px rgba(16,24,40,0.03)",
  },
  cardBody: {},
  cardImage: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: 16,
  },

  /* About section */
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyItems: "center",
    gap: 20,
    alignItems: "center",
    maxWidth: 720,
    margin: "0 auto",
  },
  profileWrap: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  profileImage: {
    width: "min(100%, 240px)",
    height: "clamp(240px, 40vw, 320px)",
    borderRadius: 24,
    objectFit: "cover",
    objectPosition: "center top",
    border: "1px solid var(--border)",
  },
  aboutContent: {
    maxWidth: 720,
    textAlign: "center",
  },
  skillsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    listStyle: "none",
    padding: 0,
    margin: "12px auto 0",
    justifyContent: "center",
  },
  skillItem: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    padding: "6px 10px",
    borderRadius: 8,
    fontSize: 13,
    color: "var(--text)",
  },
  cardDesc: {
    margin: 0,
    color: "var(--muted)",
    fontSize: 14,
  },

  /* Contact / form styles */
  contactForm: {
    maxWidth: 700,
    marginTop: 12,
  },
  formGroup: {
    marginBottom: 12,
  },
  formLabel: {
    display: "block",
    marginBottom: 6,
    fontSize: 14,
    color: "var(--text)",
  },
  inputField: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--text)",
    fontSize: 14,
  },
  textareaField: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--text)",
    fontSize: 14,
    minHeight: 140,
  },
  submitButton: {
    padding: "10px 16px",
  },
  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
    filter: "grayscale(10%)",
  },
  errorText: {
    marginTop: 6,
    color: "#ef4444",
    fontSize: 13,
  },

  cardFooter: {
    marginTop: 16,
    display: "flex",
    justifyContent: "flex-end",
  },
  cardLink: {
    fontSize: 13,
    color: "var(--primary)",
    textDecoration: "none",
    fontWeight: 600,
  },
  footer: {
    borderTop: "1px solid var(--border)",
    padding: "18px 20px",
    background: "var(--surface)",
  },
  footerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    fontSize: 14,
    color: "var(--footer-text)",
  },
  footerLink: {
    marginLeft: 12,
    color: "var(--text)",
    textDecoration: "none",
  },
};
