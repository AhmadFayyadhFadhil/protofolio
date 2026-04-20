import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';

const FALLBACK_ORGS = [
    {
        id: 1,
        name: "Himpunan Mahasiswa Sistem Informasi",
        role: "Anggota Divisi IT",
        period: "2023 - 2024",
        description: "Bertanggung jawab dalam pengelolaan aset digital himpunan, perawatan website, serta memfasilitasi kebutuhan teknologi pada setiap acara besar himpunan.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" // Just a placeholder
    },
    {
        id: 2,
        name: "Klub Cyber Security Campus",
        role: "Ketua Pelaksana",
        period: "2024 - Sekarang",
        description: "Memimpin diskusi mingguan seputar keamanan jaringan, mengadakan simulasi CTF (Capture The Flag), dan menyelenggarakan pelatihan untuk mahasiswa baru.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Linux_Logo_in_Linux_Libertine_Font.svg" // Placeholder
    }
];

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.2 } 
    }
};

const ITEM_VARIANTS = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrgs = async () => {
            try {
                const { data, error } = await supabase
                    .from('organizations')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                
                if (data && data.length > 0) {
                    setOrganizations(data);
                } else {
                    setOrganizations(FALLBACK_ORGS);
                }
            } catch (err) {
                console.error("Gagal mengambil data organisasi:", err.message);
                setOrganizations(FALLBACK_ORGS);
            }
        };

        fetchOrgs();
    }, []);

    const orgsData = organizations.length > 0 ? organizations : FALLBACK_ORGS;

    return (
        <section id="organizations" className="py-24 bg-darkBg px-4 md:px-6 relative z-10 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16 md:mb-20 text-center"
                >
                    <h2 className="section-title">Pengalaman Organisasi.</h2>
                    <p className="text-white/40 text-lg font-light">
                        Keterlibatan saya dalam berbagai organisasi akademik maupun profesional.
                    </p>
                </motion.div>

                <motion.div 
                    className="flex flex-col gap-6 md:gap-8"
                    variants={CONTAINER_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {orgsData.map((org, index) => (
                        <motion.div 
                            key={`${org.name}-${index}`}
                            variants={ITEM_VARIANTS}
                            className="glass-card group p-4 sm:p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center hover:-translate-y-1 transition-transform duration-500 ease-out border border-white/5 hover:border-cyan-400/30"
                        >
                            {/* Decorative Background Glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full group-hover:bg-cyan-400/10 transition-colors duration-500 pointer-events-none" />

                            {/* Logo / Documentation Photo */}
                            <div className="w-full h-48 md:w-48 md:h-32 flex-shrink-0 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative z-10 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-500">
                                <img 
                                    src={org.logo} 
                                    alt={org.name} 
                                    className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                    onError={(e) => { 
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzU1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+'; 
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 relative z-10 w-full">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors tracking-tight">
                                            {org.name}
                                        </h3>
                                        <h4 className="text-white/70 font-medium text-sm md:text-base">
                                            {org.role}
                                        </h4>
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/50 whitespace-nowrap self-start sm:self-auto">
                                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        {org.period}
                                    </div>
                                </div>
                                <p className="text-white/40 text-sm md:text-base leading-relaxed font-light mt-3">
                                    {org.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Organizations;
