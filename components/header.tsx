'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-bg-hover/20">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-text-primary hover:text-text-secondary transition-colors"
        >
          Gallery
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#gallery"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Explore
          </a>
          <Link
            href="/admin"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-primary"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-bg-secondary md:hidden">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#gallery"
                className="block text-text-secondary hover:text-text-primary transition-colors"
              >
                Explore
              </a>
              <Link
                href="/admin"
                className="block text-text-secondary hover:text-text-primary transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
