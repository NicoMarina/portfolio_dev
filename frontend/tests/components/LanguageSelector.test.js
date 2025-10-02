import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "@/components/LanguageSelector";

// Create a persistent mock function for changeLanguage
const mockChangeLanguage = jest.fn();

// Mock useLanguage hook
jest.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    lang: "en",               // Current language
    changeLanguage: mockChangeLanguage, // Use our persistent mock
    isLoading: false,
  }),
}));

describe("LanguageSelector", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock call history after each test
  });

  it("highlights the active language and calls changeLanguage when clicking another language", () => {
    // Mock fetchAboutMe callback
    const mockFetchAboutMe = jest.fn();

    // Render the LanguageSelector component
    render(<LanguageSelector fetchAboutMe={mockFetchAboutMe} />);

    // Get buttons
    const enButton = screen.getByText("EN");
    const esButton = screen.getByText("ES");
    const caButton = screen.getByText("CA");

    // Check that the current language has the "active" class
    expect(enButton).toHaveClass("active");
    expect(esButton).toHaveClass("inactive");
    expect(caButton).toHaveClass("inactive");

    // Click the ES button
    fireEvent.click(esButton);

    // Verify that changeLanguage was called with the correct arguments
    expect(mockChangeLanguage).toHaveBeenCalledWith("es", mockFetchAboutMe);
  });
});
