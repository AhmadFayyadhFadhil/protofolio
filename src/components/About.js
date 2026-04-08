import React from 'react';
import { motion } from 'framer-motion';

const aboutCards = [
  { icon: '💻', title: 'Keahlian FullStack', text: 'Eksekusi frontend & backend yang mulus: React, Node.js, PHP, REST API.' },
  { icon: '🚀', title: 'Optimasi Performa', text: 'Core Web Vitals, strategi caching mutakhir, & arsitektur aplikasi terukur.' },
  { icon: '🗄️', title: 'Pakar Database', text: 'MySQL, MongoDB, optimasi query lanjutan & penanganan data yang aman.' },
  { icon: '⚙️', title: 'Alat Modern', text: 'Tailwind CSS, Vite, keahlian alur kerja Git & otomatisasi jalur CI/CD.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-darkBg px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 relative z-10 items-center">

        {/* Minimalist Profile Photo Side */}
        <motion.div
          className="md:col-span-5 perspective-1000"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="glass-card p-2 rounded-[2rem] mx-auto max-w-[340px] relative group overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="p-8 rounded-3xl flex flex-col items-center bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 relative z-10">
              <div className="w-32 h-32 rounded-full p-1 mb-6 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <img src="/myphoto.jpg" alt="Ahmad Fayyadh Fadhil" className="w-full h-full object-cover rounded-full filter grayscale-[30%] hover:grayscale-0 transition-all duration-700 ease-out" />
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/50 mb-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                Siap untuk Peluang Baru
              </div>

              <h3 className="font-bold text-2xl text-white mb-2 tracking-tight">Ahmad Fadhil</h3>
              <p className="text-sm text-white/40 mb-8 font-light tracking-wide">Front-End Developer & SysAdmin</p>

              <div className="w-full space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-white/30 tracking-widest uppercase">Lokasi</span>
                  <span className="text-xs text-white/80 font-medium">Sidoarjo, ID</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-white/30 tracking-widest uppercase">Spesialisasi</span>
                  <span className="text-xs text-white/80 font-medium">Sistem Web Pribadi</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-xs text-white/30 tracking-widest uppercase">GitHub</span>
                  <span className="text-xs text-white/80 font-medium">@AhmadFayyadh</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          className="md:col-span-7 flex flex-col gap-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div>
            <h2 className="section-title mb-6">Tentang Saya.</h2>
            <p className="text-white/50 text-lg leading-relaxed font-light mb-6">
              Saya adalah seorang <span className="text-white font-medium">Front-End Developer</span> yang sangat bersemangat dalam membangun aplikasi modern dan elegan. Dengan menggabungkan desain estetika yang matang dan rekayasa backend tangguh, saya selalu menjembatani jarak antara pengalaman pengguna dan keandalan sistem.
            </p>
            <p className="text-white/50 text-base leading-relaxed font-light">
              Terus bereksplorasi dengan teknologi-teknologi modern, saya berfokus pada pengembangan sistem terukur yang beroperasi dengan cepat dan aman, sangat relevan untuk kebutuhan produksi kelas industri.
            </p>
          </div>

          {/* Elegant Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {aboutCards.map((c, index) => (
              <motion.div
                key={c.title}
                className="glass-card p-5 group flex flex-col gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out">{c.icon}</div>
                  <h4 className="font-semibold text-white/90 text-sm tracking-wide">{c.title}</h4>
                </div>
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
