import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("#");
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks
        .map((link) => link.href.replace("#", ""))
        .filter((id) => id !== "/gallery");

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveItem(`#${sectionId}`);
            break;
          }
        }
      }
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

  // Scroll to target when scrollTarget changes
  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        const yOffset = -80; // Account for navbar height
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        // Smooth scroll with animation
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });

        // Reset scroll target after animation
        const timer = setTimeout(() => {
          setScrollTarget(null);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [scrollTarget]);

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

  // Handle navigation with smooth scroll
  const handleNavigation = (href) => {
    // If it's an internal anchor link
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      setActiveItem(href);
      setScrollTarget(targetId);
      if (mobileMenuOpen) setMobileMenuOpen(false);
      return false; // Prevent default
    }
    // For regular links like "/gallery"
    return true;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 right-0 w-screen z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="w-full mx-auto px-4 md:px-8 lg:max-w-8xl">
          <div className="flex items-center justify-between">
            {/* Logo with animation */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative z-50 flex items-center space-x-1 font-sans"
            >
              <div className="relative rounded-lg px-3 py-1 bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 heading">
                  Vastu
                </span>
                <span
                  className={cn(
                    "text-3xl font-light transition-colors heading",
                    "text-gray-800 dark:text-gray-200"
                  )}
                >
                  Decor
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="flex rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm mx-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (!handleNavigation(link.href)) {
                        e.preventDefault();
                      }
                    }}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative",
                      activeItem === link.href
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    {activeItem === link.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 mx-auto h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                        layoutId="activeTab"
                        initial={{ width: "30%" }}
                        animate={{ width: "60%" }}
                        style={{ bottom: "-2px" }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("#contact");
                  }}
                  className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Consultation
                </motion.a>
              </div>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="flex items-center space-x-2 md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Scroll indicator */}
      <AnimatePresence>
        {scrollTarget && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-8 left-0 right-0 z-40 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-indigo-600/80 text-white px-4 py-2 rounded-full backdrop-blur-sm shadow-lg flex items-center"
            >
              <ChevronDown className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Scrolling</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu - Full screen overlay with animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-30 bg-white dark:bg-gray-900 md:hidden"
          >
            <div className="flex flex-col h-full p-6 pt-24">
              <motion.nav
                className="flex flex-col gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (!handleNavigation(link.href)) {
                        e.preventDefault();
                      }
                    }}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                    className="group flex items-center py-4 text-xl font-medium text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 transition-colors"
                  >
                    <motion.span
                      initial={{ width: 0 }}
                      whileHover={{ width: 24 }}
                      className="inline-block h-px bg-indigo-500 mr-0 group-hover:mr-3"
                    />
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>

              <motion.div
                className="mt-auto pb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("#contact");
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center rounded-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg"
                >
                  Book Consultation
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-50 origin-left"
        style={{
          scaleX: scrollTarget
            ? 0
            : window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight) ||
              0,
        }}
      />
    </>
  );
};

export default Navbar;
