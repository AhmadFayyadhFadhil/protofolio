import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeOverlay from './components/WelcomeOverlay';

function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    // Show welcome for a few seconds, then start fade-out, then remove from DOM
    const fadeOutDelay = 3000; // ms the overlay stays fully visible
    const fadeDuration = 800; // ms fade-out duration

    const t1 = setTimeout(() => setOverlayVisible(false), fadeOutDelay);
    const t2 = setTimeout(() => setShowOverlay(false), fadeOutDelay + fadeDuration);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="App bg-darkBg min-h-screen">
      {/* WelcomeOverlay disabled for safety */}
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
