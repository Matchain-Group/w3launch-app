import { motion } from "framer-motion";
import { TbUnlink, TbCube } from "react-icons/tb";
import { HiBolt } from "react-icons/hi2";

const cards = [
  {
    icon: <TbUnlink className="text-3xl" />,
    title: "The Old Way is Broken",
    text:
      "Whitelists are opaque, whales dominate, and early believers get pushed out."
  },
  {
    icon: <HiBolt className="text-3xl" />,
    title: "Built Different",
    text:
      "W3Launch rewards builders first with on-chain proof, priority boosts, and real-time access."
  },
  {
    icon: <TbCube className="text-3xl" />,
    title: "Powered by Web3",
    text:
      "Multi-chain rails, audited smart contracts, and a global node mesh keep it unstoppable."
  }
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">
            Why W3Launch
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            A launch designed to reward the earliest believers.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
              className="glass group rounded-3xl p-6 transition hover:-translate-y-2 hover:shadow-glow"
            >
              <div>{card.icon}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
