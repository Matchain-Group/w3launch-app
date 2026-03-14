import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount, useBalance } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import confetti from "canvas-confetti";
import ShareButtons from "./ShareButtons";

const sources = [
  "Twitter/X",
  "Discord",
  "Friend",
  "YouTube",
  "Google",
  "Other"
];

export default function WaitlistSection({ waitlistStats, launchDate }) {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { openConnectModal } = useConnectModal();

  const [form, setForm] = useState({
    email: "",
    wallet: "",
    twitter: "",
    source: sources[0]
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const productName = import.meta.env.VITE_PRODUCT_NAME || "W3Launch";

  useEffect(() => {
    if (isConnected && address && !form.wallet) {
      setForm((prev) => ({ ...prev, wallet: address }));
    }
  }, [isConnected, address, form.wallet]);

  const referredBy = useMemo(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("ref");
  }, []);

  const launchInDays = Math.max(
    0,
    Math.ceil((launchDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const handleChange = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          wallet_address: form.wallet,
          twitter_handle: form.twitter,
          referral_source: form.source,
          referred_by: referredBy
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Something went wrong.");
      }

      setSuccess(payload);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const referralLink = success?.referral_link ?? "";
  const twitterHandle = import.meta.env.VITE_TWITTER_HANDLE || "";
  const handleShare = async (platform) => {
    if (!success?.email) return;
    try {
      await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: success.email, platform })
      });
    } catch (err) {
      // Non-blocking share logging.
    }
  };

  return (
    <section id="waitlist" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">
            Secure your spot
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Secure your spot before launch
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Only {waitlistStats.limit} whitelist spots.{" "}
            {waitlistStats.remaining} remaining.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="glass rounded-3xl p-8"
          >
            <div className="grid gap-5">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40"
                  placeholder="you@domain.xyz"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Wallet address (optional)
                </label>
                <div className="mt-2 flex flex-col gap-3 md:flex-row">
                  <input
                    type="text"
                    value={form.wallet}
                    onChange={handleChange("wallet")}
                    className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40"
                    placeholder="0x..."
                  />
                  <button
                    type="button"
                    onClick={() => openConnectModal?.()}
                    className="rounded-xl border border-cyan/60 bg-cyan/10 px-4 py-3 text-sm font-semibold text-white hover:shadow-glowStrong"
                  >
                    Connect Wallet
                  </button>
                </div>
                {isConnected && balance && (
                  <p className="mt-2 text-xs text-white/60">
                    Connected: {address?.slice(0, 6)}...{address?.slice(-4)} |{" "}
                    {Number(balance.formatted).toFixed(3)} {balance.symbol}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Twitter handle (optional)
                </label>
                <input
                  type="text"
                  value={form.twitter}
                  onChange={handleChange("twitter")}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40"
                  placeholder="@handle"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                  How did you find us?
                </label>
                <select
                  value={form.source}
                  onChange={handleChange("source")}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white"
                >
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
              {error && (
                <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="animate-pulseGlow rounded-full bg-gradient-to-r from-glow via-cyan to-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? "Claiming..." : "Claim My Whitelist Spot ->"}
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="glass rounded-3xl p-8"
          >
            {!success && (
              <>
                <h3 className="font-display text-2xl font-semibold">
                  Launching in {launchInDays} days
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  Every verified referral moves you up the waitlist. Secure
                  priority access before spots disappear.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/70">
                  <li>- Early wallet access to the private mint.</li>
                  <li>- Priority staking rewards multiplier.</li>
                  <li>- Genesis NFT reserved for first movers.</li>
                </ul>
              </>
            )}
            {success && (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  You are in
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold">
                  You are #{success.waitlist_number}
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  Share your link and climb the list. Each referral boosts your
                  priority.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  Referrals: {success.referral_count ?? 0}
                </p>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/70">
                  {referralLink}
                </div>
                <div className="mt-6">
                  <ShareButtons
                    referralLink={referralLink}
                    productName={productName}
                    launchInDays={launchInDays}
                    spotsRemaining={waitlistStats.remaining}
                    twitterHandle={twitterHandle}
                    onShare={handleShare}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
