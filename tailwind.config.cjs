/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0A0F",
        glow: "#7B2FBE",
        cyan: "#00C2FF",
        accent: "#00FF94",
        glass: "rgba(255, 255, 255, 0.08)"
      },
      fontFamily: {
        display: ["Orbitron", "system-ui", "sans-serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 30px rgba(123, 47, 190, 0.35)",
        glowStrong: "0 0 60px rgba(0, 194, 255, 0.35)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 25px rgba(123, 47, 190, 0.35)" },
          "50%": { boxShadow: "0 0 45px rgba(0, 194, 255, 0.5)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        matrix: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 400px" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        matrix: "matrix 14s linear infinite"
      }
    }
  },
  plugins: []
};
