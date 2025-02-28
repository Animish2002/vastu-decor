import React from "react";
import { Card, CardContent } from "../components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Architectural Design",
      description:
        "From concept to completion, we create spaces that harmonize form and function through thoughtful architectural design.",
      icon: "🏛️",
    },
    {
      title: "Interior Design",
      description:
        "We transform interiors into cohesive, expressive spaces that reflect the unique character of our clients and their needs.",
      icon: "🪑",
    },
    {
      title: "Sustainable Solutions",
      description:
        "Integrating eco-friendly practices and materials that minimize environmental impact without compromising on design excellence.",
      icon: "🌱",
    },
    {
      title: "3D Visualization",
      description:
        "Bringing designs to life with photorealistic renderings to help clients envision their future spaces with clarity.",
      icon: "🖥️",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className=" mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-neutral-900">
            Our Services
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We offer comprehensive design services tailored to your unique
            needs, guiding projects from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-shadow bg-white"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-rectangle rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Start Your Project?
              </h3>
              <p className="text-indigo-100 mb-6">
                Book a consultation with our team to discuss your vision and how
                we can bring it to life.
              </p>
              <button className="bg-white text-indigo-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors self-start">
                Schedule Consultation
              </button>
            </div>
            <div className="relative h-64 lg:h-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
