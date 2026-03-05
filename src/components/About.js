import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-darkBg px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Tentang <span className="gradient-text">Saya</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-primary/40 to-accent/40">
              <div className="bg-darkCard rounded-2xl p-4">
                <div className="w-64 h-80 md:w-72 md:h-96 overflow-hidden rounded-xl">
                  <img
                    src="/myphoto.jpg"
                    alt="Foto Ahmad Fayyadh Fadhil"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-darkText/80 leading-relaxed">
              Saya <span className="text-primary font-medium">Ahmad Fayyadh Fadhil</span>,
              mahasiswa SMK Telkom Sidoarjo jurusan Sistem Informasi dan Aplikasi Jaringan (SIJA),
              dengan minat besar pada UI/UX Design, front-end development, dan desain website modern.
            </p>

            <p className="text-lg text-darkText/80 leading-relaxed">
              Saya terbiasa menggunakan Figma, HTML, CSS, dan JavaScript untuk membangun antarmuka
              yang bersih dan interaktif. Selain itu, saya juga berpengalaman dalam pengelolaan
              server Linux dengan fokus pada stabilitas, performa, dan keamanan.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
