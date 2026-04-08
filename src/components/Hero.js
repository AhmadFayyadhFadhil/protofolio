import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero() {
  // 3D Tilt Effect Variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-darkBg flex items-center justify-center">
      {/* Subtle Aurora Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center" style={{ paddingTop: '5rem' }}>

          {/* Left Box - Title & Description */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="glass-pill mb-8 w-max relative group">
              <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              <span className="text-white/80 font-medium tracking-wide">Tersedia untuk Berkerja</span>
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Ahmad
              <br />
              <span className="gradient-text pb-2 inline-block">Fadhil</span>
              <br />
              <span className="text-3xl md:text-4xl text-white/40 block mt-2 font-medium tracking-normal">Front-End Developer.</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-lg mb-10 font-light">
              Menciptakan pengalaman digital yang luar biasa. Berpengalaman dalam membangun aplikasi web modern, terukur, dan elegan dari awal hingga akhir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="btn-primary text-center">
                Lihat Proyek
              </a>
              <a href="#contact" className="btn-secondary text-center">
                Hubungi Saya
              </a>
            </div>
          </motion.div>

          {/* Right Box - Photo */}
          <motion.div
            className="flex items-center justify-center lg:justify-end relative perspective-1000 mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Elegant 3D Container Box */}
            <div
              className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] rounded-3xl bg-darkCard overflow-hidden flex items-center justify-center sm:animate-float-subtle shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
            >
              {/* Inner Soft Gradient Ring */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 blur-[1px] m-4 pointer-events-none z-20"></div>

              <img
                src="/hero-center.jpg?v=1"
                alt="Ahmad Fadhil"
                className="w-full h-full object-cover object-center filter contrast-110 brightness-90 grayscale-[10%] transition-smooth group-hover:grayscale-0 group-hover:scale-105 relative z-10"
                style={{ transform: "translateZ(20px)" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
