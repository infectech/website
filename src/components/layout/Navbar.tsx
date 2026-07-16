"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "bg-[rgba(11,18,32,0.7)] backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <span className="font-display text-lg font-semibold tracking-tight transition-transform duration-200 ease-out group-hover:-translate-y-px inline-block">
            <span className="gradient-text-brand">Infect</span>
            <span className="text-white">ech</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group relative text-sm font-medium transition-colors duration-200 ${
                    active ? "text-white" : "text-text-secondary hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-brand transition-all duration-300 ease-out ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full text-sm font-semibold gradient-brand text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.96] active:translate-y-0"
          >
            Start Your Project
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg text-slate-300 transition-transform duration-150 ease-out active:scale-90"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15, ease: EASE_OUT }}
              className="block"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="lg:hidden bg-bg-primary border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pt-2 pb-4">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04, ease: EASE_OUT }}
                >
                  <Link
                    href={l.href}
                    className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 active:scale-[0.98] transition-all duration-150"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.04, ease: EASE_OUT }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  className="block w-full text-center py-2.5 rounded-full text-sm font-semibold gradient-brand text-white active:scale-[0.97] transition-transform duration-150"
                >
                  Start Your Project
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
