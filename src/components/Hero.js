import { useState, useEffect, useRef } from 'react';

const ROLES = [
  'FullStack Developer_',
  'React + Laravel Dev_',
  'Linux Infrastructure_',
  'UI/UX Engineer_',
  'Open to Freelance_',
];

const STATS = [
  { num: '3', suffix: '+', label: 'Projects' },
  { num: '9', suffix: '+', label: 'Certs' },
  { num: '10', suffix: '+', label: 'Tech Stack' },
  { num: '2', suffix: 'y', label: 'Experience' },
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const ri = useRef(0), ci = useRef(0), del = useRef(false);
  const photo3d = useRef(null);

  // typewriter
  useEffect(() => {
    let timer;
    const tick = () => {
      const r = ROLES[ri.current];
      if (!del.current) {
        setTyped(r.slice(0, ++ci.current));
        if (ci.current === r.length) { del.current = true; timer = setTimeout(tick, 1400); return; }
      } else {
        setTyped(r.slice(0, --ci.current));
        if (ci.current === 0) { del.current = false; ri.current = (ri.current + 1) % ROLES.length; }
      }
      timer = setTimeout(tick, del.current ? 40 : 75);
    };
    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  // 3D tilt photo
  useEffect(() => {
    const el = photo3d.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) translateZ(12px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Left */}
      <div className="hero-left" style={{ flex: 1 }}>
        <div className="hero-tag">fullstack developer · sidoarjo, indonesia</div>

        <h1 className="hero-name">
          Ahmad<br />Fayyadh<br />Fadhil
        </h1>

        <div className="hero-role-wrap">
          {typed}<span className="cursor-blink" />
        </div>

        <p className="hero-desc">
          Membangun sistem dari pixel ke database. UI immersive, backend solid,
          Linux infrastructure — semua dalam satu stack.<br />
          <span style={{ color: 'rgba(61,127,255,.5)', fontFamily: 'var(--mono)', fontSize: '.78rem' }}>
            SMK Telkom Sidoarjo · SIJA
          </span>
        </p>

        <div className="hero-btns">
          <a className="btn btn-solid" href="/cv.pdf" target="_blank" rel="noreferrer">[ Download CV ]</a>
          <a className="btn btn-ghost" href="#contact">[ Hubungi Saya ]</a>
          <a className="btn btn-ghost" href="https://github.com/" target="_blank" rel="noreferrer">[ GitHub ↗ ]</a>
        </div>

        <div className="hero-meta">
          {STATS.map((s, i) => (
            <>
              {i > 0 && <div key={`d${i}`} className="hero-divider" />}
              <div key={s.label} className="hero-stat">
                <div className="hero-stat-num">{s.num}<em>{s.suffix}</em></div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Right — 3D Photo */}
      <div className="photo-3d-wrap">
        <div className="photo-3d" ref={photo3d}>
          <div className="photo-inner">
            <div className="photo-initials">FF</div>
            <img
              src="/myphoto.jpg"
              alt="Ahmad Fayyadh Fadhil"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="photo-glow" />
          <div className="photo-corner tl" />
          <div className="photo-corner tr" />
          <div className="photo-corner bl" />
          <div className="photo-corner br" />
          <div className="photo-badge">@fayyadhtzy</div>
        </div>
      </div>
    </section>
  );
}