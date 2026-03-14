import { motion } from "framer-motion";

const phases = [
  {
    title: "PHASE 1 - GENESIS (NOW)",
    active: true,
    items: [
      "Smart contract audit",
      "Team doxxed",
      "Whitelist open",
      "Community building"
    ]
  },
  {
    title: "PHASE 2 - LAUNCH (30 DAYS)",
    active: true,
    items: [
      "Token generation event",
      "DEX listing",
      "Staking goes live",
      "NFT drop for whitelist"
    ]
  },
  {
    title: "PHASE 3 - EXPANSION (Q3)",
    active: false,
    items: ["CEX listings", "Partnerships announced", "Mobile app"]
  },
  {
    title: "PHASE 4 - ECOSYSTEM (Q4)",
    active: false,
    items: ["DAO governance live", "Cross-chain bridge", "Grant program opens"]
  }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">Roadmap</p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            The path to launch and beyond.
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-8 h-1 w-full bg-gradient-to-r from-glow via-cyan to-accent opacity-60" />
          <div className="grid gap-6 lg:grid-cols-4">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.4 }}
                className={`glass relative mt-6 rounded-3xl p-6 ${
                  phase.active
                    ? "shadow-glow"
                    : "opacity-60 blur-[1px] grayscale"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {phase.title}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {phase.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
