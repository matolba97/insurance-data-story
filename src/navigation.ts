import { story } from "./story";
export const SLIDE_COUNT = story.length;
export function moveSlide(current: number, direction: -1 | 1): number {
  return Math.max(0, Math.min(SLIDE_COUNT - 1, current + direction));
}
export function swipeDirection(dx: number, dy: number): -1 | 0 | 1 {
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return 0;
  return dx < 0 ? 1 : -1;
}
