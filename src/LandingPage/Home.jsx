import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import Projects from "./Projects";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <Projects />
      <Services />
      <Testimonials />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
