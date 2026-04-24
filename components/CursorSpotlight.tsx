"use client";

import { useEffect, useState } from "react";

/** Simple circular highlight that follows the pointer. */
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
        className="absolute h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hub-accent/65 opacity-0 blur-[32px] transition-opacity duration-200 dark:bg-hub-accent/55"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: on ? 0.75 : 0,
        }}
      />
    </div>
  );
}
