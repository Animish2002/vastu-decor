import React from "react";
import { motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

const GalleryHeader = ({ scrollProgress, isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.div
      style={{
        y: scrollProgress * -20,
        backgroundColor: `rgba(255, 255, 255, ${0.9 - scrollProgress * 0.2})`,
      }}
      className="mx-auto px-4 py-6 shadow-lg w-full backdrop-blur-md dark:bg-gray-900/90 sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800"
    >
      <div className="flex justify-between items-center">
        <a
          href="/"
          className="group relative z-50 flex items-center space-x-1 font-sans"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative rounded-lg px-3 py-1 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800"
          >
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
          </motion.div>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/gallery"
            className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
          >
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="#contact"
            className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
          </a>

          <motion.button
            onClick={() => handleNavigation("#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book Consultation
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-800 dark:text-gray-200"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu setIsMenuOpen={setIsMenuOpen} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MobileMenu = ({ setIsMenuOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 25,
    }}
    className="md:hidden bg-white dark:bg-gray-900 absolute top-20 left-0 w-full border-b border-gray-200 dark:border-gray-700 py-4 z-50 shadow-lg"
  >
    <div className="mx-auto px-4 flex flex-col space-y-4">
      <motion.a
        whileHover={{ x: 5 }}
        href="/gallery"
        className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
      >
        Projects
      </motion.a>
      <motion.a
        whileHover={{ x: 5 }}
        href="#contact"
        className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
      >
        Contact
      </motion.a>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 w-full"
      >
        Book Consultation
      </motion.button>
    </div>
  </motion.div>
);

export default GalleryHeader;