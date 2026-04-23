"use client";

import { motion } from "framer-motion";

/** Slow drifting layers - open-SaaS–style ambient motion without cluttering copy. */
export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -left-[20%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-hub-accent/20 blur-[100px] dark:bg-hub-accent/10"
        animate={{ x: [0, 36, 0], y: [0, 22, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[15%] h-[45vh] w-[45vh] rounded-full bg-hub-ink/10 blur-[90px] dark:bg-hub-accent/8"
        animate={{ x: [0, -28, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[25%] h-[40vh] w-[50vh] rounded-full bg-[#f0d6c2]/35 blur-[110px] dark:bg-hub-ink/25"
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
