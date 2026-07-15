"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import NodeDiagram from "@/components/ui/NodeDiagram";

type Category = "All" | "AI" | "E-Commerce" | "SaaS" | "HR Tech" | "Local Services";

const projects = [
  {
    title: "AIHR",
    tagline: "AI-powered HR & recruitment platform",
    industry: "HR Tech / Enterprise SaaS",
    description:
      "AI-driven CV screening, candidate matching, video-interview analysis, attrition prediction, performance management, and workforce planning in one cloud platform.",
    tech: ["Next.js", "AI/ML matching engine", "Cloud-native architecture"],
    link: "https://aihr.daffodilglobal.ai",
    categories: ["AI", "HR Tech"] as Category[],
  },
  {
    title: "Daffodil — F-Commerce OS",
    tagline: "Operating system for Facebook & Instagram sellers",
    industry: "E-Commerce / SaaS",
    description:
      "Captures inbox orders automatically, routes each order to the best courier, reconciles COD in seconds, and uses AI to flag risky orders. Integrates bKash, Nagad, Rocket, SSLCommerz, and Upay.",
    tech: ["AI order intelligence", "Multi-courier integration", "Payments infrastructure"],
    link: "https://fc.daffodilglobal.ai",
    categories: ["AI", "E-Commerce", "SaaS"] as Category[],
  },
  {
    title: "Barighor",
    tagline: "Digital rent management for landlords",
    industry: "PropTech / SaaS",
    description:
      "Replaces the paper rent notebook: automatic monthly invoicing, a self-serve tenant portal, multi-building dashboards, and full payment history.",
    tech: ["Next.js", "Multi-tenant dashboard architecture"],
    link: "https://barighor.vercel.app",
    categories: ["SaaS"] as Category[],
  },
  {
    title: "Grameen Pest Control",
    tagline: "Bilingual service platform for a 35-year-old pest control company",
    industry: "Local Services / SMB",
    description:
      "A full bilingual (Bangla/English) service site with live WhatsApp booking, per-service landing pages, and package pricing, serving enterprise clients including Square Group, Beximco, Bashundhara Group, Walton, and KFC Bangladesh.",
    tech: ["Localized front-end", "WhatsApp booking integration"],
    link: "https://grameenpestbd.com",
    categories: ["Local Services"] as Category[],
  },
  {
    title: "Sonic",
    tagline: "AI conversation intelligence",
    industry: "AI / Analytics",
    description: "An AI-powered platform for analyzing and surfacing insight from conversations at scale.",
    tech: ["Applied AI / NLP"],
    link: "https://sonic-cyan.vercel.app",
    categories: ["AI"] as Category[],
  },
];

const filters: Category[] = ["All", "AI", "E-Commerce", "SaaS", "HR Tech", "Local Services"];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Category>("All");
  const reduce = useReducedMotion();

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <div className="pt-32 pb-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-6">
            Our work
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Not a portfolio of concepts. Live products, processing real orders,
            rent payments, and HR workflows today.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                filter === f
                  ? "border-brand bg-brand/10 text-white"
                  : "border-border text-text-secondary hover:border-border-hover"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {visible.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="group flex flex-col p-7 rounded-2xl border border-border hover:border-border-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
                    Live
                  </span>
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-text-secondary group-hover:text-brand transition-colors shrink-0"
                />
              </div>
              <p className="text-sm text-text-secondary mb-1">{p.tagline}</p>
              <p className="text-xs font-mono text-text-secondary/70 mb-4">{p.industry}</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {(filter === "All" || filter === "E-Commerce" || filter === "SaaS") && (
          <motion.div
            id="primeoms"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-warning/30 bg-gradient-to-br from-bg-primary to-bg-surface p-8 sm:p-12 scroll-mt-24"
          >
            <NodeDiagram className="absolute inset-0 w-full h-full opacity-30" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-warning mb-4 px-3 py-1 rounded-full border border-warning/30 bg-warning/10">
                Building now
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-2">
                PrimeOMS
              </h3>
              <p className="text-text-secondary mb-1">
                Unified E-Commerce Order Management & Front Store Platform
              </p>
              <p className="text-xs font-mono text-text-secondary/70 mb-6">
                E-Commerce Infrastructure
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl mb-8">
                A complete commerce operating system: one platform to manage
                stock, sales, orders, and public-facing storefronts, so a
                business runs its entire commerce operation from a single
                system of record instead of stitching together spreadsheets,
                a website builder, and a courier app.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                {["Inventory & Stock", "Order Management", "Front Store", "Fulfillment"].map(
                  (node, i, arr) => (
                    <div key={node} className="flex items-center gap-3">
                      <span className="px-4 py-2 rounded-xl border border-brand/30 bg-brand/10 text-sm font-medium text-white">
                        {node}
                      </span>
                      {i < arr.length - 1 && (
                        <ArrowUpRight
                          size={16}
                          className="rotate-45 text-text-secondary/50 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )
                )}
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white text-sm font-semibold hover:-translate-y-0.5 transition-transform"
              >
                Get early access
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
