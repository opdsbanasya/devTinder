"use client";;
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function WordRotate({
  words,
  duration = 2500,

  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },

  className
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p key={words[index]} className={cn(className)} {...motionProps}>
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
