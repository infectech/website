"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BoxField from "@/components/ui/BoxField";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-primary pt-20">
      {/* The boxes are the pattern now, so the old rule grid underneath them
          would only add noise. */}
      <BoxField className="absolute inset-0 w-full h-full" />
      {/* Clears the boxes out from behind the headline and lets them frame it,
          rather than sitting underneath the type. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_44%_at_center,var(--color-bg-primary)_45%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary mb-6"
        >
          Software Engineering Studio
        </motion.p>


        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="display-xl text-5xl sm:text-7xl lg:text-[5.5rem] text-ink mb-6"
        >
          Engineering intelligent software for modern businesses.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We design and build AI platforms, commerce infrastructure, and
          enterprise software, from first architecture decision to
          production traffic.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-ink text-white font-semibold transition-all duration-150 ease-out hover:bg-brand-hover hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
          <Link
            href="#featured-projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-border bg-bg-surface text-text-primary font-semibold hover:border-border-hover transition-all duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
