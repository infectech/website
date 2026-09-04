"use client";

import { useEffect, useRef } from "react";

const BOX = 22; // side of each box
const GAP = 26; // space between boxes
const RADIUS = 5;
const STEP = BOX + GAP;

// Deterministic per-cell value in 0..1, so the pattern is stable across
// resizes and identical on every load rather than reshuffling.
const noise = (col: number, row: number) => {
  const n = Math.sin(col * 127.1 + row * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

/**
 * Ambient background of small outlined boxes, echoing the hairline cards the
 * rest of the site is built from. A few boxes carry a faint fill that breathes
 * on a long cycle. Canvas-driven so a few hundred boxes stay off the DOM.
 */
export default function BoxField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (t - start) / 1000;

      const cols = Math.ceil(width / STEP) + 1;
      const rows = Math.ceil(height / STEP) + 1;
      // Centre the field so it doesn't sit flush against the left edge.
      const offsetX = (width - (cols - 1) * STEP - BOX) / 2;
      const offsetY = (height - (rows - 1) * STEP - BOX) / 2;

      ctx.lineWidth = 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * STEP;
          const y = offsetY + row * STEP;
          const seed = noise(col, row);

          ctx.beginPath();
          ctx.roundRect(x, y, BOX, BOX, RADIUS);

          // Roughly one box in ten breathes; the rest are plain outlines. Kept
          // faint — heavier fills read as blotches competing with the headline.
          if (seed > 0.9) {
            const cycle = 7 + seed * 5;
            const phase = ((elapsed + seed * cycle) % cycle) / cycle;
            const pulse = Math.max(0, Math.sin(phase * Math.PI));
            ctx.fillStyle = `rgba(10, 10, 10, ${0.015 + pulse * 0.03})`;
            ctx.fill();
          }

          ctx.strokeStyle = `rgba(10, 10, 10, ${0.05 + seed * 0.03})`;
          ctx.stroke();
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    ro.observe(canvas);

    if (reduceMotion) {
      draw(start);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
