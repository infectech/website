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
  "Olá",
  "مرحبا",
  "Hallo",
  "안녕하세요",
];

const WORD_MS = 110;
const HOLD_MS = 260;

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
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
          aria-hidden="true"
        >
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />

          <div className="relative flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {GREETINGS[index]}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
