"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Healthcare Management System",
    category: "Custom Software",
    description:
      "A comprehensive EHR platform for a regional clinic, handling patient records, appointments, and billing with role-based access control.",
    tags: ["Next.js", "PostgreSQL", "Node.js", "Healthcare"],
    color: "from-blue-500 to-cyan-500",
    industry: "Healthcare",
  },
  {
    title: "E-commerce SaaS Platform",
    category: "SaaS Development",
    description:
      "Multi-tenant marketplace platform with subscription management, vendor portals, and analytics dashboards serving 500+ merchants.",
    tags: ["React", "NestJS", "AWS", "Multi-tenant"],
    color: "from-violet-500 to-indigo-500",
    industry: "E-commerce",
  },
  {
    title: "AI Document Processor",
    category: "AI & Automation",
    description:
      "Intelligent document processing system using LLMs to extract, classify, and route business documents with 98% accuracy.",
    tags: ["Python", "OpenAI", "TypeScript", "AI"],
    color: "from-emerald-500 to-cyan-500",
    industry: "Finance",
  },
  {
    title: "Real Estate CRM",
    category: "Custom Software",
    description:
      "Full-featured CRM system for a real estate agency with property listings, lead management, and automated follow-up workflows.",
    tags: ["Next.js", "PostgreSQL", "Automation"],
    color: "from-orange-500 to-red-500",
    industry: "Real Estate",
  },
  {
    title: "Logistics Dashboard",
    category: "Web Application",
    description:
      "Real-time fleet tracking and route optimization dashboard with live GPS data, driver management, and delivery analytics.",
    tags: ["React", "Node.js", "WebSockets", "Maps"],
    color: "from-blue-600 to-violet-600",
    industry: "Logistics",
  },
  {
    title: "EdTech Learning Platform",
    category: "SaaS Development",
    description:
      "Online learning platform with course management, video streaming, quizzes, certificates, and student progress tracking.",
    tags: ["Next.js", "Video.js", "PostgreSQL"],
    color: "from-pink-500 to-rose-500",
    industry: "Education",
  },
];

const categories = ["All", "Custom Software", "SaaS Development", "Web Application", "AI & Automation"];

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 pt-8"
        >
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
            Our Work
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of projects we&apos;ve delivered across various
            industries and technology stacks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`h-44 bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    {p.industry}
                  </span>
                  <ExternalLink size={14} className="text-white/60 group-hover:text-white transition-colors mt-1" />
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/20 text-white backdrop-blur-sm">
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
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Interested in working with us?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-600/25"
          >
            Start a Project
          </a>
        </motion.div>
      </div>
    </div>
  );
}
