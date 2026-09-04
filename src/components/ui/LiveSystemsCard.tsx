"use client";

import MeshGradient from "@/components/ui/MeshGradient";

/** Every one of these is live and linked from the Work menu. */
const SYSTEMS = [
  { name: "AIHR", detail: "HR & recruitment" },
  { name: "Daffodil F-Commerce OS", detail: "Orders · COD · couriers" },
  { name: "Barighor", detail: "Rent management" },
  { name: "Grameen Pest Control", detail: "Bilingual service platform" },
  { name: "Sonic", detail: "Conversation intelligence" },
];

export default function LiveSystemsCard() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
      <MeshGradient className="absolute inset-0" />

      {/* Darkened from the foot up, so the closing line stays legible wherever
          the gradient happens to be bright behind it. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          Live systems · In production
        </p>

        <ul className="space-y-3">
          {SYSTEMS.map((s) => (
            <li key={s.name} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-tight">
                  {s.name}
                </span>
                <span className="block font-mono text-[11px] text-white/65">
                  {s.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="font-display text-lg font-bold tracking-[-0.02em]">
          Five products. Running today.
        </p>
      </div>
    </div>
  );
}
