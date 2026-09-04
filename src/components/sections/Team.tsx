"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const team = [
  {
    name: "Mohiuddin Ahmed",
    role: "Engineering Lead",
    specialty: "Systems architecture and backend infrastructure",
    photo: "/images/Mohiuddin Ahmed.PNG",
    site: "https://mohi-uddin.me/",
  },
  {
    name: "Mostofa Nayon",
    role: "Product & Design",
    specialty: "Interface design and product strategy",
    photo: "/images/Mostofa Nayon.jpg",
    site: "https://nayon.bd/",
  },
  {
    name: "Farhan Sadik",
    role: "AI Engineer",
    specialty: "Applied machine learning and LLM integrations",
    photo: "/images/Farhan Sadik.jpg",
    site: "https://farhansadik.bd/",
  },
];

export default function Team() {
  const reduce = useSafeReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="display-lg text-4xl sm:text-6xl text-ink max-w-2xl mb-4">
            The team
          </h2>
          <p className="text-text-secondary max-w-xl">
            A small, senior team. Every person here ships production code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <TiltCard className="p-6 rounded-2xl border border-border h-full">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-5">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-ink mb-0.5">{member.name}</h3>
                <p className="text-sm text-brand mb-2">{member.role}</p>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {member.specialty}
                </p>
                <a
                  href={member.site}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${member.name}'s website`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-brand transition-colors"
                >
                  <Globe size={14} />
                  Website
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
