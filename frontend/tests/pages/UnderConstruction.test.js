import { render, screen } from "@testing-library/react";
import UnderConstruction from "@/app/under-construction/page";

// Mock LanguageContext to provide predictable translations
jest.mock("@/context/LanguageContext", () => {
  return {
    useLanguage: () => ({
      lang: "en",
      translations: {
        underConstruction: "🚧 Under Construction 🚧",
        description: "This portfolio is currently under construction",
        viewRepo: "View Portfolio Repo",
      },
    }),
  };
});

// Mock Navbar and Hero to avoid extra rendering/fetch
jest.mock("@/components/Navbar", () => () => <div>Mock Navbar</div>);
jest.mock("@/components/Hero", () => () => <div>Mock Hero</div>);

describe("UnderConstruction Page", () => {
  it("renders the under construction title", () => {
    render(<UnderConstruction />);
    expect(
      screen.getByText("🚧 Under Construction 🚧")
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<UnderConstruction />);
    expect(
      screen.getByText("This portfolio is currently under construction")
    ).toBeInTheDocument();
  });

  it("renders the GitHub link correctly", () => {
    render(<UnderConstruction />);
    const link = screen.getByRole("link", { name: /View Portfolio Repo/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/NicoMarina/portfolio_dev"
    );
  });

  it("renders mocked Navbar and Hero components", () => {
    render(<UnderConstruction />);
    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
    expect(screen.getByText("Mock Hero")).toBeInTheDocument();
  });
});
