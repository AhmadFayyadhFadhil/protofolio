import { createContext, useContext, useState, useCallback } from 'react';

/**
 * AnimationContext
 * 
 * Menyimpan state global `isPageReady`:
 * - false  → loading screen masih aktif, semua animasi masuk (initial load) dinonaktifkan
 * - true   → halaman sudah siap, animasi scroll/hover/interaksi berjalan normal
 */
const AnimationContext = createContext({
  isPageReady: false,
  markPageReady: () => {},
});

export const AnimationProvider = ({ children }) => {
  const [isPageReady, setIsPageReady] = useState(false);

  const markPageReady = useCallback(() => {
    setIsPageReady(true);
  }, []);

  return (
    <AnimationContext.Provider value={{ isPageReady, markPageReady }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => useContext(AnimationContext);
