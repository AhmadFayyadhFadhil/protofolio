import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "Ruang Pulih",
    description: "Berfokus pada kesadaran kesehatan mental, menyediakan berbagai panduan dan alat edukasi untuk kesejahteraan emosi secara holistik.",
    tech: ["Laravel", "Mysql"],
    image: "./project/ruangpulih.png",
  },
  {
    id: 2,
    title: "CurtainCall",
    description: "Aplikasi pintar berbasis AI yang dirancang untuk mengotomatisasi dan mempermudah manajemen tirai untuk rumah modern.",
    tech: ["React", "MongoDB", "Tailwind CSS", "Flutter"],
    image: "./project/CurtainCall.png",
  },
  {
    id: 3,
    title: "Rizza Jaya Trans",
    description: "Platform web kolaboratif yang memberdayakan UMKM lokal untuk meningkatkan kualitas layanan dan daya saing pasar dengan mulus.",
    tech: ["React", "Linux", "Cloudflare"],
    image: "./project/rizzajayatrans.png",
  }
];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Projects = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    fetch('http://localhost/portfolio_api/projects.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        console.warn("API Gagal dimuat, menggunakan data fallback. Pastikan backend aktif.");
      });
  }, []);

  return (
    <section id="projects" className="py-24 bg-darkBg px-4 md:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20 text-center"
        >
          <h2 className="section-title">Karya Pilihan.</h2>
          <p className="text-white/40 text-lg font-light">
            Beberapa proyek yang menampilkan solusi teknologi modern.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={ITEM_VARIANTS}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
              className="glass-card group overflow-hidden flex flex-col h-full cursor-pointer relative"
            >
              {/* Image Container */}
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent opacity-80 z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow relative z-20 -mt-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-3 py-1 bg-white/10 text-white/80 rounded-full font-medium tracking-wide backdrop-blur-md border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow font-light">
                  {project.description}
                </p>

                {/* Elegant Footer Button */}
                <div className="mt-auto flex items-center gap-2 group/btn">
                  <span className="text-sm font-medium text-white/80 group-hover/btn:text-white transition-colors">
                    Lihat Proyek
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover/btn:bg-white group-hover/btn:border-white group-hover/btn:text-black transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="10 5 19 5 19 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
