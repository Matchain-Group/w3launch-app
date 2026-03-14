import { AnimatePresence, motion } from "framer-motion";

const unitStyles =
  "glass flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-white/10 text-center md:h-28 md:w-28";

const FlipUnit = ({ label, value }) => (
  <div className="flip-number flex flex-col items-center gap-2">
    <div className={unitStyles}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-3xl font-semibold text-white md:text-4xl"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-xs uppercase tracking-[0.3em] text-white/50">
      {label}
    </span>
  </div>
);

export default function Countdown({ time }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      <FlipUnit label="Days" value={time.days} />
      <FlipUnit label="Hours" value={time.hours} />
      <FlipUnit label="Minutes" value={time.minutes} />
      <FlipUnit label="Seconds" value={time.seconds} />
    </div>
  );
}
