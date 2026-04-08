import React from 'react';
import { motion } from 'framer-motion';
import ProfileLanyard from './ProfileLanyard';

const aboutCards = [
  { icon: '', title: 'Keahlian FullStack', text: 'Eksekusi frontend & backend yang mulus: React, Node.js, PHP, REST API.' },
  { icon: '', title: 'Optimasi Performa', text: 'Core Web Vitals, strategi caching mutakhir, & arsitektur aplikasi terukur.' },
  { icon: '', title: 'Pakar Database', text: 'MySQL, MongoDB, optimasi query lanjutan & penanganan data yang aman.' },
  { icon: '', title: 'Alat Modern', text: 'Tailwind CSS, Vite, keahlian alur kerja Git & otomatisasi jalur CI/CD.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-darkBg px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 relative z-10 items-center">

        {/* Interactive Lanyard Column */}
        <div className="md:col-span-5 flex justify-center items-start pt-10 min-h-[500px]">
          <ProfileLanyard />
        </div>

        {/* Content Side (Refined & Modern) */}
        <motion.div
          className="md:col-span-7 flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Tentang Saya</h2>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed font-light mb-5">
              Saya adalah seorang <span className="text-white font-semibold underline decoration-red-500/30 underline-offset-4">FullStack Developer</span> yang sangat bersemangat dalam membangun aplikasi modern dan elegan. Dengan menggabungkan desain estetika yang matang dan rekayasa backend tangguh, saya selalu menjembatani jarak antara pengalaman pengguna dan keandalan sistem.
            </p>
            <p className="text-gray-400 text-base leading-relaxed font-light">
              Sebagai seorang <span className="text-white font-medium">Front-End Developer</span>, saya terus bereksplorasi dengan teknologi modern untuk membangun sistem terukur yang beroperasi dengan cepat dan aman, sangat relevan untuk kebutuhan produksi kelas industri.
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {aboutCards.map((c, index) => (
              <motion.div
                key={c.title}
                className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md group relative overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(239,68,68,0.1)]"
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Subtle Hover Glow Corner */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/5 blur-3xl rounded-full group-hover:bg-red-500/10 transition-colors duration-500"></div>

                <h4 className="text-white font-semibold text-lg mb-2 tracking-wide group-hover:text-red-400 transition-colors duration-300">{c.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
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
