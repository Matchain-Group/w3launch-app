import { motion } from "framer-motion";
import ShareButtons from "./ShareButtons";

export default function ShareSection({ launchDate, waitlistStats }) {
  const productName = import.meta.env.VITE_PRODUCT_NAME || "W3Launch";
  const twitterHandle = import.meta.env.VITE_TWITTER_HANDLE || "";
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const referralLink = `${origin}/?ref=genesis`;
  const launchInDays = Math.max(
    0,
    Math.ceil((launchDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const handleShare = async (platform) => {
    try {
      await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: null, platform })
      });
    } catch (err) {
      // Non-blocking share logging.
    }
  };

  return (
    <section className="relative z-10 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-6xl"
      >
        <div className="glass rounded-3xl p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">
            Spread the word
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Spread the word. Earn priority access.
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Every referral moves you up the list. The most active builders jump
            straight to the front.
          </p>
          <div className="mt-8">
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
      </motion.div>
    </section>
  );
}
