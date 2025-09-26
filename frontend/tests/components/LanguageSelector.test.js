import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LanguageSelector from "@/components/LanguageSelector";
import { LanguageProvider } from "@/context/LanguageContext";

describe("LanguageSelector", () => {
  const mockFetchAboutMe = jest.fn().mockResolvedValue({ about: "Mock AboutMe" });

  it("renders all languages", () => {
    render(
      <LanguageProvider>
        <LanguageSelector fetchAboutMe={mockFetchAboutMe} />
      </LanguageProvider>
    );

    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("ES")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
  });

  it("changes language when clicked", async () => {
    render(
      <LanguageProvider>
        <LanguageSelector fetchAboutMe={mockFetchAboutMe} />
      </LanguageProvider>
    );

    const esButton = screen.getByText("ES");
    fireEvent.click(esButton);

    // wait until React finishes state updates
    await waitFor(() => {
      expect(esButton).toHaveClass("bg-[#358FAB] text-white");
    });
  });
});
