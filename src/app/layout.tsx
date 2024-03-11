import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import ThemeProvider from '@/components/ThemeProvider';
import { populateDB } from '@/actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SQLM8',
  description: 'SQLite client in your browser',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await populateDB();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
