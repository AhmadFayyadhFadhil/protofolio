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
      tech: ["React", "MongoDB", "Tailwind CSS" , "Flutter" ,],
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

  return (
    <section id="projects" className="py-16 md:py-20 bg-darkCard/50 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-darkText text-center mb-8 md:mb-12 animate-slide-in-up">
          Project <span className="gradient-text">Terbaik</span>
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-darkCard border border-primary/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-smooth animate-slide-in-up hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="h-40 sm:h-48 overflow-hidden group-hover:scale-110 transition-smooth">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>

              {/* Project Info */}
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-darkText mb-2">
                  {project.title}
                </h3>
                <p className="text-darkText/70 text-sm mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
