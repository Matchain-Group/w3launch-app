import { motion } from "framer-motion";
import { HiLockClosed } from "react-icons/hi2";

export default function TokenomicsTeaser({ waitlistStats }) {
  const progress =
    waitlistStats.limit === 0
      ? 0
      : Math.min(1, waitlistStats.count / waitlistStats.limit);

  return (
    <section id="tokenomics" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="glass relative overflow-hidden rounded-3xl p-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 blur-2xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                TOKENOMICS
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                Revealed at launch
              </h3>
              <div className="mt-8 flex items-center justify-center">
                <div className="relative h-44 w-44 rounded-full border border-white/20 bg-white/5 blur-[1px]" />
                <div className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl">
                  <HiLockClosed />
                </div>
              </div>
              <p className="mt-6 text-sm text-white/60">
                Token distribution, staking APY, and vesting unlock the moment
                mainnet hits.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="glass rounded-3xl p-10"
          >
            <h3 className="font-display text-2xl font-semibold">
              Whitelist spots remaining
            </h3>
            <p className="mt-3 text-sm text-white/70">
              {waitlistStats.remaining} of {waitlistStats.limit} still open.
            </p>
            <div className="mt-6 h-3 w-full rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-glow via-cyan to-accent transition-all"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="mt-6 text-sm text-white/60">
              The faster the list fills, the higher your priority jumps.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
