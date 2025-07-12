import React from "react";
import { ChevronRight, ArrowDown, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen overflow-hidden w-full">
      {/* Background with improved gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 z-10"></div>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05, filter: "brightness(0.9)" }}
        animate={{ scale: 1, filter: "brightness(1)" }}
        transition={{ duration: 15, ease: "easeOut" }}
      >
        <img
          src="https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996422/heroimage3_r12q0f.jpg"
          alt="Featured Architecture"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Content container with improved layout */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 ">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <span className="block heading">Transforming</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 heading">
                Vision Into Space
              </span>
            </motion.h1>

            <motion.p
              className="md:text-xl text-lg text-gray-300 mb-10 leading-relaxed max-w-xl font-light"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              Experienced architectural and interior design studio offering
              client satisfaction and easy solutions for inspiring, sustainable spaces.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <motion.button
                className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white md:px-8 md:py-4 py-3 md:min-w-52 w-60 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate("/gallery");
                }}
              >
                <span>View Projects</span>
                <motion.div
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ChevronRight size={18} />
                </motion.div>
              </motion.button>

              <motion.button
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 md:px-8 md:py-4 py-3 md:min-w-52 w-60 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/vastu_decor_balewadi?igsh=MWgzeHJrY3YybnBrNg==",
                    "_blank"
                  )
                }
              >
                <Play size={18} className="mr-2" />
                <span>Watch Showreel</span>
              </motion.button>
            </motion.div>

            {/* Stats section */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-6 max-w-lg"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.8,
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {[
                { number: "10+", label: "Years Experience" },
                { number: "150+", label: "Projects Completed" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {item.number}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Improved scroll indicator with smoother animation */}
      <motion.div
        className="absolute bottom-12 left-0 right-0 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="mx-auto px-4">
          <div className="flex justify-center">
            <motion.a
              href="#about"
              className="group flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
            >
              <motion.span className="text-xs mb-3 font-light tracking-widest">
                SCROLL TO DISCOVER
              </motion.span>
              <motion.div
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors duration-300"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown size={16} />
              </motion.div>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/6 h-96 w-96 bg-indigo-500/10 rounded-full blur-3xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/4 h-80 w-80 bg-purple-600/10 rounded-full blur-3xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/2 -left-20 h-60 w-60 bg-blue-600/10 rounded-full blur-3xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </section>
  );
};

export default HeroSection;
