"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Rocket, Bot, Monitor, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "custom-software",
    icon: Code2,
    title: "Custom Software Development",
    description:
      "End-to-end software solutions tailored to your business requirements. We build complex systems that automate workflows, improve efficiency, and drive growth.",
    items: [
      "Business Management Systems",
      "ERP Solutions",
      "CRM Platforms",
      "Internal Tools",
      "Enterprise Applications",
      "Desktop Applications",
    ],
    color: "blue",
  },
  {
    id: "web-apps",
    icon: Globe,
    title: "Web Application Development",
    description:
      "Modern web applications built with the latest technologies. From SaaS platforms to customer portals, we deliver fast, scalable, and maintainable web solutions.",
    items: [
      "SaaS Platforms",
      "Customer Portals",
      "Dashboards",
      "Marketplaces",
      "Booking Systems",
      "Admin Panels",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    color: "cyan",
  },
  {
    id: "saas",
    icon: Rocket,
    title: "SaaS Product Development",
    description:
      "We help founders and businesses launch scalable SaaS products. From idea validation to full production deployment with subscription management.",
    items: [
      "Product Strategy",
      "MVP Development",
      "UI/UX Design",
      "Subscription Systems",
      "Multi-Tenant Architecture",
      "Cloud Deployment",
    ],
    color: "indigo",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI & Automation Solutions",
    description:
      "Integrate artificial intelligence into your business workflows. We build AI-powered tools that save time, reduce costs, and unlock new capabilities.",
    items: [
      "AI Assistants",
      "Chatbots",
      "Workflow Automation",
      "Document Processing",
      "Data Analysis",
      "AI Integrations",
    ],
    color: "violet",
  },
  {
    id: "websites",
    icon: Monitor,
    title: "Website Development",
    description:
      "Professional websites designed for performance and conversion. We build fast, SEO-optimized websites that represent your brand perfectly.",
    items: [
      "Company Websites",
      "Landing Pages",
      "Portfolio Websites",
      "E-commerce Stores",
      "Corporate Websites",
    ],
    color: "emerald",
  },
];

const colorMap: Record<string, { icon: string; tag: string }> = {
  blue: { icon: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400", tag: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300" },
  cyan: { icon: "bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400", tag: "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300" },
  indigo: { icon: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400", tag: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300" },
  violet: { icon: "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400", tag: "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300" },
  emerald: { icon: "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400", tag: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300" },
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 pt-8"
        >
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
            What We Offer
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From custom software to AI-powered solutions, we deliver end-to-end
            digital products tailored to your business.
          </p>
        </motion.div>

        <div className="space-y-16">
          {services.map((s, i) => {
            const Icon = s.icon;
            const colors = colorMap[s.color];
            return (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colors.icon}`}>
                    <Icon size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {s.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-lg">
                    {s.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
                  >
                    Get a quote <ArrowRight size={14} />
                  </Link>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-4">
                    Includes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className={`px-3 py-2 rounded-xl text-sm font-medium ${colors.tag}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {s.tech && (
                    <>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mt-6 mb-4">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {s.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-lg mx-auto">
            Let&apos;s discuss your project and find the right solution for your
            business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Us <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
