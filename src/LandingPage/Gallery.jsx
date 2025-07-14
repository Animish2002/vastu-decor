import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryHeader from "./GalleryHeader";
import GalleryFilters from "./GalleryFilters";
import GalleryGrid from "./GalleryGrid";
import ProjectModal from "./ProjectModal";
import GallerySkeleton from "./GallerySkeleton";
import FloatingScrollButton from "./FloatingScrollButton";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

// Import your data
import galleryData from "../GalleryLinks/data.json";

const Gallery = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [allFilteredProjects, setAllFilteredProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const galleryRef = useRef(null);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const projectsPerPage = 12;
  const isFirstRender = useRef(true);

  // Initialize data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const projectsWithHeight = galleryData.projects.map((project) => ({
          ...project,
          height:
            project.orientation === "portrait"
              ? Math.floor(Math.random() * 2) + 2
              : Math.floor(Math.random() * 1) + 1,
        }));

        setProjects(projectsWithHeight);
        setCategories(galleryData.categories);

        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      } catch (error) {
        console.error("Error loading gallery data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle scroll progress
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

  // Filter projects and reset display
  useEffect(() => {
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

    console.log("Filtered projects:", result.length);

    setAllFilteredProjects(result);

    // Reset everything when filters change
    setCurrentPage(1);
    setIsLoadingMore(false);
    setHasMore(result.length > projectsPerPage);

    // Reset displayed projects to first batch
    const initialProjects = result.slice(0, projectsPerPage);
    setDisplayedProjects(initialProjects);

    console.log("Initial display:", initialProjects.length);
  }, [activeTab, searchTerm, projects]);

  // Load more projects function
  const loadMoreProjects = useCallback(() => {
    console.log("=== LOAD MORE TRIGGERED ===");
    console.log("Current state:", {
      isLoadingMore,
      hasMore,
      currentPage,
      displayedCount: displayedProjects.length,
      totalCount: allFilteredProjects.length,
    });

    // Prevent multiple calls
    if (isLoadingMore || !hasMore) {
      console.log("Blocking load more:", { isLoadingMore, hasMore });
      return;
    }

    setIsLoadingMore(true);

    // Use setTimeout to simulate loading and prevent rapid calls
    setTimeout(() => {
      const startIndex = currentPage * projectsPerPage;
      const endIndex = startIndex + projectsPerPage;
      const nextProjects = allFilteredProjects.slice(startIndex, endIndex);

      console.log("Loading batch:", {
        startIndex,
        endIndex,
        batchSize: nextProjects.length,
        totalProjects: allFilteredProjects.length,
      });

      if (nextProjects.length > 0) {
        setDisplayedProjects((prev) => {
          const newProjects = [...prev, ...nextProjects];
          console.log("New displayed count:", newProjects.length);
          return newProjects;
        });

        setCurrentPage((prev) => prev + 1);
        setHasMore(endIndex < allFilteredProjects.length);
      } else {
        console.log("No more projects to load");
        setHasMore(false);
      }

      setIsLoadingMore(false);
    }, 800);
  }, [
    isLoadingMore,
    hasMore,
    currentPage,
    allFilteredProjects,
    displayedProjects.length,
  ]);

  // Intersection Observer setup
  useEffect(() => {
    // Don't set up observer on initial render or when loading
    if (isFirstRender.current || isLoading) {
      isFirstRender.current = false;
      return;
    }

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Don't create observer if conditions aren't met
    if (
      !sentinelRef.current ||
      !hasMore ||
      allFilteredProjects.length <= projectsPerPage
    ) {
      console.log("Not creating observer:", {
        hasSentinel: !!sentinelRef.current,
        hasMore,
        totalProjects: allFilteredProjects.length,
        projectsPerPage,
      });
      return;
    }

    console.log("Creating intersection observer");

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        console.log("Intersection observed:", {
          isIntersecting: target.isIntersecting,
          isLoadingMore,
          hasMore,
        });

        if (target.isIntersecting && !isLoadingMore && hasMore) {
          console.log("Triggering load more from observer");
          loadMoreProjects();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observerRef.current = observer;
    observer.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    hasMore,
    isLoadingMore,
    allFilteredProjects.length,
    loadMoreProjects,
    isLoading,
  ]);

  // Debug logging
  useEffect(() => {
    console.log("Gallery State Update:", {
      allFilteredProjects: allFilteredProjects.length,
      displayedProjects: displayedProjects.length,
      hasMore,
      isLoadingMore,
      currentPage,
      activeTab,
      searchTerm,
    });
  }, [
    allFilteredProjects.length,
    displayedProjects.length,
    hasMore,
    isLoadingMore,
    currentPage,
    activeTab,
    searchTerm,
  ]);

  const clearFilters = () => {
    setActiveTab("all");
    setSearchTerm("");
  };

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

      <GalleryHeader
        scrollProgress={scrollProgress}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main content */}
      <div className="container md:w-10/12 mx-auto py-8 px-4 flex-grow">
        <GalleryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          clearFilters={clearFilters}
          categories={categories}
          setActiveTab={setActiveTab}
          scrollProgress={scrollProgress}
        />

        {isLoading ? (
          <GallerySkeleton />
        ) : (
          <GalleryGrid
            displayedProjects={displayedProjects}
            categories={categories}
            setSelectedProject={setSelectedProject}
            likedProjects={likedProjects}
            toggleLike={toggleLike}
            galleryRef={galleryRef}
            clearFilters={clearFilters}
            sentinelRef={sentinelRef}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
          />
        )}

        <ProjectModal
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
          categories={categories}
          likedProjects={likedProjects}
          toggleLike={toggleLike}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      </div>

      <FloatingScrollButton scrollProgress={scrollProgress} />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Gallery;
