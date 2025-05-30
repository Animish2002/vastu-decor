import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  ArrowRight,
  Linkedin,
  CheckCircle,
  AlertCircle,
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
    message: "",
  });

  const [submitState, setSubmitState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  // Replace 'YOUR_FORM_ID' with your actual Formspree form ID

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

  const contactInfo = [
    {
      icon: <Mail className="text-indigo-600" size={20} />,
      text: "vastudecorandhomesolutions@gmail.com",
    },
    {
      icon: <Phone className="text-indigo-600" size={20} />,
      text: "+1 (555) 123-4567",
    },
    {
      icon: <MapPin className="text-indigo-600" size={20} />,
      text: "Shop no 1, ground floor, Moze College, Ground Floor, Plot no 2627, Balewadi, Pune, Maharashtra 411045",
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, href: "#instagram" },
    { icon: <Twitter size={18} />, href: "#twitter" },
    { icon: <Linkedin size={18} />, href: "#linkedin" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, projectType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      const response = await fetch(import.meta.env.FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          mobile: formState.mobile,
          projectType: formState.projectType,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitState({
          isSubmitting: false,
          isSubmitted: true,
          error: null,
        });
        // Reset form
        setFormState({
          name: "",
          email: "",
          mobile: "",
          projectType: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitState({
        isSubmitting: false,
        isSubmitted: false,
        error: "Failed to send message. Please try again.",
      });
    }
  };

  const resetForm = () => {
    setSubmitState({ isSubmitting: false, isSubmitted: false, error: null });
  };

  return (
    <section
      id="contact"
      className="py-32 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <motion.div variants={itemVariants}>
            <motion.span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              Contact Us
            </motion.span>

            <motion.h2
              className="text-4xl font-bold mb-4 text-gray-900 heading"
              variants={itemVariants}
            >
              Let's <span className="text-indigo-600">Connect</span>
            </motion.h2>

            <Separator className="mb-8 bg-indigo-200 w-24 h-1" />

            <motion.p
              className="text-gray-700 mb-10 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Ready to transform your space? Contact us to discuss your project
              or schedule a consultation with our award-winning team.
            </motion.p>

            <motion.div className="space-y-6 mb-10" variants={itemVariants}>
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-indigo-100 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex space-x-4" variants={itemVariants}>
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="absolute -z-10 w-full h-full bg-indigo-100 rounded-lg"
              style={{ top: "15px", left: "15px" }}
            />

            <Card className="shadow-xl border-none overflow-hidden relative z-10">
              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  Send Us a Message
                </h3>
                <Separator className="mt-2 bg-gray-200" />
              </CardHeader>

              <CardContent className="pb-8">
                {submitState.isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle
                      className="mx-auto text-green-600 mb-4"
                      size={48}
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitState.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <AlertCircle className="text-red-600 mr-2" size={16} />
                        <span className="text-red-800 text-sm">
                          {submitState.error}
                        </span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          required
                          className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-gray-700">
                          Mobile Number
                        </Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          type="text"
                          value={formState.mobile}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project-type" className="text-gray-700">
                          Project Type
                        </Label>
                        <Select
                          onValueChange={handleSelectChange}
                          value={formState.projectType}
                          name="projectType"
                        >
                          <SelectTrigger
                            id="project-type"
                            className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                          >
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">
                              Residential Design
                            </SelectItem>
                            <SelectItem value="commercial">
                              Commercial Space
                            </SelectItem>
                            <SelectItem value="office">
                              Office Interior
                            </SelectItem>
                            <SelectItem value="renovation">
                              Renovation
                            </SelectItem>
                            <SelectItem value="cultural">
                              Cultural/Public Space
                            </SelectItem>
                            <SelectItem value="consultation">
                              Design Consultation
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="Brief subject of your inquiry"
                        required
                        className="focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, requirements, and questions..."
                        required
                        className="resize-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-lg"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button
                        type="submit"
                        disabled={submitState.isSubmitting}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed"
                      >
                        <motion.span
                          initial={{ opacity: 1 }}
                          whileHover={{
                            opacity: [1, 0.8, 1],
                            transition: { repeat: Infinity, duration: 2 },
                          }}
                          className="flex items-center justify-center"
                        >
                          {submitState.isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight size={16} className="ml-2" />
                            </>
                          )}
                        </motion.span>
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
