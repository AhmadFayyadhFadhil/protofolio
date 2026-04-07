import { useEffect, useRef } from 'react';

const CATS = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React.js',     pct: 85 },
      { name: 'JavaScript',   pct: 82 },
      { name: 'HTML / CSS',   pct: 90 },
      { name: 'Tailwind CSS', pct: 80 },
      { name: 'Figma',        pct: 78 },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Laravel',  pct: 75 },
      { name: 'PHP',      pct: 73 },
      { name: 'MySQL',    pct: 78 },
      { name: 'REST API', pct: 70 },
      { name: 'MongoDB',  pct: 60 },
    ],
  },
  {
    label: 'DevOps & Tools',
    skills: [
      { name: 'Linux Server', pct: 75 },
      { name: 'Cloudflare',   pct: 70 },
      { name: 'Git / GitHub', pct: 72 },
      { name: 'Flutter',      pct: 55 },
      { name: 'OWASP Sec',    pct: 65 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const animated   = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        document.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-wrap reveal" ref={sectionRef}>
      <div className="sec-header">
        <span className="sec-num">02 //</span>
        <span className="sec-title">Skills & Stack</span>
        <div className="sec-line" />
      </div>

      <div className="skill-cats">
        {CATS.map(cat => (
          <div key={cat.label} className="skill-cat">
            <div className="skill-cat-title">{cat.label}</div>
            {cat.skills.map(s => (
              <div key={s.name} className="skill-item">
                <span className="skill-name">{s.name}</span>
                <div className="skill-bar">
                  <div className="skill-fill" data-pct={s.pct} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}