"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your business, goals, and requirements.",
  },
  {
    number: "02",
    title: "Planning",
    description: "Creating project roadmap, architecture, and timelines.",
  },
  {
    number: "03",
    title: "Design",
    description: "Building intuitive user experiences and modern interfaces.",
  },
  {
    number: "04",
    title: "Development",
    description: "Implementing robust and scalable solutions.",
  },
  {
    number: "05",
    title: "Testing",
    description: "Ensuring quality, security, and performance.",
  },
  {
    number: "06",
    title: "Launch",
    description: "Deployment and production setup.",
  },
  {
    number: "07",
    title: "Support",
    description: "Continuous maintenance and improvements.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            A proven methodology that delivers results on time and on budget.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-700 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative text-center lg:text-left"
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <span className="text-2xl font-bold gradient-text">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
