import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Projects from "@/components/Projects";
import { LanguageProvider } from "@/context/LanguageContext";
import '@testing-library/jest-dom';

global.fetch = jest.fn();

const mockProjects = [
  { id: "1", title: "Django", content: "<p>Project content</p>" },
  { id: "2", title: "Laravel", content: "<p>Project content</p>" },
];

describe("Projects component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("shows loading skeleton initially", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });

    const { container } = render(
      <LanguageProvider>
        <Projects lang="en" />
      </LanguageProvider>
    );

    // Check for skeleton loader
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();

    // Wait for fetch to complete and skeleton to disappear
    await waitFor(() => {
      expect(container.querySelector(".animate-pulse")).not.toBeInTheDocument();
    });
  });

  it("renders project cards after successful fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });

    render(
      <LanguageProvider>
        <Projects lang="en" />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Django")).toBeInTheDocument();
      expect(screen.getByText("Laravel")).toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(
      <LanguageProvider>
        <Projects lang="en" />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading projects/i)).toBeInTheDocument();
    });
  });

  it("handles empty projects array gracefully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(
      <LanguageProvider>
        <Projects lang="en" />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });
  });
});
