"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, User, ChevronDown, Search } from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollLink = (sectionId) => {
    navigate("/", { state: { sectionId } });
  };

  return (
    <header
      className={`w-full bg-white ${isScrolled ? "shadow-md" : ""} top-0 z-50`}
    >
      <div className="md:px-20 px-5 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Icons */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Raha Organic" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-6 md:hidden">
              <Link
                to="/wishlist"
                className="text-[#7f614f] hover:text-[#6a5242]"
              >
                <Heart size={24} />
              </Link>
              <Link to="/cart" className="text-[#7f614f] hover:text-[#6a5242]">
                <ShoppingBag size={24} />
              </Link>
              <Link
                to="/profile"
                className="text-[#7f614f] hover:text-[#6a5242]"
              >
                <User size={24} />
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:w-auto md:flex-1 md:max-w-xl md:pl-25">
            <div className="relative flex items-center w-full max-w-md">
              <input
                type="text"
                placeholder="Search Your Product..."
                className="w-full py-2 px-4 pr-12 rounded-md border border-[#abb7c2] focus:outline-none focus:ring-1 focus:ring-[#7f614f] text-gray-700"
              />
              <button className="absolute right-0 h-full px-4 py-2 bg-[#7f614f] text-white rounded-r-md flex items-center justify-center">
                <span className="hidden sm:inline-block mr-1">search</span>
                <Search size={18} className="block md:hidden" />
              </button>
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/wishlist"
              className="text-[#7f614f] hover:text-[#6a5242]"
            >
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-[#7f614f] hover:text-[#6a5242]">
              <ShoppingBag size={24} />
            </Link>
            <Link to="/login" className="text-[#7f614f] hover:text-[#6a5242]">
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="border-t border-b border-gray-200">
        <div className="container mx-auto">
          <ul className="flex flex-row justify-center items-center px-5 gap-3 md:gap-10">
            <li>
              <button
                onClick={() => handleScrollLink("home")}
                className="block py-3 hover:text-[#7f614f] transition-colors"
              >
                Home
              </button>
            </li>

            <li className="relative">
              <div
                className="flex items-center py-3 cursor-pointer hover:text-[#7f614f] transition-colors"
                // onMouseEnter={() => !isMobile && setShowDropdown(true)}
                // onMouseLeave={() => !isMobile && setShowDropdown(false)}
                // onClick={() => isMobile && setShowDropdown(!showDropdown)}
                onClick={() => {
                    navigate("/shop/allproducts");
                }}
              >
                Shop
                {/* <ChevronDown size={16} className="ml-1" /> */}
              </div>
              {showDropdown && (
                <div
                  className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-b-md z-50"
                  onMouseEnter={() => !isMobile && setShowDropdown(true)}
                  onMouseLeave={() => !isMobile && setShowDropdown(false)}
                >
                  <ul>
                    <li>
                      <Link
                        to="/shop/allproducts"
                        className="block px-4 py-2 hover:bg-gray-100 hover:rounded-md"
                        onClick={() => setShowDropdown(false)}
                      >
                        Hair Oil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop/best-sellers"
                        className="block px-4 py-2 hover:bg-gray-100 hover:rounded-md"
                        onClick={() => setShowDropdown(false)}
                      >
                        Shampoo
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop/new-arrivals"
                        className="block px-4 py-2 hover:bg-gray-100 hover:rounded-md"
                        onClick={() => setShowDropdown(false)}
                      >
                        Hair Pack
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop/combos"
                        className="block px-4 py-2 hover:bg-gray-100 hover:rounded-md"
                        onClick={() => setShowDropdown(false)}
                      >
                        Combos
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <Link
                to="/about"
                className="block py-3 hover:text-[#7f614f] transition-colors"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/badlav"
                className="block py-3 hover:text-[#7f614f] transition-colors"
              >
                #Badlav
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="block py-3 hover:text-[#7f614f] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
