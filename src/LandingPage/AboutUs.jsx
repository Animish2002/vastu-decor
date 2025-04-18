import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Users,
  Clock,
  Briefcase,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const AboutUs = () => {
  const stats = [
    {
      value: "8+",
      label: "Years Experience",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      value: "120",
      label: "Projects Completed",
      icon: <Briefcase className="h-5 w-5" />,
    },
    { value: "30", label: "Team Members", icon: <Users className="h-5 w-5" /> },
  ];

  const services = [
    "Residential Design",
    "Commercial Spaces",
    "Interior Transformation",
    "Sustainable Architecture",
  ];

  const image1 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996092/PHOTO-2024-10-19-13-59-02_1_hgtxse.jpg";
  const image2 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996060/eb6c2f404ac964f6d4b006d6694ee866_rfwg34.jpg";
  const image3 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744998109/IMG_4229_fi8mss_el1quh.jpg";
  const image4 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996059/caf2f491ed8dbf054553e8148e995ddc_r0su0j.jpg";
  const image5 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1744996058/bad1ffe8332b31eaee696bba029b34f6_vg3v89.jpg";

  const carouselImages = [
    { src: image1, alt: "Studio Portrait" },
    { src: image2, alt: "Design Concept" },
    { src: image3, alt: "Team Working" },
    { src: image4, alt: "Project Showcase" },
    { src: image5, alt: "Interior Design" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section
      id="about"
      className="py-40 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-50 opacity-40"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-blue-50 opacity-30"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Image Column with Carousel (now on the left) */}
          <motion.div
            className="relative lg:col-span-6 order-2 lg:order-1"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Background decorative elements */}
              <motion.div
                className="absolute -top-12 right-2 md:w-72 md:h-72 w-48 h-48 bg-indigo-50 rounded-full opacity-70 z-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />

              <motion.div
                className="absolute -bottom-16 -left-16 md:w-48 md:h-48 w-32 h-32 bg-indigo-100 rounded-full opacity-70 z-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {/* Carousel using shadcn/ui */}
              <motion.div className="relative z-10" variants={itemVariants}>
                <Carousel
                  plugins={[plugin.current]}
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                  className="w-full"
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {carouselImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card className="border-0 overflow-hidden rounded-2xl shadow-xl">
                            <CardContent className="flex aspect-square items-center justify-center p-0">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-white/70 hover:bg-white text-indigo-600 border-none" />
                  <CarouselNext className="right-2 bg-white/70 hover:bg-white text-indigo-600 border-none" />
                </Carousel>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column (now on the right) */}
          <motion.div
            className="lg:col-span-6 order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="mb-6">
              <motion.span
                variants={itemVariants}
                className="inline-block py-1 px-4 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium tracking-wide mb-4 shadow-sm"
              >
                OUR STORY
              </motion.span>

              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight heading"
                variants={itemVariants}
              >
                Designing Spaces That{" "}
                <span className="text-indigo-600 relative">
                  Tell Your Story
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-indigo-100 rounded-full"></span>
                </span>
              </motion.h2>
            </div>

            <motion.div
              className="space-y-5 text-slate-700 mb-8"
              variants={itemVariants}
            >
              <p className="leading-relaxed text-lg">
                At{" "}
                <span className="font-semibold text-indigo-700">
                  VastuDecor
                </span>
                , we believe that architecture and design are not just about
                buildings and rooms—they're about creating experiences that
                resonate with people on a deeper level.
              </p>

              <p className="leading-relaxed text-lg">
                Founded in 2020, our studio has grown from a small team of
                passionate designers to an award-winning practice recognized for
                our innovative approach to space, form, and function.
              </p>
            </motion.div>

            {/* Services list */}
            <motion.div
              className="mb-10 grid grid-cols-2 gap-3"
              variants={itemVariants}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="h-5 w-5 text-indigo-500" />
                  <span className="text-slate-700">{service}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="mt-12 mb-12" variants={itemVariants}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="transition-all duration-300"
                    variants={itemVariants}
                  >
                    <Card className="border-0 bg-white rounded-xl shadow-md overflow-hidden h-full">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                        <div className="bg-indigo-50 p-3 rounded-full mb-3 text-indigo-600">
                          {stat.icon}
                        </div>
                        <p className="text-3xl font-bold text-slate-900 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-sm font-medium text-slate-600">
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
