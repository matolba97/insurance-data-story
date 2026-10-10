import process from "node:process";
import { chromium } from "@playwright/test";
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
    : {},
);
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  reducedMotion: "reduce",
});
await page.goto(
  process.env.SITE_URL || "http://127.0.0.1:4173/insurance-data-story/",
);
while (await page.locator('[data-navigation="next"]').isEnabled()) {
  await page.locator('[data-navigation="next"]').click();
  await page.waitForTimeout(450);
}
await page.waitForSelector('[data-scene="hello"]');
await page.evaluate("document.fonts.ready");
await page.addStyleTag({
  content: `
.presentation{height:630px;min-height:630px;padding:34px 64px;grid-template-rows:1fr}
.masthead,.story-footer,.linkedin-cta{display:none}.slide{padding:0;gap:48px;grid-template-columns:1.08fr 1fr}
.slide-hello h1{font-size:58px;line-height:1.5;margin-bottom:20px}.supporting-copy{font-size:18px}.professional-title{font-size:13px;margin-bottom:24px}
.chapter{font-size:12px;margin-bottom:30px}.scene-art{max-width:560px}.scene-note{font-size:10px}
`,
});
await page.screenshot({ path: "public/social-card.png" });
await browser.close();
