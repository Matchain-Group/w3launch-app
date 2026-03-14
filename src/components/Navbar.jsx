import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { label: "About", href: "#about" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" }
];

export default function Navbar() {
  const productName = import.meta.env.VITE_PRODUCT_NAME || "W3Launch";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header
      className={`fixed top-0 z-30 w-full transition ${
        scrolled ? "backdrop-blur-xl bg-[#0A0A0F]/80 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold tracking-widest">
          <span className="gradient-text">{productName}</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <ConnectButton chainStatus="none" accountStatus="address" showBalance />
        </nav>
        <button
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/90 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#0A0A0F]/90 px-6 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <ConnectButton chainStatus="none" accountStatus="address" showBalance />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
