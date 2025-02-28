import React from "react";
import { ChevronRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import heroimage from "../assets/heroimage3.jpeg";

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Overlay gradient with improved opacity balance */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
      
      {/* Hero image with subtle zoom animation using Framer Motion */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        <img
          src={heroimage}
          alt="Featured Architecture"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      
      {/* Content container with staggered animations */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto px-6">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              }}
            >
              Transforming <span className="text-indigo-400">Vision</span> Into <span className="text-indigo-400">Space</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              }}
            >
              Award-winning architectural and interior design studio crafting
              unique, sustainable spaces that inspire and endure.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" }
                }
              }}
            >
              <motion.button 
                className="group bg-indigo-600 text-white px-8 py-4 rounded-md hover:bg-indigo-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-indigo-500/30"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects 
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ChevronRight size={20} className="ml-2" />
                </motion.div>
              </motion.button>
              
              <motion.button 
                className="bg-transparent text-white border border-white/80 px-8 py-4 rounded-md hover:bg-white/10 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                About Studio
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator with Framer Motion animation */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="mx-auto px-4">
          <div className="flex justify-center">
            <motion.a 
              href="#about" 
              className="flex flex-col items-center text-white opacity-80 hover:opacity-100 transition-opacity"
              whileHover={{ opacity: 1 }}
            >
              <motion.span 
                className="text-sm mb-2 font-light tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                DISCOVER
              </motion.span>
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                <ArrowDown size={24} />
              </motion.div>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Decorative elements with Framer Motion */}
      <motion.div 
        className="absolute top-0 right-0 h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <motion.div 
        className="absolute bottom-0 left-1/4 h-40 w-40 bg-indigo-600/10 rounded-full blur-3xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </section>
  );
};

export default HeroSection;