import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PromptLibraryPage from "../index";

describe("PromptLibraryPage", () => {
  it("should render the page title", () => {
    render(
      <MemoryRouter>
        <PromptLibraryPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Prompt Library")).toBeInTheDocument();
  });

  it("should show empty state message", () => {
    render(
      <MemoryRouter>
        <PromptLibraryPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/No prompts yet/i),
    ).toBeInTheDocument();
  });

  it("should have a create new prompt button", () => {
    render(
      <MemoryRouter>
        <PromptLibraryPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: /new prompt/i }),
    ).toBeInTheDocument();
  });
});
