import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page"; // Ajusta la ruta según tu proyecto
import { LanguageProvider } from "@/context/LanguageContext";
import '@testing-library/jest-dom';

// Mock componentes hijos para no depender de su lógica interna
jest.mock("@/components/Navbar", () => ({ fetchAboutMe, fetchProjects }) => (
  <div>Mock Navbar</div>
));

jest.mock("@/components/Hero", () => () => <div>Mock Hero</div>);

jest.mock("@/components/AboutMe", () => React.forwardRef((props, ref) => (
  <div ref={ref}>Mock AboutMe</div>
)));

jest.mock("@/components/Projects", () => React.forwardRef((props, ref) => (
  <div ref={ref}>Mock Projects</div>
)));

describe("Home Page", () => {
  it("renders Navbar, Hero, AboutMe and Projects", () => {
    render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    );

    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
    expect(screen.getByText("Mock Hero")).toBeInTheDocument();
    expect(screen.getByText("Mock AboutMe")).toBeInTheDocument();
    expect(screen.getByText("Mock Projects")).toBeInTheDocument();
  });
});
