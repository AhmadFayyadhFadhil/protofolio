import { useState, useEffect } from 'react';

const LINKS = [
  { label: '_about',    id: 'about' },
  { label: '_skills',   id: 'skills' },
  { label: '_projects', id: 'projects' },
  { label: '_certs',    id: 'certs' },
  { label: '_contact',  id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar" style={scrolled ? { background:'rgba(6,10,18,.98)' } : {}}>
      <div className="nav-logo">Fayyadh<span>Tzy</span>.</div>

      <div className="nav-links">
        {LINKS.map(l => (
          <button key={l.id} className="nav-link" onClick={() => go(l.id)}>{l.label}</button>
        ))}
        <div className="status-pill">
          <div className="status-dot" />
          Open to Freelance
        </div>
      </div>
    </nav>
  );
}