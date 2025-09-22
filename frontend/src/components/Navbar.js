export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-center space-x-8 z-50">
      <a href="#hero" className="hover:text-blue-600">Home</a>
      <a href="#about" className="hover:text-blue-600">About</a>
      <a href="#projects" className="hover:text-blue-600">Projects</a>
      <a href="#contact" className="hover:text-blue-600">Contact</a>
    </nav>
  );
}
