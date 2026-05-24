"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { GoogleSignInModal } from "@/components/google-signin-modal";
import { Heart, Lock, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export function SiteHeader() {
  const { user, logout, setIsSigningIn } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Explore" },
    { href: "/collections", label: "Collections" },
    ...(user ? [{ href: "/favorites", label: "Favorites", icon: Heart }] : []),
    ...(user?.role === "admin" ? [{ href: "/admin", label: "Admin CRM", icon: Lock }] : []),
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#08090a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-lg font-bold tracking-tight text-transparent transition group-hover:from-violet-300 group-hover:to-indigo-400">
                NMBW
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all duration-200",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-muted hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {Icon && <Icon className="size-3.5" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Section / Action */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* User avatar & info */}
                <div className="hidden sm:flex flex-col items-end text-right">
                  <span className="text-xs font-semibold text-white leading-none">{user.name}</span>
                  <span className="text-[10px] text-muted capitalize leading-normal mt-0.5">{user.role}</span>
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="size-8 rounded-full border border-white/10 bg-white/5"
                />
                
                {/* Logout Button */}
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="rounded-full border border-white/10 bg-white/[0.02] p-2 text-white/60 hover:border-red-500/30 hover:bg-red-500/[0.05] hover:text-red-400 transition duration-200"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSigningIn(true)}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/20 hover:bg-white/10 transition duration-200"
              >
                {/* Simple simulated Google icon */}
                <svg className="size-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.636 0-8.4-3.764-8.4-8.4s3.764-8.4 8.4-8.4c2.25 0 4.3.85 5.85 2.4l3.15-3.15C18.1 1.09 15.28 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.82 0 12.24-5.42 12.24-12.24 0-.82-.07-1.6-.2-2.355H12.24z" />
                </svg>
                Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-white/10 p-2 text-white/60 hover:bg-white/5 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="border-t border-white/10 bg-[#08090a]/95 px-4 py-4 flex flex-col gap-2 md:hidden">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    "flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  )}
                >
                  {Icon && <Icon className="size-4" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>
      
      {/* spacer to avoid header overlap */}
      <div className="h-16" />

      {/* Google Login Simulation Popup */}
      <GoogleSignInModal />
    </>
  );
}
