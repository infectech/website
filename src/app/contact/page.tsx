"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, ArrowRight, Check, AlertCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdnzepe";

const serviceOptions = [
  "Custom Software Development",
  "AI Solutions",
  "SaaS Platforms",
  "Enterprise Systems",
  "Mobile Apps",
  "Cloud Infrastructure & DevOps",
  "Business Automation",
  "API Development",
  "UI/UX Design & Product Strategy",
];

const budgetOptions = ["Under $10k", "$10k - $30k", "$30k - $75k", "$75k+", "Not sure yet"];
const timelineOptions = ["Less than 1 month", "1-3 months", "3-6 months", "6+ months", "Flexible"];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useSafeReducedMotion();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-6 leading-tight">
              Let&apos;s build something extraordinary.
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              Tell us about your project. We reply within one business day
              with next steps, not a sales pitch.
            </p>

            <div className="space-y-5">
              <div className="flex gap-4 p-5 rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-brand" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5">
                    Email
                  </div>
                  <a
                    href="mailto:infectech.official@gmail.com"
                    className="text-sm font-semibold text-white hover:text-brand-hover transition-colors"
                  >
                    infectech.official@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-brand" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-0.5">
                    Response time
                  </div>
                  <div className="text-sm font-semibold text-white">Within one business day</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === "success" ? (
              <div className="h-full min-h-[400px] flex items-center justify-center p-12 rounded-2xl border border-border text-center">
                <div>
                  <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Got it.</h3>
                  <p className="text-text-secondary">
                    We&apos;ll reply within one business day.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-border space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-white mb-2">
                    Project type
                  </label>
                  <select
                    id="project-type"
                    name="project_type"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                  >
                    <option value="" disabled className="bg-bg-surface">
                      Select a service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-bg-surface">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                      Budget range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                    >
                      <option value="" disabled className="bg-bg-surface">
                        Select a range
                      </option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-bg-surface">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                    >
                      <option value="" disabled className="bg-bg-surface">
                        Select a timeline
                      </option>
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-bg-surface">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-brand text-white font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === "submitting" ? "Sending..." : "Send Project Inquiry"}
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
