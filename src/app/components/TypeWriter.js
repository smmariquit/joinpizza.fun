"use client";

import { useState, useEffect, useCallback } from "react";

const WORDS = ["pizza"];
const TYPE_SPEED = 130;
const DELETE_SPEED = 70;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 350;

export default function TypeWriter() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    if (isPaused) return;

    const currentWord = WORDS[wordIndex];

    if (!isDeleting) {
      const next = currentWord.slice(0, text.length + 1);
      setText(next);

      if (next === currentWord) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
        return;
      }
    } else {
      const next = currentWord.slice(0, text.length - 1);
      setText(next);

      if (next === "") {
        setIsDeleting(false);
        setIsPaused(true);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setTimeout(() => {
          setIsPaused(false);
        }, PAUSE_AFTER_DELETE);
        return;
      }
    }
  }, [text, wordIndex, isDeleting, isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, isPaused]);

  // Minimum width so the ampersand doesn't jump around
  const minWidth = WORDS[wordIndex].length * 0.6 + "em";

  return (
    <>
      <span className="typed-word" style={{ display: "inline-block", minWidth }}>
        {text}
        <span className="cursor-blink" />
      </span>
    </>
  );
}
