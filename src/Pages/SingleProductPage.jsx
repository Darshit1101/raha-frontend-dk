import React, { useEffect, useState, useCallback } from "react";
import SingleProduct from "../Components/SingleProduct";
import FeaturedProduct2 from "../Components/FeaturedProduct2";
import { api } from "axiosApi";
import { useNavigate, useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { productId } = useParams(); // Extract productId from URL

  const [state, setState] = useState({
    SingleProduct: [],
  });

  //set data in state
  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  //single product data
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await api.get(`/getProduct/${productId}`);
        changeNameValue({ SingleProduct: response.data.data });
      } catch (error) {
        console.error("Error fetching single product:", error);
      }
    };

    fetchSingleProduct();
  }, [productId]);

  return (
    <>
      <SingleProduct state={state} changeNameValue={changeNameValue} />
      <FeaturedProduct2 />
    </>
  );
};

export default SingleProductPage;
