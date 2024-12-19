import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { updateCart } from "./utils/slicers/cartSlice";
import MyAccountPage from "./pages/MyAccountPage";
import ChangePassword from "./pages/ChangePassword";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import ProductForm from "./pages/admin/ProductForm";
import AdminLayout from "./components/AdminLayout";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminSales from "./pages/admin/AdminSale";
import { CreateSale, EditSale } from "./pages/admin/SaleForm";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminUsers from "./pages/admin/AdminUsers";
import Csr from "./pages/Csr";
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
            getCart({}),
          ]);

          if (userResponse?.status) {
            dispatch(setUserAuth({ user: userResponse?.data }));

            // Set cart data if cart request was successful
            if (cartResponse?.status) {
              // Match backend response format exactly
              const { cart, total, itemCount, invalidItems } =
                cartResponse.data;
              dispatch(
                updateCart({
                  cart,
                  total,
                  itemCount,
                  invalidItems,
                })
              );
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
          console.error("Error during initialization:", error);
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
    <div>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/csr" element={<Csr />} />
        <Route path="/collection" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Customer & Admin Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <MyAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/create" element={<ProductForm />} />
          <Route path="products/edit/:slug" element={<ProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<AdminOrderDetails />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="sales" element={<AdminSales />} />
          <Route path="sales/create" element={<CreateSale />} />
          <Route path="sales/edit/:id" element={<EditSale />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* Catch all other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!location.pathname.startsWith("/admin") && <Footer />}
    </div>
  );
};
export default App;
