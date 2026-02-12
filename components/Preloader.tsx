"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const curtainEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const [isReady, setIsReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsReady(true), reducedMotion ? 120 : 1100);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          className="fixed inset-0 z-[180] flex items-center justify-center bg-black"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reducedMotion ? 0 : 1, ease: curtainEase }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-[#F1F1F1]/75"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: curtainEase }}
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
