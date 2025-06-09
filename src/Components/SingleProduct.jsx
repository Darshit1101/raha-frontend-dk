"use client";

import { useState, useEffect } from "react";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  Minus,
  Plus,
} from "lucide-react";
import sp1 from "../assets/sp1.png";
import sp2 from "../assets/sp2.png";
import sp3 from "../assets/sp3.png";
import sp4 from "../assets/sp4.png";
import sc1 from "../assets/sc1.png";

const SingleProduct = (props) => {
  const { state, changeNameValue } = props;

  // State for product images
  const [mainImage, setMainImage] = useState(sp1);

  //get product images from state
  const thumbnails =
    state.SinProduct.images?.map(
      (image) => `${import.meta.env.VITE_API_IMAGE_URL}${image.image_path}`
    ) || [];

  // Set main image from first product image when component loads
  useEffect(() => {
    const firstImage = state?.SinProduct?.images?.[0]?.image_path;
    if (firstImage) {
      setMainImage(`${import.meta.env.VITE_API_IMAGE_URL}${firstImage}`);
    }
  }, [state.SinProduct]);

  // State for product options
  const [variant, setVariant] = useState("dry");
  const [size, setSize] = useState("100ml");
  const [quantity, setQuantity] = useState(1);

  // State for active tab
  const [activeTab, setActiveTab] = useState("ingredient");

  // State for review modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    name: "",
    email: "",
    review: "",
  });

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product: "Revitalizing Hair Oil",
      variant,
      size,
      quantity,
    });
    // Here you would typically dispatch to a cart state or API
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", {
      product: "Revitalizing Hair Oil",
    });
    // Here you would typically dispatch to a wishlist state or API
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", reviewForm);
    // Here you would typically send the review to an API
    setShowReviewModal(false);
    // Reset form
    setReviewForm({
      rating: 5,
      name: "",
      email: "",
      review: "",
    });
  };

  // Handle review form change
  const handleReviewFormChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value,
    });
  };

  // Render stars for rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="max-w-0xl justify-center py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:mx-12 px-4">
        {/* Left Column - Product Images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={mainImage || "/placeholder.svg"}
              alt="Revitalizing Hair Oil"
              className="w-full md:h-[798px] h-[400px] object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {thumbnails.map(
              (thumb, index) => (
                console.log(thumb),
                (
                  <div
                    key={index}
                    className={` rounded-lg overflow-hidden cursor-pointer ${
                      mainImage === thumb
                        ? "border-[#7f614f] border-2"
                        : "border-gray-200"
                    }`}
                    onClick={() => setMainImage(thumb)}
                  >
                    <img
                      src={thumb || "/placeholder.svg"}
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full md:h-[160px] h-[85px] object-contain"
                    />
                  </div>
                )
              )
            )}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center mb-2">
            <div className="flex mr-2">{renderStars(4)}</div>
            <span className="text-sm text-gray-600">124 reviews</span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-bold mb-3">{state.SinProduct?.name}</h1>

          {/* Product Description */}
          <p className="text-gray-600 mb-6">{state.SinProduct?.description}</p>

          {/* Price */}
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold mr-2">
              Rs. {state.SinProduct?.discountedPrice}
            </span>
            <span className="text-gray-500 line-through text-sm">
              Rs. {state.SinProduct?.actualPrice}
            </span>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Benefits:</h3>
            {state.SinProduct?.benefits?.length > 0 && (
              <ul className="space-y-1">
                {state.SinProduct.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#7f614f] mr-2">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Variant Selection */}
          {/* <div className="mb-4">
            <h3 className="font-medium mb-2">Variant:</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="variant"
                  checked={variant === "dry"}
                  onChange={() => setVariant("dry")}
                  className="mr-2"
                />
                <span>For Dry Scalp</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="variant"
                  checked={variant === "dandruff"}
                  onChange={() => setVariant("dandruff")}
                  className="mr-2"
                />
                <span>For Dandruff Control</span>
              </label>
            </div>
          </div> */}

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Size:</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="size"
                  checked={size === "100ml"}
                  onChange={() => setSize("100ml")}
                  className="mr-2"
                />
                <span>{state.SinProduct?.size}</span>
              </label>
              {/* <label className="flex items-center">
                <input
                  type="radio"
                  name="size"
                  checked={size === "200ml"}
                  onChange={() => setSize("200ml")}
                  className="mr-2"
                />
                <span>200ml - ₹699</span>
              </label> */}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity:</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
              >
                <Minus size={16} />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 h-8 text-center border-t border-b border-gray-300"
              />
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 border bg-[#7f614f] text-white hover:bg-white hover:text-[#7F614F] py-3 px-4 rounded flex items-center justify-center"
            >
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="border border-[#7f614f] text-[#7f614f] hover:bg-[#7F614F] hover:text-white py-3 px-4 rounded flex items-center justify-center"
            >
              <Heart size={18} className="mr-2" />
              Add to Wishlist
            </button>
          </div>

          {/* Shipping and Authenticity */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <Truck size={16} className="mr-2" />
              Free shipping over ₹999
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Shield size={16} className="mr-2" />
              100% Authentic
            </div>
          </div>

          {/* Tabs */}
          <div className=" mb-6">
            <div className="flex space-x-6">
              <button
                className={`py-2 px-3 text-sm font-medium ${
                  activeTab === "ingredient"
                    ? "border-1 rounded-full border-[#7f614f] text-[#7f614f]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("ingredient")}
              >
                Ingredient
              </button>
              <button
                className={`py-2 px-3 text-sm font-medium ${
                  activeTab === "howToUse"
                    ? "border-1 rounded-full border-[#7f614f] text-[#7f614f]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("howToUse")}
              >
                How to use
              </button>
              <button
                className={`py-2 px-3 text-sm font-medium ${
                  activeTab === "review"
                    ? "border-1 rounded-full border-[#7f614f] text-[#7f614f]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Review
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === "ingredient" && (
              <div>
                <h3 className="font-medium mb-2">Ingredients</h3>
                <p className="text-gray-600">
                  Coconut Oil, Sesame Oil, Amla Extract, Bhringraj Extract,
                  Brahmi Extract, Neem Extract, Aloe Vera, Vitamin E, Essential
                  Oils (Lavender, Rosemary).
                </p>
              </div>
            )}
            {activeTab === "howToUse" && (
              <div>
                <h3 className="font-medium mb-2">How to Use</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Take a small amount of oil in your palm.</li>
                  <li>Massage gently into your scalp using fingertips.</li>
                  <li>
                    Leave on for at least 30 minutes or overnight for best
                    results.
                  </li>
                  <li>Wash with a mild shampoo.</li>
                  <li>Use 2-3 times a week for optimal results.</li>
                </ol>
              </div>
            )}
            {activeTab === "review" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Customer Reviews (124)</h3>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="text-sm bg-white border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
                  >
                    Write a Review
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Review Item */}
                  <div className="border border-[#7f614f] rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                        <span className="font-medium">Priya S.</span>
                      </div>
                      <div className="flex">{renderStars(4)}</div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      After trying countless products for my dry hair, Raha's
                      Hair Oil has been a game-changer. My hair feels nourished
                      and looks healthier than ever!
                    </p>
                  </div>
                  {/* Review Item */}
                  <div className="border border-[#7f614f] rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                        <span className="font-medium">Priya S.</span>
                      </div>
                      <div className="flex">{renderStars(4)}</div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      After trying countless products for my dry hair, Raha's
                      Hair Oil has been a game-changer. My hair feels nourished
                      and looks healthier than ever!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative h-[400px] w-full mt-8 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${sc1})`, // Using the variable from remembered code
            backgroundRepeat: "repeat-x", // Horizontal repeat from remembered code
            backgroundAttachment: "fixed", // Fixed background from remembered code
            backgroundSize: "cover", // Added from uploaded code for full coverage
            backgroundPosition: "center", // Centered background from uploaded code
          }}
        ></div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= reviewForm.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        setReviewForm({ ...reviewForm, rating: star })
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={reviewForm.email}
                  onChange={handleReviewFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="block text-sm font-medium mb-1"
                >
                  Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={reviewForm.review}
                  onChange={handleReviewFormChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7f614f] text-white rounded-md hover:bg-[#6a5040]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
