import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-darkBg px-4 md:px-6 overflow-hidden relative">
      <div className="absolute top-0 right-[20%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="section-title">
            Hubungi Saya.
          </h2>
          <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
            Siap untuk mendiskusikan proyek selanjutnya? Kirim pesan atau hubungi saya lewat jejaring sosial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Contact Info */}
          <motion.div
            className="md:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Connection blocks */}
            <div className="glass-card p-6 flex flex-col gap-6">

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1">Email</h3>
                  <a href="mailto:fadhilahmad1199@gmail.com" className="text-white hover:text-gray-300 transition-colors">fadhilahmad1199@gmail.com</a>
                </div>
              </div>

              <div className="w-full h-px bg-white/5"></div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1">Telepon</h3>
                  <a href="tel:+6285859104796" className="text-white hover:text-gray-300 transition-colors">+62 858 5910 4796</a>
                </div>
              </div>

              <div className="w-full h-px bg-white/5"></div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1">Lokasi</h3>
                  <p className="text-white">Sidoarjo, Indonesia</p>
                </div>
              </div>

            </div>

            {/* Social Links Formatted Luxuriously */}
            <div className="flex gap-4">
              {[
                { label: 'WhatsApp', icon: 'WhatsApp', href: 'https://wa.me/6285859104796' },
                { label: 'Instagram', icon: 'Instagram', href: 'https://www.instagram.com/fadhillllll15?igsh=cTJ4dGNvbHFtb2t0' },
                { label: 'TikTok', icon: 'TikTok', href: 'https://www.tiktok.com/@dhyl15?_r=1&_t=ZS-93d9UQSj67k' },
              ].map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <span className="font-medium text-sm text-white/80">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="md:col-span-7 glass-card p-8 md:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white/50 text-xs px-1 mb-2 tracking-wide uppercase">Nama Lengkap</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all placeholder-white/20"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs px-1 mb-2 tracking-wide uppercase">Alamat Email</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all placeholder-white/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-white/50 text-xs px-1 mb-2 tracking-wide uppercase">Teks Pesan</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows="5"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-all resize-none placeholder-white/20"
                  placeholder="Bagaimana saya bisa membantu Anda hari ini?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                Kirim Pesan Sekarang
              </button>

              {submitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm text-center font-medium">
                  Terima kasih sudah menghubungi! Saya akan segera merespons Anda.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
