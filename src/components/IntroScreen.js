import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// ─── Daftar sapaan ASEAN (native script) ───────────────────────────────────
const GREETINGS = [
  { text: 'Halo',          lang: 'Indonesia',  locale: 'id' },
  { text: 'Hai',           lang: 'Malaysia',   locale: 'ms' },
  { text: 'สวัสดี',        lang: 'Thailand',   locale: 'th' },
  { text: 'Xin chào',      lang: 'Vietnam',    locale: 'vi' },
  { text: 'Kumusta',       lang: 'Filipina',   locale: 'fil' },
  { text: 'မင်္ဂလာပါ',    lang: 'Myanmar',    locale: 'my' },
  { text: 'ជំរាបសួរ',     lang: 'Kamboja',    locale: 'km' },
  { text: 'ສະບາຍດີ',      lang: 'Laos',       locale: 'lo' },
  { text: 'Hello',         lang: 'Singapura',  locale: 'en-SG' },
];

// Durasi tiap kata ditampilkan (ms)
const WORD_DURATION = 350;
// Total durasi = dari index awal sampai bahasa terakhir + buffer tipis
const DISPLAY_TIME  = (GREETINGS.length * WORD_DURATION) + 400;

// ─── Config exit spring ────────────────────────────────────────────────────
const EXIT_SPRING = {
  type: 'spring',
  stiffness: 60,
  damping: 20,
  mass: 1.2,
  bounce: 0,
  restDelta: 0.01,
};

// ─── Deteksi index awal berdasar bahasa browser ────────────────────────────
function detectStartIndex() {
  try {
    const lang = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
    const exact = GREETINGS.findIndex(g => lang.startsWith(g.locale.toLowerCase()));
    return exact !== -1 ? exact : 0;
  } catch {
    return 0;
  }
}

// ─── Komponen utama ────────────────────────────────────────────────────────
const IntroScreen = ({ onFinish }) => {
  const startIndex = useMemo(detectStartIndex, []);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isExiting,    setIsExiting]    = useState(false);

  // Pergantian kata — berhenti di bahasa terakhir, tidak mengulang
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= GREETINGS.length - 1) return prev;
        return prev + 1;
      });
    }, WORD_DURATION);

    return () => clearInterval(interval);
  }, []);

  // Trigger exit
  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), DISPLAY_TIME);
    return () => clearTimeout(exitTimer);
  }, []);

  // Panggil onFinish setelah animasi exit selesai
  useEffect(() => {
    if (!isExiting) return;
    const finishTimer = setTimeout(onFinish, 1100);
    return () => clearTimeout(finishTimer);
  }, [isExiting, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        y:      isExiting ? ['0%', '-6%', '-100%'] : '0%',
        filter: isExiting ? 'blur(6px)'            : 'blur(0px)',
      }}
      transition={isExiting ? EXIT_SPRING : { duration: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-hidden transform-gpu will-change-transform"
    >
      {/* ── Ambient glow background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505] to-[#001a2e]/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.06] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-600/[0.08] blur-[80px] rounded-full pointer-events-none" />

      {/* ── Konten utama ── */}
      <div className="relative z-10 flex flex-col items-center gap-10">

        {/* Teks sapaan */}
        <div className="flex flex-col items-center gap-3 select-none">
          <span
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white"
            style={{ textShadow: '0 0 30px rgba(34,211,238,0.25)' }}
          >
            {GREETINGS[currentIndex].text}
          </span>
        </div>

        {/* Garis neon scanner */}
        <div className="w-40 sm:w-56 h-[1px] bg-white/[0.06] relative overflow-hidden rounded-full">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '110%' }}
            transition={{
              duration: 1.6,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 0.2,
            }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }}
          />
        </div>

      </div>

      {/* ── Accent line bawah ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </motion.div>
  );
};

export default IntroScreen;