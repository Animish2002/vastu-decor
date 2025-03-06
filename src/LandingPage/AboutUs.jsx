import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Clock, Briefcase } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const AboutUs = () => {
  const stats = [
    { value: "15+", label: "Years Experience", icon: <Clock className="h-5 w-5" /> },
    { value: "120", label: "Projects Completed", icon: <Briefcase className="h-5 w-5" /> },
    { value: "36", label: "Design Awards", icon: <Award className="h-5 w-5" /> },
    { value: "18", label: "Team Members", icon: <Users className="h-5 w-5" /> },
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

  return (
    <section id="about" className="py-40 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Content Column */}
          <motion.div className="lg:col-span-6" variants={itemVariants}>
            <div className="mb-6">
              <motion.span 
                variants={itemVariants}
                className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium tracking-wide mb-4"
              >
                OUR STORY
              </motion.span>
              
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900 leading-tight"
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
              <p className="leading-relaxed">
                At <span className="font-semibold text-indigo-700">STUDIOSPACE</span>, we believe that architecture and design are not 
                just about buildings and rooms—they're about creating experiences 
                that resonate with people on a deeper level.
              </p>
              
              <p className="leading-relaxed">
                Founded in 2010, our studio has grown from a small team of
                passionate designers to an award-winning practice recognized for
                our innovative approach to space, form, and function.
              </p>
            </motion.div>
            
            <motion.div className="mt-10 mb-10" variants={itemVariants}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="transition-all duration-300"
                    variants={itemVariants}
                  >
                    <Card className="border-0 bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden h-full">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                        <div className="bg-indigo-50 p-2 rounded-full mb-3 text-indigo-600">
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
            
            <motion.div variants={itemVariants}>
              <Button 
                variant="outline" 
                className="group border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full px-6 py-2 transition-all duration-300"
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
                className="absolute -top-8 right-2 md:w-64 md:h-64 w-48 h-48 bg-indigo-50 rounded-full opacity-70 z-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              
              <motion.div 
                className="absolute -bottom-12 -left-12 md:w-40 md:h-40 w-32 h-32 bg-indigo-100 rounded-full opacity-70 z-0"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              {/* Main image */}
              <motion.div 
                className="relative z-10 rounded-2xl overflow-hidden shadow-xl border border-slate-100"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <img
                  src="/api/placeholder/600/800"
                  alt="Studio Portrait"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Quote card */}
              <motion.div
                className="absolute -bottom-6 right-2 bg-white p-6 rounded-xl shadow-lg max-w-xs z-20 border border-slate-100"
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;