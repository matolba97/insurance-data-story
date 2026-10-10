import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { ComponentType, TouchEvent } from "react";
import { moveSlide, swipeDirection } from "./navigation";
import { LINKEDIN_URL, story } from "./story";
import type { SlideId } from "./story";
import { readLanguage, saveLanguage, translations } from "./localization";
import type { SceneProps } from "./localization";
import ResponsibilitiesScene from "./scenes/ResponsibilitiesScene";
import ProblemScene from "./scenes/ProblemScene";
import InsightScene from "./scenes/InsightScene";
import WorkflowScene from "./scenes/WorkflowScene";
import HelloScene from "./scenes/HelloScene";

const scenes: Record<SlideId, ComponentType<SceneProps>> = {
  problem: ProblemScene,
  insight: InsightScene,
  workflow: WorkflowScene,
  responsibilities: ResponsibilitiesScene,
  hello: HelloScene,
};
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
  const [language, setLanguage] = useState(readLanguage);
  const text = translations[language];
  const direction = language === "ar" ? "rtl" : "ltr";
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.title = text.title;
    for (const [selector, content] of [
      ['meta[name="description"]', text.description],
      ['meta[property="og:title"]', text.title],
      ['meta[property="og:description"]', text.description],
      ['meta[property="og:locale"]', language === "ar" ? "ar_EG" : "en_US"],
    ])
      document.querySelector(selector)?.setAttribute("content", content);
    saveLanguage(language);
  }, [language, direction, text]);
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
        event.target.closest(
          "a, input, textarea, select, [contenteditable], [data-language-control]",
        )
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
  const entry = story[position.index];
  const slide = entry[language];
  const Scene = scenes[entry.id];
  const closing = entry.id === "hello";
  return (
    <div
      className="presentation"
      data-reduced-motion={Boolean(reduced)}
      lang={language}
      dir={direction}
    >
      <header className="masthead" dir="ltr">
        <div className="brand">
          <span className="monogram" aria-hidden="true">
            mt<span>.</span>
          </span>
          <div>
            <strong lang="en">MOHAMED TOLBA</strong>
            <span lang={language}>{text.brand}</span>
          </div>
        </div>
        <div className="masthead-tools">
          <div className="edition" dir={direction}>
            <span className="edition-dot" />
            {text.edition}
          </div>
          <div
            className="language-control"
            data-language-control
            role="group"
            aria-label={text.languageControl}
          >
            <button
              type="button"
              lang={language}
              aria-label={text.ar}
              aria-pressed={language === "ar"}
              onClick={() => setLanguage("ar")}
            >
              AR
            </button>
            <span aria-hidden="true">|</span>
            <button
              type="button"
              lang={language}
              aria-label={text.en}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </header>
      <main
        className="story-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => {
          touch.current = null;
        }}
        aria-label={text.presentation}
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={position.direction}
        >
          <motion.section
            className={`slide slide-${entry.id}`}
            key={entry.id}
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
            data-scene={entry.id}
          >
            <div className="scene-panel">
              <div className="scene-art">
                <Scene language={language} />
              </div>
              <p className="scene-note" dir={direction} lang={language}>
                {slide.note}
              </p>
            </div>
            <div className="slide-copy" dir={direction}>
              <p className="chapter" dir={direction} lang={language}>
                <span className="chapter-line" />
                {slide.chapter}
                <span className="chapter-index">/ 0{position.index + 1}</span>
              </p>
              <p className="eyebrow">{slide.eyebrow}</p>
              <h1 id={`headline-${position.index}`}>{slide.headline}</h1>
              {closing && (
                <p
                  className="professional-title"
                  dir={direction}
                  lang={language}
                >
                  {text.professionalTitle}
                </p>
              )}
              <p className="supporting-copy">{slide.copy}</p>
              {slide.responsibilities && (
                <ol className="responsibility-list">
                  {slide.responsibilities.map((group, i) => (
                    <motion.li
                      key={i}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: reduced ? 0 : 0.15 + i * 0.2,
                      }}
                    >
                      <span
                        className="responsibility-number"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <h2>
                          <bdi lang="en">{group.title}</bdi>
                        </h2>
                        <p>{group.copy}</p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              )}
              {closing && (
                <a
                  className="linkedin-cta"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir={direction}
                  lang={language}
                >
                  <span className="linkedin-icon" aria-hidden="true">
                    in
                  </span>
                  <span>{text.cta}</span>
                  <span className="external-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only">{text.newTab}</span>
                </a>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>
      <footer className="story-footer" dir="ltr">
        <nav className="navigation" aria-label={text.navigation}>
          <button
            data-navigation="previous"
            aria-label={text.previous}
            onClick={() => navigate(-1)}
            disabled={position.index === 0}
          >
            <Chevron left />
          </button>
          <button
            data-navigation="next"
            aria-label={text.next}
            onClick={() => navigate(1)}
            disabled={position.index === story.length - 1}
          >
            <Chevron />
          </button>
        </nav>
        <div
          className="progress"
          aria-label={`${text.slide} ${position.index + 1} ${text.of} ${story.length}`}
        >
          <span className="page-number">
            0{position.index + 1}
            <span> / {String(story.length).padStart(2, "0")}</span>
          </span>
          <div className="progress-bars" aria-hidden="true">
            {story.map((_, i) => (
              <span key={i} className={i <= position.index ? "filled" : ""} />
            ))}
          </div>
        </div>
        <p className="navigation-hint">
          <span className="desktop-hint">
            ← → <span>{text.desktopHint}</span>
          </span>
          <span className="mobile-hint">
            {text.mobileHint} <span>←</span>
          </span>
        </p>
      </footer>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {text.slide} {position.index + 1} {text.of} {story.length} —{" "}
        {slide.chapter}
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
