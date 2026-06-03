import { useEffect, useRef, type RefObject } from "react";
import { createFadeInAnimation, createSlideUpAnimation } from "@/infrastructure/animation";

/**
 * Animates an element with a fade-in effect when it mounts.
 */
export function useFadeIn<T extends HTMLElement>(
  enabled = true,
  duration?: number,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const animation = createFadeInAnimation(ref.current, { duration });
    return () => { animation.cancel(); };
  }, [enabled, duration]);

  return ref;
}

/**
 * Animates an element with a slide-up + fade-in effect when it mounts.
 */
export function useSlideIn<T extends HTMLElement>(
  enabled = true,
  delay = 0,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const animation = createSlideUpAnimation(ref.current, { delay });
    return () => { animation.cancel(); };
  }, [enabled, delay]);

  return ref;
}

/**
 * Staggered slide-in animation for a list of elements.
 * Each child gets an incremental delay based on its index.
 */
export function useStaggeredSlideIn<T extends HTMLElement>(
  count: number,
  baseDelay = 50,
): RefObject<(T | null)[]> {
  const refs = useRef<(T | null)[]>([]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as T[];
    const animations = elements.map((el, i) =>
      createSlideUpAnimation(el, { delay: i * baseDelay }),
    );
    return () => { animations.forEach((a) => { a.cancel(); }); };
  }, [count, baseDelay]);

  // Reset refs array when count changes
  useEffect(() => {
    refs.current = refs.current.slice(0, count);
  }, [count]);

  return refs;
}
