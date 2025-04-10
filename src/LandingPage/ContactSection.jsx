import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    mobile: "",
    projectType: "",
    subject: "",
    message: ""
  });

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

  const contactInfo = [
    {
      icon: <Mail className="text-indigo-600" size={20} />,
      text: "vastudecorandhomesolutions@gmail.com",
      label: "Email"
    },
    {
      icon: <Phone className="text-indigo-600" size={20} />,
      text: "+1 (555) 123-4567",
      label: "Phone"
    },
    {
      icon: <MapPin className="text-indigo-600" size={20} />,
      text: "Shop no 1, ground floor, Moze College, Plot no 2627, Balewadi, Pune, Maharashtra 411045",
      label: "Address"
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "#instagram", label: "Instagram" },
    { icon: <Twitter size={20} />, href: "#twitter", label: "Twitter" },
    { icon: <Linkedin size={20} />, href: "#linkedin", label: "LinkedIn" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormState(prev => ({ ...prev, projectType: value }));
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
            Get in Touch
          </motion.span>
          <motion.h2 variants={itemVariants} className="heading text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Contact Us
          </motion.h2>
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-600 text-lg">
            Ready to transform your space? Reach out to discuss your project or schedule a consultation with our award-winning team.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Info Column */}
          <motion.div 
            className="lg:col-span-4 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">How to Reach Us</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    whileHover={{ x: 3 }}
                  >
                    <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-indigo-100 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                        {item.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Separator className="my-8" />
              
              <div>
                <h4 className="text-lg font-medium mb-4 text-gray-800">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      aria-label={link.label}
                      className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                      whileHover={{ y: -4, scale: 1.05 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center mb-4">
                <MessageSquare className="mr-3" size={24} />
                <h3 className="text-xl font-semibold">Quick Consultation</h3>
              </div>
              <p className="mb-6 opacity-90">
                Need immediate assistance with your design project? Call us directly or schedule a video consultation.
              </p>
              <Button className="w-full bg-white text-indigo-700 hover:bg-gray-100 group flex items-center justify-center">
                Schedule Now
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <Card className="shadow-xl border-none overflow-hidden rounded-2xl bg-white">
                <CardHeader className="pb-4 pt-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Send Us a Message
                  </h3>
                  <p className="text-gray-500">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>

                <CardContent className="pb-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                        <Input
                          id="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-gray-700">Mobile Number</Label>
                        <Input
                          id="mobile"
                          type="text"
                          value={formState.mobile}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="project-type" className="text-gray-700">Project Type</Label>
                        <Select onValueChange={handleSelectChange} value={formState.projectType}>
                          <SelectTrigger
                            id="project-type"
                            className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                          >
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential Design</SelectItem>
                            <SelectItem value="commercial">Commercial Space</SelectItem>
                            <SelectItem value="office">Office Interior</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                            <SelectItem value="cultural">Cultural/Public Space</SelectItem>
                            <SelectItem value="consultation">Design Consultation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                      <Input
                        id="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="Brief subject of your inquiry"
                        className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">Your Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, requirements, and questions..."
                        className="resize-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                      />
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                      >
                        <motion.span
                          initial={{ opacity: 1 }}
                          whileHover={{
                            opacity: [1, 0.8, 1],
                            transition: { repeat: Infinity, duration: 2 },
                          }}
                          className="flex items-center justify-center"
                        >
                          Send Message
                          <ArrowRight size={16} className="ml-2" />
                        </motion.span>
                      </Button>
                    </motion.div>
                    
                   
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;