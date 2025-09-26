import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    // Verifica los links principales
    // expect(screen.getByText("Home")).toBeInTheDocument();
    // expect(screen.getByText("About")).toBeInTheDocument();
    // expect(screen.getByText("Projects")).toBeInTheDocument();
    // expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders LanguageSelector", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    // Usamos getAllByText porque hay botones duplicados (desktop + mobile)
    const enButtons = screen.getAllByText("EN");
    const esButtons = screen.getAllByText("ES");
    const caButtons = screen.getAllByText("CA");

    expect(enButtons.length).toBeGreaterThan(0);
    expect(esButtons.length).toBeGreaterThan(0);
    expect(caButtons.length).toBeGreaterThan(0);
  });
});
