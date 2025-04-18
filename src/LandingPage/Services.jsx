import React from "react";
import { Card, CardContent } from "../components/ui/card";


const Services = () => {
  const services = [
    {
      title: "Interior Painting",
      description:
        "Transform your living spaces with premium finishes and expert color consultation.",
      gifSrc: "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996425/InteriorPainting_rlxbma.gif",
      altText: "Interior painting service",
    },
    {
      title: "Exterior Painting",
      description:
        "Weather-resistant, long-lasting solutions that enhance curb appeal and protect your property.",
      gifSrc: "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996419/ExteriorPainting-1_khby7z.gif",
      altText: "Exterior painting service",
    },
    {
      title: "Waterproofing",
      description:
        "Protect your property from moisture damage and prevent costly repairs.",
      gifSrc: "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996431/WaterProofing-1_ewm0ei.gif",
      altText: "Waterproofing service",
    },
    {
      title: "Custom Furniture",
      description:
        "Handcrafted pieces designed to your specifications, combining aesthetics and functionality.",
      gifSrc: "/api/placeholder/400/320",
      altText: "Custom furniture",
    },
    {
      title: "Interior Design",
      description:
        "Full-service design that transforms spaces into harmonious environments reflecting your style.",
      gifSrc: "/api/placeholder/400/320",
      altText: "Interior design service",
    },
    {
      title: "Kitchen Remodeling",
      description:
        "Complete renovation from layout planning to installation, creating beautiful cooking spaces.",
      gifSrc: "/api/placeholder/400/320",
      altText: "Kitchen remodeling",
    },
    {
      title: "Tile Installation",
      description:
        "Expert installation for floors, walls, and backsplashes using premium materials.",
      gifSrc: "/api/placeholder/400/320",
      altText: "Tile installation",
    },
    {
      title: "Plumbing Services",
      description:
        "Professional installation and repairs for efficient water systems throughout your property.",
      gifSrc: "/api/placeholder/400/320",
      altText: "Plumbing service",
    },
    {
      title: "Electrical Work",
      description:
        "Safe and reliable installations and repairs by certified professionals.",
      gifSrc: "/api/placeholder/400/320",
      altText: "Electrical work",
    },
    {
      title: "Deep Cleaning",
      description:
        "Thorough cleaning services that restore shine and hygiene to all areas of your space.",
      gifSrc: "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996419/deep-cleaning_ogi4fb.gif",
      altText: "Deep cleaning service",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 relative inline-block heading">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg mt-6">
            Comprehensive home improvement and design services delivered with
            precision and artistry, transforming ordinary spaces into
            extraordinary environments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0 rounded-lg group"
            >
              <div className="h-40 overflow-hidden p-4">
                <img
                  src={service.gifSrc}
                  alt={service.altText}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-gray-900 heading">
                  {service.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r bg-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <span className="text-indigo-300 font-medium text-sm uppercase tracking-wider mb-2 heading">
                Expert Team
              </span>
              <h3 className="text-3xl font-bold mb-6 text-white heading">
                Ready to Transform Your Space?
              </h3>
              <p className="text-indigo-100 mb-8 text-lg">
                Schedule a free consultation with our design experts and receive
                a personalized quote tailored to your project needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-indigo-900 px-8 py-3 rounded-md hover:bg-indigo-50 transition-colors font-medium shadow-lg">
                  Get a Free Quote
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-md hover:bg-slate-800 transition-colors font-medium">
                  View Our Portfolio
                </button>
              </div>
            </div>
            <div className="relative h-72 lg:h-auto bg-indigo-400 flex items-center justify-center overflow-hidden">
              <img
                src="https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996424/image_brndrr.avif"
                alt="Service showcase"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
