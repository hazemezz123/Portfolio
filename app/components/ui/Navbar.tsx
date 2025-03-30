"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Guestbook", href: "#guestbook" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 retro-container bg-retro-beige w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <m.div
            className="flex items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="#home"
              className="flex items-center"
              onClick={() => setActiveItem("#home")}
            >
              <span className="text-2xl font-bold text-retro-gray glitch-text">
                Port<span className="text-retro-purple">folio</span>
              </span>
            </Link>
          </m.div>

          {/* Desktop menu */}
          <nav className="hidden md:flex md:space-x-4">
            <div className="retro-header flex items-center">
              {navItems.map((item, index) => (
                <m.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-bold transition-colors ${
                      activeItem === item.href
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                    onClick={() => setActiveItem(item.href)}
                  >
                    {item.name}
                    {activeItem === item.href && (
                      <m.span
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-white"
                        layoutId="navbar-underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </m.div>
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="retro-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative h-6 w-6">
                <m.span
                  className="absolute left-0 top-[8px] block h-0.5 w-full bg-white rounded"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <m.span
                  className="absolute left-0 top-[14px] block h-0.5 w-full bg-white rounded"
                  animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <m.span
                  className="absolute left-0 top-[20px] block h-0.5 w-full bg-white rounded"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            className="md:hidden retro-container bg-retro-beige overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-bold ${
                    activeItem === item.href
                      ? "retro-link"
                      : "text-retro-gray hover:text-retro-blue"
                  }`}
                  onClick={() => {
                    setActiveItem(item.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
