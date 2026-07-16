"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
  onClick?: () => void;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * 3D tilt on pointer move, with a glare highlight tracking the cursor.
 * Spring-smoothed so it feels physical instead of snapping to the pointer.
 */
export default function TiltCard({
  children,
  className = "",
  as = "div",
  href,
  target,
  rel,
  id,
  onClick,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement & HTMLAnchorElement>(null);
  const reduce = useSafeReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, SPRING);
  const springY = useSpring(mouseY, SPRING);

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const glare = !reduce && (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(96,165,250,0.15), transparent 60%)`,
      }}
    />
  );

  const sharedStyle = reduce
    ? undefined
    : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d" as const,
        transformPerspective: 800,
      };

  const sharedProps = {
    id,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: sharedStyle,
    whileHover: reduce ? undefined : { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    className: `relative [transform:translateZ(0)] ${className}`,
  };

  if (as === "a") {
    return (
      <motion.a ref={ref} href={href} target={target} rel={rel} {...sharedProps}>
        {glare}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div ref={ref} {...sharedProps}>
      {glare}
      {children}
    </motion.div>
  );
}
