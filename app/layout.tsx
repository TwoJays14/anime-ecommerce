import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from './context/Provider';
import { Navbar } from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anime E-commerce',
  description: 'E-commerce store for Anime fans',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body
          data-theme="dim"
          className={`${inter.className}, h-screen w-screen relative flex flex-col justify-center `}
        >
          <Navbar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
