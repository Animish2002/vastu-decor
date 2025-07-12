import React, { useState } from "react";
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
  ChevronDown,
} from "lucide-react";

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

  const [selectOpen, setSelectOpen] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="text-indigo-600" size={20} />,
      text: "vastudecorandhomesolutions@gmail.com",
    },
    {
      icon: <Phone className="text-indigo-600" size={20} />,
      text: "+91-9545437436",
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

  const projectTypes = [
    { value: "residential", label: "Residential Design" },
    { value: "commercial", label: "Commercial Space" },
    { value: "office", label: "Office Interior" },
    { value: "renovation", label: "Renovation" },
    { value: "cultural", label: "Cultural/Public Space" },
    { value: "consultation", label: "Design Consultation" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, projectType: value }));
    setSelectOpen(false);
  };

  const handleSubmit = async () => {
    setSubmitState({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      const response = await fetch("https://formspree.io/f/xpwraqbp", {
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
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
              Contact Us
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Let's <span className="text-indigo-600">Connect</span>
            </h2>

            <div className="w-24 h-1 bg-indigo-200 mb-6 lg:mb-8"></div>

            <p className="text-gray-700 mb-8 lg:mb-10 text-base sm:text-lg leading-relaxed">
              Ready to transform your space? Contact us to discuss your project
              or schedule a consultation with our award-winning team.
            </p>

            <div className="space-y-4 sm:space-y-6 mb-8 lg:mb-10">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start sm:items-center group transition-transform duration-200 hover:translate-x-1"
                >
                  <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 group-hover:text-indigo-600 transition-colors text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 hover:scale-110"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -z-10 w-full h-full bg-indigo-100 rounded-lg transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4"></div>

            <div className="bg-white shadow-xl border-0 rounded-lg overflow-hidden relative z-10">
              <div className="px-6 py-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Send Us a Message
                </h3>
              </div>

              <div className="px-6 py-6">
                {submitState.isSubmitted ? (
                  <div className="text-center py-8">
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
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {submitState.error && (
                      <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="text-red-600 mr-2" size={16} />
                        <span className="text-red-800 text-sm">
                          {submitState.error}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-gray-700 text-sm font-medium"
                        >
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formState.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-gray-700 text-sm font-medium"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="mobile"
                          className="text-gray-700 text-sm font-medium"
                        >
                          Mobile Number
                        </label>
                        <input
                          id="mobile"
                          name="mobile"
                          type="text"
                          value={formState.mobile}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="project-type"
                          className="text-gray-700 text-sm font-medium"
                        >
                          Project Type
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setSelectOpen(!selectOpen)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-left bg-white flex items-center justify-between"
                          >
                            <span
                              className={
                                formState.projectType
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }
                            >
                              {formState.projectType
                                ? projectTypes.find(
                                    (p) => p.value === formState.projectType
                                  )?.label
                                : "Select a project type"}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`transform transition-transform ${
                                selectOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {selectOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                              {projectTypes.map((type) => (
                                <button
                                  key={type.value}
                                  type="button"
                                  onClick={() => handleSelectChange(type.value)}
                                  className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                >
                                  {type.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-gray-700 text-sm font-medium"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="Brief subject of your inquiry"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-gray-700 text-sm font-medium"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, requirements, and questions..."
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitState.isSubmitting}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                    >
                      <span className="flex items-center justify-center">
                        {submitState.isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight size={16} className="ml-2" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
