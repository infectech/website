"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b30_1px,transparent_1px),linear-gradient(to_bottom,#1e293b30_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Build Your
            <br />
            <span className="gradient-text">Next Software Product?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            Let&apos;s discuss your idea and turn it into reality. Our team is
            ready to help you build something great.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
            >
              Start a Project
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:infectech.official@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail size={16} />
              infectech.official@gmail.com
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {[
              "Custom Software",
              "SaaS",
              "Web Applications",
              "AI Solutions",
              "Automation",
            ].map((service, i) => (
              <span key={service} className="flex items-center gap-2">
                {i > 0 && <span>•</span>}
                {service}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
