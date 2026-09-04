"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  r: number;
  phase: number;
};

type Edge = [number, number];

/**
 * Signature ambient background motif: nodes connected by slow pulsing lines,
 * echoing Infectech's own commerce pipeline (stock -> order -> storefront -> customer).
 * Canvas-driven so it stays off the DOM/motion-value fast path.
 */
export default function NodeDiagram({ className = "" }: { className?: string }) {
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
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let raf = 0;
    const start = performance.now();

    const buildGraph = () => {
      const cols = width > 900 ? 6 : 4;
      const rows = width > 900 ? 4 : 3;
      nodes = [];
      for (let i = 0; i < cols * rows; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const jitterX = (Math.sin(i * 12.9898) * 0.5 + 0.5) * 0.6 - 0.3;
        const jitterY = (Math.sin(i * 78.233) * 0.5 + 0.5) * 0.6 - 0.3;
        nodes.push({
          x: ((col + 0.5 + jitterX) / cols) * width,
          y: ((row + 0.5 + jitterY) / rows) * height,
          r: 2 + ((i * 7) % 3),
          phase: (i * 0.618) % 1,
        });
      }
      edges = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const a = row * cols + col;
          const b = row * cols + col + 1;
          if (a < nodes.length && b < nodes.length) edges.push([a, b]);
        }
      }
      for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols; col++) {
          if ((row + col) % 3 !== 0) continue;
          const a = row * cols + col;
          const b = (row + 1) * cols + col;
          if (a < nodes.length && b < nodes.length) edges.push([a, b]);
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (t - start) / 1000;

      ctx.lineWidth = 1;
      edges.forEach(([ai, bi], i) => {
        const a = nodes[ai];
        const b = nodes[bi];
        if (!a || !b) return;
        const cycle = 5 + (i % 3);
        const progress = ((elapsed + i * 0.37) % cycle) / cycle;
        const pulse = Math.max(0, Math.sin(progress * Math.PI));
        ctx.strokeStyle = `rgba(10, 10, 10, ${0.05 + pulse * 0.09})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      nodes.forEach((n, i) => {
        const cycle = 4 + (i % 3);
        const progress = ((elapsed + n.phase * cycle) % cycle) / cycle;
        const pulse = Math.max(0, Math.sin(progress * Math.PI));
        ctx.beginPath();
        ctx.fillStyle = `rgba(10, 10, 10, ${0.12 + pulse * 0.28})`;
        ctx.arc(n.x, n.y, n.r + pulse * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
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
