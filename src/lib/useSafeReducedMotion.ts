"use client";

import { useEffect, useState } from "react";

/**
 * Reads `prefers-reduced-motion` directly via matchMedia instead of Framer
 * Motion's useReducedMotion(), which logs a console warning whenever the
 * preference is on and resolves synchronously on the client's first render
 * (before the server, which has no matchMedia, agrees) causing a hydration
 * mismatch. This always returns `false` until after mount, matching the
 * server-rendered output exactly on first paint, then applies the real
 * preference once hydration is safely complete.
 */
export default function useSafeReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from matchMedia, not derivable from props/state
    setPrefersReduced(query.matches);

    const onChange = () => setPrefersReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
