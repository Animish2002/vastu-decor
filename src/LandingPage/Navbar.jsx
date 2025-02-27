import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tighter">
            STUDIO<span className="text-indigo-600">SPACE</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              Projects
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Book Consultation
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full border-b border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a
              href="#about"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              Projects
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              Contact
            </a>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors w-full">
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
