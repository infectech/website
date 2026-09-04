"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import {
  Cpu,
  ShieldCheck,
  Layers3,
  Building2,
  Timer,
  Sparkles,
  Boxes,
  RefreshCw,
  Handshake,
  Lightbulb,
} from "lucide-react";

const reasons = [
  { icon: Cpu, title: "Engineering First", description: "Architecture decisions come before pixels, not after." },
  { icon: ShieldCheck, title: "Security Focused", description: "Enterprise Ready, built to pass a security review, not just a demo." },
  { icon: Layers3, title: "Scalable Architecture", description: "Systems designed for the traffic you'll have in a year, not just today." },
  { icon: Building2, title: "Enterprise Ready", description: "Role-based access, audit trails, and uptime that organizations can depend on." },
  { icon: Timer, title: "Fast Delivery", description: "Transparent timelines and shipped increments, not silent months." },
  { icon: Sparkles, title: "Clean Code", description: "Code a new engineer can read on day one, no archaeology required." },
  { icon: Boxes, title: "Modern Tech Stack", description: "Technologies chosen for the problem, not for the resume." },
  { icon: RefreshCw, title: "Agile Process", description: "Short cycles, real feedback, and the ability to change course early." },
  { icon: Handshake, title: "Long-Term Partnership", description: "We stay in the room for what happens after launch." },
  { icon: Lightbulb, title: "Innovation Driven", description: "Applied AI and automation where they solve a real problem." },
];

export default function WhyChooseUs() {
  const reduce = useSafeReducedMotion();

  return (
    <section id="why-infectech" className="scroll-mt-16 py-24 sm:py-32 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="display-lg text-4xl sm:text-6xl text-ink max-w-2xl mb-16"
        >
          Why Infectech
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.06, ease: [0.23, 1, 0.32, 1] }}
              >
                <TiltCard className="p-6 rounded-2xl border border-border hover:border-border-hover transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-bg-primary border border-border flex items-center justify-center mb-4">
                    <Icon size={18} strokeWidth={1.75} className="text-brand" />
                  </div>
                  <h3 className="font-semibold text-ink mb-1.5 text-sm">{r.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{r.description}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
