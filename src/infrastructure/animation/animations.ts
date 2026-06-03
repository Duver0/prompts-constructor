import { animate, type AnimationParams, type TargetsParam } from "animejs";

export type AnimationConfig = Partial<
  Pick<AnimationParams, "duration" | "easing" | "delay" | "loop">
>;

export function createFadeInAnimation(
  targets: TargetsParam,
  config: AnimationConfig = {},
) {
  return animate(targets, {
    opacity: [0, 1],
    duration: config.duration ?? 300,
    easing: config.easing ?? "easeOutCubic",
    delay: config.delay ?? 0,
    ...config,
  });
}

export function createSlideUpAnimation(
  targets: TargetsParam,
  config: AnimationConfig = {},
) {
  return animate(targets, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: config.duration ?? 350,
    easing: config.easing ?? "easeOutCubic",
    delay: config.delay ?? 0,
    ...config,
  });
}

export function createSlideDownAnimation(
  targets: TargetsParam,
  config: AnimationConfig = {},
) {
  return animate(targets, {
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: config.duration ?? 350,
    easing: config.easing ?? "easeOutCubic",
    delay: config.delay ?? 0,
    ...config,
  });
}

export function createScaleInAnimation(
  targets: TargetsParam,
  config: AnimationConfig = {},
) {
  return animate(targets, {
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: config.duration ?? 200,
    easing: config.easing ?? "easeOutCubic",
    delay: config.delay ?? 0,
    ...config,
  });
}

export function createBlockReorderAnimation(
  targets: TargetsParam,
  config: AnimationConfig = {},
) {
  return animate(targets, {
    translateY: [0, 0],
    duration: config.duration ?? 250,
    easing: config.easing ?? "easeOutQuad",
    ...config,
  });
}
