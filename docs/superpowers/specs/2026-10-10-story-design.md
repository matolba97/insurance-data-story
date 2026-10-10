# The Data Analyst Story — design

The supplied master prompt is the approved specification. The user explicitly requests autonomous implementation without design approval pauses. Publication account was subsequently changed from itaxii to matolba97.

## Reference review
Read Hantira's React/Vite architecture, StickCharacter, SVG primitives, SceneVisual, PresentRoute and global styles. Strong techniques: consistent proportions and expressions, charcoal line art on paper, staged motion that reveals meaning, spacious typography, and shared illustration primitives. Original project remains untouched; no source or branded assets are copied. Its participation, presenter controls, audio, Supabase, and routing are excluded.

## Chosen implementation
Four full-viewport scenes with warm ivory paper, charcoal strokes, muted teal, Arabic Noto Sans Arabic and Latin Manrope. Editorial two-column desktop composition; stacked mobile composition. One original expressive stickman appears in all scenes. Data records surround the confused character; records resolve into a dashboard; a departmental workflow is repaired; the character waves beside a personal introduction.

Central storyline data, one slide container, reusable navigation logic, and separate SVG scene components. Motion handles entrances, transformations, expressions and transitions. Reduced motion renders the final explanatory state immediately with no looping or transform effects.

## Interaction contracts
No slide autoplay. Left swipe and right arrow advance; right swipe and left arrow go back. Direction is consistent with visual left/right controls, documented in UI hints. Bounds clamp at first and last slides. Swipe must exceed 60px and be predominantly horizontal; vertical gestures remain available. Arrow keys continue navigating when a navigation button has focus; native Enter/Space activate buttons normally. Keyboard events on links/editable fields and modified keys are not hijacked. Buttons remain stable while slides transition. Current slide is announced accessibly, scene has a descriptive Arabic label, English fragments use bdi.

## Verification and release
Unit tests for navigation bounds and gesture discrimination; browser tests for all scenes, controls, keyboard, actual touch gestures, CTA, overflow, reduced motion, and desktop/Android/small mobile/short landscape sizes. Inspect rendered screenshots before deployment. Production typecheck, ESLint, Vitest and build required. GitHub Pages base is /insurance-data-story/. Public repository and official Actions deployment under matolba97; verify workflow and live assets and navigation.
