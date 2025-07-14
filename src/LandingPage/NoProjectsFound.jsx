import React, { useState } from "react";
import { motion } from "framer-motion";

const NoProjectsFound = ({ clearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xl shadow-md"
    >
      <h3 className="text-xl font-medium mb-2">No projects found</h3>
      <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button
          onClick={clearFilters}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Clear All Filters
        </button>
      </motion.div>
    </motion.div>
  );
};

export default NoProjectsFound;
