"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Healthcare Management System",
    category: "Custom Software",
    description:
      "A comprehensive EHR platform for a regional clinic, handling patient records, appointments, and billing with role-based access control.",
    tags: ["Next.js", "PostgreSQL", "Node.js"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "E-commerce SaaS Platform",
    category: "SaaS Development",
    description:
      "Multi-tenant marketplace platform with subscription management, vendor portals, and analytics dashboards serving 500+ merchants.",
    tags: ["React", "NestJS", "AWS"],
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "AI Document Processor",
    category: "AI & Automation",
    description:
      "Intelligent document processing system using LLMs to extract, classify, and route business documents with 98% accuracy.",
    tags: ["Python", "OpenAI", "TypeScript"],
    color: "from-emerald-500 to-cyan-500",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-cyan-50/40 to-blue-50/60 dark:from-[#020617] dark:via-blue-950/10 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
              Our Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/80 dark:hover:shadow-slate-900/80 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`h-40 bg-gradient-to-br ${p.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="absolute top-3 right-3">
                  <ExternalLink
                    size={16}
                    className="text-white/60 group-hover:text-white transition-colors"
                  />
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
