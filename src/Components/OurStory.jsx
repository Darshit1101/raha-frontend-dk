"use client";

import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const OurStory = () => {
  const navigate = useNavigate(); // ✅ Define navigate

  const handleNavigateHome = () => {
    navigate("/");
    window.scrollTo(0, 0); // ✅ Scroll to top after navigation
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-4">
        <span
          onClick={handleNavigateHome}
          className="cursor-pointer hover:text-black transition-colors"
        >
          Home
        </span>{" "}
        / Story
      </nav>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Our Story</h1>

      {/* Video/Image Section */}
      {/* Video Section with Embedded YouTube Video */}
      <div className="relative md:h-[600px] h-[400px] w-full items-center justify-center overflow-hidden mb-10">
        <div className="absolute inset-0 z-0 p-5">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/OHgjm0c16cI?si=jX-4ELs2T3QqaFhd"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>

      {/* Story Text */}
      <div className="space-y-6 mb-16 text-justify">
        <p>
          Raha Organics was born from a simple yet powerful idea: beauty
          products should enhance your natural beauty without compromising your
          health or the environment.
        </p>
        <p>
          Founded by Dr. Rachana and Hardik Dhola in 2020, our journey began
          when Dr. Rachana, an Ayurvedic practitioner, noticed the harmful
          effects of chemical-laden products on her patients' hair and skin.
        </p>
        <p>
          Drawing from her extensive knowledge of Ayurveda and Hardik's
          background in modern cosmetic science, they created formulations that
          harness the power of ancient herbs with proven scientific methods.
        </p>
        <p>
          Today, Raha Organics stands as a testament to their vision of #BADLAV
          – a movement encouraging people to make the change from harmful to
          herbal beauty solutions.
        </p>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {/* First Value */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
            {/* SVG Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12L11 15L16 10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Ayurvedic Wisdom</h3>
          <p className="text-sm leading-relaxed">
            We draw from 5,000 years of Ayurvedic knowledge, using time-tested
            herbal formulations that work in harmony with your body's natural
            balance.
          </p>
        </div>

        {/* Second Value */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
            {/* SVG Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M20.618 5.984C17.45 6.3 14.259 4.242 14.259 4.242C14.259 4.242 11.988 1.3 8.62 2.024C7.493 2.262 6.489 2.878 5.737 3.781C4.985 4.683 4.524 5.825 4.421 7.029C4.206 9.559 5.187 11.993 6.67 13.862C7.333 14.688 8.11 15.428 8.979 16.064L12 18.168L15.021 16.064C15.89 15.428 16.667 14.688 17.33 13.862C18.813 11.993 19.794 9.559 19.579 7.029C19.476 5.825 19.015 4.683 18.263 3.781C17.511 2.878 16.507 2.262 15.38 2.024"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Scientific Validation</h3>
          <p className="text-sm leading-relaxed">
            We combine ancient wisdom with modern science, ensuring every
            ingredient is backed by research and every formula is
            dermatologically tested.
          </p>
        </div>

        {/* Third Value */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
            {/* SVG Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 9H16V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V9H4C3.73478 9 3.48043 9.10536 3.29289 9.29289C3.10536 9.48043 3 9.73478 3 10V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V10C21 9.73478 20.8946 9.48043 20.7071 9.29289C20.5196 9.10536 20.2652 9 20 9ZM10 7C10 6.46957 10.2107 5.96086 10.5858 5.58579C10.9609 5.21071 11.4696 5 12 5C12.5304 5 13.0391 5.21071 13.4142 5.58579C13.7893 5.96086 14 6.46957 14 7V9H10V7Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Toxin-Free Promise</h3>
          <p className="text-sm leading-relaxed">
            We pledge to never use sulfates, parabens, silicones, synthetic
            fragrances, or any harmful chemicals in our products. Just pure,
            natural goodness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
