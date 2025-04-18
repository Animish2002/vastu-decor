import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
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
        }, 800); // Simulate loading for demo purposes
      } catch (error) {
        console.error("Error loading gallery data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
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
        (project) => project.id.toString().includes(searchLower)
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

  // Loading skeleton
  const GallerySkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill()
        .map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header section */}
      <div className="mx-auto px-4 py-6 shadow-lg w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="group relative z-50 flex items-center space-x-1 font-sans"
          >
            <div className="relative rounded-lg px-3 py-1 bg-white dark:bg-gray-500 border border-indigo-200 dark:border-indigo-800">
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
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/gallery"
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              Projects
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
        <div className="md:hidden bg-white absolute top-full left-0 w-full border-b border-gray-200 py-4 z-50">
          <div className="mx-auto px-4 flex flex-col space-y-4">
            <a
              href="/gallery"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              Projects
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

      {/* Main content */}
      <div className="container mx-auto py-8 px-4 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 heading">
            Design Portfolio
          </h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Explore our collection of interior design projects
          </p>
        </motion.div>

        {/* Filter toolbar */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search projects by ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {(activeTab !== "all" || searchTerm) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-1" /> Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="flex overflow-x-auto pb-2 mb-4 w-full">
            <TabsTrigger key="all" value="all" className="whitespace-nowrap">
              All Projects
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="whitespace-nowrap"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Projects Display */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <GallerySkeleton />
            ) : (
              <motion.div
                key={activeTab + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProjects.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProjects.map((project) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                          whileHover={{ y: -5 }}
                          className="group cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                            <div className="relative overflow-hidden">
                              <div className="aspect-video">
                                <img
                                  src={project.thumbnail}
                                  alt={`Project ${project.id}`}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <div className="absolute inset-0 opacity-50 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12" />
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Pagination controls */}
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
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">
                      No projects found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your search or filters
                    </p>
                    <Button onClick={clearFilters}>Clear All Filters</Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Detail Modal */}
          <Dialog
            open={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedProject(null)}
          >
            <DialogContent className="max-w-4xl w-full p-0 overflow-hidden max-h-[90vh]">
              {selectedProject && (
                <div className="flex flex-col h-full">
                  <DialogHeader className="p-4 border-b">
                    <DialogTitle className="text-2xl">
                      Project ID: {selectedProject.id}
                    </DialogTitle>
                    <div className="text-sm text-gray-500">
                      Category: {categories.find(c => c.id === selectedProject.category)?.name || selectedProject.category}
                    </div>
                  </DialogHeader>

                  <div className="relative overflow-y-auto flex-grow">
                    <img
                      src={selectedProject.image}
                      alt={`Project ${selectedProject.id}`}
                      className="w-full h-[70vh]"
                    />
                  </div>

                  <div className="p-4 border-t flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateProject("prev")}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" size="sm">
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateProject("next")}
                    >
                      Next <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Vastu Decor. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Gallery;