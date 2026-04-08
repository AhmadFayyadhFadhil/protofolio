import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import useLenis from './hooks/useLenis';
import IntroScreen from './components/IntroScreen';

// A simple Private Route wrapper
const PrivateRoute = ({ children }) => {
  const isAuthenticated = true; // Set to true for development
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis (Active globally)
  useLenis();

  // Scroll Management & Locking
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (window.lenis) {
        window.lenis.start();
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [isLoading]);

  return (
    <Router>
      <div className="App bg-darkBg min-h-screen relative overflow-x-hidden">
        {/* Intro Layer */}
        <AnimatePresence mode="wait">
          {isLoading && <IntroScreen onFinish={() => setIsLoading(false)} />}
        </AnimatePresence>

        {/* Main Content Layer with Staggered Spring Transition */}
        <motion.div
          initial={{
            y: "120%",
            opacity: 0.8,
            scale: 0.96,
            filter: "blur(6px)"
          }}
          animate={{
            y: isLoading ? "120%" : "0%",
            opacity: isLoading ? 0.8 : 1,
            scale: isLoading ? 0.96 : 1,
            filter: isLoading ? "blur(6px)" : "blur(0px)"
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 22,
            mass: 1.2,
            delay: isLoading ? 0 : 0.15, // Cinematic Stagger
            restDelta: 0.01
          }}
          className="relative z-0 transform-gpu will-change-transform"
        >
          <Routes>
            {/* Main Public Portfolio */}
            <Route path="/" element={<Portfolio />} />

            {/* Admin Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;
