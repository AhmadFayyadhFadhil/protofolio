import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import useLenis from './hooks/useLenis';
import IntroScreen from './components/IntroScreen';

const PrivateRoute = ({ children }) => {
  // Biarkan true untuk development sebagaimana kode aslinya, namun dirapikan
  const isAuthenticated = true;
  return isAuthenticated ? children : <Login />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Inisialisasi Lenis (Aktif secara global)
  useLenis();

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

    // Cleanup untuk memastikan overflow tidak terkunci jika komponen unmount
    return () => {
      body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <Router>
      <div className="App bg-darkBg min-h-screen relative overflow-x-hidden">
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
            <Route path="/login" element={<Login />} />
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
};

export default App;
