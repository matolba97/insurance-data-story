# The Data Analyst Story

A short, animated Arabic story introducing **Mohamed Tolba — Data Analyst | Insurance Brokerage**. Five original stickman scenes explain how scattered insurance records become reliable insights, how analysis supports better workflows, and who to connect with.

[Visit the story](https://matolba97.github.io/insurance-data-story/) · [Connect with Mohamed on LinkedIn](https://www.linkedin.com/in/mohamed-tolba-72499214a)

## The five scenes

1. **The problem:** scattered policies, premiums, renewals, commissions and pending requests.
2. **Making sense:** preparation and validation turn raw data into meaningful KPIs and illustrative dashboards.
3. **Beyond dashboards:** understanding business problems, reconnecting workflows and supporting automation.
4. **My responsibilities:** four connected areas — Data & Reporting, Business Insights, Processes & Systems, and Automation & Delivery.
5. **Hello, I’m Mohamed:** a personal introduction and LinkedIn connection.

The charts are illustrations, with no operational data or claimed achievements. The presentation remains short and advances at the visitor’s pace.

## Navigation, languages and accessibility

The compact **AR | EN** control in the masthead translates all five slides, scene labels and descriptions, hints, controls, announcements and page metadata. Arabic is the default on a fresh visit; English uses LTR and Arabic uses RTL. The selected language is remembered with localStorage when available. Switching language preserves the current slide and illustration without reloading or restarting its entrance animation. Storage restrictions do not prevent switching during the current visit.

Swipe left to advance and right to go back. On desktop, use the right arrow to advance and left arrow to go back, or use the labelled previous/next buttons. There is no slide autoplay. Vertical gestures are preserved; short and diagonal gestures do not change slides. Controls are keyboard accessible, English fragments use bidirectional isolation, illustrations have Arabic descriptions, and the current slide is announced to assistive technology. Reduced-motion preferences show the completed illustrations immediately.

## Local development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the displayed `/insurance-data-story/` URL.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`npm run validate` runs lint, unit tests and the production build. To run browser tests:

```sh
npx playwright install chromium
npm run test:e2e
```

Browser tests build and serve the production application. Tests cover 1440×900 desktop, 393×851 Android, 320×568 small mobile, and 740×360 landscape. They verify all five scenes in both languages, all four responsibility groups, language persistence and storage fallback, translated metadata/accessibility, unchanged scene identities, motion continuity, layout bounds, controls, keyboard, actual touch gestures, reduced motion and the final link. Screenshots are saved to `test-results/screenshots/`. An installed Chromium can be used through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if needed.

## Architecture

- `src/story.tsx`: the canonical five-slide order, typed Arabic/English story copy, four responsibility groups and profile link.
- `src/localization.ts`: typed interface/illustration translations and safe language preference persistence.
- `src/App.tsx`: presentation container, slide transitions and accessible navigation.
- `src/navigation.ts`: bounded slide movement and horizontal swipe discrimination.
- `src/scenes/`: five separate SVG scenes, original shared character and illustration helpers.
- `src/styles.css` and `src/fonts.css`: responsive layout and self-hosted Arabic/Latin fonts.
- `public/`: favicon and social preview.
- `tests/story.spec.ts`: browser interaction and visual-layout checks.

Built with React, TypeScript, Vite, Motion and SVG. No backend, database, accounts, forms, audio, runtime API calls or secrets. Only slide navigation and the LinkedIn connection link are interactive.

## Deployment

The separate public repository is `matolba97/insurance-data-story`, following the project owner’s selected publishing account. Vite uses `/insurance-data-story/` as its base path. GitHub Pages must use **GitHub Actions** as its source.

The deployment workflow runs on `main` pushes or manual dispatch. It installs with `npm ci`, validates, builds, runs the responsive browser suite, uploads `dist`, and deploys through official GitHub Pages actions. Deployment status is available in the repository’s Actions tab.

To refresh the social preview while the local development server is running on port 4173:

```sh
node scripts/generate-social-card.mjs
```

## Creative reference and assets

[Hantira Insurance Experience](https://github.com/itaxii/hantira-insurance-experience) was reviewed for its consistent character proportions, expressions, staged motion, line art and editorial presentation. All character/scene geometry and personal visual identity in this project were created independently. No Contact Insurance Brokerage branding, business assets or reference source code are copied. The reference repository is unchanged.

Noto Sans Arabic and Manrope are self-hosted through Fontsource, under the SIL Open Font License. Font license notices are included in `public/licenses/`.
