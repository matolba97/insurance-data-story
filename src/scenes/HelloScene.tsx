import { Arrow, Character, Reveal, SceneCanvas } from "./shared";
export default function HelloScene() {
  return (
    <SceneCanvas label="محمد يظهر مبتسمًا ويلوّح بيده، حوله رموز للبيانات والتعاون وتحسين العمليات">
      <circle cx="320" cy="229" r="154" fill="var(--soft-accent)" />
      <path d="M171 231 A149 149 0 0 1 444 143" className="dashed-line" />
      <Reveal delay={0.2}>
        <g transform="translate(141 167) rotate(-10)" className="small-lines">
          <rect width="69" height="62" rx="9" fill="var(--card)" />
          <path
            d="M15 45 V33 M29 45 V20 M43 45 V28 M54 45 V14"
            stroke="var(--accent)"
            strokeWidth="4"
          />
        </g>
      </Reveal>
      <Reveal delay={0.4}>
        <g transform="translate(438 250) rotate(8)" className="small-lines">
          <rect width="69" height="62" rx="9" fill="var(--card)" />
          <path d="M16 31 H51 M34 14 V48" stroke="var(--accent)" />
          <circle cx="16" cy="31" r="5" fill="var(--paper)" />
          <circle cx="51" cy="31" r="5" fill="var(--paper)" />
          <circle cx="34" cy="14" r="5" fill="var(--paper)" />
          <circle cx="34" cy="48" r="5" fill="var(--paper)" />
        </g>
      </Reveal>
      <Character x={322} y={309} pose="wave" scale={1.16} />
      <Reveal delay={0.7}>
        <g transform="translate(419 75) rotate(8)">
          <rect
            width="89"
            height="48"
            rx="24"
            fill="var(--card)"
            stroke="var(--ink)"
            strokeWidth="1.8"
          />
          <path
            d="M9 44 L3 55 L24 48"
            fill="var(--card)"
            stroke="var(--ink)"
            strokeWidth="1.8"
          />
          <text
            x="45"
            y="31"
            textAnchor="middle"
            className="art-label"
            fill="var(--accent)"
          >
            أهلًا!
          </text>
        </g>
      </Reveal>
      <Arrow d="M190 336 Q149 391 218 397 M210 390 l8 7 -9 4" delay={0.9} />
      <Reveal delay={0.9}>
        <text
          x="320"
          y="451"
          textAnchor="middle"
          className="signature"
          fill="var(--accent)"
        >
          Let’s make sense of data.
        </text>
      </Reveal>
    </SceneCanvas>
  );
}
