import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Heart, PlayCircle } from "lucide-react";

const GalleryGrid = ({
  filteredProjects,
  categories,
  setSelectedProject,
  likedProjects,
  toggleLike,
  currentPage,
  totalPages,
  setCurrentPage,
  galleryRef,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getGridSpan = (project) => {
    switch (project.height) {
      case 3:
        return "col-span-1 row-span-2 md:col-span-1 md:row-span-2";
      case 2:
        return "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
      default:
        return "col-span-1";
    }
  };

  const getAspectRatioClass = (project) => {
    if (project.orientation === "portrait") {
      return "aspect-[3/4]";
    }
    return "aspect-[16/9]";
  };

  return (
    <AnimatePresence mode="wait">
      {filteredProjects.length > 0 ? (
        <>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group cursor-pointer ${getGridSpan(project)}`}
                onClick={() => setSelectedProject(project)}
              >
                <ProjectCard 
                  project={project}
                  categories={categories}
                  likedProjects={likedProjects}
                  toggleLike={toggleLike}
                  getAspectRatioClass={getAspectRatioClass}
                />
              </motion.div>
            ))}
          </motion.div>

          <PaginationControls 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <NoProjectsFound />
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, categories, likedProjects, toggleLike, getAspectRatioClass }) => (
  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl">
    <div className="relative overflow-hidden h-full">
      <div className={`h-full ${getAspectRatioClass(project)} bg-gray-100 dark:bg-gray-700`}>
        {project.type === "video" ? (
          <>
            <img
              src={project.thumbnail}
              alt={`Project ${project.id}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0.7, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <PlayCircle className="text-white w-16 h-16 drop-shadow-lg" />
              </motion.div>
            </div>
          </>
        ) : (
          <motion.img
            src={project.thumbnail}
            alt={`Project ${project.id}`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => toggleLike(project.id, e)}
            className={`p-2 rounded-full z-10 ${
              likedProjects.has(project.id)
                ? "bg-red-500 text-white"
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${
                likedProjects.has(project.id) ? "fill-current" : ""
              }`}
            />
          </motion.button>
        </div>

        <div className="text-white">
          <h3 className="font-medium md:text-lg text-sm md:mb-1 drop-shadow-lg">
            {project.title || `Project ${project.id}`}
          </h3>
          <p className="text-xs text-gray-200">
            {categories.find((c) => c.id === project.category)?.name || project.category}
          </p>
        </div>
      </div>
    </div>
  </Card>
);

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="mt-12 flex justify-center items-center space-x-2">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
      >
        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
      </Button>
    </motion.div>

    <span className="text-sm">
      Page {currentPage} of {totalPages}
    </span>

    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
      >
        Next <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </motion.div>
  </div>
);

const NoProjectsFound = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-md"
  >
    <h3 className="text-xl font-medium mb-2">No projects found</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6">
      Try adjusting your search or filters
    </p>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={clearFilters}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
      >
        Clear All Filters
      </Button>
    </motion.div>
  </motion.div>
);

export default GalleryGrid;