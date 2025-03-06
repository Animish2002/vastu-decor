import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-full mx-auto px-4 md:px-8 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="group relative z-50 flex items-center space-x-1 font-sans"
            >
              <div className="relative rounded-lg px-3 py-1 bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  Vastu
                </span>
                <span className={cn(
                  "text-2xl font-light transition-colors",
                  "text-gray-800 dark:text-gray-200"
                )}>
                  Decor
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="flex rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm mx-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                      "hover:text-indigo-600 dark:hover:text-indigo-400",
                      "text-gray-800 dark:text-gray-200"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                
                <a 
                  href="#consultation"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Book Consultation
                </a>
              </div>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={toggleTheme}
                className={cn(
                  "flex items-center justify-center rounded-full h-10 w-10 transition-colors",
                  isScrolled
                    ? "bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
                    : "bg-white/20 text-gray-800 dark:text-gray-200"
                )}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <button 
                onClick={toggleMobileMenu}
                className={cn(
                  "z-50 flex items-center justify-center rounded-full h-10 w-10 transition-colors",
                  isScrolled
                    ? "bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
                    : "bg-white/20 text-gray-800 dark:text-gray-200"
                )}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-30 bg-white dark:bg-gray-900 transition-all duration-300 md:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full p-6 pt-24">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center py-4 text-xl font-medium text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 transition-colors"
              >
                <span className="inline-block w-0 group-hover:w-6 transition-all duration-300 h-px bg-indigo-500 mr-0 group-hover:mr-3"></span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pb-8">
            <a 
              href="#consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;