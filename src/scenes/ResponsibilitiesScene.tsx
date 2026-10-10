import { motion, useReducedMotion } from "motion/react";
import type { SceneProps } from "../localization";
import { translations } from "../localization";
import { Arrow, Character, Reveal, SceneCanvas } from "./shared";
export default function ResponsibilitiesScene({ language }: SceneProps) {
  const reduced = useReducedMotion();
  return (
    <SceneCanvas
      viewBox="60 50 520 380"
      language={language}
      label={translations[language].responsibilitiesDescription}
    >
      <path
        d="M201 147 Q314 79 438 150 M191 308 Q324 393 442 313"
        className="dashed-line"
      />
      <Character x={323} y={300} pose="present" scale={0.95} />
      <Reveal delay={0.15}>
        <g transform="translate(89 84)" className="small-lines">
          <rect width="134" height="93" rx="9" fill="var(--card)" />
          <path d="M0 19 H134 M15 76 H94" />
          <path
            d="M22 67 V49 M40 67 V36 M58 67 V43 M76 67 V29"
            stroke="var(--accent)"
            strokeWidth="6"
          />
          <g transform="translate(94 55) rotate(9)">
            <rect width="45" height="48" rx="4" fill="var(--paper)" />
            <path
              d="M7 13 H37 M7 25 H37 M7 37 H37 M18 8 V41 M29 8 V41"
              strokeWidth="1"
            />
          </g>
          <text
            x="-8"
            y="-13"
            className="art-label"
            fill="var(--accent)"
            stroke="none"
          >
            01
          </text>
        </g>
      </Reveal>
      <Reveal delay={0.45}>
        <g transform="translate(454 127)" className="small-lines">
          <circle r="44" fill="var(--card)" />
          <path d="M31 32 L66 67" strokeWidth="7" />
          <path
            d="M-28 15 L-10 -7 L6 3 L28 -20 M17 -20 H28 V-9"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <text
            x="-12"
            y="-61"
            className="art-label"
            fill="var(--accent)"
            stroke="none"
          >
            02
          </text>
        </g>
      </Reveal>
      <Reveal delay={0.75}>
        <g transform="translate(105 283)" className="small-lines">
          <rect width="118" height="85" rx="9" fill="var(--card)" />
          <path d="M27 28 H88 M58 28 V58 M27 58 H88" stroke="var(--accent)" />
          {[27, 88].map((x) => (
            <g key={x}>
              <rect
                x={x - 10}
                y="18"
                width="20"
                height="20"
                rx="4"
                fill="var(--paper)"
              />
              <rect
                x={x - 10}
                y="48"
                width="20"
                height="20"
                rx="4"
                fill="var(--paper)"
              />
            </g>
          ))}
          <text
            x="-8"
            y="-13"
            className="art-label"
            fill="var(--accent)"
            stroke="none"
          >
            03
          </text>
        </g>
      </Reveal>
      <Reveal delay={1.05}>
        <g transform="translate(476 329)" className="small-lines">
          <motion.g
            initial={reduced ? false : { rotate: -35 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 1.2, delay: reduced ? 0 : 1.1 }}
          >
            <path
              d="M-9 -46 H9 L13 -34 L24 -28 L36 -32 L45 -16 L37 -6 V6 L45 16 L36 32 L24 28 L13 34 L9 46 H-9 L-13 34 L-24 28 L-36 32 L-45 16 L-37 6 V-6 L-45 -16 L-36 -32 L-24 -28 L-13 -34Z"
              fill="var(--card)"
            />
            <circle r="22" fill="var(--soft-accent)" stroke="var(--accent)" />
            <path
              d="M2 -14 L-10 3 H1 L-2 14 L11 -4 H0Z"
              fill="var(--accent)"
              stroke="none"
            />
          </motion.g>
          <text
            x="-15"
            y="-61"
            className="art-label"
            fill="var(--accent)"
            stroke="none"
          >
            04
          </text>
        </g>
      </Reveal>
      <Arrow d="M235 139 Q261 148 277 172" delay={0.3} />
      <Arrow d="M412 192 Q394 205 381 213" delay={0.6} />
      <Arrow d="M239 332 H266" delay={0.9} />
      <Arrow d="M390 352 H416" delay={1.2} />
    </SceneCanvas>
  );
}
