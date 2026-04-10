import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './supabase';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import useLenis from './hooks/useLenis';
import IntroScreen from './components/IntroScreen';
import CustomCursor from './components/CustomCursor';
import PixelBackground from './components/PixelBackground';
import { AnimationProvider, useAnimation } from './context/AnimationContext';

// Komponen Pelindung Rute
const PrivateRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// AppContent dipisah agar bisa mengonsumsi AnimationContext
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const { markPageReady } = useAnimation();

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

  // Dipanggil saat IntroScreen selesai — halaman langsung tampil & animasi diaktifkan
  const handleIntroFinish = useCallback(() => {
    setIsLoading(false);
    markPageReady();
  }, [markPageReady]);

  return (
    <div className="App bg-darkBg min-h-screen relative overflow-x-hidden">
      <PixelBackground />
      <CustomCursor />

      {/* Loading Screen — di-unmount setelah selesai via AnimatePresence */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <IntroScreen onFinish={handleIntroFinish} />
        )}
      </AnimatePresence>

      {/*
        Konten utama langsung tampil tanpa animasi masuk.
        visibility: hidden saat loading agar tidak terlihat di belakang intro screen,
        lalu langsung visible setelah loading selesai — tanpa slide/fade/scale.
      */}
      <div
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
        className="relative z-0"
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
      </div>
    </div>
  );
};

const App = () => (
  <AnimationProvider>
    <Router>
      <AppContent />
    </Router>
  </AnimationProvider>
);

export default App;
