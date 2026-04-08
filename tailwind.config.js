/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3d7fff",
        secondary: "#64a0ff",
        accent: "#00c853",
        bg: "#060a12",
        bg2: "#080d18",
        bg3: "#0b1120",
        bgCard: "#090e1a",
        textMain: "#c8d8f0",
        textDim: "#4a6080",
        textMuted: "#2a3a50",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
      animation: {
        "float-slow": "floatY 5.5s ease-in-out infinite",
        "float-mid": "floatY 6.5s ease-in-out infinite",
        "float-fast": "floatY 4.8s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.5s ease-in-out infinite",
        "scroll": "scrollX 30s linear infinite",
        "blink": "blink 1s step-end infinite",
        "fadeSlideUp": "fadeSlideUp .7s ease forwards",
        "boot-bar": "fillBar 2.6s ease forwards",
      },
      keyframes: {
        floatY: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        pulseDot: { "0%,100%": { boxShadow: "0 0 0 0 rgba(0,200,83,.7)" }, "50%": { boxShadow: "0 0 0 6px rgba(0,200,83,0)" } },
        scrollX: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        fadeSlideUp: { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fillBar: { to: { width: "100%" } },
      },
      boxShadow: {
        blue: "0 0 24px rgba(61,127,255,.35)",
        card: "0 20px 50px rgba(0,0,0,.5), 0 0 20px rgba(61,127,255,.06)",
        'glow-primary': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-primary-hover': '0 0 30px rgba(255, 255, 255, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'glass-hover': '0 8px 32px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};