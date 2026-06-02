import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inspiration Gallery - Curated Design Collections',
  description: 'A carefully curated gallery of inspiring websites and design work.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-primary">
        {children}
      </body>
    </html>
  );
}
