"use client";

import React, { useRef, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

// Sample testimonial data
const testimonialData = [
  {
    id: 1,
    name: "Priya S.",
    rating: 5,
    image: "/smiling-woman-long-hair.png",
    review:
      "After trying countless products for my dry hair, Raha's Hair Oil has been a game-changer. My hair feels nourished and looks healthier than ever!",
  },
  {
    id: 2,
    name: "Aisha M.",
    rating: 5,
    image: "/curly-haired-woman.png",
    review:
      "I've been using this product for 3 months now and the results are amazing. My scalp feels healthier and my hair has never been shinier!",
  },
  {
    id: 3,
    name: "Rahul K.",
    rating: 5,
    image: "/short-haired-man.png",
    review:
      "The natural ingredients in this oil have transformed my hair. No more dryness or frizz. Highly recommend to anyone struggling with hair issues.",
  },
];

// Star rating component
const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-[#7f614f]" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Quote icon
const QuoteIcon = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7M10 11V9C10 8.46957 9.78929 7.96086 9.41421 7.58579C9.03914 7.21071 8.53043 7 8 7H6M10 11V19M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7M20 11V9C20 8.46957 19.7893 7.96086 19.4142 7.58579C19.0391 7.21071 18.5304 7 18 7H16M20 11V19"
      stroke="#E5DFDA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Testimonial card
const TestimonialCard = ({ testimonial }) => (
  <div className="flex items-center justify-center">
    <div className="bg-[#f6f3f0] border border-[#e5dfda] rounded-lg p-8 relative md:mx-12 mx-3 max-w-4xl h-full">
      <QuoteIcon className="absolute top-6 right-6 opacity-50" />
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-medium">{testimonial.name}</h3>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      <div className="relative">
        <QuoteIcon className="absolute -left-2 -top-2 transform -scale-x-100 opacity-30 w-5 h-5" />
        <p className="text-gray-700 pl-4 leading-relaxed">
          {testimonial.review}
        </p>
      </div>
    </div>
  </div>
);

// Main carousel
const Testimonial = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  // Manual autoplay
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());

    const autoplayInterval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplayInterval);
    };
  }, [emblaApi]);

  return (
    <section className="py-16 nd:px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center px-4 mb-12">
          What Our Customers Say
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonialData.map((testimonial) => (
              <div className="flex-[0_0_100%] min-w-0" key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === selectedIndex ? "bg-[#7f614f]" : "bg-gray-300"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
