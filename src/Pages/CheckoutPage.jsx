"use client";
import { useState } from "react";
import { ChevronLeft, CreditCard } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import p2 from "../assets/p2.png";
import { api } from "axiosApi";
import { useLocation,useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  let userID = JSON.parse(localStorage.getItem("userID"));
  const location = useLocation();
  const navigate = useNavigate();

  //access total and subtotal from location state
  console.log("location ============>", location.state);
  const totalPass = location.state?.total || 0;
  const subtotalPass = location.state?.subtotal || 0;
  const cartItems = location.state?.cartItems || [];
  console.log("CheckoutPage total:", totalPass);
  console.log("CheckoutPage subtotal:", subtotalPass);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "credit",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [stateId, setStateId] = useState(0);

  // const [cartItems] = useState([
  //   {
  //     id: "1",
  //     slug: "balancing-night-cream",
  //     name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
  //     subtitle: "Shudhi Skin Clarifying Facial Spray",
  //     volume: "130ml",
  //     price: 1934.0,
  //     rating: 5,
  //     reviews: 51,
  //     quantity: 1,
  //     image: "/rice-water-shampoo.png",
  //     isBestSeller: true,
  //   },
  //   {
  //     id: 2,
  //     slug: "balancing-night-cream",
  //     name: "BALANCING NIGHT CREAM WITH GOTU KOLA & NEEM",
  //     subtitle: "Shudhi Skin Clarifying Facial Spray",
  //     volume: "130ml",
  //     price: 1934.0,
  //     rating: 5,
  //     reviews: 51,
  //     quantity: 1,
  //     image: "/rice-water-shampoo.png",
  //     isBestSeller: true,
  //   },
  // ]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item?.product?.actualPrice * item.quantity,
    0
  );
  const shipping = 20;
  const tax = 20;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (
      formData.paymentMethod === "credit" &&
      (!formData.cardNumber || !formData.expiryDate || !formData.cvc)
    ) {
      alert("Please fill in all payment details");
      return;
    }

    console.log("Order placed successfully!", formData);
    alert("Order placed successfully!");
    addOrderData();
    navigate('/');
  };

  //add order data api call
  const addOrderData = async () => {
    let orderData = {
      userId: userID,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      apt: formData.apt,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      paymentMethod: formData.paymentMethod,
      totalPrice: total.toFixed(2),
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.actualPrice,
        totalAmount: item.quantity * item.product.actualPrice,
      })),
    };

    try {
      const response = await api.post("/addOrder", orderData);
      console.log("Order response:", response.data);
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* Back to cart link */}
      <Link
        to="/cart"
        className="inline-flex items-center text-sm text-[#7f614f] mb-4"
      >
        <span>Cart</span>
        <span className="mx-2">/</span>
        <span>Checkout Page</span>
      </Link>

      <h1 className="text-3xl font-medium text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <section className="mb-10">
              <h2 className="text-lg font-medium text-gray-900 mb-5">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b pb-12 border-gray-300">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary "
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary "
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="mb-10">
              <h2 className="text-lg font-medium text-gray-900 mb-12">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-6 border-b pb-12 border-gray-300">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="apt"
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apt"
                    name="apt"
                    value={formData.apt}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc."
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      State
                    </label>
                    <StateSelect
                      countryid={101}
                      onChange={(e) => {
                        setStateId(e.id);
                        setFormData((prev) => ({
                          ...prev,
                          state: e.name,
                          city: "",
                        }));
                      }}
                      placeHolder="Select State"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      City
                    </label>
                    <CitySelect
                      countryid={101}
                      stateid={stateId}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          city: e.name,
                        }));
                      }}
                      placeHolder="Select City"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                      disabled={!stateId}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="tel"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Enter ZIP Code"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="mb-10">
              <h2 className="text-lg font-medium text-gray-900 mb-10">
                Payment Method
              </h2>
              <div className="space-y-4">
                <div className="flex items-center border border-gray-300 rounded-md p-4">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary focus:ring-primary rounded-md  border-gray-300"
                  />
                  <label
                    htmlFor="online"
                    className="ml-3 block text-sm font-medium text-gray-700 "
                  >
                    Online payment
                  </label>
                </div>
                <div className="flex items-center border border-gray-300 rounded-md p-4">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300"
                  />
                  <label
                    htmlFor="cash"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Cash on delivery
                  </label>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200  rounded-md p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img
                    // src={p2}
                    src={
                      item.product?.images?.[0]?.image_path
                        ? `${import.meta.env.VITE_API_IMAGE_URL}/${
                            item.product.images[0].image_path
                          }`
                        : "/placeholder.svg"
                    }
                    alt={item.name}
                    className="w-14 h-14 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ₹{item.product.actualPrice}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium">₹{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm font-medium">₹{tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                <p className="text-base font-medium">Total</p>
                <p className="text-base font-bold">₹{total.toFixed(2)}</p>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full mt-8 bg-[#7F614F] border hover:bg-white hover:text-[#7F614F] text-white py-4 px-4  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors rounded-md"
            >
              Place Order
            </button>

            <p className="text-xs text-center text-gray-500 mt-6">
              By placing your order, you agree to our{" "}
              <Link to="#" className="text-[#7F614F] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-[#7F614F] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
