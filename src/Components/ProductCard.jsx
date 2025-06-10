"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  let userID = JSON.parse(localStorage.getItem("userID"));

  // Handle add to bag click
  const handleAddToBag = (e) => {
    e.stopPropagation(); // Prevent navigation to product page
    alert(`${product.name} added to your bag!`);
    AddToCartAPI();
    navigate("/cart");
  };

  // Handle card click to navigate to product page
  const handleCardClick = () => {
    navigate(`/products/${product.productId}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  //add to cart api call
  const AddToCartAPI = async () => {
    let obj = {
      userId: userID,
      productId: product.productId,
      quantity: 1,
    };
    try {
      const response = await api.post("/addToCart", obj);
      console.log("Add to cart response:", response.data.data);
      // Optionally show a success message or update cart state here
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    }
  };

  // Generate star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i < product.rating ? "#FFD700" : "none"}
          color={i < product.rating ? "#FFD700" : "#D1D5DB"}
          className="mr-1"
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="group relative flex flex-col w-full rounded-lg overflow-hidden bg-white transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Best Seller Badge - Shown only on hover */}
      {product.isBestSeller && isHovered && (
        <div className="absolute top-0 left-0 z-10 bg-[#E63946] text-white py-2 px-6 rounded-br-lg">
          <span className="font-semibold">Best Seller</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden pt-[100%]">
        <img
          src={
            product.images?.[0]?.image_path
              ? `${import.meta.env.VITE_API_IMAGE_URL}${
                  product.images[0].image_path
                }`
              : "/placeholder.svg"
          }
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col p-4">
        {/* Product Name */}
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Product Subtitle */}
        <p className="text-sm text-gray-500 mb-1">{product.description}</p>
        {/* <p className="text-sm text-gray-500 mb-1">{product.subtitle}</p> */}

        {/* Volume */}
        <p className="text-sm text-gray-500 mb-2">{product.volume}</p>

        {/* Price */}
        <p className="text-base md:text-lg font-bold mb-2">
          ₹{product.actualPrice}
          {/* ₹{product.price.toFixed(2)} */}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">{renderStars()}</div>
          <span className="text-xs text-gray-500">
            {product.reviews} Review{product.reviews !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={handleAddToBag}
          className="w-full py-2 md:py-3 border border-[#7F614F] rounded-md flex items-center justify-center hover:bg-[#7F614F] hover:text-white transition-colors duration-300 text-sm md:text-base"
        >
          <ShoppingBag size={16} className="mr-2" />
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
