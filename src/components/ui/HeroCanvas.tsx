"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bot,
  Cloud,
  Code2,
  Layers,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import IsoCube from "@/components/ui/IsoCube";

gsap.registerPlugin(ScrollTrigger);

type Cube = {
  icon: LucideIcon;
  left: string;
  top: string;
  size: number;
  /** Idle drift, in px. */
  float: number;
  duration: number;
  delay: number;
  /** Scroll offset as a fraction of viewport height; sign sets the direction. */
  parallax: number;
  /**
   * Sits level with the headline, so it only has room once the viewport is
   * wide enough for the text column to leave a margin beside it.
   */
  wideOnly?: boolean;
};

/**
 * Six service icons, one per cube, sitting on the ring below. Each position is
 * a point on that same ellipse — cx/cy 50, rx 40, ry 37 — picked at an angle
 * that clears the text: the pairs above and below the measure are always
 * shown, and the two level with the headline appear only when there is room
 * beside it.
 */
const CUBES: Cube[] = [
  // θ 240° / 300° — above the eyebrow, clear of the navbar.
  { icon: Code2, left: "30%", top: "17.9%", size: 58, float: 6, duration: 3.6, delay: 0, parallax: -0.1 },
  { icon: Bot, left: "70%", top: "17.9%", size: 52, float: 7, duration: 4.2, delay: 0.6, parallax: 0.12 },
  // θ 180° / 0° — level with the headline.
  { icon: Layers, left: "10%", top: "50%", size: 62, float: 5, duration: 4.8, delay: 1.1, parallax: 0.08, wideOnly: true },
  { icon: Cloud, left: "90%", top: "50%", size: 58, float: 6, duration: 4, delay: 0.3, parallax: -0.12, wideOnly: true },
  // θ 135° / 45° — outboard of the buttons.
  { icon: Smartphone, left: "21.7%", top: "76.2%", size: 50, float: 6, duration: 4.5, delay: 0.9, parallax: 0.14 },
  { icon: Workflow, left: "78.3%", top: "76.2%", size: 54, float: 5, duration: 3.9, delay: 1.4, parallax: -0.08 },
];

export default function HeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // One context so a single revert() tears down every tween and trigger.
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
        gsap.to(el, {
          y: -Number(el.dataset.float),
          duration: Number(el.dataset.duration),
          delay: Number(el.dataset.delay),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Parallax rides a separate wrapper: GSAP writes both as `y`, and one
      // element cannot carry two competing tweens on the same property.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          // A function so invalidateOnRefresh can re-read it after a resize.
          y: () => window.innerHeight * Number(el.dataset.parallax),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* The ring the cubes sit on. non-scaling-stroke keeps it hairline
          however the ellipse is stretched by preserveAspectRatio="none". */}
      <svg
        className="absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="40"
          ry="37"
          stroke="var(--color-border-hover)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
      </svg>

      <div className="hidden lg:block">
        {CUBES.map((cube) => (
          <div
            key={cube.left + cube.top}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${
              cube.wideOnly ? "hidden min-[1400px]:block" : ""
            }`}
            style={{ left: cube.left, top: cube.top }}
          >
            <div data-parallax={cube.parallax}>
              <div
                data-float={cube.float}
                data-duration={cube.duration}
                data-delay={cube.delay}
              >
                <IsoCube icon={cube.icon} size={cube.size} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
