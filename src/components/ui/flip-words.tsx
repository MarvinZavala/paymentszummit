"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const letterVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: {
      duration: 0.15,
    },
  },
};

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  align = "center",
}: {
  words: string[];
  duration?: number;
  className?: string;
  align?: "center" | "start";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration, reduceMotion]);

  return (
    <div
      className={cn(
        "relative grid min-h-[1.2em] w-full",
        align === "start" ? "place-items-start" : "place-items-center"
      )}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="col-start-1 row-start-1 flex"
          translate="no"
          data-notranslate=""
          suppressHydrationWarning={true}
        >
          {words[currentIndex].split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={letterVariants}
              className={cn("inline-block", className)}
              translate="no"
              data-notranslate=""
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};