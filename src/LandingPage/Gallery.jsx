import React, { useState, useEffect, useRef } from "react";
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
  const galleryRef = useRef(null);
  const sentinelRef = useRef(null);
  const projectsPerPage = 12;

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

    setAllFilteredProjects(result);
    setHasMore(result.length > projectsPerPage);

    // Reset displayed projects to first batch
    const initialProjects = result.slice(0, projectsPerPage);
    setDisplayedProjects(initialProjects);
  }, [activeTab, searchTerm, projects]);

  // Load more projects function
  const loadMoreProjects = () => {
    console.log("Load more triggered:", {
      isLoadingMore,
      hasMore,
      displayedCount: displayedProjects.length,
      totalCount: allFilteredProjects.length,
    });

    if (isLoadingMore || !hasMore || allFilteredProjects.length === 0) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      const nextIndex = displayedProjects.length; // Use displayed projects length instead
      const nextProjects = allFilteredProjects.slice(
        nextIndex,
        nextIndex + projectsPerPage
      );

      console.log("Loading projects:", {
        nextIndex,
        nextProjectsCount: nextProjects.length,
      });

      if (nextProjects.length > 0) {
        setDisplayedProjects((prev) => [...prev, ...nextProjects]);
        setHasMore(nextIndex + projectsPerPage < allFilteredProjects.length);
      } else {
        setHasMore(false);
      }

      setIsLoadingMore(false);
    }, 800); // Simulate loading time
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!allFilteredProjects.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          loadMoreProjects();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px",
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [
    hasMore,
    isLoadingMore,
    allFilteredProjects.length,
    displayedProjects.length,
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
