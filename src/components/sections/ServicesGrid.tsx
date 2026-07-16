"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import {
  Code2,
  Bot,
  Layers,
  Building2,
  Smartphone,
  Cloud,
  Workflow,
  Plug,
  Palette,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Full-cycle product engineering, from spec to deployed system.",
    href: "/services#custom-software",
  },
  {
    icon: Bot,
    title: "AI Solutions",
    description:
      "Applied AI features, LLM integrations, and intelligent automation built into real products, not bolted on.",
    href: "/services#ai",
  },
  {
    icon: Layers,
    title: "SaaS Platforms",
    description:
      "Multi-tenant architecture, billing, and dashboards designed to scale past the first hundred users.",
    href: "/services#saas",
  },
  {
    icon: Building2,
    title: "Enterprise Systems",
    description:
      "Internal tools, ERPs, and workflow platforms built for organizations that can't tolerate downtime.",
    href: "/services#enterprise",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feel mobile experiences for iOS and Android, sharing a backend with your web platform.",
    href: "/services#mobile",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    description:
      "CI/CD, containerization, and infrastructure-as-code so deployments are boring, on purpose.",
    href: "/services#cloud",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    description:
      "Replacing manual, spreadsheet-and-WhatsApp workflows with systems that run themselves.",
    href: "/services#automation",
  },
  {
    icon: Plug,
    title: "API Development",
    description: "Clean, documented, versioned APIs built to be integrated against for years.",
    href: "/services#api",
  },
  {
    icon: Palette,
    title: "UI/UX Design & Product Strategy",
    description:
      "Interfaces designed around what a user actually does, not what the org chart looks like.",
    href: "/services#design",
  },
];

export default function ServicesGrid() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white">
            What we do
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease: [0.23, 1, 0.32, 1] }}
              >
                <TiltCard
                  as="a"
                  href={s.href}
                  className="group flex flex-col h-full p-8 rounded-2xl border border-border bg-bg-surface hover:border-border-hover transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-brand/10 text-brand">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                    {s.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight size={14} />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
