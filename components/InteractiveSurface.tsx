"use client";

import { type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type InteractiveSurfaceProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function InteractiveSurface({
  children,
  className = "",
  intensity = 10,
}: InteractiveSurfaceProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXRaw = useTransform(mouseY, [0, 1], [intensity, -intensity]);
  const rotateYRaw = useTransform(mouseX, [0, 1], [-intensity, intensity]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 20, mass: 0.35 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 20, mass: 0.35 });

  const shadow = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      const dx = (x - 0.5) * 24;
      const dy = (y - 0.5) * 18;
      return `${-dx.toFixed(1)}px ${dy.toFixed(1)}px 48px -30px rgba(23, 35, 55, 0.45)`;
    }
  );

  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      onMouseMove={(e) => {
        if (reducedMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
        const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
        mouseX.set(Math.min(1, Math.max(0, x)));
        mouseY.set(Math.min(1, Math.max(0, y)));
      }}
      onMouseLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      style={
        reducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transformPerspective: 1200,
              boxShadow: shadow,
              willChange: "transform",
            }
      }
    >
      {children}
    </motion.div>
  );
}
