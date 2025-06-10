import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Trash2, ChevronLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import p2 from "../assets/p2.png";
import { api } from "axiosApi";

export default function CartPage() {
  const navigate = useNavigate();
  let userID = JSON.parse(localStorage.getItem("userID"));

  const [state, setState] = useState({
    CartList: [],
  });

  //set data in state
  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  // Initial cart items state
  const [cartItems, setCartItems] = useState([
    // {
    //   id: 1,
    //   slug: "balancing-night-cream",
    //   name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
    //   subtitle: "Shudhi Skin Clarifying Facial Spray",
    //   volume: "130ml",
    //   price: 1934.0,
    //   rating: 5,
    //   reviews: 51,
    //   quantity: 1,
    //   image: p2,
    //   isBestSeller: true,
    // },
    // {
    //   id: 2,
    //   slug: "balancing-night-cream",
    //   name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
    //   subtitle: "Shudhi Skin Clarifying Facial Spray",
    //   volume: "130ml",
    //   price: 1934.0,
    //   rating: 5,
    //   reviews: 51,
    //   quantity: 1,
    //   image: p2,
    //   isBestSeller: true,
    // },
  ]);

  // Order summary constants
  const shipping = 20.0;
  const tax = 20.0;

  // Handle quantity change
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    updateCartItem(cartId, newQuantity); // Call API to update quantity

    setCartItems(
      cartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const removeItem = (cartId) => {
    deleteCartItem(cartId); 
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item?.product?.actualPrice * item.quantity,
    0
  );

  // Calculate total
  const total = subtotal + shipping + tax;

  // Handle checkout
  const handleCheckout = () => {
    navigate("/checkoutpage"); // Navigate to the checkout page
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top smoothly
  };

  //get add to cart api call
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(`/getCart/${userID}`);
        setCartItems(response.data.data || []);
        // Optionally show a success message or update cart state here
      } catch (error) {
        console.error(
          "Error adding to cart:",
          error.response?.data || error.message
        );
      }
    };

    fetchCart();
  }, []);

  //delete cart item api call
  const deleteCartItem = async (cartId) => {
    try {
      const response = await api.delete(`/deleteCartItem/${cartId}`);
      console.log("Item removed successfully:", response.data);
      // Optionally show a success message or update cart state here
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response?.data || error.message
      );
    }
  };

  //update quantity api call
  const updateCartItem = async (cartId, quantity) => {
    try {
      const response = await api.put(`/updateCartItem/${cartId}`, {
        quantity,
      });
      console.log("Item updated successfully:", response.data);
      // Optionally show a success message or update cart state here
    } catch (error) {
      console.error(
        "Error updating item in cart:",
        error.response?.data || error.message
      );
    }
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
            {cartItems.map(
              (item) => (
                console.log("item", item.product?.images?.[0]?.image_path),
                (
                  <div
                    key={item.cartId}
                    className="border-b border-[#DCDCDC] py-4 mb-4"
                  >
                    {/* Mobile View */}
                    <div className="md:hidden grid grid-cols-2 gap-4 mb-4">
                      <div className="col-span-1">
                        <img
                          src={
                            item.product?.images?.[0]?.image_path
                              ? `${import.meta.env.VITE_API_IMAGE_URL}/${
                                  item.product.images[0].image_path
                                }`
                              : "/placeholder.svg"
                          }
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="col-span-1">
                        <h3 className="font-medium">{item?.product?.name}</h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.product.size}
                        </p>
                        <p className="font-medium mt-2">
                          {" "}
                          ₹{Number(item?.product?.actualPrice).toFixed(2)}
                        </p>

                        <div className="flex items-center mt-2 border rounded-md w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartId, item.quantity - 1)
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
                              if (!isNaN(val)) updateQuantity(item.cartId, val);
                            }}
                            className="w-10 text-center py-1"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.cartId, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <p className="font-medium">
                            Total: ₹
                            {(
                              item?.product?.actualPrice * item.quantity
                            ).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.cartId)}
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
                          src={
                            item.product?.images?.[0]?.image_path
                              ? `${import.meta.env.VITE_API_IMAGE_URL}/${
                                  item.product.images[0].image_path
                                }`
                              : "/placeholder.svg"
                          }
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="col-span-1">
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis block">
                          {item?.product?.name}
                        </span>
                        <p className="text-sm text-gray-500">
                          Size: {item.product?.size}
                        </p>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <div className="flex items-center border rounded-md border-[#DCDCDC]">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartId, item.quantity - 1)
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
                              if (!isNaN(val)) updateQuantity(item.cartId, val);
                            }}
                            className="w-10 text-center py-1"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.cartId, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-1 text-center">
                        ₹{Number(item?.product?.actualPrice).toFixed(2)}
                      </div>
                      <div className="col-span-1 text-center font-medium">
                        ₹
                        {Number(
                          item?.product?.actualPrice * item.quantity
                        ).toFixed(2)}
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            )}

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
