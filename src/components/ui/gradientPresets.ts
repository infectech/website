export type GradientPreset = {
  name: string;
  /** Two to five stops. Fewer than five are cycled to fill the shader's slots. */
  colors: string[];
  background: string;
  /** Film grain amplitude, 0–1. Some presets carry none. */
  grain: number;
  speed: number;
};

/**
 * One entry per gradient, exported from the Neat editor and translated to the
 * inputs our own shader takes. Only the fields our shader actually reads are
 * kept — colours, background, grain and speed; the rest of a Neat config
 * describes machinery we implement differently (its wave/flow parameters have
 * no direct equivalent in our domain-warp field).
 *
 * Cards cycle through this list, so adding a preset here is enough to put a
 * new gradient into the grid.
 */
export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: "Aurora",
    colors: ["#FF3087", "#1B36A6", "#00D3FF", "#6D3BFF", "#492E52"],
    background: "#003FFF",
    // Neat grainIntensity 0.5, scaled to our amplitude.
    grain: 0.13,
    // Neat speed 3.5.
    speed: 0.8,
  },
  {
    name: "Solar",
    colors: ["#FF5373", "#FFC858", "#17E7FF", "#6D3BFF"],
    background: "#003FFF",
    // This config sets grainIntensity 0 — clean, no grain.
    grain: 0,
    // Neat speed 2, kept in proportion to Aurora's 3.5.
    speed: 0.46,
  },
];
