"use client";
import { useEffect, useState, type ReactElement } from "react";

type Props = {
  text: string;
  className?: string;
  charDelay?: number;
  initialDelay?: number;
  duration?: number;
  lineClassNames?: string[];
};

export default function AnimatedHeading({
  text,
  className = "",
  charDelay = 30,
  initialDelay = 200,
  duration = 500,
  lineClassNames = [],
}: Props) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split("\n");

  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }} aria-label={text.replace("\n", " ")}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={`block ${lineClassNames[lineIndex] ?? ""}`} aria-hidden="true">
          {(() => {
            const chars = Array.from(line);
            const out: ReactElement[] = [];
            let word: ReactElement[] = [];
            const flush = (key: number) => {
              if (word.length) out.push(<span key={`w${key}`} className="inline-block whitespace-nowrap">{word}</span>);
              word = [];
            };
            chars.forEach((char, charIndex) => {
              const span = (
                <span
                  key={charIndex}
                  className="inline-block"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? "translateX(0)" : "translateX(-18px)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: `${duration}ms`,
                    transitionDelay: `${lineIndex * line.length * charDelay + charIndex * charDelay}ms`,
                  }}
                >
                  {char === " " ? " " : char}
                </span>
              );
              if (char === " ") {
                flush(charIndex);
                out.push(span);
              } else word.push(span);
            });
            flush(chars.length);
            return out;
          })()}
        </span>
      ))}
    </h1>
  );
}
