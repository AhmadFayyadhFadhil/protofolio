import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fallbackSkills = [
  { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Html", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
  { name: "Css", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
  { name: "Javascript", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" },
  { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Laravel", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" },
  { name: "PHP", logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
  { name: "Mysql", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/MySQL_textlogo.svg" },
  { name: "Linux", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Linux_Logo_in_Linux_Libertine_Font.svg" },
  { name: "Canva", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_logo.svg" }
];

const fallbackCerts = [
  { title: "Pelatihan AI Elevate", issuer: "Elevate AI Academy", date: "Sep 2025", image: "/certificates/Sertifikat-elevate.png" },
  { title: "Semifinalis BPC", issuer: "ITS", date: "Okt 2024", image: "certificates/sertifikatbpc1.png" },
  { title: "Semifinalis BPC", issuer: "Universitas Indonesia", date: "May 2025", image: "certificates/sertifikatbpc2.png" },
  { title: "OWASP Keamanan Jaringan", issuer: "Universitas Narotama", date: "Sep 2024", image: "certificates/sertifikatOwasp.png" },
  { title: "Cyber Security", issuer: "PT Telkom Indonesia", date: "Des 2024", image: "certificates/sertifikatpelatihan.png" },
  { title: "Sistem Informasi", issuer: "Telkom University", date: "May 2023", image: "certificates/sertifikattrialclass.png" }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('tech');
  const [skills, setSkills] = useState([]);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/portfolio_api/skills.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setSkills(data);
        else setSkills(fallbackSkills);
      }).catch(() => setSkills(fallbackSkills));

    fetch('http://localhost/portfolio_api/certificates.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setCerts(data);
        else setCerts(fallbackCerts);
      }).catch(() => setCerts(fallbackCerts));
  }, []);

  const certsData = certs.length > 0 ? certs : fallbackCerts;

  const skillsData = skills.length > 0 ? skills : fallbackSkills;
  const doubledSkills = [...skillsData, ...skillsData];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="py-24 bg-darkBg px-4 md:px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20 text-center"
        >
          <h2 className="section-title">
            Teknologi.
          </h2>
          <p className="text-white/40 text-lg font-light">Peralatan dan framework yang saya pakai untuk membangun solusi tangguh.</p>
        </motion.div>

        {/* Skills Carousel */}
        <motion.div
          className="relative mb-24 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="overflow-hidden border-y border-white/5 py-10 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent">
            <div className="flex gap-6 md:gap-8 animate-scroll hover:pause px-4">
              {doubledSkills.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-32 h-40 md:w-40 md:h-48 glass-card border-white/5 p-4 flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer"
                >
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full">
                    <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center filter brightness-90 group-hover:brightness-110 transition-all duration-300">
                      <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_8px_20px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-all duration-500 ease-out" />
                    </div>
                    <h3 className="text-sm md:text-base font-medium text-white/50 group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
        </motion.div>

        {/* Certificates */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 md:mb-16 text-center"
          >
            <h3 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">Sertifikasi</h3>
            <p className="text-white/40 font-light">Pembelajaran terus-menerus dan validasi level profesional.</p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {certsData.map((cert) => (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="glass-card group p-5 cursor-pointer flex flex-col relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-40 mb-6 overflow-hidden rounded-xl border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale-[10%] group-hover:grayscale-0"
                      onError={e => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9IiMwZTBlMGUiLz4='; }}
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-end">
                    <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-gray-200 transition-colors tracking-tight">
                      {cert.title}
                    </h4>
                    <p className="text-white/50 text-sm mb-4 font-light">
                      {cert.issuer}
                    </p>
                    <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                      <span className="text-white/30 text-xs tracking-wider uppercase">Diterbitkan</span>
                      <span className="text-white/60 text-xs font-medium">{cert.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
