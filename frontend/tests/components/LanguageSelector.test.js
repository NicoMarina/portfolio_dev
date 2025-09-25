import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "../../components/LanguageSelector";
import { LanguageProvider, useLanguage } from "../../context/LanguageContext";

function Wrapper() {
  const { lang, setLang } = useLanguage();
  return <LanguageSelector lang={lang} setLang={setLang} />;
}

describe("LanguageSelector", () => {
  it("renders all languages", () => {
    render(
      <LanguageProvider>
        <Wrapper />
      </LanguageProvider>
    );

    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("ES")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
  });

  it("changes language when clicked", () => {
    render(
      <LanguageProvider>
        <Wrapper />
      </LanguageProvider>
    );

    const esButton = screen.getByText("ES");
    fireEvent.click(esButton);

    expect(esButton).toHaveClass("bg-blue-600 text-white");
  });
});
