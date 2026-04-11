import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
const Hero = () => {
  // Variabel Efek Tilt 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-darkBg flex items-center justify-center">
      {/* Background Ambient Aurora */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Overlay Tekstur Noise */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-20">

          {/* Sisi Kiri - Judul & Deskripsi — tampil langsung tanpa animasi masuk */}
          <div className="flex flex-col justify-center">
            <div className="glass-pill mb-8 w-max relative group">
              <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-white/80 font-medium tracking-wide">Tersedia untuk Bekerja</span>
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Fayyadh
              <br />
              <span className="gradient-text pb-2 inline-block">Fadhil</span>
              <br />
              <span className="block mt-2 font-bold tracking-tight text-2xl md:text-3xl">
                <TypeAnimation
                  sequence={[
                    'FullStack Developer',
                    1500,
                    '',
                    500,
                    'Sistem Internet Jaringan Aplikasi',
                    1500,
                    '',
                    500,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                />
              </span>
            </h1>
            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-md mb-10 font-light">
              Menjadikan proses belajar sebagai fondasi utama dalam berkembang di dunia pengembangan web. Berupaya menghadirkan solusi digital yang membawa dampak positif dan bermanfaat bagi masyarakat luas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="btn-primary text-center">
                Lihat Proyek
              </a>
              <a href="#contact" className="btn-secondary text-center">
                Hubungi Saya
              </a>
            </div>
          </div>

          {/* Sisi Kanan - Foto dengan Efek Tilt (hover tetap aktif) */}
          <motion.div
            className="flex items-center justify-center lg:justify-end relative perspective-1000 mt-10 lg:mt-0"
            initial={false}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] rounded-3xl bg-darkCard overflow-hidden flex items-center justify-center sm:animate-float-subtle shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
              <div className="absolute inset-0 rounded-3xl border border-white/10 blur-[1px] m-4 pointer-events-none z-20" />

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
};

export default Hero;
