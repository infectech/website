"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What does a typical project timeline look like?",
    answer:
      "Most projects run 6 to 16 weeks from kickoff to launch, depending on scope. We share a written timeline after Discover, before any development starts.",
  },
  {
    question: "Do you work with early-stage startups or only established companies?",
    answer:
      "Both. We've built MVPs for pre-seed founders and production systems for established regional enterprises. The engineering discipline stays the same either way.",
  },
  {
    question: "Can you take over or extend an existing codebase?",
    answer:
      "Yes. We start with a codebase audit before committing to a scope, so you know what you're getting into before we start billing hours.",
  },
  {
    question: "How do you price projects, fixed scope or ongoing partnership?",
    answer:
      "Both models are available. Fixed scope for well-defined builds, retainer-based partnership for products that need continuous iteration after launch.",
  },
  {
    question: "Do you offer support and maintenance after launch?",
    answer:
      "Yes. Support is not an afterthought here. Several of our products are still under our direct maintenance years after their first release.",
  },
  {
    question: "Which industries and markets do you have the deepest experience in?",
    answer:
      "E-commerce, HR technology, and PropTech, primarily serving the Bangladesh market in English and Bangla, with the underlying architecture built to extend beyond it.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useSafeReducedMotion();

  return (
    <section id="faq" className="scroll-mt-16 py-24 sm:py-32 bg-bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="display-lg text-4xl sm:text-6xl text-ink mb-16 text-center"
        >
          Frequently asked
        </motion.h2>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-medium text-ink transition-colors duration-200 group-hover:text-brand-hover">
                    {faq.question}
                  </span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-brand transition-transform duration-300 ease-out ${
                      isOpen ? "rotate-45" : "group-hover:rotate-90"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-text-secondary leading-relaxed pb-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
