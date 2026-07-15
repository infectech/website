"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, animate } from "framer-motion";

const stats = [
  { value: 5, suffix: "", label: "Live Products in Production" },
  { value: 6, suffix: "+", label: "Payment & Courier Integrations Shipped" },
  { value: 25, suffix: "+", label: "Technologies in Active Use" },
  { value: 2, suffix: "", label: "Markets Served" },
  { value: 100, suffix: "%", label: "In-House Engineering" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="font-mono">
      {display}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-primary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 sm:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center sm:text-left"
            >
              <div className="text-4xl sm:text-5xl font-semibold text-white mb-2">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-sm text-text-secondary leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
