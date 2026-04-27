"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Dot = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

export function AmbientFireflies() {
  const reduceMotion = useReducedMotion();

  const dots = useMemo<Dot[]>(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: 3 + ((i * 13) % 94),
        size: 2.8 + (i % 4) * 1.35,
        delay: (i * 0.35) % 6.8,
        duration: 11.5 + (i % 7) * 1.2,
        opacity: 0.13 + (i % 5) * 0.05,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(119,155,193,0.34)_0%,rgba(154,191,218,0.26)_34%,rgba(203,223,236,0.16)_62%,rgba(247,249,251,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(93,128,167,0.24)_0%,rgba(58,86,119,0.16)_44%,rgba(20,28,42,0)_100%)]" />
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute bottom-[-18px]"
          style={{ left: `${dot.left}%` }}
          aria-hidden
        >
          <motion.div
            className="rounded-full bg-white"
            style={{
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              boxShadow: "0 0 18px 3px rgba(207,240,255,0.68)",
              filter: "blur(0.15px)",
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -1300],
                    opacity: [0, dot.opacity, dot.opacity * 0.8, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: dot.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: dot.delay,
                  }
            }
          />
        </div>
      ))}
    </div>
  );
}
