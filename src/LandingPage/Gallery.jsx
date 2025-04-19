import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Menu,
  PlayCircle,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Download,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../lib/utils";

// Import your data
import galleryData from "../GalleryLinks/data.json";
import ContactSection from "./ContactSection";

const Gallery = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const videoRef = useRef(null);
  const projectsPerPage = 12;

  // Initialize data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Using imported data
        setProjects(galleryData.projects);
        setCategories(galleryData.categories);

        setTimeout(() => {
          setIsLoading(false);
        }, 600); // Simulate loading for demo purposes
      } catch (error) {
        console.error("Error loading gallery data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle scroll progress for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter projects
  useEffect(() => {
    let result = [...projects];

    // Filter by category (tab)
    if (activeTab !== "all") {
      result = result.filter((project) => project.category === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (project) =>
          project.id.toString().includes(searchLower) ||
          project.title?.toLowerCase().includes(searchLower) ||
          project.description?.toLowerCase().includes(searchLower)
      );
    }

    // Calculate pagination
    setTotalPages(Math.ceil(result.length / projectsPerPage));

    // Apply pagination
    const paginatedResults = result.slice(
      (currentPage - 1) * projectsPerPage,
      currentPage * projectsPerPage
    );

    setFilteredProjects(paginatedResults);
  }, [activeTab, searchTerm, projects, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  // Handle video autoplay when modal opens
  useEffect(() => {
    if (selectedProject?.type === "video" && videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.error("Autoplay failed:", e));
    }
  }, [selectedProject]);

  // Clear all filters
  const clearFilters = () => {
    setActiveTab("all");
    setSearchTerm("");
  };

  // Modal navigation
  const navigateProject = (direction) => {
    if (!selectedProject) return;

    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "next") {
      newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    }

    setSelectedProject(projects[newIndex]);
  };

  // Toggle video mute status
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Toggle like status
  const toggleLike = (projectId, event) => {
    event.stopPropagation();
    setLikedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Check if image is portrait or landscape
  const getAspectRatioClass = (project) => {
    if (project.orientation === "portrait") {
      return "aspect-[3/4]";
    }
    return "aspect-[16/9]";
  };

  // Function to handle image/video download
  const handleDownload = async (project) => {
    try {
      // Determine the URL to download (use image or video depending on project type)
      const url =
        project.type === "video"
          ? project.video || project.image
          : project.image || project.thumbnail;

      const filename = `vastudecor-project-${project.id}.${
        project.type === "video" ? "mp4" : "jpg"
      }`;

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      // For cross-origin resources, we might need to fetch and create a blob
      if (
        new URL(url, window.location.origin).origin !== window.location.origin
      ) {
        const response = await fetch(url);
        const blob = await response.blob();
        link.href = URL.createObjectURL(blob);
      }

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL if we created one
      if (link.href.startsWith("blob:")) {
        URL.revokeObjectURL(link.href);
      }
    } catch (error) {
      console.error("Download failed:", error);
      // You could add toast notification here for error feedback
    }
  };

  // Function to handle sharing content
  const handleShare = async (project) => {
    const shareData = {
      title: project.title || `Vastu Decor Project ${project.id}`,
      text:
        project.description ||
        `Check out this amazing interior design project from Vastu Decor.`,
      url: window.location.href, // Current URL - could be enhanced to deep link to specific project
    };

    try {
      // Use the Web Share API if available
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard if Web Share API is not available
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        // You could add a toast notification here to confirm copy
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // You could add toast notification here for error feedback
    }
  };

  // Loading skeleton with staggered animation
  const GallerySkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8)
        .fill()
        .map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-lg overflow-hidden"
          >
            <Skeleton className={i % 3 === 0 ? "h-80 w-full" : "h-64 w-full"} />
            <div className="pt-3">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </motion.div>
        ))}
    </div>
  );

  // Container variants for staggered animations
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Header section with subtle parallax */}
      <motion.div
        style={{
          y: scrollProgress * -20,
          backgroundColor: `rgba(255, 255, 255, ${0.9 - scrollProgress * 0.2})`,
        }}
        className="mx-auto px-4 py-6 shadow-lg w-full backdrop-blur-md dark:bg-gray-900/90 sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800"
      >
        <div className="flex justify-between items-center">
          {/* Logo with hover animation */}
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
      </motion.div>

      {/* Mobile Menu with improved animation */}
      <AnimatePresence>
        {isMenuOpen && (
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
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="container mx-auto py-8 px-4 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          style={{ y: scrollProgress * -40 }} // Parallax effect
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 heading">
            Interior Design Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">
            Explore our collection of interior design projects
          </p>
        </motion.div>

        {/* Filter toolbar with floating effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-8 shadow-md border border-gray-100 dark:border-gray-700 relative"
          style={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
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

        {/* Category Tabs with subtle hover effects */}
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

          {/* Projects Display with staggered animations */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <GallerySkeleton />
            ) : (
              <motion.div
                key={activeTab + searchTerm + currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProjects.length > 0 ? (
                  <>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          variants={itemVariants}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="group cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                            <div className="relative overflow-hidden">
                              <div
                                className={cn(
                                  getAspectRatioClass(project),
                                  "bg-gray-100 dark:bg-gray-700"
                                )}
                              >
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
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  whileHover={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ZoomIn className="text-white w-12 h-12 drop-shadow-lg" />
                                </motion.div>
                              </div>

                              {/* Like button */}
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => toggleLike(project.id, e)}
                                className={`absolute top-3 right-3 p-2 rounded-full z-10 ${
                                  likedProjects.has(project.id)
                                    ? "bg-red-500 text-white"
                                    : "bg-black/30 text-white hover:bg-black/50"
                                }`}
                              >
                                <Heart
                                  className={`h-5 w-5 ${
                                    likedProjects.has(project.id)
                                      ? "fill-current"
                                      : ""
                                  }`}
                                />
                              </motion.button>
                            </div>

                            <motion.div
                              className="p-4"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                            >
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {project.title || `Project ${project.id}`}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {categories.find(
                                  (c) => c.id === project.category
                                )?.name || project.category}
                              </p>
                            </motion.div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Pagination controls with animations */}
                    <div className="mt-8 flex justify-center items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <span className="text-sm">
                        Page {currentPage} of {totalPages}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-md"
                  >
                    <h3 className="text-xl font-medium mb-2">
                      No projects found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search or filters
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={clearFilters}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      >
                        Clear All Filters
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Detail Modal with enhanced animations */}
          <Dialog
            open={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedProject(null)}
          >
            <DialogContent className="max-w-5xl w-full p-0 overflow-hidden max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl">
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full"
                >
                  <DialogHeader className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedProject.title || `Project ${selectedProject.id}`}
                    </DialogTitle>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-2 mt-1">
                      <span>ID: {selectedProject.id}</span>
                      <span>•</span>
                      <span>
                        Category:{" "}
                        {categories.find(
                          (c) => c.id === selectedProject.category
                        )?.name || selectedProject.category}
                      </span>
                    </div>
                  </DialogHeader>

                  <div className="relative overflow-y-auto flex-grow bg-black flex items-center justify-center">
                    {selectedProject.type === "video" ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <video
                          ref={videoRef}
                          src={selectedProject.video || selectedProject.image}
                          poster={selectedProject.thumbnail}
                          className="max-w-full max-h-full object-contain"
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          controls
                        />
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMute}
                            className="absolute bottom-4 right-4 bg-black/50 text-white hover:bg-black/70 rounded-full"
                          >
                            {isMuted ? (
                              <VolumeX size={20} />
                            ) : (
                              <Volume2 size={20} />
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    ) : (
                      <motion.img
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        src={selectedProject.image || selectedProject.thumbnail}
                        alt={`Design Id ${selectedProject.id}`}
                        className={cn(
                          "max-w-full max-h-[70vh] object-contain",
                          selectedProject.orientation === "portrait"
                            ? "h-full"
                            : "w-full"
                        )}
                      />
                    )}
                  </div>

                  {selectedProject.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700"
                    >
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedProject.description}
                      </p>
                    </motion.div>
                  )}

                  <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
                    <div className="flex space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateProject("prev")}
                          className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                        </Button>
                      </motion.div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => toggleLike(selectedProject.id, e)}
                          className={`${
                            likedProjects.has(selectedProject.id)
                              ? "text-red-500 hover:text-red-600"
                              : "text-gray-500 hover:text-gray-600"
                          }`}
                        ></Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(selectedProject);
                          }}
                          className="text-gray-500 hover:text-gray-600"
                          aria-label="Share project"
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(selectedProject);
                          }}
                          className="text-gray-500 hover:text-gray-600"
                          aria-label="Download project"
                        >
                          <Download className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>

                    <div className="flex space-x-2">
                      <DialogClose asChild>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-gray-700"
                          >
                            Close
                          </Button>
                        </motion.div>
                      </DialogClose>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateProject("next")}
                          className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        >
                          Next <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </DialogContent>
          </Dialog>
        </Tabs>
      </div>

      {/* Floating back to top button */}
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

      <ContactSection />

      {/* Footer with animated gradient border */}
      <footer className="bg-white dark:bg-gray-900 py-8 mt-16 border-t border-gray-100 dark:border-gray-800 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-6 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Vastu Decor. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </motion.div>
  );
};

export default Gallery;
