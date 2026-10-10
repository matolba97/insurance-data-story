import { describe, expect, it } from "vitest";
import { readLanguage, saveLanguage, LANGUAGE_KEY } from "./localization";
import { story } from "./story";
import { moveSlide } from "./navigation";
describe("language preferences", () => {
  it("defaults to Arabic for missing or unsupported preferences", () => {
    for (const value of [null, "fr", "", "EN"])
      expect(readLanguage({ getItem: () => value })).toBe("ar");
  });
  it("restores English and stores the selected language", () => {
    expect(readLanguage({ getItem: () => "en" })).toBe("en");
    let stored = "";
    saveLanguage("en", {
      setItem: (key, value) => {
        expect(key).toBe(LANGUAGE_KEY);
        stored = value;
      },
    });
    expect(stored).toBe("en");
  });
  it("remains usable when browser storage is unavailable", () => {
    expect(
      readLanguage({
        getItem: () => {
          throw new Error("blocked");
        },
      }),
    ).toBe("ar");
    expect(() =>
      saveLanguage("en", {
        setItem: () => {
          throw new Error("blocked");
        },
      }),
    ).not.toThrow();
  });
});
describe("five-slide bilingual story", () => {
  it("inserts responsibilities before the closing slide", () => {
    expect(story.map((slide) => slide.id)).toEqual([
      "problem",
      "insight",
      "workflow",
      "responsibilities",
      "hello",
    ]);
    expect(moveSlide(3, 1)).toBe(4);
    expect(moveSlide(4, 1)).toBe(4);
    expect(moveSlide(4, -1)).toBe(3);
  });
  it("provides both languages and exactly four responsibility groups", () => {
    for (const slide of story)
      for (const language of ["ar", "en"] as const) {
        expect(slide[language].eyebrow).toBeTruthy();
        expect(slide[language].note).toBeTruthy();
      }
    for (const language of ["ar", "en"] as const)
      expect(story[3][language].responsibilities).toHaveLength(4);
  });
});
