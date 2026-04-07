import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    id: 'RP',
    title: 'Ruang Pulih',
    desc: 'Website edukasi kesehatan mental — berbagai cara untuk bahagia dan hidup sehat. Full-stack dengan Laravel & MySQL.',
    tech: ['Laravel', 'MySQL', 'PHP', 'Blade'],
    image: '/project/ruangpulih.png',
    demo: '#',
    repo: '#',
    role: 'Full-Stack Developer',
  },
  {
    id: 'CC',
    title: 'CurtainCall',
    desc: 'Aplikasi AI-powered untuk smart curtain management. React frontend, MongoDB backend, Flutter mobile. AI integration real-time.',
    tech: ['React', 'MongoDB', 'Flutter', 'AI'],
    image: '/project/CurtainCall.png',
    demo: '#',
    repo: '#',
    role: 'Lead Developer & UI/UX',
  },
  {
    id: 'RJT',
    title: 'Rizza Jaya Trans',
    desc: 'Website UMKM kolaboratif. React + Linux server + Cloudflare CDN. Responsive, SEO-optimized, deployed & maintained independently.',
    tech: ['React', 'Linux', 'Cloudflare'],
    image: '/project/rizzajayatrans.png',
    demo: '#',
    repo: '#',
    role: 'Frontend + DevOps',
  },
];

export default function Projects() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach(card => {
      if (!card) return;
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top)  / r.height;
        const rx = (y - 0.5) * 12, ry = (x - 0.5) * 12;
        card.style.transform = `perspective(650px) rotateX(${-rx}deg) rotateY(${ry}deg) translateZ(8px)`;
        const glow = card.querySelector('.proj-glow');
        if (glow) { glow.style.setProperty('--mx', x * 100 + '%'); glow.style.setProperty('--my', y * 100 + '%'); }
      };
      const onLeave = () => { card.style.transform = ''; };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }, []);

  return (
    <section id="projects" className="section-wrap reveal">
      <div className="sec-header">
        <span className="sec-num">03 //</span>
        <span className="sec-title">Projects</span>
        <div className="sec-line" />
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div key={p.id} className="proj-card" ref={el => cardsRef.current[i] = el}>
            {/* Image */}
            <div className="proj-img">
              <span className="proj-img-label">{p.id}</span>
              <img src={p.image} alt={p.title} onError={e => { e.target.style.display='none'; }} />
              <div className="proj-img-overlay" />
            </div>

            <div className="proj-glow" />

            {/* Body */}
            <div className="proj-body">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.35rem' }}>
                <div className="proj-title">{p.title}</div>
                <span style={{ fontFamily:'var(--mono)', fontSize:'.58rem', color:'var(--blue)', background:'rgba(61,127,255,.1)', border:'1px solid rgba(61,127,255,.2)', padding:'2px 7px', whiteSpace:'nowrap', marginLeft:'.5rem' }}>
                  {p.role}
                </span>
              </div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-tags">
                {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="proj-links">
                <a className="proj-link" href={p.demo} target="_blank" rel="noreferrer">[ Live Demo ↗ ]</a>
                <a className="proj-link" href={p.repo} target="_blank" rel="noreferrer">[ GitHub ↗ ]</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}