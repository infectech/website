"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  ShoppingCart,
  Home,
  Wrench,
  MessagesSquare,
  LayoutDashboard,
  Landmark,
  Boxes,
} from "lucide-react";

const categories = [
  {
    icon: Users,
    title: "HR & Recruitment Platforms",
    description: "AI-driven candidate matching, engagement, and performance tools.",
    proof: "See AIHR",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Operating Systems",
    description: "Order capture, courier logistics, and COD reconciliation for high-volume sellers.",
    proof: "See Daffodil F-Commerce OS, PrimeOMS",
  },
  {
    icon: Home,
    title: "PropTech / Rent Management",
    description: "Digital tools replacing paper ledgers for landlords and property managers.",
    proof: "See Barighor",
  },
  {
    icon: Wrench,
    title: "Field-Service & Local Business Platforms",
    description: "Booking, service catalogs, and bilingual customer-facing sites for service businesses.",
    proof: "See Grameen Pest Control",
  },
  {
    icon: MessagesSquare,
    title: "AI Conversation & Analytics Tools",
    description: "Conversation intelligence and AI-assisted analysis products.",
    proof: "See Sonic",
  },
  {
    icon: LayoutDashboard,
    title: "Business Dashboards & Admin Consoles",
    description: "Internal tools that make operational data usable, not just visible.",
    proof: null,
  },
  {
    icon: Landmark,
    title: "Fintech-adjacent Systems",
    description:
      "Payment and courier integrations (bKash, Nagad, Rocket, SSLCommerz, Pathao, RedX, Steadfast) wired into real transaction flows.",
    proof: null,
  },
  {
    icon: Boxes,
    title: "Custom Internal Tools",
    description: "Purpose-built software for teams whose workflow doesn't fit an off-the-shelf product.",
    proof: null,
  },
];

export default function WhatWeBuild() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl font-semibold text-white max-w-2xl mb-16"
        >
          What we build
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="p-6 rounded-2xl border border-border hover:border-border-hover transition-colors duration-300"
              >
                <Icon size={22} strokeWidth={1.75} className="text-brand mb-4" />
                <h3 className="font-semibold text-white mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{c.description}</p>
                {c.proof && (
                  <p className="text-xs text-brand mt-3 font-medium">{c.proof}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
