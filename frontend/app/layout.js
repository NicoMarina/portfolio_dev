// Import global styles
import './globals.css';

// Import Navbar and Footer components
import { LanguageProvider } from "../context/LanguageContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Metadata for the page (used by Next.js for head tags)
export const metadata = {
  title: 'Marina Nicolau Portfolio',
  description: 'Backend Engineer',
};

// RootLayout component wraps the entire app
// It includes Navbar at the top, Footer at the bottom, and renders page content in between
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 font-sans">
        <LanguageProvider>
          {/* Navbar displayed at the top of all pages */}
          <Navbar />
          {/* Dynamic page content injected here */}
          {children}
        </LanguageProvider>
        {/* Footer displayed at the bottom of all pages */}
        <Footer />
      </body>
    </html>
  );
}
