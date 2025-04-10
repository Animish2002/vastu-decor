import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Clock, Briefcase, Camera, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const AboutUs = () => {
  const stats = [
    { value: "15+", label: "Years Experience", icon: <Clock className="h-5 w-5" /> },
    { value: "120", label: "Projects Completed", icon: <Briefcase className="h-5 w-5" /> },
    { value: "36", label: "Design Awards", icon: <Award className="h-5 w-5" /> },
    { value: "18", label: "Team Members", icon: <Users className="h-5 w-5" /> },
  ];

  const services = [
    "Residential Design",
    "Commercial Spaces",
    "Interior Transformation",
    "Sustainable Architecture"
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
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="py-40 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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
            repeatType: "reverse"
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
            repeatType: "reverse"
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
          {/* Content Column */}
          <motion.div className="lg:col-span-6" variants={itemVariants}>
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
                Designing Spaces That <span className="text-indigo-600 relative">
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
                At <span className="font-semibold text-indigo-700">STUDIOSPACE</span>, we believe that architecture and design are not 
                just about buildings and rooms—they're about creating experiences 
                that resonate with people on a deeper level.
              </p>
              
              <p className="leading-relaxed text-lg">
                Founded in 2010, our studio has grown from a small team of
                passionate designers to an award-winning practice recognized for
                our innovative approach to space, form, and function.
              </p>
            </motion.div>

            {/* Services list */}
            <motion.div className="mb-10 grid grid-cols-2 gap-3" variants={itemVariants}>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
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
                        <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                className="group bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-6 transition-all duration-300"
              >
                Get started with us
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline" 
                className="group border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full px-6 py-6 transition-all duration-300"
              >
                Learn more about our studio
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Image Column */}
          <motion.div 
            className="relative lg:col-span-6"
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
              
              {/* Floating images grid */}
              <motion.div 
                className="relative z-10 grid grid-cols-12 grid-rows-6 gap-4 h-full"
                variants={itemVariants}
              >
                {/* Main image */}
                <motion.div 
                  className="col-span-8 row-span-6 rounded-2xl overflow-hidden shadow-xl border border-slate-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  <img
                    src="/api/placeholder/600/800"
                    alt="Studio Portrait"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Smaller image 1 */}
                <motion.div 
                  className="col-span-4 row-span-3 rounded-xl overflow-hidden shadow-lg border border-slate-100"
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                >
                  <img
                    src="/api/placeholder/300/300"
                    alt="Project Detail"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Smaller image 2 */}
                <motion.div 
                  className="col-span-4 row-span-3 rounded-xl overflow-hidden shadow-lg border border-slate-100"
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: "1s" }}
                >
                  <img
                    src="/api/placeholder/300/300"
                    alt="Design Process"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
              
              {/* Quote card */}
              <motion.div
                className="absolute -bottom-8 right-2 bg-white p-6 rounded-xl shadow-lg max-w-xs z-20 border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="italic text-slate-700 mb-4 leading-relaxed">
                  "Architecture is not about space but about how we exist in it."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-1 bg-indigo-600 rounded-full mr-3" />
                  <p className="font-medium text-slate-900">Principal Architect</p>
                </div>
              </motion.div>
              
              {/* Camera badge */}
              <motion.div
                className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg z-20"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
                whileHover={{ 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Camera className="h-6 w-6 text-indigo-600" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;