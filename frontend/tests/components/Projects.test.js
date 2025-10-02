import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import Projects from "@/components/Projects";
import '@testing-library/jest-dom';

// Mock global fetch to simulate API calls
global.fetch = jest.fn();

const mockProjects = [
  { id: "1", title: "Django", content: "<p>Project content</p>" },
  { id: "2", title: "Laravel", content: "<p>Project content</p>" },
];

describe("Projects component", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock history before each test
  });

  it("renders project cards after successful fetch", async () => {
    // Simulate successful fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });

    // Wrap in act to handle state updates correctly
    await act(async () => {
      render(<Projects lang="en" />);
    });

    // Wait for projects to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText("Django")).toBeInTheDocument();
      expect(screen.getByText("Laravel")).toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    // Simulate fetch failure (ok: false)
    fetch.mockResolvedValueOnce({ ok: false });

    await act(async () => {
      render(<Projects lang="en" />);
    });

    // Check that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/error loading projects/i)).toBeInTheDocument();
    });
  });

  it("handles empty projects array gracefully", async () => {
    // Simulate fetch returning empty array
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await act(async () => {
      render(<Projects lang="en" />);
    });

    // Check that the 'no projects found' message is displayed
    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });
  });
});
