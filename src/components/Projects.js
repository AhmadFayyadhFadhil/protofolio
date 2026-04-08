import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Ruang Pulih",
      description: "Sebuah website yang berfokus edukasi tentang kesehatan mental, menampilkan banyak bebagai cara untuk behagia dan hidup.",
      tech: ["Laravel", "Mysql"],
      image: "./project/ruangpulih.png",
    },
    {
      id: 2,
      title: "CurtainCall",
      description: "Aplikasi berbasis AI yang dibuat untuk memudahkan pengguna dalam penggunaan tirai",
      tech: ["React", "MongoDB", "Tailwind CSS", "Flutter",],
      image: "./project/CurtainCall.png",
    },
    {
      id: 3,
      title: "Rizza Jaya Trans",
      description: "Sebuah proyek pengembangan website kolaboratif bersama pelaku UMKM yang bertujuan untuk meningkatkan kualitas layanan dan daya saing usaha. Website ini dirancang dengan berbagai fitur yang menarik, interaktif, dan fungsional guna mendukung kebutuhan operasional maupun promosi UMKM. Selain itu, sistem dibangun dengan antarmuka yang responsif dan mudah diakses, sehingga memberikan kemudahan bagi pengguna dalam memperoleh informasi serta melakukan berbagai aktivitas secara efisien dan praktis.",
      tech: ["React", "Linux", "Cloudflare"],
      image: "./project/rizzajayatrans.png",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-16 md:py-20 bg-darkCard/50 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-darkText text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Project <span className="gradient-text">Terbaik</span>
        </motion.h2>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group bg-darkCard border border-primary/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-smooth hover:border-primary/50 flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="h-40 sm:h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
              </div>

              {/* Project Info */}
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-darkText mb-2">
                  {project.title}
                </h3>
                <p className="text-darkText/70 text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 bg-primary/20 text-primary rounded-full font-semibold border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
