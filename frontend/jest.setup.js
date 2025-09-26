import "@testing-library/jest-dom"; // Adds custom matchers like toBeInTheDocument

// Mock next/navigation for App Router
jest.mock("next/navigation", () => {
  return {
    useRouter() {
      return {
        push: jest.fn(),     // Mock push method
        replace: jest.fn(),  // Mock replace method
        prefetch: jest.fn(), // Mock prefetch method
      };
    },
  };
});

// Mock next/link to avoid errors in tests
jest.mock("next/link", () => {
  return ({ children, href }) => <a href={href}>{children}</a>;
});
