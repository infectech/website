"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { useState } from "react";
import { motion } from "framer-motion";

const stack: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue"],
  Backend: ["Node.js", "FastAPI", "Python", "Go", "Java", ".NET"],
  Database: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase"],
  "Cloud & DevOps": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
  "AI & ML": ["OpenAI", "Claude", "Llama", "Mistral", "LangChain", "Vector DBs"],
};

const categories = Object.keys(stack);

export default function TechStack() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useSafeReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl font-semibold text-white max-w-2xl mb-4"
        >
          Technology we run on
        </motion.h2>
        <p className="text-text-secondary max-w-xl mb-12">
          25+ technologies in active use across live products.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onMouseEnter={() => setActive(cat)}
              onFocus={() => setActive(cat)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ease-out border active:scale-95 ${
                active === cat
                  ? "border-brand text-white bg-brand/10"
                  : "border-border text-text-secondary hover:border-border-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, i) => {
            const dimmed = active !== null && active !== category;
            return (
              <motion.div
                key={category}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                animate={{ opacity: dimmed ? 0.35 : 1 }}
                className="p-6 rounded-2xl border border-border"
              >
                <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack[category].map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors duration-200 ${
                        active === category
                          ? "bg-brand/15 text-brand-hover"
                          : "bg-white/5 text-text-secondary"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
