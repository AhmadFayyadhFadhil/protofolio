import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabase';

const FALLBACK_SKILLS = [
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

const FALLBACK_CERTS = [
    { title: "Pelatihan AI Elevate", issuer: "Elevate AI Academy", date: "Sep 2025", image: "/certificates/Sertifikat-elevate.png" },
    { title: "Semifinalis BPC", issuer: "ITS", date: "Okt 2024", image: "certificates/sertifikatbpc1.png" },
    { title: "Semifinalis BPC", issuer: "Universitas Indonesia", date: "May 2025", image: "certificates/sertifikatbpc2.png" },
    { title: "OWASP Keamanan Jaringan", issuer: "Universitas Narotama", date: "Sep 2024", image: "certificates/sertifikatOwasp.png" },
    { title: "Cyber Security", issuer: "PT Telkom Indonesia", date: "Des 2024", image: "certificates/sertifikatpelatihan.png" },
    { title: "Sistem Informasi", issuer: "Telkom University", date: "May 2023", image: "certificates/sertifikattrialclass.png" }
];

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ITEM_VARIANTS = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [certs, setCerts] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const fetchSupabase = async (table, setter, fallback) => {
            try {
                const { data, error } = await supabase
                    .from(table)
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data && data.length > 0) setter(data);
                else setter(fallback);
            } catch (error) {
                console.error(`Error fetching ${table}:`, error.message);
                setter(fallback);
            }
        };

        fetchSupabase('skills', setSkills, FALLBACK_SKILLS);
        fetchSupabase('certificates', setCerts, FALLBACK_CERTS);
    }, []);

    const certsData = certs.length > 0 ? certs : FALLBACK_CERTS;
    const skillsData = skills.length > 0 ? skills : FALLBACK_SKILLS;

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
                    <h2 className="section-title">Teknologi.</h2>
                    <p className="text-white/40 text-lg font-light">
                        Peralatan dan framework yang saya pakai untuk membangun solusi tangguh.
                    </p>
                </motion.div>

                {/* Container Skill - Manual Scrollable */}
                <motion.div
                    className="relative mb-24 md:mb-32 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-6 md:gap-8 border-y border-white/5 py-10 px-4 md:px-8 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent scroll-smooth">
                        {skillsData.map((skill, index) => (
                            <div
                                key={`${skill.name}-${index}`}
                                className="flex-shrink-0 w-32 h-40 md:w-40 md:h-48 glass-card border-white/5 p-4 flex flex-col items-center justify-center text-center group/card hover:bg-white/[0.04] hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer snap-center"
                            >
                                <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full">
                                    <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center filter brightness-90 group-hover/card:brightness-110 transition-all duration-300">
                                        <img
                                            src={skill.logo}
                                            alt={skill.name}
                                            className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] group-hover/card:drop-shadow-[0_8px_20px_rgba(255,255,255,0.15)] group-hover/card:scale-110 transition-all duration-500 ease-out"
                                        />
                                    </div>
                                    <h3 className="text-sm md:text-base font-medium text-white/50 group-hover/card:text-white transition-colors">
                                        {skill.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none opacity-100 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none opacity-100 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Bagian Sertifikasi */}
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
                        variants={CONTAINER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {certsData.map((cert) => (
                            <motion.div
                                key={cert.title}
                                variants={ITEM_VARIANTS}
                                onClick={() => setSelectedCert(cert)}
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

            {/* Modal Zoom Sertifikat - Menggunakan Portals untuk Posisi Absolut Terpusat */}
            <AnimatePresence>
                {selectedCert && createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative z-10 max-w-4xl w-full max-h-[90vh] bg-[#0e0e0e] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:scale-110 transition-all backdrop-blur-md"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black/20 p-2 md:p-4">
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
                                />
                            </div>

                            <div className="p-6 md:p-8 bg-[#0e0e0e] border-t border-white/5">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{selectedCert.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                        </div>
                                        <span className="text-white/60 text-sm font-medium">{selectedCert.issuer}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        </div>
                                        <span className="text-white/60 text-sm font-medium">{selectedCert.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>,
                    document.body
                )}
            </AnimatePresence>
        </section>
    );
};

export default Skills;
