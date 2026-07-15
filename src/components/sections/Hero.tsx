"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NodeDiagram from "@/components/ui/NodeDiagram";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-primary pt-20">
      <NodeDiagram className="absolute inset-0 w-full h-full opacity-60" />

      <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary mb-6"
        >
          Software Engineering Studio
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] text-white mb-6 leading-[1.05]"
        >
          Engineering intelligent software for modern businesses.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We design and build AI platforms, commerce infrastructure, and
          enterprise software, from first architecture decision to
          production traffic.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-brand text-white font-semibold transition-transform duration-200 shadow-lg shadow-brand/25 hover:-translate-y-0.5"
          >
            Start Your Project
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#featured-projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-border text-text-primary font-semibold hover:border-border-hover hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5"
          >
            View Our Work
          </Link>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-text-secondary max-w-xl mx-auto"
        >
          Live in production today: AI-powered HR platforms, e-commerce
          operating systems, and fintech-adjacent SaaS used by real
          businesses across Bangladesh and beyond.
        </motion.p>
      </div>
    </section>
  );
}
