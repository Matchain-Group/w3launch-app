import { useEffect } from "react";

export const useSpotlight = () => {
  useEffect(() => {
    const onMove = (event) => {
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;
      document.documentElement.style.setProperty("--spotlight-x", x);
      document.documentElement.style.setProperty("--spotlight-y", y);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
};
