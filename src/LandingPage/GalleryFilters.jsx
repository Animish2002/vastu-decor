import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, X } from "lucide-react";

const GalleryFilters = ({
  searchTerm,
  setSearchTerm,
  activeTab,
  clearFilters,
  categories,
  setActiveTab,
  scrollProgress,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12"
        style={{ y: scrollProgress * -40 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 heading">
          Interior Design Gallery
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">
          Explore our collection of interior design projects
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-8 shadow-md border border-gray-100 dark:border-gray-700 relative"
        style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search projects by ID, title or description..."
              className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {(activeTab !== "all" || searchTerm) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="h-4 w-4 mr-1" /> Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TabsList className="flex overflow-x-auto scrollbar-hide pb-2 mb-8 w-full justify-start bg-transparent">
            <TabsTrigger
              key="all"
              value="all"
              className="whitespace-nowrap mr-1 rounded-full px-6 transition-all duration-300"
            >
              All Projects
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="whitespace-nowrap mr-1 rounded-full px-6 transition-all duration-300"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>
      </Tabs>
    </>
  );
};

export default GalleryFilters;