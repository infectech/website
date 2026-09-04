"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";

// cos(30°) — half the projected width of a unit isometric cube edge.
const ISO = Math.sqrt(3) / 2;

/**
 * An outlined isometric cube with hatched top and right faces and a single
 * icon sitting flat on the front-left face.
 *
 * The cube is drawn as SVG rather than an image so it stays crisp at any size
 * and needs no assets. The icon is a real Lucide component overlaid in HTML
 * and skewed into the face's plane with the same matrix the SVG uses, which
 * keeps it identical to the icons used elsewhere on the site.
 */
export default function IsoCube({
  icon: Icon,
  size = 96,
  className = "",
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  // React's useId contains colons, which are not valid inside url(#…).
  const uid = useId().replace(/:/g, "");
  const hatchId = `hatch-${uid}`;

  const edge = size / (2 * ISO); // projected cube edge
  const height = edge * 2;

  // Hexagon vertices, clockwise from the top.
  const top = [size / 2, 0];
  const upperRight = [size, edge * 0.5];
  const lowerRight = [size, edge * 1.5];
  const bottom = [size / 2, height];
  const lowerLeft = [0, edge * 1.5];
  const upperLeft = [0, edge * 0.5];
  const centre = [size / 2, edge];

  const face = (points: number[][]) =>
    points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <div
      className={`relative text-ink ${className}`}
      style={{ width: size, height }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={height}
        viewBox={`0 0 ${size} ${height}`}
        fill="none"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id={hatchId}
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="7"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.16"
            />
          </pattern>
        </defs>

        {/* Front-left face stays clear — it carries the icon. */}
        <polygon
          points={face([upperLeft, centre, bottom, lowerLeft])}
          fill="var(--color-bg-surface)"
        />
        <polygon
          points={face([top, upperRight, centre, upperLeft])}
          fill={`url(#${hatchId})`}
        />
        <polygon
          points={face([centre, upperRight, lowerRight, bottom])}
          fill={`url(#${hatchId})`}
        />

        <g stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" opacity="0.8">
          <polygon
            points={face([
              top,
              upperRight,
              lowerRight,
              bottom,
              lowerLeft,
              upperLeft,
            ])}
          />
          {/*
            The three cube edges meeting at the near corner, which projects to
            the centre of the hexagon: up-left and up-right along the top face,
            and straight down the vertical front edge. Note it is *not* the
            centre-to-top line — that is a diagonal across the top face, and
            drawing it makes the cube read as an open box.
          */}
          <line x1={centre[0]} y1={centre[1]} x2={upperLeft[0]} y2={upperLeft[1]} />
          <line x1={centre[0]} y1={centre[1]} x2={upperRight[0]} y2={upperRight[1]} />
          <line x1={centre[0]} y1={centre[1]} x2={bottom[0]} y2={bottom[1]} />
        </g>
      </svg>

      {/*
        Skewed into the front-left face. The matrix maps this square's local
        axes onto the face's two edges: x onto upperLeft→centre, y onto
        upperLeft→lowerLeft, so the icon lies in the plane of the face.
      */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: upperLeft[0],
          top: upperLeft[1],
          width: edge,
          height: edge,
          transformOrigin: "0 0",
          transform: `matrix(${ISO}, 0.5, 0, 1, 0, 0)`,
        }}
      >
        <Icon size={edge * 0.44} strokeWidth={1.6} />
      </div>
    </div>
  );
}
