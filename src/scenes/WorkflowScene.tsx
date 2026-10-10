import { translations } from "../localization";
import type { SceneProps } from "../localization";
import { motion, useReducedMotion } from "motion/react";
import { Arrow, Character, Reveal, SceneCanvas } from "./shared";
function Department({
  x,
  label,
  icon,
}: {
  x: number;
  label: string;
  icon: "sales" | "operations" | "finance";
}) {
  return (
    <g transform={`translate(${x} 69)`}>
      <rect
        width="132"
        height="95"
        rx="12"
        fill="var(--card)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <g transform="translate(66 34)" className="small-lines">
        {icon === "sales" ? (
          <>
            <circle cy="-7" r="9" />
            <path d="M-18 21 V15 Q0 -7 18 15 V21 M-6 22 H6" />
          </>
        ) : icon === "operations" ? (
          <>
            <rect x="-19" y="-16" width="38" height="38" rx="4" />
            <path d="M-10 -5 l4 4 6 -7 M5 -3 H12 M-10 9 l4 4 6 -7 M5 11 H12" />
          </>
        ) : (
          <>
            <rect x="-23" y="-12" width="46" height="31" rx="3" />
            <circle cy="4" r="9" />
            <path d="M-16 -2 V9 M16 -2 V9" />
          </>
        )}
      </g>
      <text
        x="66"
        y="78"
        textAnchor="middle"
        className="art-label"
        fill="var(--ink)"
      >
        {label}
      </text>
    </g>
  );
}
export default function WorkflowScene({ language }: SceneProps) {
  const text = translations[language];
  const reduced = useReducedMotion();
  return (
    <SceneCanvas language={language} label={text.workflowDescription}>
      <Reveal>
        <Department x={61} label={text.departments[0]} icon="sales" />
        <Department x={254} label={text.departments[1]} icon="operations" />
        <Department x={447} label={text.departments[2]} icon="finance" />
      </Reveal>
      <Arrow d="M195 114 H248 m-8 -6 8 6 -8 6" delay={0.4} />
      <path d="M390 114 H410 M429 114 H442" className="dashed-line" />
      <motion.g
        initial={reduced ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: reduced ? 0 : 2, duration: 0.3 }}
      >
        <circle
          cx="419"
          cy="114"
          r="13"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <path d="M416 108 l6 12 M422 108 l-6 12" className="small-lines" />
      </motion.g>
      <Arrow d="M390 114 H442 m-8 -6 8 6 -8 6" delay={2.15} />
      <Arrow
        d="M513 174 V219 Q513 241 490 241 H143 Q127 241 127 264 V287 m-6 -8 6 8 6 -8"
        delay={2.4}
      />
      <Reveal delay={0.6}>
        <Character x={328} y={315} pose="fix" />
        <g transform="translate(384 204)" className="small-lines">
          <circle r="22" fill="var(--paper)" />
          <path d="M15 16 L35 37" strokeWidth="5" />
          <path d="M-7 -1 l5 5 10 -11" stroke="var(--accent)" />
        </g>
      </Reveal>
      <Reveal delay={2.6}>
        <g transform="translate(74 309)">
          <rect width="128" height="52" rx="26" fill="var(--soft-accent)" />
          <path d="M18 26 l7 7 13 -16" className="accent-lines" />
          <text
            x="77"
            y="32"
            textAnchor="middle"
            className="art-micro"
            fill="var(--accent)"
          >
            {text.automation}
          </text>
        </g>
      </Reveal>
      <Reveal delay={2.8}>
        <g transform="translate(396 309)">
          <rect
            width="160"
            height="52"
            rx="26"
            fill="var(--card)"
            stroke="var(--line)"
          />
          <text
            x="80"
            y="32"
            textAnchor="middle"
            className="art-micro"
            fill="var(--accent)"
          >
            {text.processes}
          </text>
        </g>
      </Reveal>
      <Reveal delay={2.9}>
        <text
          x="320"
          y="447"
          textAnchor="middle"
          className="art-micro"
          fill="var(--muted)"
        >
          {text.flow}
        </text>
      </Reveal>
    </SceneCanvas>
  );
}
