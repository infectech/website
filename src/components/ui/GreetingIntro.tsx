"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Hola",
  "নমস্কার",
  "こんにちは",
  "Ciao",
  "مرحبا",
  "안녕하세요",
];

// Each greeting is held for less time than the one before it, so the intro
// opens deliberately and then accelerates away instead of outstaying its
// welcome. Floored at MIN_MS because below roughly that the words stop
// registering as words.
const FIRST_MS = 620;
const DECAY = 0.72;
const MIN_MS = 130;
const HOLD_MS = 320;

const SLOTS = GREETINGS.map((_, i) =>
  Math.max(MIN_MS, Math.round(FIRST_MS * DECAY ** i))
);

// Cumulative start time of each greeting.
const OFFSETS = SLOTS.reduce<number[]>(
  (acc, slot, i) => [...acc, (acc[i - 1] ?? 0) + (SLOTS[i - 1] ?? 0)],
  []
);

const TOTAL_MS = SLOTS.reduce((a, b) => a + b, 0) + HOLD_MS;

// The fade must finish well inside its own slot, otherwise the greeting is
// swapped out mid-fade and the intro reads as a flicker instead of words.
const fadeFor = (i: number) => Math.min(0.24, (SLOTS[i] * 0.45) / 1000);

export default function GreetingIntro() {
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // `reduce` is false until after mount, so the overlay renders for a single
  // frame and then dismisses instantly — no animation, no hydration mismatch.
  const visible = !done && !reduce;

  useEffect(() => {
    if (reduce) return;

    const timers = GREETINGS.map((_, i) =>
      window.setTimeout(() => setIndex(i), OFFSETS[i])
    );
    timers.push(window.setTimeout(() => setDone(true), TOTAL_MS));

    return () => timers.forEach(window.clearTimeout);
  }, [reduce]);

  useEffect(() => {
    if (!visible) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="greeting-intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: fadeFor(index), ease: EASE_OUT }}
              className="display-lg text-5xl sm:text-7xl text-ink"
            >
              {GREETINGS[index]}
            </motion.span>

            {/* Progress rule fills as the greetings advance. */}
            <div className="mt-8 h-px w-40 bg-border overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: TOTAL_MS / 1000, ease: "linear" }}
                style={{ originX: 0 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
