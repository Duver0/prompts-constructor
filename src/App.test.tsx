import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("should render the app with header", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Prompt Architect")).toBeInTheDocument();
    });
  });

  it("should render navigation in header", async () => {
    render(<App />);
    await waitFor(() => {
      const libraryLinks = screen.getAllByText("Library");
      expect(libraryLinks.length).toBeGreaterThan(0);
    });

    const templateLinks = screen.getAllByText("Templates");
    expect(templateLinks.length).toBeGreaterThan(0);

    const settingsLinks = screen.getAllByText("Settings");
    expect(settingsLinks.length).toBeGreaterThan(0);
  });

  it("should render the Prompt Library page by default", async () => {
    render(<App />);
    await waitFor(() => {
      const headings = screen.getAllByText("Prompt Library");
      expect(headings.length).toBeGreaterThan(0);
    });
    expect(screen.getByRole("button", { name: /new prompt/i })).toBeInTheDocument();
  });

  it("should show the empty state message", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByText(/No prompts yet/i),
      ).toBeInTheDocument();
    });
  });
});
