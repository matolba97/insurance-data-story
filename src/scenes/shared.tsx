import type { Language } from "../localization";
import { motion, useReducedMotion } from "motion/react";
import { memo } from "react";
import type { ReactNode } from "react";

export function SceneCanvas({
  children,
  label,
  language,
  viewBox = "0 0 640 480",
}: {
  children: ReactNode;
  label: string;
  language: Language;
  viewBox?: string;
}) {
  return (
    <svg
      lang={language}
      className="scene-svg"
      viewBox={viewBox}
      direction="ltr"
      role="img"
      aria-label={label}
    >
      <ellipse cx="320" cy="245" rx="244" ry="194" fill="var(--wash)" />
      <path d="M65 413 Q310 418 575 413" className="ground" />
      {children}
    </svg>
  );
}

export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 12,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.g
      initial={reduced ? false : { opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.65,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.g>
  );
}

export const Character = memo(function Character({
  x,
  y,
  pose = "think",
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  pose?: "think" | "present" | "fix" | "wave";
}) {
  const reduced = useReducedMotion();
  const happy = pose !== "think";
  const arms = {
    think: ["M0 -67 Q-37 -67 -25 -112", "M0 -67 Q35 -42 43 -68"],
    present: ["M0 -67 Q-23 -34 -40 -29", "M0 -67 Q41 -64 66 -89"],
    fix: ["M0 -67 Q-28 -39 -12 -22", "M0 -67 Q29 -80 55 -100"],
    wave: ["M0 -67 Q-32 -44 -42 -24", "M0 -67 Q46 -86 43 -139"],
  }[pose];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="character">
      <ellipse cy="94" rx="49" ry="8" fill="var(--ink)" opacity=".07" />
      <motion.g
        initial={reduced ? false : { y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: reduced ? 0 : 0.12 }}
      >
        <g className="character-lines">
          <path d="M0 -82 Q-5 -29 0 17 M0 17 Q-20 54 -30 87 M0 17 Q23 49 32 87 M-30 87 l-13 2 M32 87 l13 2" />
          <path d={arms[0]} />
          <motion.path
            d={arms[1]}
            style={{ transformOrigin: "0px -67px" }}
            animate={
              !reduced && pose === "wave"
                ? { rotate: [0, 13, -8, 10, 0] }
                : { rotate: 0 }
            }
            transition={{ duration: 1.7, delay: 0.55 }}
          />
          <motion.g
            style={{ transformOrigin: "0px -85px" }}
            animate={
              !reduced && pose === "think"
                ? { rotate: [0, -7, 5, 0] }
                : { rotate: 0 }
            }
            transition={{ duration: 3.5, delay: 0.8 }}
          >
            <path
              d="M-33 -119 C-33 -166 33 -166 34 -124 C36 -79 -30 -77 -33 -119Z"
              fill="var(--paper)"
            />
            <path d="M-19 -150 Q-9 -164 6 -153" />
            <g strokeWidth="2.8">
              <path
                d={
                  happy
                    ? "M-19 -132 l10 -2 M10 -134 l9 2"
                    : "M-19 -136 l10 -4 M10 -139 l9 6"
                }
              />
              <path
                d={
                  happy
                    ? "M-10 -110 Q1 -99 13 -112"
                    : "M-9 -105 Q1 -112 12 -107"
                }
              />
            </g>
            <g fill="var(--ink)" stroke="none">
              <circle cx="-12" cy="-124" r="2.8" />
              <circle cx="15" cy="-124" r="2.8" />
            </g>
          </motion.g>
        </g>
        <path d="M-9 -79 Q1 -72 11 -80 L6 -61 L-5 -61Z" fill="var(--accent)" />
      </motion.g>
    </g>
  );
});

export function Paper({
  label,
  kind = "lines",
  language = "ar",
}: {
  label: string;
  language?: Language;
  kind?: "lines" | "sheet" | "renewal" | "money" | "pending";
}) {
  return (
    <g className="paper-lines">
      <path
        d="M0 0 H65 L83 18 V104 Q83 110 77 110 H6 Q0 110 0 104Z"
        fill="var(--card)"
      />
      <path d="M65 0 V18 H83" />
      {kind === "sheet" ? (
        <g strokeWidth="1.3">
          <rect x="13" y="31" width="56" height="47" rx="2" />
          <path d="M13 46 H69 M13 61 H69 M32 31 V78 M50 31 V78" />
          <path
            d="M14 32 H68 V45 H14Z"
            fill="var(--accent)"
            stroke="none"
            opacity=".18"
          />
        </g>
      ) : kind === "renewal" ? (
        <g>
          <path
            d="M54 36 A21 21 0 1 0 58 60 M54 28 V39 H43"
            stroke="var(--accent)"
          />
          <path d="M40 42 V54 L49 60" />
        </g>
      ) : kind === "money" ? (
        <g>
          <rect x="12" y="37" width="58" height="34" rx="4" />
          <circle cx="41" cy="54" r="10" stroke="var(--accent)" />
          <path d="M19 48 V60 M63 48 V60" />
        </g>
      ) : kind === "pending" ? (
        <g>
          <circle cx="41" cy="54" r="22" />
          <path d="M41 40 V54 L52 61" stroke="var(--accent)" />
        </g>
      ) : (
        <g>
          <path d="M13 37 H46 M13 50 H68 M13 63 H60 M13 76 H49" />
          <path d="M57 88 l5 5 9 -12" stroke="var(--accent)" />
        </g>
      )}
      <text
        x="41"
        y="134"
        className="art-label"
        lang={language}
        textAnchor="middle"
        stroke="none"
        fill="var(--muted)"
        direction={language === "ar" ? "rtl" : "ltr"}
      >
        {label}
      </text>
    </g>
  );
}

export function Arrow({ d, delay = 0 }: { d: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: reduced ? 0 : delay }}
    />
  );
}
