import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("should not update the debounced value before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 300 } },
    );

    expect(result.current).toBe("first");

    // Update value
    rerender({ value: "second", delay: 300 });

    // Before the timeout, value should still be "first"
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("first");
  });

  it("should update the debounced value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 300 } },
    );

    rerender({ value: "second", delay: 300 });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("second");
  });

  it("should reset the timer when the value changes again before expiry", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 300 } },
    );

    rerender({ value: "second", delay: 300 });

    // Partially advance, then change value again
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: "third", delay: 300 });

    // Full delay from the last change
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("third");
  });

  it("should work with numeric values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 500 } },
    );

    rerender({ value: 42, delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(42);
  });
});
