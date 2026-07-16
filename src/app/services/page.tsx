"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Link from "next/link";
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
    id: "custom-software",
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Full-cycle product engineering, from spec to deployed system. We build the system your business actually runs on, not a generic template.",
    items: ["Business Management Systems", "ERP Solutions", "CRM Platforms", "Internal Tools"],
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Solutions",
    description:
      "Applied AI features, LLM integrations, and intelligent automation built into real products, not bolted on.",
    items: ["CV Screening & Matching", "Conversation Intelligence", "Document Processing", "Risk Detection"],
  },
  {
    id: "saas",
    icon: Layers,
    title: "SaaS Platforms",
    description:
      "Multi-tenant architecture, billing, and dashboards designed to scale past the first hundred users.",
    items: ["Multi-Tenant Architecture", "Subscription Billing", "Admin Dashboards", "Cloud Deployment"],
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise Systems",
    description:
      "Internal tools, ERPs, and workflow platforms built for organizations that can't tolerate downtime.",
    items: ["Role-Based Access Control", "Audit Trails", "Workflow Platforms", "Legacy Integration"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feel mobile experiences for iOS and Android, sharing a backend with your web platform.",
    items: ["iOS & Android", "Shared Backend Architecture", "Push Notifications", "Offline Support"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    description: "CI/CD, containerization, and infrastructure-as-code so deployments are boring, on purpose.",
    items: ["CI/CD Pipelines", "Containerization", "Infrastructure as Code", "Monitoring & Alerting"],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Business Automation",
    description: "Replacing manual, spreadsheet-and-WhatsApp workflows with systems that run themselves.",
    items: ["Workflow Automation", "Order Routing", "Reconciliation Systems", "Notification Pipelines"],
  },
  {
    id: "api",
    icon: Plug,
    title: "API Development",
    description: "Clean, documented, versioned APIs built to be integrated against for years.",
    items: ["REST & GraphQL", "Versioning Strategy", "Documentation", "Payment & Courier Integrations"],
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design & Product Strategy",
    description: "Interfaces designed around what a user actually does, not what the org chart looks like.",
    items: ["Product Strategy", "Interface Design", "User Research", "Design Systems"],
  },
];

export default function ServicesPage() {
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
            Services
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            From custom software to AI-powered solutions, we deliver end-to-end
            digital products.
          </p>
        </motion.div>

        <div className="space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                id={s.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8 rounded-2xl border border-border scroll-mt-24"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-brand" strokeWidth={1.75} />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">{s.title}</h2>
                  <p className="text-text-secondary leading-relaxed mb-5">{s.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                    Includes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-2 rounded-xl text-sm font-medium bg-white/5 text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center p-12 rounded-3xl gradient-brand"
        >
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-lg mx-auto">
            Let&apos;s discuss your project and find the right approach.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Start Your Project <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
