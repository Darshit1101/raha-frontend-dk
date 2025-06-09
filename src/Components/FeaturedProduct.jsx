"use client";

import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import sc1 from "../assets/sc1.png";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";

const FeaturedProduct = (props) => {
  const { state, changeNameValue } = props;
  const navigate = useNavigate();

  // Sample featured products data
  // const featuredProducts = [
  //   {
  //     id: "1",
  //     slug: "balancing-night-cream",
  //     name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
  //     subtitle: "Shudhi Skin Clarifying Facial Spray",
  //     volume: "130ml",
  //     price: 1934.0,
  //     rating: 5,
  //     reviews: 51,
  //     image: p1,
  //     isBestSeller: true,
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
  //     image: p2,
  //     isBestSeller: true,
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
  //     image: p3,
  //     isBestSeller: false,
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
  //     image: p4,
  //     isBestSeller: false,
  //   },
  // ];
  // Handle View All clickx`x`
  const handleViewAll = () => {
    navigate("/shop/allproducts");
    window.scrollTo(0, 0); // Scroll to top of window
  };

  const allProducts = Array.isArray(state.AllProducts) ? state.AllProducts : [];
  const featuredProducts = allProducts.slice(-4);

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
              <div key={product.productId} className="flex">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom background image section - fixed when scrolling */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${sc1})`, // Using the variable from remembered code
            backgroundRepeat: "repeat-x", // Horizontal repeat from remembered code
            backgroundAttachment: "fixed", // Fixed background from remembered code
            backgroundSize: "cover", // Added from uploaded code for full coverage
            backgroundPosition: "center", // Centered background from uploaded code
          }}
        >
          {/* Product image overlay */}
          {/* <div className="container mx-auto h-full relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
              <img
                src={sc1} // Using the variable from uploaded code
                alt="Featured Products"
                className="max-h-[350px] object-contain"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
