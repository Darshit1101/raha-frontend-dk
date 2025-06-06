"use client";

import { useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import blacklogo from "../assets/blacklogo.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import log1 from "../assets/log1.png";
import log2 from "../assets/log2.png";
import log3 from "../assets/log3.png";
import log4 from "../assets/log4.png";
import { api } from "axiosApi";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sliderImages = [log1, log2, log3, log4];

  //=======================================================================================================================================================
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  //set data in state
  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email: state.email,
        password: state.password,
      });
      console.log("Login successful:", response.data);
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('email', response.data?.user?.email);
      localStorage.setItem('userID', response.data?.user?.userId);
      localStorage.setItem('username', response.data?.user?.username);
      localStorage.setItem('fullName', response.data?.user?.fullName);
      // Clear form fields
      setState({
        email: "",
        password: "",
      });
      // Optionally redirect or show a success message
      window.location.href = "/"; 
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show a message to the user)
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Section - Login Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-40 w-40">
              <img
                src={blacklogo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <input
                  value={state.email}
                  onChange={(e) => changeNameValue({ email: e.target.value })}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-[#7F614F] rounded-md px-4 py-3 text-gray-900 placeholder-[#7F614F]"
                  placeholder="Email Address"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  value={state.password}
                  onChange={(e) =>
                    changeNameValue({ password: e.target.value })
                  }
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full border border-[#7F614F] rounded-md px-4 py-3 text-gray-900 placeholder-[#7F614F]"
                  placeholder="Password"
                />
                {password && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F614F]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-[#7F614F] hover:text-[#925f40]"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                onClick={handleLogin}
                type="submit"
                className="group relative flex w-full justify-center bg-[#7F614F] rounded-md border hover:bg-white hover:text-[#7F614F] text-white px-4 py-3 text-sm font-medium"
              >
                Log In
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-[#7F614F]"></div>
              <span className="mx-4 flex-shrink text-[#7F614F]">OR</span>
              <div className="flex-grow border-t border-[#7F614F]"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center rounded-md border bg-[#ffffff] hover:bg-[#7F614F] hover:text-[#ffffff] text-[#7F614F] px-4 py-2 text-sm font-medium"
              >
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md border bg-[#ffffff] hover:bg-[#7F614F] hover:text-[#ffffff] text-[#7F614F] px-4 py-2 text-sm font-medium"
              >
                Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-gray-500">Can't Log In? </span>
              <a href="/sign" className="text-[#7F614F] hover:text-[#925f40]">
                Sign up an account
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
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
