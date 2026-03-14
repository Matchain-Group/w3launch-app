import { motion } from "framer-motion";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";

const members = [
  { name: "Nova Reed", role: "Founder / Protocol", twitter: "#", linkedin: "#" },
  { name: "Aria Blaze", role: "Growth / Community", twitter: "#", linkedin: "#" },
  { name: "Kai Mercer", role: "Smart Contracts", twitter: "#", linkedin: "#" },
  { name: "Jules Wynn", role: "Product / Design", twitter: "#", linkedin: "#" }
];

export default function Team() {
  return (
    <section id="team" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan">
            The builders
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Meet the doxxed team.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
              className="glass group rounded-3xl p-6 text-center transition hover:-translate-y-2 hover:shadow-glow"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-glow via-cyan to-white/10 text-xl font-semibold">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">
                {member.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {member.role}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent">
                Doxxed Verified
              </span>
              <div className="mt-4 flex justify-center gap-3 text-white/70">
                <a href={member.twitter} aria-label="Twitter">
                  <FaXTwitter />
                </a>
                <a href={member.linkedin} aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
