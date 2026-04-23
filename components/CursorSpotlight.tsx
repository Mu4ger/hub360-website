"use client";

import { useEffect, useState } from "react";

/** Radial glow follows cursor - rendered above page, under sticky nav (z-50). */
export function CursorSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setOn(true);
    };
    const leave = () => setOn(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 hidden mix-blend-multiply dark:mix-blend-screen md:block"
      aria-hidden
    >
      <div
        className="absolute h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hub-accent/30 opacity-0 blur-[100px] transition-opacity duration-300 dark:bg-hub-accent/20"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: on ? 0.45 : 0,
        }}
      />
    </div>
  );
}
