import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import ProjectCard from "./ProjectCard";
import { ChevronRight } from "lucide-react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const projects = [
    {
      id: 1,
      title: "Luminous Loft",
      category: "Residential",
      description:
        "A modern urban loft designed to maximize natural light with an open floor plan and minimalist aesthetic.",
      location: "New York, NY",
      year: "2023",
      images: [
        "/api/placeholder/900/600",
        "/api/placeholder/900/600",
        "/api/placeholder/900/600",
      ],
    },
    {
      id: 2,
      title: "Serenity Spa & Wellness",
      category: "Commercial",
      description:
        "A tranquil wellness center featuring sustainable materials and biophilic design principles.",
      location: "Los Angeles, CA",
      year: "2022",
      images: ["/api/placeholder/900/600", "/api/placeholder/900/600"],
    },
    {
      id: 3,
      title: "Canopy Office Complex",
      category: "Commercial",
      description:
        "A corporate headquarters designed with employee wellbeing and collaboration at its core.",
      location: "Seattle, WA",
      year: "2024",
      images: [
        "/api/placeholder/900/600",
        "/api/placeholder/900/600",
        "/api/placeholder/900/600",
      ],
    },
    {
      id: 4,
      title: "Horizon House",
      category: "Residential",
      description:
        "A coastal home that blends into the landscape with panoramic views and sustainable features.",
      location: "Malibu, CA",
      year: "2023",
      images: ["/api/placeholder/900/600", "/api/placeholder/900/600"],
    },
    {
      id: 5,
      title: "Kinetic Gallery",
      category: "Cultural",
      description:
        "A contemporary art gallery with adaptive spaces that transform based on exhibition needs.",
      location: "Chicago, IL",
      year: "2022",
      images: [
        "/api/placeholder/900/600",
        "/api/placeholder/900/600",
        "/api/placeholder/900/600",
      ],
    },
    {
      id: 6,
      title: "Echo Pavilion",
      category: "Cultural",
      description:
        "An acoustic outdoor pavilion designed for concerts and community gatherings.",
      location: "Austin, TX",
      year: "2024",
      images: ["/api/placeholder/900/600", "/api/placeholder/900/600"],
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Our Featured Projects
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore our diverse portfolio of residential, commercial, and
            cultural projects that showcase our commitment to thoughtful design.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="flex justify-center mb-10">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
          </TabsList>

          <TabsContent
            value="all"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </TabsContent>

          <TabsContent
            value="residential"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects
              .filter((p) => p.category === "Residential")
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setActiveProject(project)}
                />
              ))}
          </TabsContent>

          <TabsContent
            value="commercial"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects
              .filter((p) => p.category === "Commercial")
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setActiveProject(project)}
                />
              ))}
          </TabsContent>

          <TabsContent
            value="cultural"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects
              .filter((p) => p.category === "Cultural")
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setActiveProject(project)}
                />
              ))}
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <button className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors">
            View All Projects <ChevronRight size={20} className="ml-2" />
          </button>
        </div>

        {activeProject && (
          <Dialog
            open={!!activeProject}
            onOpenChange={() => setActiveProject(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{activeProject.title}</DialogTitle>
                <DialogDescription>
                  {activeProject.category} | {activeProject.location} |{" "}
                  {activeProject.year}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <img
                    src={activeProject.images[0]}
                    alt={activeProject.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-700 mb-6">
                    {activeProject.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {activeProject.images.slice(1).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${activeProject.title} ${idx + 2}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  <div className="mt-auto">
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                      View Case Study
                    </button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default Projects;
