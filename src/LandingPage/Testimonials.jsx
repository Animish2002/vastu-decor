import React from "react";
import { Card, CardContent } from "../components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      text: "STUDIOSPACE provided outstanding service and transformed our vision into reality.",
      name: "John Doe",
      role: "CEO, Tech Corp",
    },
    {
      text: "I highly recommend STUDIOSPACE for their professionalism and creativity.",
      name: "Jane Smith",
      role: "Marketing Director, XYZ Ltd.",
    },
    {
      text: "A truly remarkable experience working with the team at STUDIOSPACE!",
      name: "Alex Johnson",
      role: "Founder, Startup Hub",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-neutral-900">
            Client Testimonials
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear from our clients about their experience working with
            STUDIOSPACE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-8">
                <div className="mb-6">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.667 13.333H5.33366C5.33366 8 9.33366 5.333 13.3337 5.333L12.0003 8C10.667 8.667 9.33366 10 9.33366 12C9.33366 12 10.667 12 10.667 13.333ZM21.3337 13.333H16.0003C16.0003 8 20.0003 5.333 24.0003 5.333L22.667 8C21.3337 8.667 20.0003 10 20.0003 12C20.0003 12 21.3337 12 21.3337 13.333Z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M5.33366 13.333H10.667V21.333C10.667 22.8 9.46699 24 8.00033 24H8.00033C6.53366 24 5.33366 22.8 5.33366 21.333V13.333ZM16.0003 13.333H21.3337V21.333C21.3337 22.8 20.1337 24 18.667 24H18.667C17.2003 24 16.0003 22.8 16.0003 21.333V13.333Z"
                      fill="#4F46E5"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="mr-4 bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
