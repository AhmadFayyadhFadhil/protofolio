import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ProfileLanyard = () => {
    // Motion Values for advanced physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring configuration for smooth returns
    const springConfig = { stiffness: 120, damping: 12, mass: 1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    // Dynamic Rotation based on drag position (Realistic Tilt)
    const rotateX = useTransform(ySpring, [-120, 120], [10, -10]);
    const rotateY = useTransform(xSpring, [-120, 120], [-10, 10]);

    // Lanyard Stretch Effect (Tali memanjang saat ditarik)
    const scaleY = useTransform(ySpring, [-100, 100], [0.8, 1.2]);

    return (
        <div className="flex flex-col items-center justify-start relative pt-32 pb-20 min-h-[600px] w-full" style={{ perspective: 1000 }}>
            {/* Realtime Lanyard String (SVG for realistic look) */}
            <svg
                className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                width="200"
                height="300"
                viewBox="0 0 200 300"
                style={{ zIndex: 0 }}
            >
                <motion.line
                    x1="100"
                    y1="0"
                    x2={useTransform(xSpring, val => 100 + val / 2)}
                    y2={useTransform(ySpring, val => 120 + val)}
                    stroke="url(#lanyard-gradient)"
                    strokeWidth="2"
                    style={{ scaleY, originY: 0 }}
                />
                <defs>
                    <linearGradient id="lanyard-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Draggable Card Component */}
            <motion.div
                drag
                dragConstraints={{ left: -120, right: 120, top: -100, bottom: 100 }}
                dragElastic={0.2}
                style={{
                    x,
                    y,
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                whileHover={{ scale: 1.03 }}
                whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                    // Subtle idle swing
                    rotateZ: [-1, 1, -1],
                    transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="relative z-10 cursor-grab active:cursor-grabbing"
            >
                {/* Visual Card Body */}
                <div className="glass-card w-[280px] p-6 rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 shadow-[0_0_25px_rgba(34,211,238,0.15)] relative overflow-hidden">
                    {/* Top Hole for Lanyard Connection */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/10 rounded-full border border-white/5"></div>

                    <div className="flex flex-col items-center mt-4">
                        {/* Profile Photo Wrapper */}
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <img
                                src="/myphoto.jpg"
                                alt="Ahmad Fadhil"
                                className="w-full h-full object-cover filter contrast-110"
                            />
                        </div>

                        {/* User Info */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Ahmad Fadhil</h3>
                            <p className="text-xs text-cyan-400 font-medium uppercase tracking-[0.2em] mb-6">FullStack Developer</p>

                            {/* Tech Stack / Bio */}
                            <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5 space-y-2 text-left">
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white/30 tracking-widest uppercase">Specialization</span>
                                    <span className="text-white/80 font-bold italic">REACT • PHP • MYSQL</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white/30 tracking-widest uppercase">Location</span>
                                    <span className="text-white/80 font-mono">Sidoarjo, ID</span>
                                </div>
                            </div>

                            {/* Decorative Barcode */}
                            <div className="mt-8 pt-4 border-t border-white/10 w-full flex flex-col items-center opacity-30">
                                <div className="h-8 w-full bg-[repeating-linear-gradient(90deg,white,white_1px,transparent_1px,transparent_4px)]"></div>
                                <span className="text-[8px] mt-1 tracking-[0.4em] text-white">46F614AF-BFED-4CB2</span>
                            </div>
                        </div>
                    </div>

                    {/* Gloss Shine Overlay */}
                    <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 pointer-events-none transition-transform duration-1000 group-hover:translate-x-full"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileLanyard;
