"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MeshGradient from "@/components/ui/MeshGradient";
import { AURORA } from "@/components/ui/gradientPresets";

type System = {
  domain: string;
  name: string;
  status: "live" | "building";
  href: string;
  /** Live products sit on their own domains; PrimeOMS is still in progress,
   *  so it points at its section on this site instead. */
  external?: boolean;
  /** Offsets this card into a different part of the shared noise field. */
  seed: number;
};

/** The six systems. Destinations match the Work menu. */
const SYSTEMS: System[] = [
  {
    domain: "HR Tech",
    name: "AIHR",
    status: "live",
    href: "https://aihr.daffodilglobal.ai",
    external: true,
    seed: 0,
  },
  {
    domain: "Commerce",
    name: "F-Commerce OS",
    status: "live",
    href: "https://fc.daffodilglobal.ai",
    external: true,
    seed: 2.4,
  },
  {
    domain: "PropTech",
    name: "Barighor",
    status: "live",
    href: "https://app.152.70.130.154.nip.io/",
    external: true,
    seed: 4.8,
  },
  {
    domain: "Services",
    name: "Grameen",
    status: "live",
    href: "https://grameenpestbd.com",
    external: true,
    seed: 7.1,
  },
  {
    domain: "Applied AI",
    name: "Sonic",
    status: "live",
    href: "https://sonic-cyan.vercel.app",
    external: true,
    seed: 9.6,
  },
  {
    domain: "Orders",
    name: "PrimeOMS",
    status: "building",
    href: "/#primeoms",
    seed: 12.2,
  },
];

function Card({ system }: { system: System }) {
  const inner = (
    <>
      <MeshGradient
        className="absolute inset-0"
        colors={AURORA.colors}
        background={AURORA.background}
        grain={AURORA.grain}
        speed={AURORA.speed}
        seed={system.seed}
      />
      {/* Anchors the type against whatever the gradient is doing behind it. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative flex h-full flex-col justify-between p-3 text-white">
        <span className="flex items-start justify-between gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/75">
            {system.domain}
          </span>
          <ArrowUpRight
            size={13}
            aria-hidden="true"
            className="shrink-0 text-white/60 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          />
        </span>

        <span>
          <span className="block text-[13px] font-semibold leading-tight">
            {system.name}
          </span>
          <span className="mt-1 flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={`h-1 w-1 rounded-full ${
                system.status === "live" ? "bg-white" : "bg-white/50"
              }`}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">
              {system.status === "live" ? "Live" : "Building"}
            </span>
          </span>
        </span>
      </div>
    </>
  );

  const className =
    "group relative block aspect-[4/5] overflow-hidden rounded-xl transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(10,10,10,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:translate-y-0";

  if (system.external) {
    return (
      <a
        href={system.href}
        target="_blank"
        rel="noopener"
        className={className}
        aria-label={`${system.name} — ${system.domain}, opens in a new tab`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={system.href}
      className={className}
      aria-label={`${system.name} — ${system.domain}`}
    >
      {inner}
    </Link>
  );
}

export default function SystemCards() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {SYSTEMS.map((system, i) => (
        <div
          key={system.name}
          // Middle column dropped, so the grid reads as a scatter of cards
          // rather than a table.
          className={i % 3 === 1 ? "translate-y-5" : ""}
        >
          <Card system={system} />
        </div>
      ))}
    </div>
  );
}
