// Navbar component for navigating to sections of the SPA
export default function Navbar() {
  return (
    // Fixed navigation bar at the top of the page
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-center space-x-8 z-50 transition-colors duration-500">
      <a href="#hero" className="hover:text-blue-600 transition-colors duration-300">
        Home
      </a>
      <a href="#about" className="hover:text-blue-600 transition-colors duration-300">
        About
      </a>
      <a href="#projects" className="hover:text-blue-600 transition-colors duration-300">
        Projects
      </a>
      <a href="#contact" className="hover:text-blue-600 transition-colors duration-300">
        Contact
      </a>
    </nav>
  );
}
