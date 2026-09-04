"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LiveSystemsCard from "@/components/ui/LiveSystemsCard";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-bg-primary pt-24 pb-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="text-center lg:text-left">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="display-xl mb-8 text-5xl text-ink sm:text-6xl lg:text-7xl"
          >
            Engineering intelligent software.
          </motion.h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
            className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-brand-hover active:translate-y-0 active:scale-[0.97]"
            >
              Start Your Project
              <ArrowRight
                size={16}
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="#featured-projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg-surface px-8 py-3.5 font-semibold text-text-primary transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-border-hover active:translate-y-0 active:scale-[0.97]"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          className="mx-auto w-full max-w-sm lg:max-w-none"
        >
          <LiveSystemsCard />
        </motion.div>
      </div>
    </section>
  );
}
