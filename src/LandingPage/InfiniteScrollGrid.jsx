import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import NoProjectsFound from "./NoProjectsFound";
import GallerySkeleton from "./GallerySkeleton";
const InfiniteScrollGallery = () => {
  const [projects, setProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [selectedProject, setSelectedProject] = useState(null);
  const [page, setPage] = useState(1);

  const loadMoreRef = useRef(null);
  const projectsPerPage = 12;

  // Initialize data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProjects(mockProjects);
      setCategories(mockCategories);
      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  // Filter projects based on active tab and search
  const getFilteredProjects = useCallback(() => {
    let result = [...projects];

    if (activeTab !== "all") {
      result = result.filter((project) => project.category === activeTab);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (project) =>
          project.id.toString().includes(searchLower) ||
          project.title?.toLowerCase().includes(searchLower) ||
          project.description?.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [projects, activeTab, searchTerm]);

  // Load more projects
  const loadMoreProjects = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filteredProjects = getFilteredProjects();
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const newProjects = filteredProjects.slice(startIndex, endIndex);

    if (newProjects.length === 0) {
      setHasMore(false);
    } else {
      setDisplayedProjects((prev) => [...prev, ...newProjects]);
      setPage((prev) => prev + 1);

      // Check if we've loaded all projects
      if (endIndex >= filteredProjects.length) {
        setHasMore(false);
      }
    }

    setIsLoadingMore(false);
  }, [page, isLoadingMore, hasMore, getFilteredProjects]);

  // Reset and load initial projects when filters change
  useEffect(() => {
    if (projects.length === 0) return;

    const filteredProjects = getFilteredProjects();
    const initialProjects = filteredProjects.slice(0, projectsPerPage);

    setDisplayedProjects(initialProjects);
    setPage(2);
    setHasMore(filteredProjects.length > projectsPerPage);
  }, [projects, activeTab, searchTerm, getFilteredProjects]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          loadMoreProjects();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoadingMore, loadMoreProjects]);

  const toggleLike = (projectId, event) => {
    event?.stopPropagation();
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

  const clearFilters = () => {
    setActiveTab("all");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Project Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our collection of interior design projects
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
              className="text-sm"
            >
              All Projects
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeTab === category.id ? "default" : "outline"}
                onClick={() => setActiveTab(category.id)}
                className="text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {(activeTab !== "all" || searchTerm) && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Gallery Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <GridSkeleton />
          ) : displayedProjects.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {displayedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    categories={categories}
                    likedProjects={likedProjects}
                    toggleLike={toggleLike}
                    onProjectClick={setSelectedProject}
                  />
                ))}
              </motion.div>

              {/* Infinite scroll trigger and loading */}
              {hasMore && (
                <div ref={loadMoreRef} className="mt-8">
                  {isLoadingMore && <InfiniteScrollSkeleton />}
                </div>
              )}

              {/* End of results message */}
              {!hasMore && displayedProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="text-gray-500 dark:text-gray-400">
                    You've reached the end of the gallery
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <NoProjectsFound />
          )}
        </AnimatePresence>

        {/* Simple modal for selected project */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedProject.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <div className="mb-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedProject.description}
              </p>

              <div className="flex gap-2">
                <span className="text-sm text-gray-500">Category:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {
                    categories.find((c) => c.id === selectedProject.category)
                      ?.name
                  }
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollGallery;
