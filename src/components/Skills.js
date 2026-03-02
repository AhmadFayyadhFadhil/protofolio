export default function Skills() {
  const skillsData = [
    { 
      name: "Figma", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      color: "from-purple-500 to-pink-500" 
    },
    { 
      name: "Html", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
      color: "from-orange-500 to-red-500" 
    },
    { 
      name: "Css", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      name: "Javascript", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      color: "from-yellow-500 to-orange-500" 
    },
    { 
      name: "React", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      color: "from-cyan-500 to-blue-500" 
    },
    { 
      name: "Laravel", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
      color: "from-red-600 to-orange-600" 
    },
    { 
      name: "PHP", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
      color: "from-indigo-500 to-purple-500" 
    },
    { 
      name: "Mysql", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/MySQL_textlogo.svg",
      color: "from-blue-600 to-cyan-600" 
    },
    { 
      name: "Linux", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Linux_Logo_in_Linux_Libertine_Font.svg",
      color: "from-slate-600 to-slate-700" 
    },
    { 
      name: "Canva", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_logo.svg",
      color: "from-pink-500 to-purple-500" 
    },
  ];

  // Duplicate array untuk infinite scroll effect
  const doubledSkills = [...skillsData, ...skillsData];

  return (
    <section id="skills" className="py-16 md:py-20 bg-darkBg px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-darkText text-center mb-12 md:mb-16 animate-slide-in-up">
          <span className="gradient-text">Skills & Expertise</span>
        </h2>

        {/* Skills Carousel */}
        <div className="relative mb-12 md:mb-16">
          {/* Container overflow hidden untuk clip animation */}
          <div className="overflow-hidden">
            {/* Carousel wrapper dengan animasi */}
            <div className="flex gap-4 md:gap-6 animate-scroll">
              {doubledSkills.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 w-40 h-56 md:w-48 md:h-64 bg-darkCard border-2 border-primary/30 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:border-primary hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Hover overlay background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 md:gap-4 w-full">
                    {/* Logo image container */}
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors p-3 flex-shrink-0">
                      <img 
                        src={skill.logo} 
                        alt={skill.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter brightness-90 group-hover:brightness-100"
                      />
                    </div>
                    
                    {/* Skill name */}
                    <h3 className="text-lg md:text-xl font-bold text-darkText group-hover:text-primary transition-colors truncate w-full">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-darkBg to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-darkBg to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Certificates */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-darkText mb-8 md:mb-12 text-center animate-slide-in-up">
            <span className="gradient-text">Certificates</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Pelatihan AI Elevate",
                issuer: "Elevate AI Academy",
                date: " September 2025",
                image: "/certificates/Sertifikat-elevate.png",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Semifinalis Businens Plan Competition",
                issuer: "Insitut Teknologi Sepuluh Nopember",
                date: "Oktober 2024",
                image: "certificates/sertifikatbpc1.png",
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Semifinalis Business Plan Competition",
                issuer: "Universitas Indonesia",
                date: "May 2025",
                image: "certificates/sertifikatbpc2.png",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Pelatihan OWASP Keamanan Jaringan Web",
                issuer: "Universitas Narotama",
                date: "September 2024",
                image: "certificates/sertifikatOwasp.png",
                color: "from-red-500 to-orange-500"
              },
              {
                title: "Pelatihan Cyber Security",
                issuer: "PT Telkom Indonesia",
                date: "Desember 2024",
                image: "certificates/sertifikatpelatihan.png",
                color: "from-green-500 to-teal-500"
              },
              {
                title: "Pelatihan Trial Class Sistem Informasi",
                issuer: "Telkom University",
                date: "May 2023",
                image: "certificates/sertifikattrialclass.png",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "Pelatihan Uji Ceka Fakta Digital",
                issuer: "Mafindo",
                date: "September 2023",
                image: "certificates/setifikatcekfakta.png",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "Participan Lomba IU/UX",
                issuer: "Universitas Airlangga",
                date: "Oktober 2025",
                image: "certificates/kukubima.jpeg",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "Top 3 Project Inkubasi",
                issuer: "SMK Telkom Sidoarjo",
                date: "Juli 2025",
                image: "certificates/project222.jpeg",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((cert, index) => (
              <div
                key={cert.title}
                className="group p-6 md:p-8 bg-darkCard border-2 border-primary/30 rounded-xl hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-slide-in-up hover:-translate-y-2 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>

                <div className="relative z-10">
                  {/* Certificate Image */}
                  <div className="w-full h-32 md:h-40 mb-4 overflow-hidden rounded-lg border border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTExODI3Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2MzY2RjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DZXJ0aWZpY2F0ZTwvdGV4dD4KPC9zdmc+';
                      }}
                    />
                  </div>

                  {/* Certificate Title */}
                  <h4 className="text-lg md:text-xl font-bold text-darkText mb-2 group-hover:text-primary transition-colors duration-300">
                    {cert.title}
                  </h4>

                  {/* Issuer */}
                  <p className="text-darkText/70 font-medium mb-1 text-sm md:text-base">
                    Issued by: <span className="text-primary">{cert.issuer}</span>
                  </p>

                  {/* Date */}
                  <p className="text-darkText/60 text-sm md:text-base flex items-center">
                    <span className="mr-2">📅</span>
                    {cert.date}
                  </p>

                  {/* Hover effect line */}
                  <div className="mt-4 h-1 bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
