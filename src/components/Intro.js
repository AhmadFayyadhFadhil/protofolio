import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Intro = ({ onFinish }) => {
    const containerRef = useRef();
    const textRef = useRef();
    const cursorRef = useRef();
    const overlayRef = useRef();

    useEffect(() => {
        const text = "Welcome to My Portfolio";
        const chars = text.split("");

        // Wrap each character in a span for GSAP staggering
        textRef.current.innerHTML = chars
            .map(char => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
            .join("");

        const tl = gsap.timeline({
            onComplete: () => {
                // Delay slightly before calling finish to allow exit animation
                setTimeout(onFinish, 1000);
            }
        });

        // 1. Initial State: Glow breathing & Noise ripple
        gsap.to(".glow-orb", {
            scale: 1.2,
            opacity: 0.8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 2. Typewriter Animation
        tl.from(".char", {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            scale: 0.8,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
        });

        // Blinking Cursor
        gsap.to(cursorRef.current, {
            opacity: 0,
            repeat: -1,
            duration: 0.5,
            yoyo: true,
        });

        // 3. Pause
        tl.to({}, { duration: 1 });

        // 4. Flash Transition
        tl.to(containerRef.current, {
            backgroundColor: "#ffffff",
            duration: 0.1,
            ease: "none",
        });
        tl.to(containerRef.current, {
            backgroundColor: "#000000",
            duration: 0.2,
            ease: "none",
        });

        // 5. Exit Animations
        tl.to(".char", {
            opacity: 0,
            y: -40,
            filter: "blur(15px)",
            stagger: 0.02,
            duration: 0.6,
            ease: "power4.in"
        }, "+=0.2");

        tl.to(".glow-orb", {
            scale: 4,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.4");

        tl.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut"
        }, "-=0.6");

    }, [onFinish]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden select-none">
            {/* Cinematic Background Elements */}
            <div className="glow-orb absolute w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full"></div>
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center gap-1 font-inter">
                <h1
                    ref={textRef}
                    className="text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                ></h1>
                <span
                    ref={cursorRef}
                    className="w-[3px] h-8 md:h-12 lg:h-14 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                ></span>
            </div>

            {/* Slide Overlay (Transition Curtain) */}
            <div ref={overlayRef} className="absolute inset-0 bg-darkBg z-20 translate-y-full"></div>
        </div>
    );
};

export default Intro;
