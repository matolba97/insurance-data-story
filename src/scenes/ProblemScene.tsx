import { translations } from "../localization";
import type { SceneProps } from "../localization";
import { motion, useReducedMotion } from "motion/react";
import { Character, Paper, Reveal, SceneCanvas } from "./shared";
export default function ProblemScene({ language }: SceneProps) {
  const text = translations[language];
  const reduced = useReducedMotion();
  const documents = [
    { x: 121, y: 88, r: -13, label: text.papers[0], kind: "lines" as const },
    { x: 288, y: 27, r: 8, label: text.papers[1], kind: "sheet" as const },
    { x: 440, y: 93, r: 12, label: text.papers[2], kind: "renewal" as const },
    { x: 70, y: 261, r: -9, label: text.papers[3], kind: "money" as const },
    { x: 471, y: 274, r: 9, label: text.papers[4], kind: "money" as const },
    { x: 192, y: 318, r: -7, label: text.papers[5], kind: "pending" as const },
  ];
  return (
    <SceneCanvas language={language} label={text.problemDescription}>
      <path
        d="M198 253 Q118 210 219 184 M402 258 Q464 225 418 197 M307 188 Q323 159 330 147"
        className="dashed-line"
      />
      {documents.map((doc, i) => (
        <g
          key={i}
          transform={`translate(${doc.x} ${doc.y}) rotate(${doc.r} 41 55)`}
        >
          <Reveal delay={i * 0.09}>
            <motion.g
              animate={
                reduced ? {} : { y: [0, -5, 0], rotate: [0, i % 2 ? 2 : -2, 0] }
              }
              transition={{ duration: 3.2 + i * 0.1, delay: i * 0.12 }}
            >
              <Paper label={doc.label} kind={doc.kind} language={language} />
            </motion.g>
          </Reveal>
        </g>
      ))}
      <Character x={337} y={312} pose="think" />
      <Reveal delay={0.9}>
        <text x="392" y="174" className="question-mark">
          {language === "ar" ? "؟" : "?"}
        </text>
        <path d="M278 186 l-9 -9 M278 204 l-14 1" className="small-lines" />
      </Reveal>
    </SceneCanvas>
  );
}
