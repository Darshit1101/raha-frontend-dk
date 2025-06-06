import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ChevronLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import p2 from "../assets/p2.png";

export default function CartPage() {
  const navigate = useNavigate();
  // Initial cart items state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      slug: "balancing-night-cream",
      name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
      subtitle: "Shudhi Skin Clarifying Facial Spray",
      volume: "130ml",
      price: 1934.0,
      rating: 5,
      reviews: 51,
      quantity: 1,
      image: p2,
      isBestSeller: true,
    },
    {
      id: 2,
      slug: "balancing-night-cream",
      name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
      subtitle: "Shudhi Skin Clarifying Facial Spray",
      volume: "130ml",
      price: 1934.0,
      rating: 5,
      reviews: 51,
      quantity: 1,
      image: p2,
      isBestSeller: true,
    },
  ]);

  // Order summary constants
  const shipping = 20.0;
  const tax = 20.0;

  // Handle quantity change
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total
  const total = subtotal + shipping + tax;

  // Handle checkout
  const handleCheckout = () => {
    navigate("/checkoutpage"); // Navigate to the checkout page
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top smoothly
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Title and Breadcrumb */}

      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hoveranimal:text-gray-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Cart Page</span>
        <h1 className="text-2xl text-gray-900font-bold mt-5">Cart Page</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:flex-1">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid md:grid-cols-6 border-b border-[#DCDCDC] pb-10 mb-6">
              <div className="col-span-1 font-medium">Product</div>
              <div className="col-span-1 font-medium">Description</div>
              <div className="col-span-1 font-medium text-center">Quantity</div>
              <div className="col-span-1 font-medium text-center">Price</div>
              <div className="col-span-1 font-medium text-center">Total</div>
              <div className="col-span-1 font-medium text-center">Actions</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-[#DCDCDC] py-4 mb-4"
              >
                {/* Mobile View */}
                <div className="md:hidden grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-1">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="col-span-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="font-medium mt-2">₹{item.price.toFixed(2)}</p>

                    <div className="flex items-center mt-2 border rounded-md w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-gray-600 "
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number.parseInt(e.target.value);
                          if (!isNaN(val)) updateQuantity(item.id, val);
                        }}
                        className="w-10 text-center py-1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <p className="font-medium">
                        Total: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-6 md:items-center">
                  <div className="col-span-1">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="col-span-1">
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis block">
                      {item.name}
                    </span>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <div className="flex items-center border rounded-md border-[#DCDCDC]">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-gray-600"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number.parseInt(e.target.value);
                          if (!isNaN(val)) updateQuantity(item.id, val);
                        }}
                        className="w-10 text-center py-1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 text-center">
                    ₹{item.price.toFixed(2)}
                  </div>
                  <div className="col-span-1 text-center font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Button */}
            <div className="mt-8">
              <Link
                to="/shop/allproducts"
                className="inline-flex items-center px-4 py-2 border rounded-md border-[#DCDCDC] text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeft size={16} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-80 h-[343px] border rounded-md border-[#DCDCDC] p-6">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">₹{shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-[#DCDCDC] pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-[#7F614F] border rounded-md text-white  hover:bg-white hover:text-[#7F614F] py-3 font-medium  transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Check Out
            </button>
          </div>
        </div>
      ) : (
        // Empty Cart Message
        <div className="text-center py-16 bg-white border border-[#DCDCDC]">
          <div className="max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any items to your cart yet. Browse
              our products and find something you'll love!
            </p>
            <Link
              to="/shop/allproducts"
              className="inline-flex items-center px-6 py-3 bg-[#58281C] text-white font-medium hover:bg-amber-900 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
