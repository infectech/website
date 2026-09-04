"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { useState } from "react";
import { motion } from "framer-motion";

const stack: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "TypeScript", "C", "C++", "Java", "SQL", "HTML5", "CSS3", "Dart"],
  Frontend: ["React.js", "Next.js", "Flutter", "Tailwind CSS", "Material UI (MUI)", "Framer Motion", "Vite"],
  Backend: ["FastAPI", "Node.js", "Express.js", "REST APIs", "Authentication", "API Integration"],
  "AI & Machine Learning": [
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Large Language Models (LLMs)",
    "AI Agents",
    "Prompt Engineering",
    "RAG",
    "Speech-to-Text",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Hugging Face Transformers",
    "Ollama",
    "Whisper",
  ],
  Databases: ["PostgreSQL", "MySQL", "SQLite", "SQLAlchemy", "Prisma", "Supabase"],
  "Cloud & DevOps": [
    "Git",
    "GitHub",
    "Docker",
    "Linux (Ubuntu)",
    "Vercel",
    "GitHub Actions",
    "CI/CD",
    "Nginx",
    "systemd",
  ],
  "Tools & Platforms": [
    "Figma",
    "Canva",
    "CapCut",
    "LaTeX",
    "Arduino",
    "Cisco",
    "Notion",
    "Google Workspace",
    "Microsoft Office",
  ],
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
          className="display-lg text-4xl sm:text-6xl text-ink max-w-2xl mb-4"
        >
          Technology we run on
        </motion.h2>
        <p className="text-text-secondary max-w-xl mb-12">
          A broad, applied stack in active use across live products.
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
                  ? "border-ink text-white bg-ink"
                  : "border-border text-text-secondary hover:border-border-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => {
            const dimmed = active !== null && active !== category;
            return (
              <motion.div
                key={category}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
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
                          ? "bg-ink text-white"
                          : "bg-bg-muted text-text-secondary"
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
