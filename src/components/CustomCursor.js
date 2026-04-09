import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cek apakah perangkat adalah touch atau mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Titik Kursor Utama */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* Cincin Kursor Pengikut */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-green-400 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
      />
      {/* Kilau Pengikut Jauh */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-md pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;
