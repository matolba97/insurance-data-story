import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
const headlines = [
  "كل قرار وراه",
  "أنا بحوّل البيانات",
  "بس شغلي مش بيقف",
  "Mohamed Tolba.",
];
async function currentSlide(page: Page, index: number) {
  await expect(page.locator(`[data-slide="${index}"]`)).toBeVisible();
  await expect(page.locator("h1")).toContainText(headlines[index - 1]);
}
async function advance(page: Page) {
  await page.getByRole("button", { name: "Next slide", exact: true }).click();
  // The 420ms cooldown deliberately prevents accidental double navigation.
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

test("four scenes, bounds, CTA, readable layout and screenshots", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.getByRole("button", { name: "Previous slide" }),
  ).toBeDisabled();
  for (let i = 1; i <= 4; i++) {
    await currentSlide(page, i);
    await expect(page.locator(".progress")).toHaveAttribute(
      "aria-label",
      `Slide ${i} of 4`,
    );
    const layout = await page.evaluate(() => {
      const main = document.querySelector("main")!.getBoundingClientRect();
      const footer = document.querySelector("footer")!.getBoundingClientRect();
      const content = Array.from(
        document.querySelectorAll(
          "h1, .supporting-copy, .scene-svg, .linkedin-cta",
        ),
      );
      return {
        overflowX: document.documentElement.scrollWidth > innerWidth,
        overflowY: document.documentElement.scrollHeight > innerHeight,
        clipped: content
          .map((el) => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              top: r.top,
              bottom: r.bottom,
              right: r.right,
              left: r.left,
            };
          })
          .filter(
            (r) =>
              r.top < main.top - 1 ||
              r.bottom > footer.top + 1 ||
              r.left < 0 ||
              r.right > innerWidth + 1,
          ),
      };
    });
    expect(layout, JSON.stringify(layout)).toEqual({
      overflowX: false,
      overflowY: false,
      clipped: [],
    });
    await page.screenshot({
      path: `test-results/screenshots/${testInfo.project.name}-slide-${i}.png`,
      fullPage: true,
    });
    if (i < 4) await advance(page);
  }
  const cta = page.getByRole("link", { name: /Connect with me on LinkedIn/ });
  await expect(cta).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/mohamed-tolba-72499214a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  );
  await expect(cta).toHaveAttribute("target", "_blank");
  await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  await cta.focus();
  await page.keyboard.press("ArrowLeft");
  await currentSlide(page, 4);
  await expect(
    page.getByRole("button", { name: "Next slide", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Previous slide" }).click();
  await currentSlide(page, 3);
  expect(errors).toEqual([]);
});

test("keyboard navigation, no autoplay, and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await currentSlide(page, 1);
  await page.waitForTimeout(700);
  await currentSlide(page, 1);
  await page.keyboard.press("ArrowRight");
  await currentSlide(page, 2);
  await page.waitForTimeout(450);
  await page.keyboard.press("ArrowLeft");
  await currentSlide(page, 1);
  await expect(page.locator(".presentation")).toHaveAttribute(
    "data-reduced-motion",
    "true",
  );
  const before = await page.locator(".character").innerHTML();
  await page.waitForTimeout(600);
  expect(await page.locator(".character").innerHTML()).toBe(before);
  await page.getByRole("button", { name: "Next slide", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await currentSlide(page, 2);
  await page.waitForTimeout(450);
  await page.keyboard.press("Enter");
  await currentSlide(page, 3);
});

test("touch navigation ignores taps and vertical gestures", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "desktop",
    "Touchscreen coverage on mobile projects",
  );
  await page.goto("./");
  await currentSlide(page, 1);
  const w = page.viewportSize()!.width;
  const y = page.viewportSize()!.height * 0.55;
  await touchSwipe(page, { x: w * 0.8, y }, { x: w * 0.2, y: y + 7 });
  await currentSlide(page, 2);
  await touchSwipe(page, { x: w * 0.3, y }, { x: w * 0.3 + 8, y: y - 100 });
  await currentSlide(page, 2);
  await touchSwipe(page, { x: w * 0.3, y }, { x: w * 0.3 + 15, y: y + 4 });
  await currentSlide(page, 2);
  await touchSwipe(page, { x: w * 0.2, y }, { x: w * 0.8, y });
  await currentSlide(page, 1);
});

test("motion resolves to the workflow repair without advancing slides", async ({
  page,
}) => {
  await page.goto("./");
  await advance(page);
  await advance(page);
  await currentSlide(page, 3);
  await page.waitForTimeout(3700);
  await currentSlide(page, 3);
  await expect(page.getByRole("img")).toHaveAccessibleName(/يعيد ربطه/);
  const visiblePaths = await page
    .locator(".scene-svg path")
    .evaluateAll(
      (paths) =>
        paths.filter(
          (el) =>
            getComputedStyle(el).stroke.includes("36, 115, 103") &&
            getComputedStyle(el).opacity === "1",
        ).length,
    );
  expect(visiblePaths).toBeGreaterThan(2);
});
