"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
} from "lucide-react";
import flogo from "../assets/flogo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#7F614F] text-white overflow-x-hidden">
      <div className="w-full md:px-20 px-4 py-8 overflow-x-hidden">
        {/* Logo Section */}
        <div className="mb-6">
          <button
            onClick={() => handleNavigation("/")}
            className="hover:text-[#7f614f] transition-colors block break-words text-left"
          >
            <img
              src={flogo}
              alt="Raha Organic"
              className="h-16 w-auto z-10 max-w-full"
            />
          </button>
        </div>

        {/* Divider */}
        <div className="border-b border-[#ABB7C2] mb-8"></div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">
              Subscribe to our newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="w-full">
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-transparent border border-[#ABB7C2] rounded-md text-white px-4 py-2 w-full pr-12 focus:outline-none focus:border-[#7f614f]"
                  required
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-[#FFFFFF] rounded-r-md hover:bg-[#dddddd] transition-colors border"
                >
                  <ArrowRight size={20} className="text-[#7f614f]" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/shop/allproducts")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/badlav")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  #BADLAV Movement
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/shop/allproducts")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Hair Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/shop/allproducts")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Shampoo
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/shop/allproducts")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Hair Pack
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/products/combos")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/privacy-policy")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Privacy & Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="hover:text-[#dddddd] transition-colors block break-words text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 overflow-x-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              <button
                onClick={() => handleNavigation("/terms")}
                className="hover:text-[#dddddd] transition-colors"
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => handleNavigation("/privacy-policy")}
                className="hover:text-[#dddddd] transition-colors"
              >
                Privacy Policy
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#dddddd] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#dddddd] transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#dddddd] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
