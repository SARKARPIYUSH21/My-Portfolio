import { useState, useEffect, useRef } from "react";
import piyushPhoto from './assets/piyush.jpg'

const COLORS = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#16161f",
  purple: "#9b5de5",
  violet: "#7b2ff7",
  lavender: "#c77dff",
  accent: "#e040fb",
  text: "#f0eaff",
  muted: "#8b7fa8",
  border: "#2a2040",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  ::selection { background: ${COLORS.violet}44; color: ${COLORS.lavender}; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.violet}; border-radius: 2px; }

  .cursor {
    position: fixed; width: 12px; height: 12px;
    background: ${COLORS.accent}; border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s, width 0.2s, height 0.2s, opacity 0.2s;
    mix-blend-mode: screen;
  }
  .cursor-ring {
    position: fixed; width: 36px; height: 36px;
    border: 1.5px solid ${COLORS.purple}88;
    border-radius: 50%; pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.18s ease, width 0.2s, height 0.2s;
  }

  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .glow-orb {
    position: fixed; border-radius: 50%; filter: blur(120px);
    pointer-events: none; z-index: 0;
  }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 60px;
    display: flex; justify-content: space-between; align-items: center;
    background: ${COLORS.bg}cc;
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${COLORS.border};
  }

  .nav-logo {
    font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
    background: linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  .nav-links { display: flex; gap: 36px; }
  .nav-links a {
    color: ${COLORS.muted}; text-decoration: none; font-size: 14px;
    font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
    transition: color 0.2s; cursor: none;
  }
  .nav-links a:hover { color: ${COLORS.lavender}; }

  section { position: relative; z-index: 2; }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 120px 60px 60px;
    justify-content: space-between; gap: 60px;
  }
  .hero-content { max-width: 640px; }

  .hero-photo-wrap {
    position: relative; flex-shrink: 0;
  }
  .hero-photo-ring {
    position: absolute; inset: -10px; border-radius: 50%;
    background: conic-gradient(from 0deg, ${COLORS.violet}, ${COLORS.accent}, ${COLORS.lavender}, ${COLORS.violet});
    animation: spin 6s linear infinite;
    z-index: 0;
  }
  .hero-photo-ring-inner {
    position: absolute; inset: 3px; border-radius: 50%;
    background: ${COLORS.bg}; z-index: 1;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .hero-photo {
    position: relative; z-index: 2;
    width: 340px; height: 340px; border-radius: 50%; object-fit: cover;
    object-position: center top;
    display: block;
  }
  .hero-photo-badge {
    position: absolute; bottom: 10px; right: -10px; z-index: 3;
    background: ${COLORS.card}; border: 1px solid ${COLORS.border};
    border-radius: 12px; padding: 10px 16px;
    font-family: 'DM Mono', monospace; font-size: 12px; color: ${COLORS.lavender};
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 8px 32px #0008;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${COLORS.violet}22; border: 1px solid ${COLORS.violet}44;
    color: ${COLORS.lavender}; padding: 6px 14px; border-radius: 100px;
    font-family: 'DM Mono', monospace; font-size: 12px; margin-bottom: 32px;
    animation: fadeUp 0.6s ease both;
  }
  .badge-dot { width: 6px; height: 6px; background: ${COLORS.accent}; border-radius: 50%; animation: pulse 2s infinite; }
  
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideRight { from{width:0} to{width:100%} }

  .hero-name {
    font-size: clamp(56px, 8vw, 96px); font-weight: 800; line-height: 0.95;
    letter-spacing: -3px; margin-bottom: 24px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-name span {
    background: linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.accent} 50%, ${COLORS.lavender} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-role {
    font-family: 'DM Mono', monospace; font-size: 18px; color: ${COLORS.muted};
    margin-bottom: 20px; animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-desc {
    font-size: 18px; color: ${COLORS.muted}; line-height: 1.7; max-width: 580px;
    margin-bottom: 44px; animation: fadeUp 0.6s 0.3s ease both;
  }
  .hero-cta { display: flex; gap: 16px; animation: fadeUp 0.6s 0.4s ease both; }

  .btn-primary {
    padding: 14px 32px; border-radius: 8px; cursor: none;
    background: linear-gradient(135deg, ${COLORS.violet}, ${COLORS.accent});
    color: white; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 15px; border: none; transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 32px ${COLORS.violet}44;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 40px ${COLORS.violet}66; }

  .btn-ghost {
    padding: 14px 32px; border-radius: 8px; cursor: none;
    background: transparent; color: ${COLORS.lavender};
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px;
    border: 1px solid ${COLORS.border}; transition: border-color 0.2s, background 0.2s;
  }
  .btn-ghost:hover { border-color: ${COLORS.purple}; background: ${COLORS.purple}11; }

  .hero-scroll {
    position: absolute; bottom: 40px; left: 60px;
    display: flex; align-items: center; gap: 12px;
    color: ${COLORS.muted}; font-family: 'DM Mono', monospace; font-size: 11px;
    animation: fadeIn 1s 0.8s both;
  }
  .scroll-line {
    width: 40px; height: 1px; background: linear-gradient(90deg, ${COLORS.violet}, transparent);
    animation: slideRight 1.5s 1s both;
  }

  /* SECTIONS COMMON */
  .section-wrap { padding: 100px 60px; }
  .section-label {
    font-family: 'DM Mono', monospace; font-size: 12px; color: ${COLORS.violet};
    letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::before {
    content:''; display:inline-block; width:24px; height:1px;
    background: ${COLORS.violet};
  }
  .section-title {
    font-size: clamp(36px, 5vw, 56px); font-weight: 800;
    letter-spacing: -2px; line-height: 1; margin-bottom: 60px;
  }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-text p { color: ${COLORS.muted}; line-height: 1.8; font-size: 17px; margin-bottom: 20px; }
  .about-stats { display: flex; gap: 40px; margin-top: 40px; }
  .stat-num {
    font-size: 40px; font-weight: 800;
    background: linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .stat-label { font-family: 'DM Mono', monospace; font-size: 12px; color: ${COLORS.muted}; margin-top: 4px; }
  .about-card {
    background: ${COLORS.card}; border: 1px solid ${COLORS.border};
    border-radius: 20px; padding: 40px;
    position: relative; overflow: hidden;
  }
  .about-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, ${COLORS.violet}08, transparent);
  }
  .about-card-title { font-size: 13px; font-family: 'DM Mono', monospace; color: ${COLORS.violet}; margin-bottom: 20px; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .skill-category {
    background: ${COLORS.card}; border: 1px solid ${COLORS.border};
    border-radius: 16px; padding: 28px;
    transition: border-color 0.3s, transform 0.3s;
  }
  .skill-category:hover { border-color: ${COLORS.purple}66; transform: translateY(-4px); }
  .skill-cat-title {
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: ${COLORS.violet}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag {
    background: ${COLORS.violet}18; border: 1px solid ${COLORS.violet}33;
    color: ${COLORS.lavender}; padding: 5px 12px; border-radius: 100px;
    font-size: 13px; font-weight: 600;
  }

  /* EXPERIENCE */
  .exp-item {
    display: grid; grid-template-columns: 200px 1fr;
    gap: 40px; padding: 40px 0;
    border-bottom: 1px solid ${COLORS.border};
  }
  .exp-item:last-child { border-bottom: none; }
  .exp-date { font-family: 'DM Mono', monospace; font-size: 12px; color: ${COLORS.muted}; padding-top: 4px; }
  .exp-role { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
  .exp-org {
    font-family: 'DM Mono', monospace; font-size: 13px; color: ${COLORS.violet}; margin-bottom: 16px;
  }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    color: ${COLORS.muted}; font-size: 15px; line-height: 1.6; padding: 4px 0;
    padding-left: 16px; position: relative;
  }
  .exp-bullets li::before {
    content: '→'; position: absolute; left: 0; color: ${COLORS.violet};
  }

  /* ACHIEVEMENTS */
  .achievements-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .achievement-card {
    background: ${COLORS.card}; border: 1px solid ${COLORS.border};
    border-radius: 20px; padding: 36px 32px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .achievement-card:hover {
    border-color: ${COLORS.purple}88;
    transform: translateY(-6px);
    box-shadow: 0 24px 60px ${COLORS.violet}22;
  }
  .achievement-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, ${COLORS.violet}08, transparent);
  }
  .achievement-icon {
    font-size: 36px; margin-bottom: 20px; display: block;
    filter: drop-shadow(0 0 12px ${COLORS.violet}66);
  }
  .achievement-title {
    font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 6px;
  }
  .achievement-org {
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: ${COLORS.violet}; letter-spacing: 1px; margin-bottom: 14px;
    text-transform: uppercase;
  }
  .achievement-desc { color: ${COLORS.muted}; font-size: 14px; line-height: 1.6; }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .project-card {
    background: ${COLORS.card}; border: 1px solid ${COLORS.border};
    border-radius: 20px; padding: 36px;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden;
    cursor: none;
  }
  .project-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, ${COLORS.violet}06, transparent);
    transition: opacity 0.3s;
  }
  .project-card:hover {
    border-color: ${COLORS.purple}88;
    transform: translateY(-6px);
    box-shadow: 0 24px 60px ${COLORS.violet}22;
  }
  .project-card:hover::before { opacity: 3; }
  .project-num {
    font-family: 'DM Mono', monospace; font-size: 12px;
    color: ${COLORS.violet}; margin-bottom: 20px;
  }
  .project-name { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 12px; }
  .project-desc { color: ${COLORS.muted}; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
  .project-tech { display: flex; flex-wrap: wrap; gap: 8px; }
  .tech-pill {
    background: ${COLORS.surface}; border: 1px solid ${COLORS.border};
    color: ${COLORS.muted}; padding: 4px 12px; border-radius: 100px;
    font-family: 'DM Mono', monospace; font-size: 11px;
  }
  .project-arrow {
    position: absolute; top: 36px; right: 36px;
    font-size: 20px; color: ${COLORS.border};
    transition: color 0.3s, transform 0.3s;
  }
  .project-card:hover .project-arrow { color: ${COLORS.accent}; transform: translate(3px, -3px); }

  /* CONTACT */
  .contact-wrap {
    background: ${COLORS.card}; border: 1px solid ${COLORS.border};
    border-radius: 24px; padding: 80px; text-align: center;
    position: relative; overflow: hidden;
  }
  .contact-wrap::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, ${COLORS.violet}12, transparent 70%);
  }
  .contact-big {
    font-size: clamp(40px, 6vw, 72px); font-weight: 800;
    letter-spacing: -2px; margin-bottom: 16px;
  }
  .contact-sub { color: ${COLORS.muted}; font-size: 18px; margin-bottom: 48px; }
  .contact-links { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
  .contact-link {
    display: flex; align-items: center; gap: 8px;
    background: ${COLORS.surface}; border: 1px solid ${COLORS.border};
    color: ${COLORS.text}; padding: 12px 24px; border-radius: 10px;
    text-decoration: none; font-weight: 600; font-size: 15px;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    cursor: none;
  }
  .contact-link:hover {
    border-color: ${COLORS.violet}; background: ${COLORS.violet}18; transform: translateY(-2px);
  }

  footer {
    padding: 32px 60px; border-top: 1px solid ${COLORS.border};
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'DM Mono', monospace; font-size: 12px; color: ${COLORS.muted};
    position: relative; z-index: 2;
  }

  /* === TABLET (max 900px) === */
  @media (max-width: 900px) {
    nav { padding: 16px 24px; }
    .nav-links { gap: 20px; }
    .nav-links a { font-size: 12px; }
    .hero { padding: 100px 24px 60px; flex-direction: column; align-items: center; gap: 40px; }
    .hero-photo { width: 220px; height: 220px; }
    .hero-content { max-width: 100%; text-align: center; }
    .hero-cta { justify-content: center; }
    .hero-scroll { left: 50%; transform: translateX(-50%); }
    .section-wrap { padding: 60px 24px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .about-stats { gap: 24px; }
    .skills-grid { grid-template-columns: 1fr 1fr; }
    .achievements-grid { grid-template-columns: 1fr 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
    .exp-item { grid-template-columns: 1fr; gap: 8px; }
    .contact-wrap { padding: 40px 24px; }
    .contact-links { flex-direction: column; align-items: center; }
    footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
  }

  /* === MOBILE (max 600px) === */
  @media (max-width: 600px) {
    nav { padding: 14px 16px; }
    .nav-links { gap: 12px; }
    .nav-links a { font-size: 11px; letter-spacing: 0; }
    .hero { padding: 90px 16px 48px; }
    .hero-photo { width: 160px; height: 160px; }
    .hero-badge { font-size: 11px; padding: 5px 12px; }
    .hero-desc { font-size: 15px; }
    .hero-cta { flex-direction: column; gap: 12px; }
    .btn-primary, .btn-ghost { width: 100%; text-align: center; }
    .section-wrap { padding: 48px 16px; }
    .section-title { letter-spacing: -1px; margin-bottom: 36px; }
    .about-stats { flex-wrap: wrap; gap: 20px; }
    .skills-grid { grid-template-columns: 1fr; }
    .achievements-grid { grid-template-columns: 1fr; }
    .achievement-card { padding: 24px 20px; }
    .project-card { padding: 24px 20px; }
    .project-name { font-size: 20px; }
    .contact-wrap { padding: 32px 16px; }
    .contact-big { letter-spacing: -1px; }
    .contact-link { width: 100%; justify-content: center; }
    footer { padding: 20px 16px; font-size: 11px; }
    .hero-scroll { display: none; }
  }

  /* === VERY SMALL (max 400px) === */
  @media (max-width: 400px) {
    .nav-links a { display: none; }
    .nav-links a:first-child, .nav-links a:last-child { display: block; }
  }
`;

const skills = {
  "Languages": ["C", "C++", "Python", "Java", "JavaScript"],
  "Web & Frameworks": ["React", "Node.js", "Express.js", "HTML", "CSS"],
  "Databases & Cloud": ["MongoDB", "SQL", "MySQL", "AWS", "REST APIs"],
  "Concepts & Tools": ["DSA", "OOP", "Git/GitHub", "CI/CD", "NoSQL"],
};

const achievements = [
  {
    icon: "🏆",
    title: "Codesta Winner",
    org: "UEM Jaipur",
    desc: "Won the inter-college coding competition at University of Engineering and Management, Jaipur.",
  },
  {
    icon: "🇮🇳",
    title: "SIH Qualifier",
    org: "Smart India Hackathon · 2024 & 2025",
    desc: "Qualified for Smart India Hackathon in two consecutive years — one of India's largest national-level hackathons.",
  },
  {
    icon: "🚀",
    title: "Wadhwani Foundation",
    org: "Startup Selection",
    desc: "Selected for the Wadhwani Foundation startup program, recognizing entrepreneurial potential and innovative thinking.",
  },
];

const projects = [
  {
    num: "01",
    name: "GavelX",
    desc: "A FastAPI & React 18 auction platform with a Bid Shield anti-sniping algorithm, WebSockets for real-time bidding, Llama 3.1 AI via Groq API, and a JWT-secured admin dashboard.",
    tech: ["FastAPI", "React 18", "WebSockets", "Llama 3.1", "Groq API", "JWT", "Chart.js"],
    link: "https://github.com/SARKARPIYUSH21",
  },
  {
    num: "02",
    name: "NFT Rental System",
    desc: "A blockchain smart contract on Stacks enabling temporary NFT usage rights. Owners rent out digital assets for specified durations while retaining full ownership — automated, trustless, and fully on-chain.",
    tech: ["Clarity", "Stacks Blockchain", "JavaScript", "TypeScript", "Vitest"],
    link: "https://github.com/SARKARPIYUSH21/NFT-Rental-System",
  },
  {
    num: "03",
    name: "Decentralized Voting System",
    desc: "A blockchain-based voting app ensuring secure, transparent, tamper-proof elections. Smart contracts automate the process with real-time result tallying and zero-knowledge proof support for voter anonymity.",
    tech: ["Solidity", "Ethereum", "React.js", "Node.js", "Truffle", "Web3.js"],
    link: "https://github.com/SARKARPIYUSH21/voting",
  },
  {
    num: "04",
    name: "Learning Progress Tracker",
    desc: "A decentralized learning progress tracking system built on the Stacks blockchain using Clarity smart contracts. Securely stores and verifies learning milestones in a verifiable, decentralized way.",
    tech: ["Clarity", "Stacks Blockchain", "JavaScript", "Web3"],
    link: "https://github.com/SARKARPIYUSH21",
  },
];

export default function Portfolio() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      if (ringRef.current) {
        setTimeout(() => {
          ringRef.current.style.left = e.clientX + "px";
          ringRef.current.style.top = e.clientY + "px";
        }, 60);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{style}</style>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="noise" />

      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: 500, height: 500, background: `${COLORS.violet}18`, top: -100, right: -100 }} />
      <div className="glow-orb" style={{ width: 400, height: 400, background: `${COLORS.accent}10`, bottom: "20%", left: -150 }} />

      {/* NAV */}
      <nav>
        <div className="nav-logo">PS</div>
        <div className="nav-links">
          {["about", "skills", "experience", "achievements", "projects", "contact"].map((s) => (
            <a key={s} onClick={() => scrollTo(s)} href={`#${s}`}>{s}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              Available for opportunities
            </div>
            <h1 className="hero-name">
              Piyush<br /><span>Sarkar</span>
            </h1>
            <p className="hero-role">// CS Engineer & Hackathon Organizer</p>
            <p className="hero-desc">
              Sophomore at UEM Jaipur building scalable solutions. Organizer of AceHack 5.0 — Rajasthan's largest student-run hackathon. Passionate about web development, blockchain, and real-world problem solving.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects</button>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>Get in Touch</button>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring-inner" />
            <img
              src={piyushPhoto}
              alt="Piyush Sarkar"
              className="hero-photo"
            />
            <div className="hero-photo-badge">
              <span style={{ color: "#4ade80" }}>◉</span> Open to Work
            </div>
          </div>

          <div className="hero-scroll">
            <div className="scroll-line" />
            scroll to explore
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-wrap">
          <div className="section-label">Who I Am</div>
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a Computer Science Engineering student at UEM Jaipur with a passion for building things that matter. From web apps to blockchain projects, I love tackling real-world problems with elegant code.</p>
              <p>As the organizer of AceHack 5.0 — Rajasthan's largest student-run hackathon in collaboration with MLH — I've led large-scale events, managed sponsorships, and built a thriving tech community.</p>
              <p>I'm deeply interested in Prompt Engineering, Software Development, and Web Development, always looking for opportunities to grow through hands-on projects and hackathons.</p>
              <div className="about-stats">
                <div>
                  <div className="stat-num">5.0</div>
                  <div className="stat-label">AceHack Edition</div>
                </div>
                <div>
                  <div className="stat-num">2+</div>
                  <div className="stat-label">Major Projects</div>
                </div>
                <div>
                  <div className="stat-num">3+</div>
                  <div className="stat-label">Events Organized</div>
                </div>
              </div>
            </div>
            <div className="about-card">
              <div className="about-card-title">// currently.js</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, lineHeight: 2, color: COLORS.muted }}>
                <div><span style={{ color: COLORS.violet }}>university</span> = <span style={{ color: COLORS.lavender }}>"UEM Jaipur"</span></div>
                <div><span style={{ color: COLORS.violet }}>year</span> = <span style={{ color: COLORS.lavender }}>"Sophomore"</span></div>
                <div><span style={{ color: COLORS.violet }}>degree</span> = <span style={{ color: COLORS.lavender }}>"B.Tech CSE"</span></div>
                <div><span style={{ color: COLORS.violet }}>batch</span> = <span style={{ color: COLORS.lavender }}>"2024–2028"</span></div>
                <div><span style={{ color: COLORS.violet }}>location</span> = <span style={{ color: COLORS.lavender }}>"Jaipur, Rajasthan"</span></div>
                <div><span style={{ color: COLORS.violet }}>role</span> = <span style={{ color: COLORS.lavender }}>"Organizer, AceHack 5.0"</span></div>
                <div><span style={{ color: COLORS.violet }}>mlh_partner</span> = <span style={{ color: "#4ade80" }}>true</span></div>
                <div><span style={{ color: COLORS.violet }}>open_to_work</span> = <span style={{ color: "#4ade80" }}>true</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-wrap">
          <div className="section-label">What I Know</div>
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([cat, items]) => (
              <div className="skill-category" key={cat}>
                <div className="skill-cat-title">// {cat}</div>
                <div className="skill-tags">
                  {items.map(s => <span className="skill-tag" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-wrap">
          <div className="section-label">What I've Done</div>
          <h2 className="section-title">Experience</h2>

          <div className="exp-item">
            <div>
              <div className="exp-date">Mar 2026</div>
              <div className="exp-date" style={{ marginTop: 4, color: COLORS.violet }}>Jaipur, RJ</div>
            </div>
            <div>
              <div className="exp-role">Organizer — AceHack 5.0</div>
              <div className="exp-org">Rajasthan's Largest Student-Run Hackathon · MLH Partner</div>
              <ul className="exp-bullets">
                <li>Organized and executed a large-scale hackathon bringing together student developers to build innovative solutions.</li>
                <li>Collaborated with MLH and multiple tech partners to manage operations, sponsorships, and community outreach.</li>
                <li>Coordinated logistics, registrations, mentor sessions, and judging for a seamless experience.</li>
                <li>Led marketing and outreach initiatives to engage student developers and tech communities.</li>
              </ul>
            </div>
          </div>

          <div className="exp-item">
            <div>
              <div className="exp-date">2025 & 2026</div>
            </div>
            <div>
              <div className="exp-role">Organizer — HackUEM 4.0 & 5.0</div>
              <div className="exp-org">UEM Jaipur · Internal 12-Hour Hackathon</div>
              <ul className="exp-bullets">
                <li>Organized two consecutive editions of HackUEM, the internal hackathon at UEM Jaipur.</li>
              </ul>
            </div>
          </div>

          <div className="exp-item">
            <div>
              <div className="exp-date">2025</div>
            </div>
            <div>
              <div className="exp-role">Organizer — TechFest'25</div>
              <div className="exp-org">UEM Jaipur</div>
              <ul className="exp-bullets">
                <li>Part of the organizing team contributing to event planning, execution, and team management.</li>
              </ul>
            </div>
          </div>

          <div className="exp-item">
            <div>
              <div className="exp-date">Present</div>
            </div>
            <div>
              <div className="exp-role">Core Member</div>
              <div className="exp-org">ACM UEMJ Student Chapter</div>
              <ul className="exp-bullets">
                <li>Active core member of the ACM student chapter at UEM Jaipur, contributing to tech events and community initiatives.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div className="section-wrap">
          <div className="section-label">Recognition</div>
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((a) => (
              <div className="achievement-card" key={a.title}>
                <span className="achievement-icon">{a.icon}</span>
                <div className="achievement-title">{a.title}</div>
                <div className="achievement-org">{a.org}</div>
                <p className="achievement-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-wrap">
          <div className="section-label">What I've Built</div>
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((p) => (
              <a className="project-card" key={p.num} href={p.link} target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"inherit",display:"block"}}>
                <div className="project-arrow">↗</div>
                <div className="project-num">// {p.num}</div>
                <div className="project-name">{p.name}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span className="tech-pill" key={t}>{t}</span>)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-wrap">
          <div className="contact-wrap">
            <div className="section-label" style={{ justifyContent: "center" }}>Let's Connect</div>
            <div className="contact-big">Got an idea?<br /><span style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Let's build it.</span></div>
            <p className="contact-sub">Open to internships, collaborations, and hackathon partnerships.</p>
            <div className="contact-links">
              <a className="contact-link" href="mailto:sarkarpiyush21@gmail.com">
                ✉ sarkarpiyush21@gmail.com
              </a>
              <a className="contact-link" href="https://linkedin.com/in/piyushsarkar21" target="_blank" rel="noreferrer">
                ↗ LinkedIn
              </a>
              <a className="contact-link" href="https://github.com/SARKARPIYUSH21" target="_blank" rel="noreferrer">
                ↗ GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 Piyush Sarkar</span>
        <span style={{ fontFamily: "'DM Mono', monospace" }}>Built with React · Hosted on Vercel</span>
      </footer>
    </>
  );
}
