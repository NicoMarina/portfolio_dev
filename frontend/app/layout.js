import './globals.css';
import { LanguageProvider } from "@/context/LanguageContext";
import Footer from '@/components/Footer';


export const metadata = {
  title: 'Marina Nicolau - Portfolio',
  description: 'Backend Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Footer />

      </body>
    </html>
  );
}