"use client";

import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import sc1 from "../assets/sc1.png";

const FeaturedProduct2 = () => {
  const navigate = useNavigate();

  // Sample featured products data
  const featuredProducts = [
    {
      id: "1",
      slug: "balancing-night-cream",
      name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
      subtitle: "Shudhi Skin Clarifying Facial Spray",
      volume: "130ml",
      price: 1934.0,
      rating: 5,
      reviews: 51,
      image: "/rice-water-shampoo.png",
      isBestSeller: true,
    },
    {
      id: "2",
      slug: "sheer-sun-fluid",
      name: "SHEER SUN FLUID WITH SPF 50 | PA++++",
      subtitle: "Shudhi Skin Clarifying Facial Spray",
      volume: "50g",
      price: 1750.0,
      rating: 5,
      reviews: 51,
      image: "/hibiscus-shampoo.png",
      isBestSeller: true,
    },
    {
      id: "3",
      slug: "ultra-rich-body-milk",
      name: "ULTRA RICH BODY MILK SOUNDARYA 24K GOLD",
      subtitle: "Shudhi Skin Clarifying Facial Spray",
      volume: "2 Size Available",
      price: 1975.0,
      rating: 5,
      reviews: 51,
      image: "/hair-pack-purple.png",
      isBestSeller: false,
    },
    {
      id: "4",
      slug: "ultra-rich-body-milk-indian-rose",
      name: "ULTRA-RICH BODY MILK INDIAN ROSE ABSOLUTE",
      subtitle: "Shudhi Skin Clarifying Facial Spray",
      volume: "130ml",
      price: 1776.0,
      rating: 5,
      reviews: 51,
      image: "/hair-pack-green.png",
      isBestSeller: false,
    },
  ];

  // Handle View All click
  const handleViewAll = () => {
    navigate("/shop/allproducts");
    window.scrollTo(0, 0); // Scroll to top of window
  };

  return (
    <div className="relative">
      <section className="md:p-16 py-8 bg-white">
        <div className="container mx-auto px-4">
          {/* Header with title, description and View All link */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="max-w-2xl mb-4 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-700">
                Enhance your natural beauty with our featured cosmetics, crafted
                with skin-loving ingredients for a flawless, luxurious finish.
              </p>
            </div>
            <button
              onClick={handleViewAll}
              className="flex items-center text-[#7f614f] hover:text-[#6a5242] transition-colors"
            >
              View All <ChevronDown className="ml-1" size={16} />
            </button>
          </div>

          {/* Product Grid - 4 columns on desktop, 2 on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProduct2;
