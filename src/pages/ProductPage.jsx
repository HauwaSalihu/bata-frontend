import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import { getProductBySlug } from "../utils/api/product";
import { addUpdateCart } from "../utils/api/cart";
import { setCartLoading, updateCart } from "../utils/slicers/cartSlice";
import { selectProductInCart } from "../utils/slicers/cartSlice";
import { BASE_URL } from "../utils/variables";
import { addNotification } from "../utils/slicers/notificationSlice";
import Modal from "../components/Modal";
import Reviews from "../components/Reviews";

const ProductPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const currency = "₦";

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedVariation, setSelectedVariation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);

  // Check if product is in cart
  const cartItem = useSelector((state) =>
    selectProductInCart(state, productData?._id, selectedVariation)
  );

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await getProductBySlug({ slug });
      if (response.status && response.data) {
        setProductData(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setImage(BASE_URL + "/image/" + response.data.images[0].filename);
        }
        if (response.data.variations && response.data.variations.length > 0) {
          const initialVariation = response.data.variations[0];
          setSelectedVariation(initialVariation._id);
          setSelectedPrice(initialVariation.price);

          if (response.data.activeSale) {
            const discountedPrice =
              initialVariation.price *
              (1 - response.data.activeSale.discountPercentage / 100);
            setDiscountedPrice(discountedPrice);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Error",
          description: "Failed to load product details.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.product) {
      const product = location.state.product;
      setProductData(product);
      if (product.images?.[0]) {
        setImage(BASE_URL + "/image/" + product.images[0].filename);
      }
      if (product.variations && product.variations.length > 0) {
        const initialVariation = product.variations[0];
        setSelectedVariation(initialVariation._id);
        setSelectedPrice(initialVariation.price);

        if (product.activeSale || product?.discountPercentage) {
          const discountedPrice =
            initialVariation.price *
            (1 -
              (product?.activeSale?.discountPercentage ||
                product?.discountPercentage) /
                100);
          setDiscountedPrice(discountedPrice);
        }
      }
      setIsLoading(false);
    } else {
      fetchProductData();
    }
  }, [slug, location.state]);

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation._id);
    setSelectedPrice(variation.price);
    
    // Calculate discounted price if there's an active sale or discount
    if (productData?.activeSale || productData?.discountPercentage) {
      const discountPercentage = productData?.activeSale?.discountPercentage || 
                                 productData?.discountPercentage;
      const discountedPrice = variation.price * (1 - discountPercentage / 100);
      setDiscountedPrice(discountedPrice);
    }
    
    // Reset quantity when variation changes
    setQuantity(1);
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.max(1, newQuantity);
    });
  };

  const initiateAddToCart = (buyNow = false) => {
    if (!selectedVariation || isAddingToCart) return;

    if (!isAuthenticated) {
      setIsBuyNow(buyNow);
      setShowAuthModal(true);
      return;
    }

    handleAddToCart(buyNow);
  };

  const handleAddToCart = async (buyNow = false) => {
    try {
      setIsAddingToCart(true);
      dispatch(setCartLoading(true));

      const response = await addUpdateCart({
        data: {
          productId: productData._id,
          variationId: selectedVariation,
          quantity: quantity,
        },
      });

      if (response.status) {
        dispatch(
          updateCart({
            cart: response.data.cart,
            total: response.data.total,
            itemCount: response.data.itemCount,
          })
        );

        if (buyNow) {
          navigate("/cart");
        } else {
          dispatch(
            addNotification({
              type: "success",
              title: "Success",
              description: "Added to cart successfully!",
            })
          );
        }
      } else {
        throw new Error(response.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Error",
          description: error.message || "Failed to add to cart",
        })
      );
    } finally {
      setIsAddingToCart(false);
      dispatch(setCartLoading(false));
    }
  };

  const handleAuthModalAction = (action) => {
    setShowAuthModal(false);
    if (action === "login") {
      navigate("/login", { state: { from: location } });
    }
  };

  // Rest of your render logic...
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#db4444]"></div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const selectedVariationData = productData.variations?.find(
    (v) => v._id === selectedVariation
  );

  return (
    <main className="lg:px-20 mt-10">
      {/* Hyperlink Section */}
      <section className="container mx-auto px-4 lg:px-10 mb-10">
        <ul className="flex gap-3 text-sm">
          <li className="text-slate-400">Account</li>
          <li>/</li>
          <li className="text-slate-400">Product</li>
          <li>/</li>
          <li className="font-medium">{productData.name}</li>
        </ul>
      </section>

      {/* Main Content */}
      <section className="container mx-auto flex flex-wrap lg:flex-nowrap gap-10 px-4 lg:px-10 mb-10">
        {/* Thumbnail Images */}
        <div className="flex lg:flex-col gap-4 lg:gap-0">
          {productData.images?.map((item, index) => (
            <div
              key={index}
              className="relative w-28 h-20 lg:w-[170px] lg:h-[138px] mb-5 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                onClick={() => setImage(BASE_URL + "/image/" + item.filename)}
                src={BASE_URL + "/image/" + item.filename}
                alt={`${productData.name} thumbnail ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Main Product Details */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Large Product Image */}
          <div className="relative w-full lg:w-[500px] h-[300px] lg:h-[600px] rounded-lg overflow-hidden">
            <img
              className="absolute inset-0 w-full object-contain"
              src={image}
              alt={productData.name}
              loading="lazy"
            />
            {(productData?.activeSale || productData?.discountPercentage) && (
              <div className="absolute top-4 left-4 bg-[#db4444] text-white px-3 py-1 rounded">
                -
                {productData?.activeSale?.discountPercentage ||
                  productData?.discountPercentage}
                % OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-black text-2xl font-semibold leading-normal tracking-wide">
              {productData.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              {productData?.activeSale || productData?.discountPercentage ? (
                <>
                   <p className="text-[#db4444] text-2xl font-semibold">
                    {currency}
                    {new Intl.NumberFormat().format(
                      discountedPrice.toFixed(2)
                    )}
                  </p>
                  <p className="text-gray-400 text-xl line-through">
                    {currency}
                    {new Intl.NumberFormat().format(
                      selectedPrice.toFixed(2)
                    )}
                  </p>
                </>
              ) : (
                <p className="text-black text-2xl font-normal leading-normal tracking-wide">
                  {currency}
                  {new Intl.NumberFormat().format(
                      selectedPrice.toFixed(2)
                    )}
                </p>
              )}
            </div>

            <div className="mt-2 flex items-center gap-4">
              {productData.variations?.some((v) => v.quantity > 0) ? (
                <span className="text-sm opacity-60 inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700">
                  In Stock
                </span>
              ) : (
                <span className="text-sm opacity-60 inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="mt-4 text-sm text-black">{productData.description}</p>

            {/* Variations/Sizes */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xl">Size:</span>
              <div className="flex items-center gap-2">
                {productData.variations?.map((variation) => (
                  <button
                    onClick={() => handleVariationSelect(variation)}
                    className={`px-3 py-1 flex justify-center items-center border rounded ${
                      variation._id === selectedVariation
                        ? "border-orange-500 bg-[#db4444] text-white"
                        : ""
                    }`}
                    key={variation._id}
                    disabled={variation.quantity === 0}
                  >
                    {variation.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy Section */}
            {/* Buy Section with updated cart status */}
            <div className="mt-4 flex items-center gap-4">
              <div className="w-[159px] h-11 flex justify-start items-start">
                <div
                  onClick={() => handleQuantityChange(false)}
                  className="w-10 h-11 px-2 py-2.5 rounded-tl rounded-bl border border-black/50 flex text-center justify-center items-center cursor-pointer"
                >
                  <div className="text-black text-2xl font-medium font-[Poppins] leading-7">
                    <img src="/images/icon-minus.png" alt="" />
                  </div>
                </div>

                <div className="h-11 py-2 border-t border-b border-black/50 flex justify-center items-center">
                  <div className="text-black text-xl w-10 font-medium font-[Poppins] leading-7">
                    <p className="text-center"> {quantity}</p>
                  </div>
                </div>

                <div
                  onClick={() => handleQuantityChange(true)}
                  className="w-[41px] h-11 pl-[9px] pr-2 py-2.5 bg-[#db4444] rounded-tr rounded-br flex justify-center items-center cursor-pointer"
                >
                  <img src="/images/icon-plus.png" alt="" />
                </div>
              </div>

              <button
                onClick={() => initiateAddToCart(true)}
                className="bg-[#db4444] text-white px-6 py-2 rounded disabled:bg-gray-400 hover:bg-[#c03838] transition-colors"
                disabled={
                  !selectedVariation ||
                  isAddingToCart ||
                  selectedVariationData?.quantity === 0
                }
              >
                Buy Now
              </button>

              <div className="relative group">
                <button
                  onClick={() => initiateAddToCart(false)}
                  className={`w-10 h-10 p-1 rounded border border-black/50 justify-center items-center inline-flex 
      ${
        !selectedVariation ||
        isAddingToCart ||
        selectedVariationData?.quantity === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-100 cursor-pointer"
      }
      ${isAddingToCart ? "animate-bounce" : ""}
      ${cartItem ? "bg-red-50 border-[#db4444]" : ""}`}
                  disabled={
                    !selectedVariation ||
                    isAddingToCart ||
                    selectedVariationData?.quantity === 0
                  }
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart icon"
                    width={"20px"}
                    className={`${
                      isAddingToCart ? "scale-110 transition-transform" : ""
                    }`}
                  />
                </button>

                <div className="absolute bottom-full mb-2 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {cartItem
                      ? `Update Cart (${cartItem.quantity} in cart)`
                      : "Add to Cart"}
                  </div>
                  <div className="border-8 border-transparent border-t-gray-800 w-0 h-0 mx-auto" />
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="mt-4 border p-4 rounded">
              <div className="mb-2">
                <strong>Free Delivery</strong>: Enter your postal code for
                delivery availability.
              </div>
              <div>
                <strong>Return Delivery</strong>: Free 30 Days Delivery Returns.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews productId={productData._id} productName={productData.name} />

      {/* Related Products Section */}
      <RelatedProduct
        category={productData.category}
        currentProductId={productData._id}
      />

      {/* Authentication Modal */}
      {showAuthModal && (
        <Modal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          title="Login Required"
        >
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              Please login to add items to your cart.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleAuthModalAction("cancel")}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAuthModalAction("login")}
                className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
              >
                Login
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default ProductPage;
