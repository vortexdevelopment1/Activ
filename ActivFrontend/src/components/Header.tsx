"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", view: "home" },
  { label: "Players", view: "players" },
  { label: "Venue Partners", view: "venue-partners" },
  { label: "Support", view: "support" },
];

interface HeaderProps {
  currentPage: string;
  onNavigate: (view: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-[#000000] px-5 py-3 backdrop-blur-md sm:px-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center bg-transparent border-none cursor-pointer text-left"
          aria-label="ACTIV home"
        >
          <img
            src="/logo.png"
            alt="ACTIV"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.view;
            return (
              <button
                key={link.label}
                onClick={() => {
                  if (link.view.startsWith("#")) {
                    const el = document.querySelector(link.view);
                    el?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigate(link.view);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`text-sm font-medium transition-colors bg-transparent border-none cursor-pointer ${
                  isActive
                    ? "text-[#c8f31d]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                d="M3 3L15 15M15 3L3 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 4.5H16M2 9H16M2 13.5H16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel with In and Out animations */}
      <div
        className={`mx-auto max-w-6xl overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "max-h-96 opacity-100 mt-2 pointer-events-auto"
            : "max-h-0 opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#000000] p-3 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.view;
            return (
              <button
                key={link.label}
                onClick={() => {
                  setMenuOpen(false);
                  if (link.view.startsWith("#")) {
                    const el = document.querySelector(link.view);
                    el?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigate(link.view);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer ${
                  isActive
                    ? "bg-white/5 text-[#c8f31d]"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}