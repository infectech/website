"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import NodeDiagram from "@/components/ui/NodeDiagram";
import TiltCard from "@/components/ui/TiltCard";

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
    link: "https://app.152.70.130.154.nip.io/",
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
  const reduce = useSafeReducedMotion();

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
          <h1 className="display-lg text-4xl sm:text-6xl text-ink mb-6">
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out border active:scale-95 ${
                filter === f
                  ? "border-ink bg-ink text-white"
                  : "border-border text-text-secondary hover:border-border-hover"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {visible.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06, ease: [0.23, 1, 0.32, 1] }}
            >
              <TiltCard
                as="a"
                href={p.link}
                target="_blank"
                rel="noopener"
                className="group flex flex-col h-full p-7 rounded-2xl border border-border hover:border-border-hover transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
                      Live
                    </span>
                    <h3 className="text-xl font-semibold text-ink">{p.title}</h3>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-text-secondary group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
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
                      className="px-2.5 py-1 rounded-full text-xs font-mono bg-bg-muted text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
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
              <h3 className="display-lg text-3xl sm:text-5xl text-ink mb-2">
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
                      <span className="px-4 py-2 rounded-xl border border-border bg-bg-surface text-sm font-medium text-ink">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-sm font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
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
