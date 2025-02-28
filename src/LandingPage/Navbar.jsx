import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils"; // Make sure you have this utility function

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-100 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-2xl md:text-3xl font-light tracking-tighter text-gray-900 flex items-center "
          >
            <span className="text-indigo-600 font-medium">Vastu</span>
            <span
              className={cn(
                " hover:bg-indigo-100 text-neutral-100 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-600 focus:outline-none disabled:pointer-events-none disabled:opacity-100",
                isScrolled ? " py-3 text-neutral-900" : "bg-transparent py-5"
              )}
            >
              Decor
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#about"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors hover:bg-indigo-100 text-neutral-100 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-600 focus:outline-none disabled:pointer-events-none disabled:opacity-100",
                      isScrolled
                        ? " py-3 text-neutral-900"
                        : "bg-transparent py-5"
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/gallery"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors hover:bg-indigo-100 text-neutral-100 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-600 focus:outline-none disabled:pointer-events-none disabled:opacity-100",
                      isScrolled
                        ? " py-3 text-neutral-900"
                        : "bg-transparent py-5"
                    )}
                  >
                    Gallery
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#services"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors hover:bg-indigo-100 text-neutral-100 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-600 focus:outline-none disabled:pointer-events-none disabled:opacity-100",
                      isScrolled
                        ? " py-3 text-neutral-900"
                        : "bg-transparent py-5"
                    )}
                  >
                    Services
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#contact"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors hover:bg-indigo-100 text-neutral-100 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-600 focus:outline-none disabled:pointer-events-none disabled:opacity-100",
                      isScrolled
                        ? " py-3 text-neutral-900"
                        : "bg-transparent py-5"
                    )}
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-lg text-white">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <a
                      href="/"
                      className="text-2xl font-light tracking-tighter"
                    >
                      <span className="text-indigo-600 font-medium">Vastu</span>
                      <span
                        className={cn(
                          " hover:bg-indigo-100 text-neutral-900 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-600 focus:outline-none disabled:pointer-events-none disabled:opacity-100",
                          isScrolled
                            ? " py-3 text-neutral-900"
                            : "bg-transparent py-5"
                        )}
                      >
                        Decor
                      </span>
                    </a>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </div>

                  <nav className="flex flex-col gap-4 py-6">
                    <SheetClose asChild>
                      <a
                        href="#about"
                        className="px-2 py-3 text-lg font-medium hover:text-indigo-600 transition-colors"
                      >
                        About
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="#contact"
                        className="px-2 py-3 text-lg font-medium hover:text-indigo-600 transition-colors"
                      >
                        Gallery
                      </a>
                    </SheetClose>

                    <div className="relative">
                      <SheetClose asChild>
                        <a
                          href="#contact"
                          className="px-2 py-3 text-lg font-medium hover:text-indigo-600 transition-colors"
                        >
                          Services
                        </a>
                      </SheetClose>
                    </div>

                    <SheetClose asChild>
                      <a
                        href="#contact"
                        className="px-2 py-3 text-lg font-medium hover:text-indigo-600 transition-colors"
                      >
                        Contact
                      </a>
                    </SheetClose>
                  </nav>

                  <div className="mt-auto">
                    <SheetClose asChild>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Book Consultation
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
