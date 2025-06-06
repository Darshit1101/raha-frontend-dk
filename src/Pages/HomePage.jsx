import FeaturedProduct from "../Components/FeaturedProduct";
import HairCare from "../Components/HairCare";
import Hero from "../Components/Hero";
import InstaPostWithStyles from "../Components/InstaPost";
import Quality from "../Components/Quality";
import Testimonial from "../Components/Testimonial";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedProduct />
      <HairCare />
      <Quality />
      <Testimonial />
      <InstaPostWithStyles />
    </>
  );
};

export default HomePage;
