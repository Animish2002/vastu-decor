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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xl font-bold mb-4 text-white flex items-center">
              <span className="bg-indigo-600 w-2 h-6 mr-2 inline-block rounded-sm"></span>
              Vastu Decor & Home Solutions
            </h4>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Creating exceptional spaces that inspire, function, and endure
              through thoughtful design and innovative solutions.
            </p>
            <div className="flex space-x-4 mb-8">
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
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Quick Links
            </h4>
            <Separator className="mb-4 bg-slate-800 w-12 h-0.5" />
            <ul className="space-y-3">
              {["About", "Projects", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => item === "Projects" && navigate("/gallery")}
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="bg-slate-800 w-1 h-1 rounded-full mr-2 group-hover:bg-indigo-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 tracking-wide">
              Stay Updated
            </h4>
            <Separator className="mb-4 bg-slate-800 w-12 h-0.5" />
            <p className="text-slate-400 mb-4 text-sm">
              Subscribe to our newsletter for design tips and company updates.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-800 border-slate-700 text-slate-300 focus:border-indigo-500 h-10"
              />
              <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-4">
                Subscribe
              </Button>
            </div>
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
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 mb-4 md:mb-0 text-sm">
            © 2025 Vastu Decor & Home Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-500 hover:text-white transition-colors text-sm flex items-center"
              >
                <span>{item}</span>
                <ExternalLink size={12} className="ml-1" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
