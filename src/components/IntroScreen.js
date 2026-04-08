import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const IntroScreen = ({ onFinish }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const displayTime = 2800;
        const timer = setTimeout(() => {
            setIsExiting(true);
            // Logic Finish: matches spring settle time (approx 1.4s)
            setTimeout(onFinish, 1400);
        }, displayTime);

        return () => clearTimeout(timer);
    }, [onFinish]);

    // Spring Configuration: Weighted & Natural
    const springConfig = {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 1.2,
        bounce: 0,
        restDelta: 0.01
    };

    return (
        <motion.div
            initial={{ y: "0%", filter: "blur(0px)" }}
            animate={{
                // Multi-step exit for "weighted resistance" feel
                y: isExiting ? ["0%", "-10%", "-100%"] : "0%",
                filter: isExiting ? "blur(8px)" : "blur(0px)"
            }}
            transition={isExiting ? springConfig : { duration: 1 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a] overflow-hidden transform-gpu will-change-transform"
        >
            {/* Background Cinematic Glow & Noise */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#001f3f]/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Animated Text */}
                <motion.h1
                    initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-center drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                    Welcome to My Portfolio
                </motion.h1>

                {/* Neon Horizontal Line */}
                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.8 }}
                        className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent shadow-[0_0_15px_#00d4ff]"
                    ></motion.div>
                </div>
            </div>

            {/* Decorative Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-[1px]"></div>
        </motion.div>
    );
};

export default IntroScreen;
