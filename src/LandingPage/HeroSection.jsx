import React from "react";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-40 z-10"></div>
      <img
        src="/api/placeholder/1920/1080"
        alt="Featured Architecture"
        className="absolute h-full w-full object-cover"
      />

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Transforming Vision Into Space
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Award-winning architectural and interior design studio crafting
              unique, sustainable spaces that inspire.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                View Projects <ChevronRight size={20} className="ml-2" />
              </button>
              <button className="bg-transparent text-white border border-white px-8 py-3 rounded-md hover:bg-white hover:text-gray-900 transition-colors">
                About Studio
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <a href="#about" className="animate-bounce text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
