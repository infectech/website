"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The Process timeline's connecting line: draws in as the user scrolls
 * through the steps, echoing the hero's node-diagram motif.
 */
export default function FlowLine({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: reduceMotion ? 0 : length,
    });

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="overflow-visible"
      >
        <path
          ref={pathRef}
          d="M0,10 L1200,10"
          stroke="url(#flow-gradient)"
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="flow-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="15%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="85%" stopColor="#60A5FA" stopOpacity="1" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
