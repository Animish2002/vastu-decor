import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Download,
  SquareArrowRight,
  SquareArrowLeft,
} from "lucide-react";

const ProjectModal = ({
  selectedProject,
  setSelectedProject,
  projects,
  categories,
  likedProjects,
  toggleLike,
  isMuted,
  setIsMuted,
}) => {
  const videoRef = useRef(null);

  const navigateProject = useCallback(
    (direction) => {
      if (!selectedProject) return;

      const currentIndex = projects.findIndex(
        (p) => p.id === selectedProject.id
      );
      if (currentIndex === -1) return;

      let newIndex;
      if (direction === "next") {
        newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
      }

      setSelectedProject(projects[newIndex]);
    },
    [selectedProject, projects, setSelectedProject]
  );

  // Keyboard navigation handler - only for md screens and above
  const handleKeyDown = useCallback(
    (event) => {
      // Check if screen is medium size or larger (768px+)
      const isMdScreenOrLarger = window.innerWidth >= 768;

      if (!isMdScreenOrLarger) return;

      // Handle arrow keys
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateProject("prev");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateProject("next");
      } else if (event.key === "Escape") {
        event.preventDefault();
        setSelectedProject(null);
      }
    },
    [navigateProject, setSelectedProject]
  );

  // Add keyboard event listeners when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedProject, handleKeyDown]);

  const handleDownload = async (project) => {
    try {
      const url =
        project.type === "video"
          ? project.video || project.image
          : project.image || project.thumbnail;

      const filename = `vastudecor-project-${project.id}.${
        project.type === "video" ? "mp4" : "jpg"
      }`;

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      if (
        new URL(url, window.location.origin).origin !== window.location.origin
      ) {
        const response = await fetch(url);
        const blob = await response.blob();
        link.href = URL.createObjectURL(blob);
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (link.href.startsWith("blob:")) {
        URL.revokeObjectURL(link.href);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = async (project) => {
    const shareData = {
      projectId: project.id,
      title: project.title || `Vastu Decor Project ${project.id}`,
      text:
        project.description ||
        `Check out this amazing interior design project ${project.id} from Vastu Decor.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Dialog
      open={!!selectedProject}
      onOpenChange={(open) => !open && setSelectedProject(null)}
      className=""
    >
      <DialogContent className="w-full p-0 overflow-hidden max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:h-[90vh] h-[70vh] "
          >
            <DialogHeader className="p-4 border-b border-gray-100 dark:border-gray-800">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {selectedProject.title || `Design Id ${selectedProject.id}`}
              </DialogTitle>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-2 mt-1">
                <span>ID: {selectedProject.id}</span>
                <span>•</span>
                <span>
                  Category:{" "}
                  {categories.find((c) => c.id === selectedProject.category)
                    ?.name || selectedProject.category}
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
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <motion.img
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={selectedProject.image || selectedProject.thumbnail}
                  alt={`Design Id: ${selectedProject.id}`}
                  className={`max-w-full max-h-[70vh] object-contain ${
                    selectedProject.orientation === "portrait"
                      ? "h-full"
                      : "w-full"
                  }`}
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

            <ModalFooter
              selectedProject={selectedProject}
              navigateProject={navigateProject}
              toggleLike={toggleLike}
              likedProjects={likedProjects}
              handleShare={handleShare}
              handleDownload={handleDownload}
              setSelectedProject={setSelectedProject}
            />
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ModalFooter = ({
  selectedProject,
  navigateProject,
  toggleLike,
  likedProjects,
  handleShare,
  handleDownload,
  setSelectedProject,
}) => (
  <div className="p-3 md:p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="hidden md:flex justify-between items-center">
      <div className="flex space-x-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => toggleLike(selectedProject.id, e)}
            className={`${
              likedProjects.has(selectedProject.id)
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-gray-600"
            }`}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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

      <div className="flex space-x-1">
        <DialogClose asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 dark:border-gray-700"
            >
              Close
            </Button>
          </motion.div>
        </DialogClose>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateProject("next")}
            className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
          >
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
        {/* Keyboard navigation hint - only visible on md screens and above */}
      </div>
    </div>
    <div className="hidden md:flex mx-auto mt-2 text-xs text-gray-500 dark:text-gray-400 justify-center items-center space-x-1">
      <span className="text-sm opacity-70">
        Can Use <SquareArrowRight className="h-4 w-4 inline mb-1 mr-2" />
        <SquareArrowRight className="h-4 w-4 inline mb-1" /> keys to navigate
      </span>
    </div>
    <MobileFooter
      selectedProject={selectedProject}
      navigateProject={navigateProject}
      toggleLike={toggleLike}
      likedProjects={likedProjects}
      handleShare={handleShare}
      handleDownload={handleDownload}
      setSelectedProject={setSelectedProject}
    />
  </div>
);

const MobileFooter = ({
  selectedProject,
  navigateProject,
  toggleLike,
  likedProjects,
  handleShare,
  handleDownload,
  setSelectedProject,
}) => (
  <div className="md:hidden space-y-3">
    <div className="flex justify-between items-center">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateProject("prev")}
          className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden xs:inline">Prev</span>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateProject("next")}
          className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3"
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </motion.div>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => toggleLike(selectedProject.id, e)}
            className={`${
              likedProjects.has(selectedProject.id)
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-gray-600"
            } h-9 w-9`}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleShare(selectedProject);
            }}
            className="text-gray-500 hover:text-gray-600 h-9 w-9"
            aria-label="Share project"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(selectedProject);
            }}
            className="text-gray-500 hover:text-gray-600 h-9 w-9"
            aria-label="Download project"
          >
            <Download className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <DialogClose asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 dark:border-gray-700 px-4"
          >
            Close
          </Button>
        </motion.div>
      </DialogClose>
    </div>
  </div>
);

export default ProjectModal;
