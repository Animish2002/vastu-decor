import React from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-900 text-slate-200 py-16">
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-28">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h4 className="md:text-3xl text-xl mb-4 text-white flex items-center heading">
              Vastu Decor & Home Solutions
            </h4>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Creating exceptional spaces that inspire, function, and endure
              through thoughtful design and innovative solutions.
            </p>
            {/* <div className="flex space-x-4 mb-8">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-9 w-9 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-9 w-9 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-9 w-9 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div> */}
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Quick Links
            </h4>
            <Separator className="mb-4 bg-slate-800 w-12 h-0.5" />
            <ul className="space-y-3">
              <li>
                <a
                  href="/#about"
                  className="text-slate-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="bg-slate-800 w-1 h-1 rounded-full mr-2 group-hover:bg-indigo-500 transition-colors"></span>
                  About
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-slate-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="bg-slate-800 w-1 h-1 rounded-full mr-2 group-hover:bg-indigo-500 transition-colors"></span>
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-slate-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="bg-slate-800 w-1 h-1 rounded-full mr-2 group-hover:bg-indigo-500 transition-colors"></span>
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-slate-400 hover:text-white transition-colors flex items-center group"
                >
                  <span className="bg-slate-800 w-1 h-1 rounded-full mr-2 group-hover:bg-indigo-500 transition-colors"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Contact
            </h4>
            <Separator className="mb-4 bg-slate-800 w-12 h-0.5" />
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start">
                <MapPin
                  size={16}
                  className="text-indigo-400 mr-2 mt-1 flex-shrink-0"
                />
                <span className="text-sm">
                  Shop no 1, ground floor, Moze College , Ground Floor, Plot no
                  2627, Balewadi, Pune, Maharashtra 411045
                </span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={16}
                  className="text-indigo-400 mr-2 flex-shrink-0"
                />
                <span className="text-sm">
                  vastudecorandhomesolutions@gmail.com
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={16}
                  className="text-indigo-400 mr-2 flex-shrink-0"
                />
                <span className="text-sm">+91-9545437436</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 mb-4 md:mb-0 text-sm">
            © 2025 Vastu Decor & Home Solutions. All rights reserved.
          </p>
          <span className="text-slate-500 text-sm">
            Designed with <span className="text-red-500">♥</span> by
            <a
              href="https://www.thefortune.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline ml-1"
            >
              The Fortune Club
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
