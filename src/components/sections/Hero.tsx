"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCanvas from "@/components/ui/HeroCanvas";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Corner handle of the selection frame. */
function Handle({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-2 w-2 border border-accent bg-bg-surface ${className}`}
    />
  );
}

export default function Hero() {
  const reduce = useSafeReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  // Measured rather than hard-coded, so the annotation states the headline's
  // real width the way a design tool would. Null until measured, which also
  // keeps it out of the server render.
  const [measure, setMeasure] = useState<number | null>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setMeasure(Math.round(entry.contentRect.width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-primary pt-20">
      <HeroCanvas />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-20">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary mb-6"
        >
          Software Engineering Studio
        </motion.p>


        <div className="relative mb-6">
          <motion.h1
            ref={headlineRef}
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="display-xl text-5xl sm:text-7xl lg:text-[5.5rem] text-ink"
          >
            Engineering intelligent software for modern businesses.
          </motion.h1>

          {/* Selection frame, drawn on the headline the way a canvas tool
              would show the selected object. */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7, ease: EASE_OUT }}
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-3 -inset-y-4 hidden border border-accent/70 lg:block"
          >
            <Handle className="-left-1 -top-1" />
            <Handle className="-right-1 -top-1" />
            <Handle className="-bottom-1 -left-1" />
            <Handle className="-bottom-1 -right-1" />
          </motion.div>

          {/* Guide line and measurement tags. Anchored to the headline's own
              centre line, so they track it without measuring its offset. */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8, ease: EASE_OUT }}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden w-screen -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <div className="h-px w-full bg-accent/40" />
            {measure !== null && (
              <>
                <span className="absolute left-4 top-1.5 rounded-[3px] bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none text-white">
                  {measure} px
                </span>
                <span className="absolute right-4 top-1.5 rounded-[3px] bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none text-white">
                  {measure} px
                </span>
              </>
            )}
          </motion.div>
        </div>

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
