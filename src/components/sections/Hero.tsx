"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NodeDiagram from "@/components/ui/NodeDiagram";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-primary pt-20">
      <NodeDiagram className="absolute inset-0 w-full h-full opacity-60" />

      <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

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
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] text-white mb-6 leading-[1.05]"
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
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-brand text-white font-semibold transition-transform duration-150 ease-out shadow-lg shadow-brand/25 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
          <Link
            href="#featured-projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-border text-text-primary font-semibold hover:border-border-hover hover:bg-white/5 transition-all duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
