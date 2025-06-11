// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
// import HomePage from "./Pages/HomePage";
// import ShopPage from "./Pages/ShopPage";
// import OurStory from "./Components/OurStory";
// import Badlav from "./Components/Badlav";
// import Contact from "./Components/Contact";
// import SingleProductPage from "./Pages/SingleProductPage";
// import CartPage from "./Pages/CartPage";
// import CheckoutPage from "./Pages/CheckoutPage";
// import WishlistPage from "./Pages/WishlistPage";
// import LoginPage from "./Pages/LoginPage";
// import SignupPage from "./Pages/SignPage";
// import UserProfile from "./Pages/ProfilePage";

// function App() {
//   const token = localStorage.getItem("token");
//   console.log("Token:", token);
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/Sign" element={<SignupPage />} />
//         <Route path="/" element={<HomePage />} />
//         <Route path="/shop/allproducts" element={<ShopPage />} />
//         <Route path="/about" element={<OurStory />} />
//         <Route path="/badlav" element={<Badlav />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/products/:productId" element={<SingleProductPage />} />
//         {/* <Route path="/products" element={<SingleProductPage />} /> */}
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/checkoutpage" element={<CheckoutPage />} />
//         <Route path="/wishlist" element={<WishlistPage />} />
//         <Route path="/profile" element={<UserProfile />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;



import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import OurStory from "./Components/OurStory";
import Badlav from "./Components/Badlav";
import Contact from "./Components/Contact";
import SingleProductPage from "./Pages/SingleProductPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import WishlistPage from "./Pages/WishlistPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignPage";
import UserProfile from "./Pages/ProfilePage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Navbar />}

      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Sign" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop/allproducts" element={<ShopPage />} />
            <Route path="/about" element={<OurStory />} />
            <Route path="/badlav" element={<Badlav />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:productId" element={<SingleProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
