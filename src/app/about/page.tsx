"use client";

import { motion } from "framer-motion";
import { Target, Eye, Lightbulb } from "lucide-react";

const team = [
  {
    name: "Founder One",
    role: "CEO & Lead Developer",
    bio: "Full-stack engineer with deep expertise in building scalable web applications and SaaS products.",
    initials: "F1",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Founder Two",
    role: "CTO & Software Architect",
    bio: "Systems architect specializing in cloud infrastructure, DevOps, and enterprise software design.",
    initials: "F2",
    color: "from-violet-500 to-indigo-500",
  },
  {
    name: "Founder Three",
    role: "CPO & AI Engineer",
    bio: "Product strategist and AI engineer focused on building intelligent automation solutions for businesses.",
    initials: "F3",
    color: "from-emerald-500 to-cyan-500",
  },
];

const industries = [
  "Real Estate",
  "Healthcare",
  "Education",
  "E-commerce",
  "Logistics",
  "Finance",
  "Manufacturing",
  "Startups",
  "Small Businesses",
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 pt-8 max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
            Who We Are
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            About Infectech
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Infectech is a technology startup focused on helping businesses
            transform ideas into scalable digital products. Founded by a team of
            three developers and entrepreneurs.
          </p>
        </motion.div>

        {/* Mission / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: Target,
              title: "Our Mission",
              content:
                "To empower businesses through innovative, reliable, and scalable software solutions.",
              color: "blue",
            },
            {
              icon: Eye,
              title: "Our Vision",
              content:
                "To become a globally recognized software company known for delivering exceptional digital products and long-term client partnerships.",
              color: "cyan",
            },
            {
              icon: Lightbulb,
              title: "Our Approach",
              content:
                "We combine technical expertise, product thinking, and modern design to deliver solutions that solve real business problems.",
              color: "indigo",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Team
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Three passionate builders united by a vision to create exceptional
            software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center"
            >
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white`}
              >
                {member.initials}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Industries We Serve
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            We&apos;ve delivered solutions across diverse sectors.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900"
              >
                {ind}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
