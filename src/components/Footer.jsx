import { FaXTwitter, FaDiscord, FaTelegramPlane, FaGithub, FaMedium } from "react-icons/fa6";

export default function Footer() {
  const productName = import.meta.env.VITE_PRODUCT_NAME || "W3Launch";
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/70 px-6 py-16">
      <div className="absolute inset-0 matrix-bg opacity-10" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div>
            <div className="font-display text-2xl font-bold gradient-text">
              {productName}
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              The launchpad for builders who move before the crowd.
            </p>
            <div className="mt-4 flex items-center gap-3 text-white/60">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent">
                Audited
              </span>
              <span className="text-xs">Smart contract audited by SigmaDAO</span>
            </div>
          </div>
          <div className="grid gap-3 text-sm text-white/70">
            <a href="#">Whitepaper</a>
            <a href="#">Audit Report</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <a href="#" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="Discord">
              <FaDiscord />
            </a>
            <a href="#" aria-label="Telegram">
              <FaTelegramPlane />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" aria-label="Medium">
              <FaMedium />
            </a>
          </div>
        </div>
        <div className="mt-10 text-xs text-white/40">
          (c) 2026 {productName}. All rights reserved. Not investment advice.
        </div>
      </div>
    </footer>
  );
}
