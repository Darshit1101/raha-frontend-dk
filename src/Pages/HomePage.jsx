import FeaturedProduct from "../Components/FeaturedProduct";
import HairCare from "../Components/HairCare";
import Hero from "../Components/Hero";
import InstaPostWithStyles from "../Components/InstaPost";
import Quality from "../Components/Quality";
import Testimonial from "../Components/Testimonial";
import { api } from "axiosApi";
import { useEffect, useCallback, useState } from "react";

const HomePage = () => {
  const [state, setState] = useState({
    AllProducts: [],
    ALlReviews : []
  });

  //set data in state
  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  //load products from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getAllProducts");
        changeNameValue({ AllProducts: response.data.data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  //get all reviewn 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getReview");
        changeNameValue({ ALlReviews: response.data.data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  },[])

  return (
    <>
      <Hero />
      <FeaturedProduct state={state} changeNameValue={changeNameValue} />
      <HairCare state={state} changeNameValue={changeNameValue}/>
      <Quality />
      <Testimonial state={state} changeNameValue={changeNameValue} />
      <InstaPostWithStyles />
    </>
  );
};

export default HomePage;
