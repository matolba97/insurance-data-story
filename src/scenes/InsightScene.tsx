import { motion, useReducedMotion } from "motion/react";
import { Arrow, Character, Paper, Reveal, SceneCanvas } from "./shared";
export default function InsightScene() {
  const reduced = useReducedMotion();
  return (
    <SceneCanvas label="محمد ينظم السجلات ويراجعها لتتحول إلى لوحة توضيحية للأقساط والتجديدات والعمولات وأداء الفروع">
      <g transform="translate(64 116) scale(.72)">
        <motion.g
          initial={reduced ? false : { opacity: 1 }}
          animate={{ opacity: 0.38 }}
          transition={{ delay: reduced ? 0 : 1.3 }}
        >
          <g transform="rotate(-12)">
            <Paper label="" kind="sheet" />
          </g>
          <g transform="translate(22 15) rotate(8)">
            <Paper label="" />
          </g>
        </motion.g>
      </g>
      <Arrow
        d="M147 164 Q184 113 226 145 M216 134 L227 145 L214 151"
        delay={0.45}
      />
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          initial={
            reduced ? { opacity: 0 } : { x: 117, y: 175 + i * 13, opacity: 0 }
          }
          animate={
            reduced
              ? { opacity: 0 }
              : {
                  x: [117, 155, 242],
                  y: [175 + i * 13, 138, 160],
                  opacity: [0, 0.65, 0],
                }
          }
          transition={{ duration: 1.25, delay: 0.35 + i * 0.16 }}
        >
          <rect width="17" height="4" rx="2" fill="var(--accent)" />
        </motion.g>
      ))}
      <Reveal delay={0.7}>
        <g className="dashboard" transform="translate(239 87)">
          <rect
            width="325"
            height="244"
            rx="16"
            fill="var(--card)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <path d="M0 39 H325" className="small-lines" />
          <circle cx="18" cy="20" r="3" fill="var(--accent)" />
          <circle cx="30" cy="20" r="3" fill="var(--line)" />
          <circle cx="42" cy="20" r="3" fill="var(--line)" />
          <text
            x="305"
            y="25"
            textAnchor="end"
            className="art-micro"
            fill="var(--muted)"
          >
            Power BI
          </text>
          {["أقساط", "تجديدات", "عمولات"].map((label, i) => (
            <g key={label} transform={`translate(${18 + i * 99} 56)`}>
              <rect width="91" height="60" rx="7" fill="var(--wash)" />
              <text
                x="76"
                y="22"
                textAnchor="start"
                direction="rtl"
                className="art-micro"
                fill="var(--muted)"
              >
                {label}
              </text>
              <path
                d="M15 43 H36 M15 48 H28"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M60 45 L66 36 L72 39 L80 30"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />
            </g>
          ))}
          <text
            x="304"
            y="144"
            textAnchor="start"
            direction="rtl"
            className="art-micro"
            fill="var(--muted)"
          >
            أداء الفروع
          </text>
          <path d="M25 212 H172" stroke="var(--line)" />
          {[33, 51, 41, 63, 48].map((h, i) => (
            <motion.rect
              key={i}
              x={35 + i * 28}
              y={212 - h}
              width="15"
              height={h}
              rx="3"
              fill="var(--accent)"
              opacity={0.4 + i * 0.12}
              initial={reduced ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${42 + i * 28}px 212px` }}
              transition={{ duration: 0.65, delay: 1.05 + i * 0.1 }}
            />
          ))}
          <circle
            cx="257"
            cy="183"
            r="28"
            fill="none"
            stroke="var(--wash)"
            strokeWidth="11"
          />
          <motion.circle
            cx="257"
            cy="183"
            r="28"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="11"
            strokeDasharray="119 176"
            transform="rotate(-90 257 183)"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </g>
        <path d="M373 333 V358 M324 358 H423" className="small-lines" />
      </Reveal>
      <Character x={191} y={322} pose="present" scale={0.93} />
      <Reveal delay={1.6}>
        <g transform="translate(76 438)">
          <text x="0" className="art-micro" fill="var(--muted)">
            Raw data
          </text>
          <path d="M76 -4 H109 m-5 -4 5 4 -5 4" className="small-lines" />
          <text x="125" className="art-micro" fill="var(--accent)">
            Clean data
          </text>
          <path d="M212 -4 H245 m-5 -4 5 4 -5 4" className="small-lines" />
          <text x="263" className="art-micro" fill="var(--accent)">
            Meaningful insights
          </text>
        </g>
      </Reveal>
    </SceneCanvas>
  );
}
