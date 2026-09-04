"use client";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Layers, Handshake, Globe } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const pillars = [
  {
    icon: Target,
    title: "What we do",
    content:
      "Infectech partners with startups and enterprises to engineer complete digital ecosystems, not just websites or apps.",
  },
  {
    icon: Layers,
    title: "How we work",
    content:
      "We take products from first architecture diagram to production traffic, and we stay in the room for what happens after launch.",
  },
  {
    icon: Handshake,
    title: "What proves it",
    content:
      "Infectech isn't a portfolio of concepts. It's a working studio with live products currently processing real orders, rent payments, and HR workflows for paying users in production today.",
  },
];

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

export default function AboutPage() {
  const reduce = useSafeReducedMotion();

  return (
    <div className="pt-32 pb-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-20"
        >
          <h1 className="display-lg text-4xl sm:text-6xl text-ink mb-6">
            About Infectech
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A software engineering studio that designs, builds, and scales
            production systems, AI platforms, commerce infrastructure, and
            enterprise software, for companies that can&apos;t afford to ship
            something fragile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-border"
              >
                <div className="w-11 h-11 rounded-xl bg-bg-primary border border-border flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.content}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="display-lg text-3xl text-ink mb-3">The team</h2>
          <p className="text-text-secondary max-w-xl">
            A lean, senior team by design. Small enough that every person here
            ships production code, not just manages it.
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
    </div>
  );
}
