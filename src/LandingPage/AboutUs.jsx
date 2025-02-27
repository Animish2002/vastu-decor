import React from "react";
import { ChevronRight, ArrowRight } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "120", label: "Projects Completed" },
    { value: "36", label: "Design Awards" },
    { value: "18", label: "Team Members" },
  ];
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Designing Spaces That Tell Your Story
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              At STUDIOSPACE, we believe that architecture and design are not
              just about buildings and rooms—they're about creating experiences
              that resonate with people on a deeper level.
            </p>
            <p className="text-gray-700 mb-8 text-lg">
              Founded in 2010, our studio has grown from a small team of
              passionate designers to an award-winning practice recognized for
              our innovative approach to space, form, and function.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium">
              Learn more about our studio{" "}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>

          <div className="relative">
            <img
              src="/api/placeholder/600/800"
              alt="Studio Portrait"
              className="rounded-lg shadow-xl w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <p className="italic text-gray-700 mb-3">
                "Architecture is not about space but about how we exist in it."
              </p>
              <p className="font-medium text-gray-900">- Principal Architect</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
