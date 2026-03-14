import { useCountdown } from "../hooks/useCountdown";
import Countdown from "./Countdown";
import { motion } from "framer-motion";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Hero({ launchDate }) {
  const countdown = useCountdown(launchDate);
  const { openConnectModal } = useConnectModal();
  const productName = import.meta.env.VITE_PRODUCT_NAME || "W3Launch";

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 shadow-glow animate-pulseGlow"
        >
          MAINNET LAUNCH INCOMING
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="gradient-text">{productName}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          The Web3 drop that rewrites access. Secure your whitelist spot before
          the network goes live.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <Countdown time={countdown} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 md:flex-row"
        >
          <button
            className="rounded-full border border-cyan/60 bg-cyan/10 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-glowStrong transition hover:scale-[1.02]"
            onClick={() => openConnectModal?.()}
          >
            Connect Wallet
          </button>
          <a
            href="#waitlist"
            className="rounded-full bg-gradient-to-r from-glow to-cyan px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-glow transition hover:scale-[1.03]"
          >
            Join Waitlist
          </a>
        </motion.div>
      </div>
    </section>
  );
}
