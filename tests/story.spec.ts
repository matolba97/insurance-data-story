import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
const ids = ["problem", "insight", "workflow", "responsibilities", "hello"];
const headlines = {
  ar: [
    "كل قرار وراه",
    "أنا بحوّل البيانات",
    "بس شغلي مش بيقف",
    "شغلي في",
    "Mohamed Tolba.",
  ],
  en: [
    "Behind Every Decision,",
    "I Turn Data into",
    "My Work Goes",
    "What I Do.",
    "I'm Mohamed Tolba.",
  ],
};
type Language = "ar" | "en";
async function currentSlide(
  page: Page,
  index: number,
  language: Language = "ar",
) {
  await expect(page.locator(`[data-slide="${index}"]`)).toBeVisible();
  await expect(page.locator("h1")).toContainText(
    headlines[language][index - 1],
  );
  await expect(page.locator(".slide")).toHaveAttribute(
    "data-scene",
    ids[index - 1],
  );
}
async function setLanguage(page: Page, language: Language) {
  await page
    .locator(".language-control")
    .getByText(language.toUpperCase(), { exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("lang", language);
  await expect(page.locator("html")).toHaveAttribute(
    "dir",
    language === "ar" ? "rtl" : "ltr",
  );
}
async function advance(page: Page) {
  await page.locator('[data-navigation="next"]').click();
  await page.waitForTimeout(450);
}
async function touchSwipe(
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [from],
  });
  for (let i = 1; i <= 6; i++) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        {
          x: from.x + ((to.x - from.x) * i) / 6,
          y: from.y + ((to.y - from.y) * i) / 6,
        },
      ],
    });
    await page.waitForTimeout(25);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await cdp.detach();
  await page.waitForTimeout(500);
}
for (const language of ["ar", "en"] as const) {
  test(`${language}: five scenes, translated content, bounds, CTA and screenshots`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    if (language === "en") await setLanguage(page, "en");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('[data-navigation="previous"]')).toBeDisabled();
    for (let i = 1; i <= 5; i++) {
      await currentSlide(page, i, language);
      await expect(page.locator(".progress")).toHaveAttribute(
        "aria-label",
        language === "ar" ? `المشهد ${i} من 5` : `Slide ${i} of 5`,
      );
      await expect(page.locator(".page-number")).toContainText(`0${i}`);
      await expect(page.locator(".page-number")).toContainText("/ 05");
      await expect(page.locator(".progress-bars>span")).toHaveCount(5);
      if (language === "en") {
        expect(await page.locator(".presentation").textContent()).not.toMatch(
          /[\u0600-\u06ff]/,
        );
        expect(
          await page.getByRole("img").getAttribute("aria-label"),
        ).not.toMatch(/[\u0600-\u06ff]/);
      }
      await expect(page.locator(".linkedin-cta")).toHaveCount(i === 5 ? 1 : 0);
      if (i === 4) {
        await expect(page.locator(".responsibility-list li")).toHaveCount(4);
        for (const title of [
          "Data & Reporting",
          "Business Insights",
          "Processes & Systems",
          "Automation & Delivery",
        ])
          await expect(
            page.getByRole("heading", { level: 2, name: title }),
          ).toBeVisible();
      }
      const layout = await page.evaluate(() => {
        const main = document.querySelector("main")!.getBoundingClientRect(),
          footer = document.querySelector("footer")!.getBoundingClientRect();
        const els = Array.from(
          document.querySelectorAll(
            "h1,.eyebrow,.supporting-copy,.scene-svg,.linkedin-cta,.responsibility-list li,.language-control",
          ),
        );
        return {
          overflowX: document.documentElement.scrollWidth > innerWidth,
          overflowY: document.documentElement.scrollHeight > innerHeight,
          clipped: els
            .map((el) => {
              const r = el.getBoundingClientRect();
              return {
                tag: el.className,
                left: r.left,
                right: r.right,
                top: r.top,
                bottom: r.bottom,
                header: el.classList.contains("language-control"),
              };
            })
            .filter(
              (r) =>
                r.left < 0 ||
                r.right > innerWidth + 1 ||
                (!r.header &&
                  (r.top < main.top - 1 || r.bottom > footer.top + 1)),
            ),
        };
      });
      expect(layout, JSON.stringify(layout)).toEqual({
        overflowX: false,
        overflowY: false,
        clipped: [],
      });
      await page.screenshot({
        path: `test-results/screenshots/${testInfo.project.name}-${language}-slide-${i}.png`,
        fullPage: true,
      });
      // Switching in every scene translates it without replacing its illustration or resetting position.
      await page
        .locator(".scene-svg")
        .evaluate((el) => el.setAttribute("data-identity-check", "preserved"));
      await setLanguage(page, language === "ar" ? "en" : "ar");
      await expect(page.locator(".scene-svg")).toHaveAttribute(
        "data-identity-check",
        "preserved",
      );
      await currentSlide(page, i, language === "ar" ? "en" : "ar");
      await setLanguage(page, language);
      await currentSlide(page, i, language);
      if (i < 5) await advance(page);
    }
    const cta = page.locator(".linkedin-cta");
    await expect(cta).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/mohamed-tolba-72499214a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    );
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.locator('[data-navigation="next"]')).toBeDisabled();
    await page.locator('[data-navigation="previous"]').click();
    await currentSlide(page, 4, language);
    expect(errors).toEqual([]);
  });
  test(`${language}: keyboard, language control isolation and reduced motion`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    if (language === "en") await setLanguage(page, "en");
    await page.locator("main").click({ position: { x: 5, y: 5 } });
    await page.keyboard.press("ArrowRight");
    await currentSlide(page, 2, language);
    await page.waitForTimeout(450);
    await page.keyboard.press("ArrowLeft");
    await currentSlide(page, 1, language);
    await page.locator(".language-control button").first().focus();
    await page.keyboard.press("ArrowRight");
    await currentSlide(page, 1, language);
    await page.waitForTimeout(450);
    await page.locator('[data-navigation="next"]').focus();
    await page.keyboard.press("ArrowRight");
    await currentSlide(page, 2, language);
    const before = await page.locator(".character").innerHTML();
    await page.waitForTimeout(650);
    expect(await page.locator(".character").innerHTML()).toBe(before);
    await page.keyboard.press("Enter");
    await currentSlide(page, 3, language);
    await expect(page.locator(".presentation")).toHaveAttribute(
      "data-reduced-motion",
      "true",
    );
  });
  test(`${language}: actual touch swipes preserve vertical gestures`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "desktop",
      "Touchscreen coverage on mobile",
    );
    await page.goto("./");
    if (language === "en") await setLanguage(page, "en");
    const w = page.viewportSize()!.width,
      y = page.viewportSize()!.height * 0.6;
    await touchSwipe(page, { x: w * 0.8, y }, { x: w * 0.2, y: y + 7 });
    await currentSlide(page, 2, language);
    await touchSwipe(page, { x: w * 0.3, y }, { x: w * 0.3 + 8, y: y - 90 });
    await currentSlide(page, 2, language);
    await touchSwipe(page, { x: w * 0.3, y }, { x: w * 0.3 + 15, y: y + 4 });
    await currentSlide(page, 2, language);
    await touchSwipe(page, { x: w * 0.2, y }, { x: w * 0.8, y });
    await currentSlide(page, 1, language);
  });
}
test("language persistence, metadata, descriptions and optional storage", async ({
  page,
}) => {
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await advance(page);
  await advance(page);
  await advance(page);
  await currentSlide(page, 4);
  await setLanguage(page, "en");
  await currentSlide(page, 4, "en");
  await expect(page.locator(".edition")).toHaveText(
    "A story from insurance brokerage",
  );
  await expect(page.locator("main")).toHaveAttribute(
    "aria-label",
    "The data analyst story",
  );
  await expect(page.getByRole("img")).toHaveAccessibleName(
    /four connected responsibilities/,
  );
  await expect(
    page.locator('[data-navigation="previous"]'),
  ).toHaveAccessibleName("Previous slide");
  await expect(page).toHaveTitle("Mohamed Tolba | The Data Analyst Story");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Five illustrated scenes/,
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await currentSlide(page, 1, "en");
  await setLanguage(page, "ar");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await currentSlide(page, 1);
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    }),
  );
  await page.reload();
  await currentSlide(page, 1);
  await setLanguage(page, "en");
  await currentSlide(page, 1, "en");
});
test("switching language does not restart a completed scene animation", async ({
  page,
}) => {
  await page.goto("./");
  await advance(page);
  await advance(page);
  await advance(page);
  await currentSlide(page, 4);
  await page.waitForTimeout(2100);
  await page
    .locator(".character")
    .evaluate((el) => el.setAttribute("data-motion-check", "stable"));
  const characterBefore = await page
    .locator(".character")
    .evaluate((el) =>
      Array.from(el.querySelectorAll("path,g")).map((node) => ({
        path: node.getAttribute("d"),
        transform: getComputedStyle(node).transform,
        opacity: getComputedStyle(node).opacity,
      })),
    );
  await setLanguage(page, "en");
  await currentSlide(page, 4, "en");
  await expect(page.locator(".character")).toHaveAttribute(
    "data-motion-check",
    "stable",
  );
  expect(
    await page
      .locator(".character")
      .evaluate((el) =>
        Array.from(el.querySelectorAll("path,g")).map((node) => ({
          path: node.getAttribute("d"),
          transform: getComputedStyle(node).transform,
          opacity: getComputedStyle(node).opacity,
        })),
      ),
  ).toEqual(characterBefore);
  const opacity = await page
    .locator(".scene-svg>g")
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
  expect(opacity.every((value) => value === "1")).toBe(true);
  await page.waitForTimeout(700);
  await currentSlide(page, 4, "en");
});
