export type GradientPreset = {
  name: string;
  /** Two to five stops. Fewer than five are cycled to fill the shader's slots. */
  colors: string[];
  background: string;
  /** Film grain amplitude, 0–1. */
  grain: number;
  speed: number;
};

/**
 * The gradient every card uses. Cards differ only by seed, which moves each
 * one to a different part of the noise field — same palette and treatment,
 * different shape.
 */
export const AURORA: GradientPreset = {
  name: "Aurora",
  colors: ["#FF3087", "#1B36A6", "#00D3FF", "#6D3BFF", "#492E52"],
  background: "#003FFF",
  // Neat grainIntensity 0.5, scaled to our amplitude.
  grain: 0.13,
  // Neat speed 3.5.
  speed: 0.8,
};
