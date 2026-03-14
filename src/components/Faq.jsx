import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

const questions = [
  {
    q: "What blockchain is this built on?",
    a: "W3Launch ships on Ethereum mainnet with Polygon expansion for scale and low fees."
  },
  {
    q: "How do I qualify for whitelist?",
    a: "Join the waitlist, connect a wallet, and share your referral link to climb priority."
  },
  {
    q: "What is the token utility?",
    a: "The token unlocks staking boosts, governance access, and exclusive partner drops."
  },
  {
    q: "When is the official launch date?",
    a: "The launch date is fixed and visible in the live countdown timer on this page."
  },
  {
    q: "How do I claim my allocation?",
    a: "Confirmed wallets receive a private mint link and allocation window before public launch."
  },
  {
    q: "Is the smart contract audited?",
    a: "Yes. The audit is complete and the report will be published before mainnet launch."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            The questions everyone asks.
          </h2>
        </div>
        <div className="space-y-4">
          {questions.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.q} className="glass rounded-2xl p-6">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span className="font-display text-lg">{item.q}</span>
                  <HiChevronDown
                    className={`text-cyan transition ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm text-white/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
