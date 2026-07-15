"use client";

import { motion, useReducedMotion } from "framer-motion";
import FlowLine from "@/components/ui/FlowLine";

const steps = [
  { title: "Discover", duration: "3-5 days", description: "We map the problem, the users, and the constraints before writing a line of spec." },
  { title: "Research", duration: "3-5 days", description: "We look at how your business actually works today, not how the org chart says it does." },
  { title: "Design", duration: "1-2 weeks", description: "You see wireframes and flows before a single screen is built." },
  { title: "Architecture", duration: "3-5 days", description: "We decide the data model, integrations, and infrastructure up front, in writing." },
  { title: "Development", duration: "4-12 weeks", description: "You get working software in short cycles, not a single reveal at the end." },
  { title: "Testing", duration: "1-2 weeks", description: "We test against your real workflows, not just unit coverage numbers." },
  { title: "Deployment", duration: "2-3 days", description: "Launch is a routine event with a rollback plan, not a leap of faith." },
  { title: "Support", duration: "Ongoing", description: "We stay in the room after launch to fix, extend, and monitor what we built." },
];

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl font-semibold text-white max-w-2xl mb-20"
        >
          How a project moves
        </motion.h2>

        <div className="relative">
          <FlowLine className="hidden lg:block absolute top-8 left-0 right-0 h-5 -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="relative"
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center mb-4">
                  <span className="font-mono text-sm text-brand-hover">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs font-mono text-text-secondary/80 mb-2">{step.duration}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
