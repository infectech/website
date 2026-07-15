"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Setup took 10 minutes. I wish I had this three years ago.",
    role: "Seller using the Daffodil F-Commerce OS",
    location: "Chattogram",
  },
  {
    quote: "AI analytics showed exactly which products were bleeding money.",
    role: "Seller using the Daffodil F-Commerce OS",
    location: "Chattogram",
  },
  {
    quote: "COD reconciliation went from three hours to thirty seconds.",
    role: "Seller using the Daffodil F-Commerce OS",
    location: "Rajshahi",
  },
  {
    quote: "Excel caused constant errors. Now everything is automatic, with no room for mistakes.",
    role: "Landlord using Barighor",
    location: "Chittagong",
  },
  {
    quote: "Tenants can see their own balance now. They don't need to keep asking me.",
    role: "Landlord using Barighor",
    location: "Sylhet",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 sm:py-32 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-white text-center mb-4"
        >
          What people say about the products we&apos;ve engineered
        </motion.h2>

        <div className="relative mt-14 min-h-[220px] flex items-center">
          <Quote size={32} className="absolute -top-4 left-1/2 -translate-x-1/2 text-brand/30" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="w-full text-center"
            >
              <p className="text-xl sm:text-2xl text-white leading-snug mb-6">
                &ldquo;{testimonials[index].quote}&rdquo;
              </p>
              <p className="text-sm text-text-secondary">
                {testimonials[index].role} - {testimonials[index].location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 rounded-full border border-border hover:border-border-hover text-text-secondary hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-brand" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 rounded-full border border-border hover:border-border-hover text-text-secondary hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
