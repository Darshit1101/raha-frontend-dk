"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import blacklogo from "../assets/blacklogo.svg";
import log1 from "../assets/log1.png";
import log2 from "../assets/log2.png";
import log3 from "../assets/log3.png";
import log4 from "../assets/log4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sliderImages = [log1, log2, log3, log4];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Section - Signup Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-40 w-40">
              <img src={blacklogo} />
            </div>
            {/* <h1 className="mt-2 text-2xl font-bold">RAHA organic</h1>
            <p className="mt-1 text-sm text-gray-500">
              Is Good For, We Always For You!!
            </p> */}
          </div>

          {/* Signup Form */}
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Full name"
                className="w-full border border-[#7F614F] rounded-md px-4 py-3 text-gray-900 placeholder-[#7F614F] focus:border-[#7F614F] focus:outline-none focus:ring-[#7F614F]"
              />
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
                className="w-full border border-[#7F614F] rounded-md px-4 py-3 text-gray-900 placeholder-[#7F614F] focus:border-[#7F614F] focus:outline-none focus:ring-[#7F614F]"
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="w-full border border-[#7F614F] rounded-md px-4 py-3 text-gray-900 placeholder-[#7F614F] focus:border-[#7F614F] focus:outline-none focus:ring-[#7F614F]"
              />
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-[#7F614F] rounded-md px-4 py-3 text-gray-900 placeholder-[#7F614F] focus:border-[#7F614F] focus:outline-none focus:ring-[#7F614F]"
                  placeholder="Password"
                />
                {/* Uncomment if you want password toggle button */}
                {/* <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F614F]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button> */}
              </div>
            </div>
            <button
              type="submit"
              className="group relative flex w-full justify-center bg-[#7F614F] hover:bg-white hover:text-[#7F614F] text-white rounded-md border px-4 py-3 text-sm font-medium"
            >
              Sign Up
            </button>
            <div className="text-center text-sm">
              <span className="text-gray-500">Already have an account? </span>
              <a href="/login" className="text-[#7F614F] hover:text-[#925f40]">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Swiper Image Slider */}
      <div className="hidden lg:block w-1/2">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          navigation={false}
          className="h-screen"
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
