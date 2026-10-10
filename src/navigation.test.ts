import { describe, expect, it } from "vitest";
import { moveSlide, swipeDirection } from "./navigation";
describe("bounded navigation", () => {
  it("advances and returns through exactly four slides", () => {
    expect(moveSlide(0, 1)).toBe(1);
    expect(moveSlide(2, 1)).toBe(3);
    expect(moveSlide(3, -1)).toBe(2);
  });
  it("never wraps at either boundary", () => {
    expect(moveSlide(0, -1)).toBe(0);
    expect(moveSlide(3, 1)).toBe(3);
  });
});
describe("deliberate horizontal swipes", () => {
  it("advances left and returns right", () => {
    expect(swipeDirection(-100, 10)).toBe(1);
    expect(swipeDirection(90, -15)).toBe(-1);
  });
  it("ignores taps, jitter, vertical and diagonal gestures", () => {
    expect(swipeDirection(0, 0)).toBe(0);
    expect(swipeDirection(-59, 0)).toBe(0);
    expect(swipeDirection(-80, 100)).toBe(0);
    expect(swipeDirection(80, 65)).toBe(0);
  });
});
