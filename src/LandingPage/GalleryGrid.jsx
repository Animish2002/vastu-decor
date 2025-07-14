import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/card";
import { Heart, PlayCircle } from "lucide-react";
import NoProjectsFound from "./NoProjectsFound";
import GallerySkeleton from "./GallerySkeleton";

const GalleryGrid = ({
  displayedProjects,
  categories,
  setSelectedProject,
  likedProjects,
  toggleLike,
  galleryRef,
  clearFilters,
  sentinelRef,
  isLoadingMore,
  hasMore,
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
      {displayedProjects.length > 0 ? (
        <div ref={galleryRef}>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
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

          {/* Loading more skeleton */}
          {isLoadingMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <GallerySkeleton />
            </motion.div>
          )}

          {/* Sentinel element for intersection observer */}
          {hasMore && (
            <div
              ref={sentinelRef}
              className="h-20 flex items-center justify-center mt-8"
            >
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          )}

          {/* End of results indicator */}
          {!hasMore && displayedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">
                <span>You've reached the end of the gallery</span>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <NoProjectsFound clearFilters={clearFilters} />
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({
  project,
  categories,
  likedProjects,
  toggleLike,
  getAspectRatioClass,
}) => (
  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl">
    <div className="relative overflow-hidden h-full">
      <div
        className={`h-full ${getAspectRatioClass(
          project
        )} bg-gray-100 dark:bg-gray-700`}
      >
        {project.type === "video" ? (
          <>
            <img
              src={project.thumbnail}
              alt={`Project ${project.id}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
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
            loading="lazy"
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
            {categories.find((c) => c.id === project.category)?.name ||
              project.category}
          </p>
        </div>
      </div>
    </div>
  </Card>
);

export default GalleryGrid;
