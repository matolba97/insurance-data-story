import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { moveSlide, swipeDirection } from "./navigation";
import { LINKEDIN_URL, story } from "./story";
import ProblemScene from "./scenes/ProblemScene";
import InsightScene from "./scenes/InsightScene";
import WorkflowScene from "./scenes/WorkflowScene";
import HelloScene from "./scenes/HelloScene";

const scenes = [ProblemScene, InsightScene, WorkflowScene, HelloScene];
function Chevron({ left = false }: { left?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={left ? "M14 6 L8 12 L14 18" : "M10 6 L16 12 L10 18"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Presentation() {
  const [position, setPosition] = useState({ index: 0, direction: 1 });
  const reduced = useReducedMotion();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const lastNavigation = useRef(-Infinity);
  const navigate = useCallback((direction: -1 | 1) => {
    const now = performance.now();
    if (now - lastNavigation.current < 420) return;
    lastNavigation.current = now;
    setPosition((current) => ({
      index: moveSlide(current.index, direction),
      direction,
    }));
  }, []);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("a, input, textarea, select, [contenteditable]")
      )
        return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(event.key === "ArrowRight" ? 1 : -1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);
  function onTouchStart(event: TouchEvent) {
    if (
      event.touches.length !== 1 ||
      (event.target instanceof Element && event.target.closest("a, button"))
    ) {
      touch.current = null;
      return;
    }
    touch.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }
  function onTouchEnd(event: TouchEvent) {
    const start = touch.current;
    touch.current = null;
    if (!start || !event.changedTouches[0]) return;
    const direction = swipeDirection(
      event.changedTouches[0].clientX - start.x,
      event.changedTouches[0].clientY - start.y,
    );
    if (direction) navigate(direction);
  }
  const slide = story[position.index];
  const Scene = scenes[position.index];
  return (
    <div className="presentation" data-reduced-motion={Boolean(reduced)}>
      <header className="masthead" dir="ltr">
        <div className="brand">
          <span className="monogram" aria-hidden="true">
            mt<span>.</span>
          </span>
          <div>
            <strong>MOHAMED TOLBA</strong>
            <span>THE DATA ANALYST STORY</span>
          </div>
        </div>
        <div className="edition">
          <span className="edition-dot" />
          قصة من عالم التأمين
        </div>
      </header>
      <main
        className="story-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => {
          touch.current = null;
        }}
        aria-label="قصة محلل البيانات"
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={position.direction}
        >
          <motion.section
            className={`slide slide-${position.index + 1}`}
            key={position.index}
            custom={position.direction}
            variants={{
              enter: (direction: number) => ({
                opacity: 0,
                x: reduced ? 0 : direction * 28,
              }),
              visible: { opacity: 1, x: 0 },
              exit: (direction: number) => ({
                opacity: 0,
                x: reduced ? 0 : direction * -20,
              }),
            }}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: reduced ? 0 : 0.22 }}
            aria-labelledby={`headline-${position.index}`}
            data-slide={position.index + 1}
          >
            <div className="scene-panel">
              <div className="scene-art">
                <Scene />
              </div>
              <p className="scene-note" dir="ltr" lang="en">
                {slide.note}
              </p>
            </div>
            <div className="slide-copy" dir="rtl">
              <p className="chapter" dir="ltr" lang="en">
                <span className="chapter-line" />
                {slide.chapter}
                <span className="chapter-index">/ 0{position.index + 1}</span>
              </p>
              <p className="eyebrow">{slide.eyebrow}</p>
              <h1 id={`headline-${position.index}`}>{slide.headline}</h1>
              {position.index === 3 && (
                <p className="professional-title" dir="ltr" lang="en">
                  Data Analyst <span>|</span> Insurance Brokerage
                </p>
              )}
              <p className="supporting-copy">{slide.copy}</p>
              {position.index === 3 && (
                <a
                  className="linkedin-cta"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  lang="en"
                >
                  <span className="linkedin-icon" aria-hidden="true">
                    in
                  </span>
                  <span>Connect with me on LinkedIn</span>
                  <span className="external-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>
      <footer className="story-footer" dir="ltr">
        <nav className="navigation" aria-label="Slide navigation">
          <button
            aria-label="Previous slide"
            onClick={() => navigate(-1)}
            disabled={position.index === 0}
          >
            <Chevron left />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => navigate(1)}
            disabled={position.index === 3}
          >
            <Chevron />
          </button>
        </nav>
        <div
          className="progress"
          aria-label={`Slide ${position.index + 1} of 4`}
        >
          <span className="page-number">
            0{position.index + 1}
            <span> / 04</span>
          </span>
          <div className="progress-bars" aria-hidden="true">
            {story.map((_, i) => (
              <span key={i} className={i <= position.index ? "filled" : ""} />
            ))}
          </div>
        </div>
        <p className="navigation-hint">
          <span className="desktop-hint">
            ← → <span>حرّك الأسهم لتكمّل القصة</span>
          </span>
          <span className="mobile-hint">
            اسحب لليسار لتكمل <span>←</span>
          </span>
        </p>
      </footer>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        المشهد {position.index + 1} من 4 — {slide.chapter}
      </p>
    </div>
  );
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Presentation />
    </MotionConfig>
  );
}
