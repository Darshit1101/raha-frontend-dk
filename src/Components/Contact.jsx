"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import sc1 from "../assets/sc1.png";
import c1 from "../assets/c1.svg";
import c2 from "../assets/c2.svg";
import c3 from "../assets/c3.svg";
import c4 from "../assets/c4.svg";
import { api } from "axiosApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Product Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: value,
    }));
  };

  //handle add contact api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await api.post("/addContact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });
      console.log('reas==========>',response)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Product Inquiry",
        message: "",
      });
    } catch (error) {
      setSubmitError(
        "There was an error submitting your message. Please try again."
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Image */}
      {/* <div
        className="fixed inset-0 bg-cover bg-center z-0 opacity-20"
        style={{ backgroundImage: "url('/contact-bg.jpg')" }}
      ></div> */}

      {/* Content Container */}
      <div className="justify-center">
        {/* Header Section */}
        <div className="text-center mb-12 pt-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Have questions about our products or the #BADLAV movement? We're
            here to help! Reach out to us using any of the methods below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 mx-auto px-4">
          {/* Phone */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <img src={c1} />
            </div>
            <h3 className="font-medium mb-1">Phone</h3>
            <p className="text-sm mb-1">+91 98765 43210</p>
            <p className="text-xs text-gray-500">Mon-Fri: 9am - 6pm IST</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <img src={c2} />
            </div>
            <h3 className="font-medium mb-1">Email</h3>
            <p className="text-sm mb-1">care@rahaorganics.com</p>
            <p className="text-xs text-gray-500">We respond within 24 hours</p>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <img src={c3} />
            </div>
            <h3 className="font-medium mb-1">Address</h3>
            <p className="text-sm mb-1">123 Ayurveda Lane, Mumbai</p>
            <p className="text-xs text-gray-500">Maharashtra 400001, India</p>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <img src={c4} />
            </div>
            <h3 className="font-medium mb-1">WhatsApp</h3>
            <p className="text-sm mb-1">+91 98765 43210</p>
            <p className="text-xs text-gray-500">Chat with us directly</p>
          </div>
        </div>

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
          ></div>
        </div>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg mt-6 px-4">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7f614f]"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7f614f]"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your Phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7f614f]"
                required
              />
            </div>

            {/* Inquiry Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Inquiry Type
              </label>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="product"
                    name="inquiryType"
                    checked={formData.inquiryType === "Product Inquiry"}
                    onChange={() => handleRadioChange("Product Inquiry")}
                    className="mr-2"
                  />
                  <label htmlFor="product" className="text-sm">
                    Product Inquiry
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="support"
                    name="inquiryType"
                    checked={formData.inquiryType === "Order Support"}
                    onChange={() => handleRadioChange("Order Support")}
                    className="mr-2"
                  />
                  <label htmlFor="support" className="text-sm">
                    Order Support
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="badlav"
                    name="inquiryType"
                    checked={formData.inquiryType === "#BADLAV Movement"}
                    onChange={() => handleRadioChange("#BADLAV Movement")}
                    className="mr-2"
                  />
                  <label htmlFor="badlav" className="text-sm">
                    #BADLAV Movement
                  </label>
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7f614f] resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7F614F] rounded-md border hover:bg-white hover:text-[#7F614F] text-white  py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7f614f] focus:ring-offset-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                Your message has been sent successfully. We'll get back to you
                soon!
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {submitError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
