"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

// Every greeting gets the same beat — long enough to actually read, and well
// clear of the ~130ms floor below which words stop registering as words.
const WORD_MS = 350;

const OFFSETS = GREETINGS.map((_, i) => i * WORD_MS);

// The per-word fade has to finish inside WORD_MS, otherwise a greeting is
// swapped out mid-fade and the sequence reads as a flicker instead of words.
const FADE_S = 0.16;

// The whole intro, entrance through exit. Rather than ending on a beat of
// stillness and then dismissing, the overlay starts dissolving partway
// through the sequence and the remaining greetings play out inside that
// fade — so the site is already showing through while they cycle.
const TOTAL_MS = 3200;
const FADE_FROM = GREETINGS.indexOf("নমস্কার");
const FADE_AT_MS = OFFSETS[FADE_FROM];
const EXIT_MS = TOTAL_MS - FADE_AT_MS;

export default function GreetingIntro() {
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  // `reduce` is false until after mount, so the overlay renders for a single
  // frame and then dismisses instantly — no animation, no hydration mismatch.
  const visible = !done && !reduce;

  useEffect(() => {
    if (reduce) return;

    const timers = GREETINGS.map((_, i) =>
      window.setTimeout(() => setIndex(i), OFFSETS[i])
    );
    timers.push(window.setTimeout(() => setFading(true), FADE_AT_MS));
    timers.push(window.setTimeout(() => setDone(true), TOTAL_MS));

    return () => timers.forEach(window.clearTimeout);
  }, [reduce]);

  // Released as soon as the dissolve begins, not when the overlay unmounts —
  // the page is legible underneath for the whole fade, so it should scroll.
  useEffect(() => {
    if (!visible || fading) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [visible, fading]);

  if (!visible) return null;

  return (
    <motion.div
      // Driven by state rather than an AnimatePresence exit: an exiting
      // subtree is frozen at its last render, which would strand the overlay
      // on নমস্কার instead of letting the rest of the greetings play out
      // inside the dissolve.
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      // easeInOut, not the sharp EASE_OUT used elsewhere: that curve spends
      // three quarters of the fade in its first quarter, which reads as a cut
      // rather than a dissolve.
      transition={{ duration: EXIT_MS / 1000, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary pointer-events-none"
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
            transition={{ duration: TOTAL_MS / 1000, ease: "linear" }}
            style={{ originX: 0 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
