// src/App.jsx

import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import Header from "./components/Header";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";

import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import Orders from "./pages/Orders";
import VerifyEmail from "./pages/VerifyEmail";
const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  const dispatch = useDispatch();
  setupAxiosInterceptors(dispatch);
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const response = await me({});

        if (response?.status) {
          dispatch(setUserAuth({ user: response?.data }));
        } else {
          dispatch(resetUser());
          dispatch(
            addNotification({
              type: "error",
              title: "Operation Failed!",
              description: response?.message,
            })
          );
        }
      } else {
        dispatch(resetUser());
      }
    };

    validateToken();
    // eslint-disable-next-line
  }, []);

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        outline: "none",
        border: "2px solid green",
        borderRadius: "4px",
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      Go to Home
    </button>
  );
};

const App = () => (
  <div style={{ textAlign: "center" }}>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/collection" element={<CategoryPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/place-order" element={<CheckoutPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route path="/verify-email/:token" element={<VerifyEmail />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
