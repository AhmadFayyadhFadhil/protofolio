import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabase';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import useLenis from './hooks/useLenis';
import IntroScreen from './components/IntroScreen';
import CustomCursor from './components/CustomCursor';
import PixelBackground from './components/PixelBackground';

// Komponen Pelindung Rute
const PrivateRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  // Inisialisasi Lenis
  useLenis();

  useEffect(() => {
    // 1. Cek session saat pertama kali load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Listen perubahan status auth (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Manajemen Scroll & Penguncian
  useEffect(() => {
    const { body } = document;
    const { lenis } = window;

    if (isLoading) {
      body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      lenis?.stop();
    } else {
      body.style.overflow = 'unset';
      if (lenis) {
        lenis.start();
        lenis.scrollTo(0, { immediate: true });
      }
    }

    return () => {
      body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <Router>
      <div className="App bg-darkBg min-h-screen relative overflow-x-hidden">
        <PixelBackground />
        <CustomCursor />
        <AnimatePresence mode="wait">
          {isLoading && (
            <IntroScreen onFinish={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

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
            delay: isLoading ? 0 : 0.15,
            restDelta: 0.01
          }}
          className="relative z-0 transform-gpu will-change-transform"
        >
          <Routes>
            <Route path="/" element={<Portfolio />} />
            
            {/* Jika sudah login, akses ke /login akan diredirect ke /admin */}
            <Route 
              path="/login" 
              element={session ? <Navigate to="/admin" replace /> : <Login />} 
            />

            {/* Proteksi halaman Admin */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute session={session}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

export default App;
