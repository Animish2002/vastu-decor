import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight } from "lucide-react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6">
            <p className="text-xs text-indigo-300 mb-1">{project.category}</p>
            <h3 className="text-xl font-bold text-white mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-300">{project.location}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-indigo-600 mb-1">{project.category}</p>
            <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
          </div>
          <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
