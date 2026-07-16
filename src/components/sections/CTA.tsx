"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-surface relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-6 leading-tight">
            Let&apos;s build something extraordinary.
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
            Tell us what you&apos;re building. We&apos;ll reply within one
            business day.
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-brand text-white font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
