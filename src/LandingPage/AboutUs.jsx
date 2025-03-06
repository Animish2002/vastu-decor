import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

const AboutUs = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "120", label: "Projects Completed" },
    { value: "36", label: "Design Awards" },
    { value: "18", label: "Team Members" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="about" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-none px-3 py-1">
              Our Story
            </Badge>
            
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Designing Spaces That <span className="text-indigo-600">Tell Your Story</span>
            </motion.h2>
            
            <Separator className="mb-8 bg-indigo-200 w-24 h-1" />
            
            <motion.p 
              className="text-gray-700 mb-6 text-lg leading-relaxed"
              variants={itemVariants}
            >
              At <span className="font-semibold text-indigo-700">STUDIOSPACE</span>, we believe that architecture and design are not 
              just about buildings and rooms—they're about creating experiences 
              that resonate with people on a deeper level.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 mb-10 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Founded in 2010, our studio has grown from a small team of
              passionate designers to an award-winning practice recognized for
              our innovative approach to space, form, and function.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  variants={itemVariants}
                >
                  <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-indigo-600 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button 
                variant="outline" 
                className="group border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Learn more about our studio
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
           
            
            <motion.img
              src="/api/placeholder/600/800"
              alt="Studio Portrait"
              className="rounded-lg shadow-xl w-full h-full object-cover relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.3 }}
            />
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl max-w-xs z-20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="italic text-gray-700 mb-3 leading-relaxed">
                "Architecture is not about space but about how we exist in it."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-1 bg-indigo-600 mr-3" />
                <p className="font-medium text-gray-900">Principal Architect</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;