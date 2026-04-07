import React, { useEffect, useRef } from 'react';

/* ── Generate barcode visual ── */
function Barcode() {
  const heights = [30,18,28,15,30,22,12,28,20,30,16,26,12,30,18,24,14,30,20,28,16];
  return (
    <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(0,212,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '2px', height: '32px', alignItems: 'flex-end' }}>
        {heights.map((h, i) => (
          <div key={i} style={{ width: '2px', height: h + 'px', background: 'rgba(0,212,255,0.5)', borderRadius: '1px' }} />
        ))}
      </div>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: '#3a5570', letterSpacing: '0.2em' }}>
        DEV-2025-FULLSTACK
      </span>
    </div>
  );
}

/* ── Lanyard ID Card ── */
function Lanyard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Cord */}
      <div style={{ position: 'relative', width: '3px', height: '60px', background: 'linear-gradient(to bottom, #3a5570, rgba(0,212,255,0.4))', borderRadius: '2px' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '48px', height: '10px', background: '#1a4a7a', borderRadius: '4px 4px 0 0' }} />
      </div>

      {/* Card */}
      <div style={{
        background:  'linear-gradient(160deg, #0a1a2e, #04101f)',
        border:      '1px solid rgba(0,212,255,0.2)',
        borderRadius:'12px',
        width:       '280px',
        overflow:    'hidden',
        boxShadow:   '0 20px 60px rgba(0,0,0,0.6), 0 0 20px rgba(0,212,255,0.12)',
        animation:   'swing 6s ease-in-out infinite',
        transformOrigin: 'top center',
      }}>
        {/* Header */}
        <div style={{
          background:   'linear-gradient(135deg, #0d2a4d, #0a1f3a)',
          padding:      '1rem 1.25rem',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0,212,255,0.12)',
        }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#00d4ff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            // ID Card
          </span>
          <span style={{
            background:    'linear-gradient(135deg, #00d4ff, #00ffcc)',
            color:         '#000',
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '0.52rem',
            fontWeight:    700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding:       '3px 8px',
            borderRadius:  '2px',
          }}>
            FullStack
          </span>
        </div>

        {/* Photo + info */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          {/* Avatar */}
          <div style={{
            width:        '96px',
            height:       '96px',
            borderRadius: '50%',
            border:       '3px solid rgba(0,212,255,0.3)',
            background:   'linear-gradient(135deg, #1a4a7a, #0d2a4d)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            fontSize:     '2rem',
            fontFamily:   'Syne, sans-serif',
            fontWeight:   800,
            color:        '#00d4ff',
            boxShadow:    '0 0 20px rgba(0,212,255,0.2)',
            overflow:     'hidden',
          }}>
            <img
              src="/myphoto.jpg"
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              onError={e => { e.target.style.display = 'none'; e.target.parentElement.textContent = 'NK'; }}
            />
          </div>

          {/* Status dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#00ffcc' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ffcc', animation: 'pulseDot 2s ease-in-out infinite' }} />
            Open to Work
          </div>

          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: '#fff', textAlign: 'center' }}>
            Nama Kamu
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#00d4ff', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>
            FullStack Developer
          </div>
        </div>

        {/* Info rows */}
        <div style={{ padding: '0 1.5rem 1rem' }}>
          {[
            { label: 'Location', val: 'Surabaya, ID'       },
            { label: 'Specialty',val: 'Web & Security'      },
            { label: 'Status',   val: 'Available', green: true },
            { label: 'GitHub',   val: '@username'           },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0', borderBottom: '1px solid rgba(0,212,255,0.06)' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: '#3a5570', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.label}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: r.green ? '#00ffcc' : '#6b8fa8' }}>{r.val}</span>
            </div>
          ))}
        </div>

        <Barcode />
      </div>
    </div>
  );
}

const stackTags = [
  'React.js','Node.js','Express','PHP','Python',
  'MySQL','MongoDB','Tailwind CSS','Git','Linux','OWASP','REST API',
];

