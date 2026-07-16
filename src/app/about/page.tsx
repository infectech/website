"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import { Target, Layers, Handshake } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "What we do",
    content:
      "Infectech partners with startups and enterprises to engineer complete digital ecosystems, not just websites or apps.",
  },
  {
    icon: Layers,
    title: "How we work",
    content:
      "We take products from first architecture diagram to production traffic, and we stay in the room for what happens after launch.",
  },
  {
    icon: Handshake,
    title: "What proves it",
    content:
      "Infectech isn't a portfolio of concepts. It's a working studio with live products currently processing real orders, rent payments, and HR workflows for paying users in production today.",
  },
];

export default function AboutPage() {
  const reduce = useSafeReducedMotion();

  return (
    <div className="pt-32 pb-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-20"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-6">
            About Infectech
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A software engineering studio that designs, builds, and scales
            production systems, AI platforms, commerce infrastructure, and
            enterprise software, for companies that can&apos;t afford to ship
            something fragile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-border"
              >
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.content}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl font-semibold text-white mb-3">The team</h2>
          <p className="text-text-secondary max-w-xl">
            A lean, senior team by design. Small enough that every person here
            ships production code, not just manages it.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
