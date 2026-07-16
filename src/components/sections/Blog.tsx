"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const posts = [
  {
    category: "AI",
    title: "What building an AI order-risk engine taught us about trust",
    excerpt: "Flagging risky orders before they cost a seller money means getting false positives right, not just accuracy.",
  },
  {
    category: "Software Engineering",
    title: "Reconciling COD payments at scale",
    excerpt: "How we took cash-on-delivery reconciliation from a three-hour manual task to thirty seconds.",
  },
  {
    category: "Automation",
    title: "Designing a bilingual product for the Bangladesh market",
    excerpt: "Bangla and English aren't a toggle. They change how a form, a receipt, and a support flow should work.",
  },
];

export default function Blog() {
  const reduce = useSafeReducedMotion();

  return (
    <section id="blog" className="py-24 sm:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl font-semibold text-white max-w-2xl mb-16"
        >
          Latest writing
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <TiltCard
                as="a"
                href="#"
                className="group flex flex-col h-full p-6 rounded-2xl border border-border hover:border-border-hover transition-colors duration-300"
              >
                <span className="text-xs font-mono text-brand mb-4">{post.category}</span>
                <h3 className="font-semibold text-white mb-2 leading-snug flex-1">{post.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all">
                  Read more <ArrowRight size={14} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
