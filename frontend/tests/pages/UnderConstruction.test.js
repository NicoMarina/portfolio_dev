import { render, screen } from "@testing-library/react";
import UnderConstruction from "@/app/under-construction/page";
import { LanguageProvider } from "@/context/LanguageContext";

// Mock de AboutMe para no hacer fetch real
jest.mock("@/components/AboutMe", () => () => <div>Mock AboutMe</div>);

describe("UnderConstruction Page", () => {
  it("renders title and GitHub link", () => {
    render(
      <LanguageProvider>
        <UnderConstruction />
      </LanguageProvider>
    );

    expect(
      screen.getByText("🚧 Under Construction 🚧")
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /View Portfolio Repo/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/NicoMarina/portfolio_dev"
    );
  });

  it("renders mocked AboutMe component", () => {
    render(
      <LanguageProvider>
        <UnderConstruction />
      </LanguageProvider>
    );

    expect(screen.getByText("Mock AboutMe")).toBeInTheDocument();
  });
});
