import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Filter } from "lucide-react";
import Navbar from "./Navbar";
import { Menu } from "lucide-react";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import { cn } from "../lib/utils";

const Gallery = () => {
  // Sample projects data - replace with your actual projects
  const projectsData = [
    {
      id: 1,
      title: "Modern Minimalist Living Room",
      category: "living-room",
      style: "minimalist",
      image: "/api/placeholder/800/500",
      description:
        "A clean, minimalist approach focusing on essential elements and neutral tones.",
    },
    {
      id: 2,
      title: "Luxurious Master Bedroom",
      category: "bedroom",
      style: "luxury",
      image: "/api/placeholder/800/500",
      description:
        "Opulent textures and rich colors create a sanctuary of comfort and elegance.",
    },
    {
      id: 3,
      title: "Industrial Kitchen Design",
      category: "kitchen",
      style: "industrial",
      image: "/api/placeholder/800/500",
      description:
        "Raw materials and exposed elements blend with functionality in this modern kitchen.",
    },
    {
      id: 4,
      title: "Scandinavian Dining Space",
      category: "dining",
      style: "scandinavian",
      image: "/api/placeholder/800/500",
      description:
        "Light woods and minimal decor create an inviting dining atmosphere.",
    },
    {
      id: 5,
      title: "Contemporary Office Setup",
      category: "office",
      style: "contemporary",
      image: "/api/placeholder/800/500",
      description:
        "A productive workspace balancing aesthetic appeal with practical functionality.",
    },
    {
      id: 6,
      title: "Bohemian Living Room",
      category: "living-room",
      style: "bohemian",
      image: "/api/placeholder/800/500",
      description:
        "Eclectic patterns and textures for a free-spirited living space.",
    },
  ];

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStyles, setActiveStyles] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Available filter options
  const categories = [
    "all",
    "living-room",
    "bedroom",
    "kitchen",
    "dining",
    "office",
  ];
  const styles = [
    "minimalist",
    "luxury",
    "industrial",
    "scandinavian",
    "contemporary",
    "bohemian",
  ];

  // Initialize projects
  useEffect(() => {
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  // Handle filtering logic
  useEffect(() => {
    let result = [...projects];

    // Filter by category (tab)
    if (activeTab !== "all") {
      result = result.filter((project) => project.category === activeTab);
    }

    // Filter by style tags
    if (activeStyles.length > 0) {
      result = result.filter((project) => activeStyles.includes(project.style));
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(result);
  }, [activeTab, searchTerm, activeStyles, projects]);

  // Handle style filter toggle
  const toggleStyle = (style) => {
    if (activeStyles.includes(style)) {
      setActiveStyles(activeStyles.filter((s) => s !== style));
    } else {
      setActiveStyles([...activeStyles, style]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className=" h-screen"
    >
      <div className="mx-auto px-4 py-6 shadow-lg">
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
        <div className="md:hidden bg-white absolute top-full left-0 w-full border-b border-gray-200 py-4">
          <div className="mx-auto px-4 flex flex-col space-y-4">
            <a
              href="#about"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              Projects
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:text-indigo-600 transition-colors py-2"
            >
              Services
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
      <div className="mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Design Gallery</h1>
          <p className="text-gray-500 mb-8">
            Showcasing crafted spaces that inspire and delight
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <span className="text-sm font-medium">Style:</span>
            </div>
            {styles.map((style) => (
              <Button
                key={style}
                variant={activeStyles.includes(style) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleStyle(style)}
                className="capitalize"
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabs for Categories */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
              >
                {category === "all"
                  ? "All Projects"
                  : category.replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Display projects in a grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + activeStyles.join() + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -5 }}
                      className="h-full"
                    >
                      <Card className="overflow-hidden h-full">
                        <div className="relative overflow-hidden aspect-video">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <Badge className="absolute top-2 right-2 capitalize">
                            {project.style}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-xl font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Gallery;
