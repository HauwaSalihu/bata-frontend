import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { setupAxiosInterceptors } from "./utils/axiosInstance";
import { resetUser, setUserAuth } from "./utils/slicers/userSlice";
import { addNotification } from "./utils/slicers/notificationSlice";
import { me } from "./utils/api/user_api";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { getCart } from "./utils/api/cart";
import { setCartLoading, updateCart } from "./utils/slicers/cartSlice";
import MyAccountPage from "./pages/MyAccountPage";
import ChangePassword from "./pages/ChangePassword";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

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

const App = () => {
  const dispatch = useDispatch();
  setupAxiosInterceptors(dispatch);
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = useSelector((state) => state.user.token);

  // In validateToken function:
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const [userResponse, cartResponse] = await Promise.all([
            me({}),
            getCart({})
          ]);

          if (userResponse?.status) {
            dispatch(setUserAuth({ user: userResponse?.data }));

            // Set cart data if cart request was successful
            if (cartResponse?.status) {
              // Match backend response format exactly
              const { cart, total, itemCount, invalidItems } = cartResponse.data;
              dispatch(updateCart({
                cart,
                total,
                itemCount,
                invalidItems
              }));
            }
          } else {
            dispatch(resetUser());
            dispatch(
              addNotification({
                type: "error",
                title: "Authentication Failed",
                description: userResponse?.message,
              })
            );
          }
        } catch (error) {
          console.error('Error during initialization:', error);
          dispatch(resetUser());
          dispatch(
            addNotification({
              type: "error",
              title: "Error",
              description: "Failed to initialize application",
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
    <div style={{ textAlign: "center" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<CategoryPage />} />
        <Route path="/profile" element={<MyAccountPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;