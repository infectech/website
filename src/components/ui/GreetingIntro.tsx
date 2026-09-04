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

// The per-word fade must finish well inside WORD_MS, otherwise each greeting is
// swapped out mid-fade and the whole intro reads as a flicker instead of words.
const WORD_MS = 420;
const FADE_S = 0.28;
const HOLD_MS = 550;

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
      window.setTimeout(() => setIndex(i), i * WORD_MS)
    );
    timers.push(
      window.setTimeout(
        () => setDone(true),
        GREETINGS.length * WORD_MS + HOLD_MS
      )
    );

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
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: FADE_S, ease: EASE_OUT }}
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
                transition={{
                  duration: (GREETINGS.length * WORD_MS + HOLD_MS) / 1000,
                  ease: "linear",
                }}
                style={{ originX: 0 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
