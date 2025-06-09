import OurProduct from "../Components/OurProduct";
import ShopHero from "../Components/ShopHero";
import Quality from "../Components/Quality";
import { api } from "axiosApi";
import { useEffect, useCallback, useState } from "react";

const ShopPage = () => {
   const [state, setState] = useState({
    AllProducts: "",
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

  return (
    <>
      <ShopHero />
      <OurProduct state={state} changeNameValue={changeNameValue}/>
      <Quality />
    </>
  );
};

export default ShopPage;
