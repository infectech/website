"use client";

import MeshGradient from "@/components/ui/MeshGradient";
import {
  GRADIENT_PRESETS,
  type GradientPreset,
} from "@/components/ui/gradientPresets";

type System = {
  domain: string;
  name: string;
  status: "live" | "building";
  /** Offsets this card into a different part of the shared noise field. */
  seed: number;
};

/** The six systems, every one of them linked from the Work menu. */
const SYSTEMS: System[] = [
  { domain: "HR Tech", name: "AIHR", status: "live", seed: 0 },
  { domain: "Commerce", name: "F-Commerce OS", status: "live", seed: 2.4 },
  { domain: "PropTech", name: "Barighor", status: "live", seed: 4.8 },
  { domain: "Services", name: "Grameen", status: "live", seed: 7.1 },
  { domain: "Applied AI", name: "Sonic", status: "live", seed: 9.6 },
  { domain: "Orders", name: "PrimeOMS", status: "building", seed: 12.2 },
];

function Card({
  system,
  preset,
}: {
  system: System;
  preset: GradientPreset;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
      <MeshGradient
        className="absolute inset-0"
        colors={preset.colors}
        background={preset.background}
        grain={preset.grain}
        speed={preset.speed}
        wireframe={preset.wireframe ?? 0}
        wireCell={preset.wireCell ?? 7}
        wireWarp={preset.wireWarp ?? 1.5}
        seed={system.seed}
      />
      {/* Anchors the type against whatever the gradient is doing behind it. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative flex h-full flex-col justify-between p-3 text-white">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/75">
          {system.domain}
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
    </div>
  );
}

export default function SystemCards() {
  // One preset per card, paired by position — no palette is ever reused, so
  // every card is a different gradient. The grid is therefore as long as the
  // preset list: adding a config to gradientPresets.ts adds the next card.
  const cards = GRADIENT_PRESETS.slice(0, SYSTEMS.length).map(
    (preset, i) => ({ preset, system: SYSTEMS[i] })
  );

  const columns = cards.length < 3 ? cards.length : 3;

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cards.map(({ system, preset }, i) => (
        <div
          key={system.name}
          // Middle column dropped, so the grid reads as a scatter of cards
          // rather than a table.
          className={columns === 3 && i % 3 === 1 ? "translate-y-5" : ""}
        >
          <Card system={system} preset={preset} />
        </div>
      ))}
    </div>
  );
}
