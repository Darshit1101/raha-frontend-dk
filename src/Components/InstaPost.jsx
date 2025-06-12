'use client';

import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';
import post1 from '../assets/post1.png';
import { api } from 'axiosApi';

// const instagramPosts = [
//   {
//     id: 1,
//     image: post1,
//     link: "https://www.instagram.com/RahaOrganics/",
//     alt: "Naturals Hair Fall Control",
//   },
//   {
//     id: 2,
//     image: "/insta-post-2.jpg",
//     link: "https://www.instagram.com/RahaOrganics/",
//     alt: "Oil. Pack. Wash. Glow.",
//   },
//   {
//     id: 3,
//     image: "/insta-post-3.jpg",
//     link: "https://www.instagram.com/RahaOrganics/",
//     alt: "Buy 1 Get 1 Free",
//   },
//   {
//     id: 4,
//     image: "/insta-post-4.jpg",
//     link: "https://www.instagram.com/RahaOrganics/",
//     alt: "Ditch the Flakes, Own the Confidence",
//   },
//   {
//     id: 5,
//     image: "/insta-post-5.jpg",
//     link: "https://www.instagram.com/RahaOrganics/",
//     alt: "Rice Hair + Time +",
//   },
//   {
//     id: 6,
//     image: "/insta-post-6.png",
//     link: "https://www.instagram.com/RahaOrganics/",
//     alt: "Fruit Hair Products",
//   },
// ];

const InstaPost = ({ instagramPosts }) => {
  console.log('post===>', instagramPosts);
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">#RahaRitual</h2>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          Follow us on Instagram{' '}
          <a href="https://www.instagram.com/RahaOrganics" className="font-medium">
            @RahaOrganics
          </a>{' '}
          and share your Raha beauty rituals with us.
        </p>

        {/* Instagram Posts Grid with Horizontal Scroll on Mobile */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-4">
            {instagramPosts.map((post) => (
              <InstagramPostCard key={post.InstaPostId} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const InstagramPostCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-60 h-60 md:w-full md:h-auto md:aspect-square overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={post.image ? `${import.meta.env.VITE_API_IMAGE_URL}${post.image}` : '/placeholder.svg'}
        alt={post.alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      />

      {/* Hover Overlay with Instagram Icon */}
      <div
        className={`absolute inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Instagram className="text-white w-8 h-8" />
      </div>
    </a>
  );
};

// Add custom CSS to hide scrollbar
const customStyles = `
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`;

const InstaPostWithStyles = (props) => {
  const { state, changeNameValue } = props;
  const instagramPosts = state.AllInstaPost;
  console.log('Instagram Posts:', instagramPosts);

  return (
    <>
      <style jsx global>
        {customStyles}
      </style>
      <InstaPost instagramPosts={instagramPosts} />
    </>
  );
};

export default InstaPostWithStyles;
