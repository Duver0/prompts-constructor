import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import { useClickOutside } from "../useClickOutside";

describe("useClickOutside", () => {
  it("should call the handler when clicking outside the element", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    render(<TestComponent />);

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should NOT call the handler when clicking inside the element", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return (
        <div ref={ref} data-testid="inside">
          Inside
        </div>
      );
    }

    render(<TestComponent />);

    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("should NOT call the handler when disabled", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler, false);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    render(<TestComponent />);

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("should handle touch events", () => {
    const handler = vi.fn();

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </div>
      );
    }

    render(<TestComponent />);

    fireEvent.touchStart(screen.getByTestId("outside"));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
