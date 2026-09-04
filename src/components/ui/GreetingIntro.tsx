"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSafeReducedMotion from "@/lib/useSafeReducedMotion";

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

// Every greeting gets the same beat, long enough to actually read.
const WORD_MS = 525;
const OFFSETS = GREETINGS.map((_, i) => i * WORD_MS);
const WORDS_MS = GREETINGS.length * WORD_MS;

// Greetings roll upward: the outgoing word rises out of the window as the
// next one rises in behind it. Kept well inside WORD_MS so each greeting
// comes to rest and holds still before the next one moves.
const SLIDE_S = 0.42;

// The panel then lifts away in the same direction, carrying the last
// greeting with it — a curtain rising rather than a dissolve.
const EXIT_MS = 750;
const TOTAL_MS = WORDS_MS + EXIT_MS;

// Shown once per visit. sessionStorage rather than localStorage so it greets
// someone arriving in a new tab or after closing the browser, but not on
// every reload or full-document navigation within the same visit. The same
// key is read by a blocking script in the layout, which hides the overlay
// before first paint — without that, a reload would flash it before this
// component could mount and take it down.
export const INTRO_SEEN_KEY = "infectech:intro-seen";

const alreadyGreeted = () => {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false; // private mode / storage blocked: just play the intro
  }
};

const rememberGreeted = () => {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    /* nothing to do — the intro simply plays again next time */
  }
};

export default function GreetingIntro() {
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  // Set in the effect below, and read by the scroll-lock effect in the same
  // commit — `done` has not re-rendered yet at that point, so without this the
  // lock is applied and immediately reverted on every already-greeted load.
  const greetedRef = useRef(false);

  // `reduce` is false until after mount, so the overlay renders for a single
  // frame and then dismisses instantly — no animation, no hydration mismatch.
  const visible = !done && !reduce;

  useEffect(() => {
    if (reduce) return;

    // Second visit within the session: the layout script has already hidden
    // the overlay, so take it down without running the sequence at all.
    if (alreadyGreeted()) {
      greetedRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading sessionStorage, an external store, not derivable from props/state
      setDone(true);
      return;
    }
    rememberGreeted();

    const timers = GREETINGS.map((_, i) =>
      window.setTimeout(() => setIndex(i), OFFSETS[i])
    );
    timers.push(window.setTimeout(() => setLeaving(true), WORDS_MS));
    timers.push(window.setTimeout(() => setDone(true), TOTAL_MS));

    return () => timers.forEach(window.clearTimeout);
  }, [reduce]);

  // Released as soon as the panel starts lifting, not when it unmounts — the
  // page is uncovering underneath for that whole travel, so it should scroll.
  useEffect(() => {
    if (!visible || leaving || greetedRef.current) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [visible, leaving]);

  if (!visible) return null;

  return (
    <motion.div
      // Driven by state rather than an AnimatePresence exit: an exiting
      // subtree renders frozen at its last state, which would strand the
      // panel on whichever greeting was showing when it began to leave.
      initial={{ y: "0%" }}
      animate={{ y: leaving ? "-100%" : "0%" }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
      id="greeting-intro"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary pointer-events-none"
      aria-hidden="true"
    >
      {/* w-full matters: the wrapper would otherwise shrink to its widest
          child — the 160px rule — and the window below, clipping its own
          overflow, would cut the ends off the longer greetings. */}
      <div className="relative flex flex-col items-center w-full">
        {/* The window the greetings travel through. overflow-hidden is what
            makes the roll read as a roll: without it the arriving and
            departing words are visible above and below the line. */}
        <div className="relative h-16 sm:h-24 w-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.span
              key={index}
              // Full-height and absolutely placed, so translating by 100%
              // moves a word exactly one window clear of the opening.
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: SLIDE_S, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 flex items-center justify-center display-lg text-5xl sm:text-7xl text-ink whitespace-nowrap"
            >
              {GREETINGS[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress rule fills as the greetings advance. */}
        <div className="mt-8 h-px w-40 bg-border overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: WORDS_MS / 1000, ease: "linear" }}
            style={{ originX: 0 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
