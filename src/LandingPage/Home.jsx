import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import Services from "./Services";
import Testimonials from "./Testimonials";
import { BentoGridDemo } from "./BentoGrid";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className=" h-screen"
    >
      <Navbar />
      <HeroSection />
      <AboutUs />
      <BentoGridDemo />

      <Services />
      {/* <Testimonials /> */}
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Home;
