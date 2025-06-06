"use client";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// import { ChevronDown } from "lucide-react";
import ProductCard from "../Components/ProductCard";
import p3 from "../assets/p3.png";

const WishlistPage = () => {
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
      image: p3,
      isBestSeller: true,
    },
  ];

  // Handle View All click
  //   const handleViewAll = () => {
  //     navigate("/shop/allproducts");
  //     window.scrollTo(0, 0); // Scroll to top of window
  //   };

  return (
    <div className="relative">
      <section className="md:p-16 py-8 bg-white">
        <div className="container mx-auto px-4">
          {/* Header with title, description and View All link */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="text-sm text-[#7f614f] mb-8">
              <Link to="/" className="hoveranimal:text-gray-700">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Wishliste</span>
              <h1 className="text-2xl text-gray-900 font-bold mt-5">
                Wishlist
              </h1>
            </div>
            {/* <button
              onClick={handleViewAll}
              className="flex items-center text-[#7f614f] hover:text-[#6a5242] transition-colors"
            >
              View All <ChevronDown className="ml-1" size={16} />
            </button> */}
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

export default WishlistPage;
