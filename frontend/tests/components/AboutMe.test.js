import { render, screen } from "@testing-library/react";
import AboutMe from "@/components/AboutMe";
import { LanguageProvider } from "@/context/LanguageContext";

// Mock fetch globally for AboutMe component
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ content: "<p>Hello World</p>" }),
  })
);

describe("AboutMe", () => {
  // Suppress console.error during tests to keep output clean
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("shows loading initially", async () => {
    // Render AboutMe inside LanguageProvider
    render(
      <LanguageProvider>
        <AboutMe lang="en" />
      </LanguageProvider>
    );

    // Expect initial loading text
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });

  it("renders fetched content", async () => {
    render(
      <LanguageProvider>
        <AboutMe lang="en" />
      </LanguageProvider>
    );

    // Wait for async fetch to finish and assert content
    const content = await screen.findByText("Hello World");
    expect(content).toBeInTheDocument();
  });

  it("handles error state", async () => {
    // Force fetch to fail once
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    render(
      <LanguageProvider>
        <AboutMe lang="en" />
      </LanguageProvider>
    );

    // Wait for error state to show
    const errorMessage = await screen.findByText("Error loading content.");
    expect(errorMessage).toBeInTheDocument();
  });
});
