import { useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import GlobeCanvas from "./GlobeCanvas";
import "particles.js";

const particleConfig = {
  particles: {
    number: { value: 120, density: { enable: true, value_area: 900 } },
    color: { value: ["#7B2FBE", "#00C2FF"] },
    shape: { type: "circle" },
    opacity: { value: 0.4 },
    size: { value: 2.4, random: true },
    line_linked: {
      enable: true,
      distance: 140,
      color: "#3f2e6f",
      opacity: 0.35,
      width: 1
    },
    move: { enable: true, speed: 1.2 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: false }
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.6 } }
    }
  },
  retina_detect: true
};

export default function Background() {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.particlesJS) return;
    const config = {
      ...particleConfig,
      particles: {
        ...particleConfig.particles,
        number: {
          ...particleConfig.particles.number,
          value: isMobile ? 60 : 120
        }
      }
    };
    window.particlesJS("particles-js", config);
  }, [isMobile]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div id="particles-js" className="absolute inset-0" />
      {!isMobile && <GlobeCanvas />}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#120C1F] to-[#061B2A] opacity-95" />
      <div className="absolute inset-0">
        <span className="crypto-float left-[8%] top-[15%]">◆</span>
        <span className="crypto-float left-[75%] top-[20%]">⬡</span>
        <span className="crypto-float left-[20%] top-[65%]">∞</span>
        <span className="crypto-float left-[85%] top-[70%]">Ξ</span>
        <span className="crypto-float left-[45%] top-[80%]">₿</span>
      </div>
    </div>
  );
}
