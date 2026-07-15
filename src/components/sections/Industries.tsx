"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HeartPulse,
  GraduationCap,
  Landmark,
  ShoppingBag,
  Factory,
  Building,
  Home,
  Users,
  Truck,
  Wheat,
  Zap,
  Radio,
} from "lucide-react";

const industries = [
  { icon: ShoppingBag, label: "Retail & E-Commerce", active: true },
  { icon: Users, label: "HR & People Ops", active: true },
  { icon: Home, label: "Real Estate", active: true },
  { icon: HeartPulse, label: "Healthcare", active: false },
  { icon: GraduationCap, label: "Education", active: false },
  { icon: Landmark, label: "Finance", active: false },
  { icon: Factory, label: "Manufacturing", active: false },
  { icon: Building, label: "Government", active: false },
  { icon: Truck, label: "Logistics", active: false },
  { icon: Wheat, label: "Agriculture", active: false },
  { icon: Zap, label: "Energy", active: false },
  { icon: Radio, label: "Telecommunications", active: false },
];

export default function Industries() {
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
          Industries we serve
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.label}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
                className={`flex flex-col items-center text-center gap-3 p-5 rounded-xl border transition-colors duration-300 ${
                  ind.active
                    ? "border-brand/30 bg-brand/5"
                    : "border-border"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  className={ind.active ? "text-brand" : "text-text-secondary"}
                />
                <span
                  className={`text-xs font-medium leading-snug ${
                    ind.active ? "text-white" : "text-text-secondary"
                  }`}
                >
                  {ind.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
