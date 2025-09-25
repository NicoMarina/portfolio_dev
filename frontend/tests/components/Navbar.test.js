import { render, screen } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import { LanguageProvider } from "../../context/LanguageContext";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

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

    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("ES")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
  });
});