const aboutCards = [
  { icon: '🖥️', title: 'Frontend Dev',   text: 'Membangun UI responsif & interaktif dengan React dan Tailwind CSS' },
  { icon: '⚙️', title: 'Backend Dev',    text: 'Merancang REST API yang robust dengan Node.js, Express & PHP' },
  { icon: '🛡️', title: 'Security',       text: 'Implementasi best practices OWASP dan pengujian keamanan web' },
  { icon: '📊', title: 'Data Analyst',   text: 'Analisis & visualisasi data untuk insight yang actionable' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        display:             'grid',
        gridTemplateColumns: '380px 1fr',
        gap:                 '4rem',
        alignItems:          'start',
        padding:             '6rem 2rem',
        maxWidth:            '1200px',
        margin:              '0 auto',
      }}
      className="about-grid"
    >
      {/* ── Lanyard ── */}
      <div style={{ position: 'sticky', top: '90px' }}>
        <Lanyard />
      </div>

      {/* ── Content ── */}
      <div className="fade-up">
        <div className="section-label">About Me</div>
        <h2 style={{
          fontFamily:   'Syne, sans-serif',
          fontSize:     'clamp(2rem, 4vw, 3rem)',
          fontWeight:   800,
          color:        '#fff',
          marginBottom: '1.5rem',
          letterSpacing:'-0.02em',
        }}>
          Siapa Saya?
        </h2>

        <p style={{ fontSize: '1rem', color: '#6b8fa8', lineHeight: 1.9, marginBottom: '1.25rem' }}>
          Saya adalah seorang{' '}
          <strong style={{ color: '#00d4ff', fontWeight: 500 }}>FullStack Developer</strong>
          {' '}yang passionate dalam membangun aplikasi web modern dari sisi frontend hingga backend.
          Dengan pengalaman di bidang{' '}
          <strong style={{ color: '#00d4ff', fontWeight: 500 }}>keamanan siber (OWASP)</strong>,{' '}
          <strong style={{ color: '#00d4ff', fontWeight: 500 }}>analisis data</strong>, dan{' '}
          <strong style={{ color: '#00d4ff', fontWeight: 500 }}>pengembangan web fullstack</strong>,
          saya percaya bahwa kode yang baik bukan hanya berjalan — tapi juga aman, efisien, dan mudah di-maintain.
        </p>
        <p style={{ fontSize: '1rem', color: '#6b8fa8', lineHeight: 1.9, marginBottom: '2rem' }}>
          Saya aktif belajar dan berkontribusi dalam komunitas teknologi, serta gemar mengikuti kompetisi
          dan pelatihan untuk terus mengasah kemampuan di dunia{' '}
          <strong style={{ color: '#00d4ff', fontWeight: 500 }}>pengembangan perangkat lunak</strong>
          {' '}dan <strong style={{ color: '#00d4ff', fontWeight: 500 }}>keamanan digital</strong>.
        </p>

        {/* Stack tags */}
        <div style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '0.65rem',
          color:         '#3a5570',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom:  '0.85rem',
        }}>
          // Current Tech Stack
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {stackTags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily:    'JetBrains Mono, monospace',
                fontSize:      '0.68rem',
                color:         '#00d4ff',
                border:        '1px solid rgba(0,212,255,0.2)',
                padding:       '0.28rem 0.7rem',
                borderRadius:  '3px',
                background:    'rgba(0,212,255,0.04)',
                cursor:        'default',
                transition:    'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = '#00d4ff';
                e.target.style.background  = 'rgba(0,212,255,0.1)';
                e.target.style.boxShadow   = '0 0 10px rgba(0,212,255,0.15)';
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = 'rgba(0,212,255,0.2)';
                e.target.style.background  = 'rgba(0,212,255,0.04)';
                e.target.style.boxShadow   = 'none';
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {aboutCards.map(c => (
            <div key={c.title} className="glare-card" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.65rem' }}>{c.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '0.3rem' }}>{c.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b8fa8', lineHeight: 1.6 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
