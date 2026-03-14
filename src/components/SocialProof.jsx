import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const logos = ["Ethereum", "Polygon", "Chainlink", "IPFS"];

export default function SocialProof({ waitlistStats }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, waitlistStats.count, {
      duration: 0.8,
      ease: "easeOut"
    });
    return controls.stop;
  }, [count, waitlistStats.count]);

  return (
    <section className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan">
          Social proof
        </p>
        <motion.div className="mt-4 font-display text-5xl font-bold md:text-6xl">
          <motion.span>{rounded}</motion.span> builders already waiting
        </motion.div>
        <div className="mt-8 flex justify-center">
          <div className="flex -space-x-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`avatar-${index}`}
                className="h-12 w-12 rounded-full border border-white/10 bg-gradient-to-br from-glow/60 via-cyan/40 to-white/10 blur-[1px]"
              />
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/60">
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
