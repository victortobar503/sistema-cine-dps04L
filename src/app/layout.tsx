import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Providers } from "./providers";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'CineStream - Plataforma de Películas',
  description: 'Explora el catálogo de películas en la mejor resolución.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <Header />
        <hr></hr>
        <main>
          <Providers>
            {children}
          </Providers>
        </main>
        <Footer />
      </body>
      
    </html>
  );
}
