"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";

const team = [
  {
    role: "Founder / Engineering Lead",
    specialty: "Systems architecture and backend infrastructure",
  },
  {
    role: "Product & Design",
    specialty: "Interface design and product strategy",
  },
  {
    role: "AI Engineer",
    specialty: "Applied machine learning and LLM integrations",
  },
];

export default function Team() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white max-w-2xl mb-4">
            The team
          </h2>
          <p className="text-text-secondary max-w-xl">
            A small, senior team. Every person here ships production code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.role}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <TiltCard className="p-6 rounded-2xl border border-border h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand/40 to-brand/10 mb-5" />
                <h3 className="font-semibold text-white mb-2">{member.role}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{member.specialty}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-text-secondary/70 mt-8">
          Team profiles and photos to be added.
        </p>
      </div>
    </section>
  );
}
