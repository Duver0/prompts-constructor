import { render, renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";

vi.mock("@/infrastructure/animation", () => ({
  createFadeInAnimation: vi.fn(() => ({ cancel: vi.fn() })),
  createSlideUpAnimation: vi.fn(() => ({ cancel: vi.fn() })),
}));

import { useFadeIn, useSlideIn, useStaggeredSlideIn } from "../useAnimation";
import * as animationModule from "@/infrastructure/animation";

function mockFadeIn(): Mock {
  return animationModule.createFadeInAnimation as Mock;
}

function mockSlideUp(): Mock {
  return animationModule.createSlideUpAnimation as Mock;
}

describe("useFadeIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a ref object", () => {
    const { result } = renderHook(() => useFadeIn());
    expect(result.current).toHaveProperty("current");
  });

  it("should create animation when a DOM element is attached and enabled", () => {
    function TestComponent() {
      const ref = useFadeIn<HTMLDivElement>(true);
      return <div ref={ref} data-testid="target" />;
    }
    render(<TestComponent />);
    expect(mockFadeIn()).toHaveBeenCalledTimes(1);
  });

  it("should not create animation when disabled", () => {
    function TestComponent() {
      const ref = useFadeIn<HTMLDivElement>(false);
      return <div ref={ref} data-testid="target" />;
    }
    render(<TestComponent />);
    expect(mockFadeIn()).not.toHaveBeenCalled();
  });

  it("should pass duration to the animation factory", () => {
    function TestComponent() {
      const ref = useFadeIn<HTMLDivElement>(true, 800);
      return <div ref={ref} data-testid="target" />;
    }
    render(<TestComponent />);
    expect(mockFadeIn()).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { duration: 800 },
    );
  });

  it("should cancel animation on unmount", () => {
    const capturedCancels: (() => void)[] = [];

    mockFadeIn().mockImplementation(() => {
      const cancel = vi.fn();
      capturedCancels.push(cancel);
      return { cancel };
    });

    function TestComponent() {
      const ref = useFadeIn<HTMLDivElement>(true);
      return <div ref={ref} data-testid="target" />;
    }
    const { unmount } = render(<TestComponent />);
    expect(capturedCancels).toHaveLength(1);

    unmount();

    expect(capturedCancels[0]).toHaveBeenCalled();
  });
});

describe("useSlideIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a ref object", () => {
    const { result } = renderHook(() => useSlideIn());
    expect(result.current).toHaveProperty("current");
  });

  it("should create slide-up animation when attached to a DOM element", () => {
    function TestComponent() {
      const ref = useSlideIn<HTMLDivElement>(true);
      return <div ref={ref} data-testid="target" />;
    }
    render(<TestComponent />);
    expect(mockSlideUp()).toHaveBeenCalledTimes(1);
  });

  it("should not create animation when disabled", () => {
    function TestComponent() {
      const ref = useSlideIn<HTMLDivElement>(false);
      return <div ref={ref} data-testid="target" />;
    }
    render(<TestComponent />);
    expect(mockSlideUp()).not.toHaveBeenCalled();
  });

  it("should pass delay to the animation factory", () => {
    function TestComponent() {
      const ref = useSlideIn<HTMLDivElement>(true, 150);
      return <div ref={ref} data-testid="target" />;
    }
    render(<TestComponent />);
    expect(mockSlideUp()).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { delay: 150 },
    );
  });

  it("should cancel animation on unmount", () => {
    const capturedCancels: (() => void)[] = [];

    mockSlideUp().mockImplementation(() => {
      const cancel = vi.fn();
      capturedCancels.push(cancel);
      return { cancel };
    });

    function TestComponent() {
      const ref = useSlideIn<HTMLDivElement>(true);
      return <div ref={ref} data-testid="target" />;
    }
    const { unmount } = render(<TestComponent />);
    expect(capturedCancels).toHaveLength(1);

    unmount();

    expect(capturedCancels[0]).toHaveBeenCalled();
  });
});

describe("useStaggeredSlideIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return an empty array ref initially", () => {
    const { result } = renderHook(() => useStaggeredSlideIn(3));
    expect(Array.isArray(result.current.current)).toBe(true);
    expect(result.current.current).toHaveLength(0);
  });

  it("should create staggered animations for populated refs", () => {
    function TestComponent({ count }: { count: number }) {
      const refs = useStaggeredSlideIn<HTMLDivElement>(count);
      return (
        <div>
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              data-testid={`item-${String(i)}`}
            />
          ))}
        </div>
      );
    }
    render(<TestComponent count={3} />);

    expect(mockSlideUp()).toHaveBeenCalledTimes(3);
    expect(mockSlideUp()).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { delay: 0 },
    );
    expect(mockSlideUp()).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { delay: 50 },
    );
    expect(mockSlideUp()).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { delay: 100 },
    );
  });

  it("should cancel all animations on unmount", () => {
    const capturedCancels: (() => void)[] = [];

    mockSlideUp().mockImplementation(() => {
      const cancel = vi.fn();
      capturedCancels.push(cancel);
      return { cancel };
    });

    function TestComponent() {
      const refs = useStaggeredSlideIn<HTMLDivElement>(2);
      return (
        <div>
          {Array.from({ length: 2 }, (_, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
            />
          ))}
        </div>
      );
    }
    const { unmount } = render(<TestComponent />);

    expect(capturedCancels).toHaveLength(2);

    unmount();

    for (const cancel of capturedCancels) {
      expect(cancel).toHaveBeenCalled();
    }
  });
});
