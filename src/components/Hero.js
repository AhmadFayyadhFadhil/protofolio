import { useState, useEffect } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Developer';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        index = 0; // Reset to loop the animation
      }
    }, 400); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-darkBg flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        {/* Container - Stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end" style={{ paddingTop: '2rem' }}>

          {/* Left Box - Title & Description */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Iam
              <br />
              <span className="gradient-text">Front-End</span>
              <br />
              <span className="gradient-text" style={{ minWidth: '9ch', display: 'inline-block' }}>{typedText}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-darkText/75 leading-relaxed max-w-lg">
              Menggabungkan estetika seni rupa dengan teknologi web interaktif untuk membuat pengalaman yang menarik dan fungsional.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#projects" className="hero-cta hero-cta-primary" aria-label="Lihat Portfolio">Open CV</a>
              <a href="#contact" className="hero-cta hero-cta-secondary" aria-label="Hubungi Saya">Hubungi Saya</a>
            </div>
          </div>

          {/* Right Box - Photo */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="hero-frame-container">
              <div className="hero-frame">
                <img src="/hero-center.jpg?v=1" alt="Hero center" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute -left-20 top-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-20 w-56 h-56 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 text-xs text-darkText/50">SCROLL —</div>

      {/* Divider line */}
      <div className="absolute bottom-6 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
