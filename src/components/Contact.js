import { useState } from 'react';

const SOCIALS = [
  { label: 'WhatsApp',  href: 'https://wa.me/6285859104796',                                   icon: '💬' },
  { label: 'Instagram', href: 'https://www.instagram.com/fadhillllll15',                       icon: '📸' },
  { label: 'GitHub',    href: 'https://github.com/',                                            icon: '🐙' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@dhyl15',                                icon: '🎵' },
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ── EmailJS integration (npm install emailjs-com) ──
    // Sementara: simulasi delay
    await new Promise(r => setTimeout(r, 800));

    setLoading(false);
    setSent(true);
    setForm({ name:'', email:'', message:'' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-wrap reveal">
      <div className="sec-header">
        <span className="sec-num">05 //</span>
        <span className="sec-title">Mari Terhubung</span>
        <div className="sec-line" />
      </div>

      <div className="contact-grid">
        {/* Info */}
        <div className="contact-info">
          <div className="contact-comment">
            <span>// </span>Tersedia untuk freelance, kolaborasi,<br />
            <span>// </span>dan peluang full-time. Let's build something great.
          </div>

          <div className="contact-item">
            <span className="ci-icon">📧</span>
            <div><div className="ci-label">Email</div><div className="ci-val">fadhilahmad1199@gmail.com</div></div>
          </div>
          <div className="contact-item">
            <span className="ci-icon">📱</span>
            <div><div className="ci-label">WhatsApp</div><div className="ci-val">+62 858 5910 4796</div></div>
          </div>
          <div className="contact-item">
            <span className="ci-icon">📍</span>
            <div><div className="ci-label">Location</div><div className="ci-val">Sidoarjo, East Java, Indonesia</div></div>
          </div>
          <div className="contact-item">
            <span className="ci-icon">💼</span>
            <div>
              <div className="ci-label">Status</div>
              <div className="ci-val open">● Open to Freelance &amp; Collaboration</div>
            </div>
          </div>

          {/* Socials */}
          <div style={{ display:'flex', gap:'.6rem', marginTop:'.5rem' }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                title={s.label}
                style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bgCard)', border:'1px solid rgba(61,127,255,.15)', fontSize:'1.1rem', textDecoration:'none', transition:'border-color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(61,127,255,.5)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(61,127,255,.15)'}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nama</label>
              <input className="form-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nama kamu" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@kamu.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Pesan</label>
              <textarea className="form-input" name="message" value={form.message} onChange={handleChange} placeholder="Tulis pesan kamu..." required />
            </div>
            <button className="form-btn" type="submit" disabled={loading}>
              {loading ? '[ Mengirim... ]' : '[ Kirim Pesan ]'}
            </button>
            {sent && <div className="form-success">✓ Pesan berhasil dikirim!</div>}
          </form>
        </div>
      </div>
    </section>
  );
}