"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCanvas from "@/components/ui/HeroCanvas";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-primary pt-20">
      <HeroCanvas />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-20">
        {/* The studio's own line, from the brand deck. The eyebrow that used
            to sit above it only repeated these words back. */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="display-xl text-5xl sm:text-7xl lg:text-[5.5rem] text-ink mb-6"
        >
          Engineering intelligent software.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed"
        >
          AI platforms, commerce infrastructure, and enterprise systems.
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
