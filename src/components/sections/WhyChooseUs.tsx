"use client";

import { motion } from "framer-motion";
import { Zap, Heart, Palette, Handshake, Clock } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Modern Technology Stack",
    description:
      "We use industry-standard technologies that ensure performance, security, and scalability for your product.",
  },
  {
    icon: Heart,
    title: "Client-Focused Approach",
    description:
      "Every project starts with understanding your business goals. We build what you actually need.",
  },
  {
    icon: Palette,
    title: "Clean Design",
    description:
      "Minimal, modern, and user-friendly interfaces that look great and convert visitors.",
  },
  {
    icon: Handshake,
    title: "Long-Term Support",
    description:
      "We don't just deliver projects — we build partnerships. Ongoing maintenance and improvements.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Efficient development process with transparent communication and on-time delivery.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
              Why Infectech
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Why Choose Us
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Founded by three passionate builders, Infectech combines technical
              expertise, product thinking, and modern design to deliver
              high-quality software solutions.
            </p>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-100 dark:border-blue-900/50">
              <blockquote className="text-slate-700 dark:text-slate-300 italic text-lg leading-relaxed">
                &ldquo;Whether you&apos;re a startup validating an idea or an
                enterprise looking for custom software, we build solutions
                tailored to your needs.&rdquo;
              </blockquote>
            </div>
          </motion.div>

          <div className="space-y-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {r.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
