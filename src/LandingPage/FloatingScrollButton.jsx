import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

const FloatingScrollButton = ({ scrollProgress }) => (
  <AnimatePresence>
    {scrollProgress > 0.2 && (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg z-50"
      >
        <ChevronLeft className="h-6 w-6 rotate-90" />
      </motion.button>
    )}
  </AnimatePresence>
);

export default FloatingScrollButton;
