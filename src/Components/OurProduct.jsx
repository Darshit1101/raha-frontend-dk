"use client";

import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import sc1 from "../assets/sc1.png";

const OurProduct = (props) => {
  const { state, changeNameValue } = props;

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "hair oil", "shampoo", "hair pack"];

  // const allProducts = [
  //   {
  //     id: "1",
  //     slug: "balancing-night-cream",
  //     name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
  //     subtitle: "Shudhi Skin Clarifying Facial Spray",
  //     volume: "130ml",
  //     price: 1934.0,
  //     rating: 5,
  //     reviews: 51,
  //     image: "/rice-water-shampoo.png",
  //     isBestSeller: true,
  //     category: "shampoo",
  //   },
  //   {
  //     id: "2",
  //     slug: "sheer-sun-fluid",
  //     name: "SHEER SUN FLUID WITH SPF 50 | PA++++",
  //     subtitle: "Shudhi Skin Clarifying Facial Spray",
  //     volume: "50g",
  //     price: 1750.0,
  //     rating: 5,
  //     reviews: 51,
  //     image: "/hibiscus-shampoo.png",
  //     isBestSeller: true,
  //     category: "hair oil",
  //   },
  //   {
  //     id: "3",
  //     slug: "ultra-rich-body-milk",
  //     name: "ULTRA RICH BODY MILK SOUNDARYA 24K GOLD",
  //     subtitle: "Shudhi Skin Clarifying Facial Spray",
  //     volume: "2 Size Available",
  //     price: 1975.0,
  //     rating: 5,
  //     reviews: 51,
  //     image: "/hair-pack-purple.png",
  //     isBestSeller: false,
  //     category: "hair pack",
  //   },
  //   {
  //     id: "4",
  //     slug: "ultra-rich-body-milk-indian-rose",
  //     name: "ULTRA-RICH BODY MILK INDIAN ROSE ABSOLUTE",
  //     subtitle: "Shudhi Skin Clarifying Facial Spray",
  //     volume: "130ml",
  //     price: 1776.0,
  //     rating: 5,
  //     reviews: 51,
  //     image: "/hair-pack-green.png",
  //     isBestSeller: false,
  //     category: "shampoo",
  //   },
  // ];
  
  const allProductsArray = Array.isArray(state.AllProducts)
    ? state.AllProducts
    : [];
  const allProducts = allProductsArray.slice(-4);

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);

  const handleNavigateHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative">
      <section className="md:p-16 py-8 bg-white">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4">
            <span
              onClick={handleNavigateHome}
              className="cursor-pointer hover:text-black transition-colors"
            >
              Home
            </span>{" "}
            / Shop
          </nav>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-6">Our Products</h2>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-6 py-2 text-sm font-medium ${
                  activeCategory === cat
                    ? "border-[#7f614f] text-[#7f614f]"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Background */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${sc1})`,
            backgroundRepeat: "repeat-x",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 md:p-16 md:gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProduct;
