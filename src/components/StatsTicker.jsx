import { motion, AnimatePresence } from "framer-motion";
import { useTickerData } from "../hooks/useTickerData";

const Change = ({ value }) => {
  if (value === null || value === undefined) return null;
  const positive = value >= 0;
  return (
    <span className={positive ? "text-accent" : "text-red-400"}>
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
};

export default function StatsTicker({ launchDate }) {
  const { stats } = useTickerData();
  const launchInDays = Math.max(
    0,
    Math.ceil((launchDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const fallbackStats = [
    { label: "ETH", value: "--", change: null },
    { label: "BTC", value: "--", change: null },
    { label: "TOTAL MCAP", value: "--", change: null },
    { label: "ETH GAS", value: "--", change: null },
    { label: "SOL", value: "--", change: null },
    { label: "BNB", value: "--", change: null }
  ];

  const items = [
    ...(stats.length ? stats : fallbackStats),
    { label: "LAUNCH IN", value: `${launchInDays} DAYS`, change: null }
  ];

  const rows = [...items, ...items];

  return (
    <section className="relative z-10 border-y border-white/10 bg-black/40 py-4">
      <div className="ticker-mask overflow-hidden">
        <div className="marquee gap-10 px-10">
          {rows.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/80"
            >
              <span className="text-white/40">{item.label}</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={item.value}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-semibold text-white"
                >
                  {item.value}
                </motion.span>
              </AnimatePresence>
              <Change value={item.change} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
