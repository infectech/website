"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, Globe, Rocket, Bot, ArrowRight, Monitor } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "End-to-end software solutions tailored to your business requirements. From ERP systems to enterprise applications.",
    tags: ["ERP", "CRM", "Internal Tools", "Desktop Apps"],
    href: "/services#custom-software",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Modern web applications built with Next.js, React, TypeScript, and PostgreSQL. SaaS platforms, dashboards, and portals.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    href: "/services#web-apps",
    color: "cyan",
  },
  {
    icon: Rocket,
    title: "SaaS Product Development",
    description:
      "We help founders and businesses launch scalable SaaS products from strategy to MVP to full production.",
    tags: ["MVP", "UI/UX", "Multi-Tenant", "Subscriptions"],
    href: "/services#saas",
    color: "indigo",
  },
  {
    icon: Bot,
    title: "AI & Automation Solutions",
    description:
      "Integrate artificial intelligence into your business workflows. AI assistants, chatbots, and workflow automation.",
    tags: ["AI Agents", "Chatbots", "Automation", "OpenAI"],
    href: "/services#ai",
    color: "violet",
  },
  {
    icon: Monitor,
    title: "Website Development",
    description:
      "Professional websites designed for performance and conversion. Landing pages, portfolios, and e-commerce stores.",
    tags: ["Landing Pages", "E-commerce", "Corporate"],
    href: "/services#websites",
    color: "blue",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  cyan: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400",
  indigo:
    "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
  violet:
    "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400",
};

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-white dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From custom software to AI-powered solutions, we deliver end-to-end
            digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={s.href}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorMap[s.color]}`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
