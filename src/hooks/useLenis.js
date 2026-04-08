import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Store lenis instance on window for global access (like from Navbar)
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);
};

export default useLenis;
