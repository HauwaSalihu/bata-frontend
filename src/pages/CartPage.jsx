import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, selectCartItems } from "../utils/slicers/cartSlice";
import { updateQuantity as updateCartQuantity, removeFromCart } from "../utils/api/cart";
import { addNotification } from "../utils/slicers/notificationSlice";
import { BASE_URL } from "../utils/variables";
import CartTotal from "../components/CartTotal";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems || []);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleQuantityUpdate = async (itemId, quantity) => {
    try {
      const response = await updateCartQuantity({
        itemId,
        data: { quantity }
      });

      if (response.status) {
        dispatch(updateCart({
          cart: response.data.cart,
          total: response.data.total,
          itemCount: response.data.itemCount
        }));
      } else {
        throw new Error(response.message || 'Failed to update quantity');
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to update quantity"
      }));
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setIsLoading(true);
      const response = await removeFromCart({ itemId });

      if (response.status) {
        dispatch(updateCart({
          cart: response.data.cart,
          total: response.data.total,
          itemCount: response.data.itemCount
        }));
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Item removed from cart"
        }));
      } else {
        throw new Error(response.message || 'Failed to remove item');
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to remove item"
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-10 px-4 lg:px-20">
      {/* Breadcrumb */}
      <section className="container mx-auto mb-10">
        <ul className="flex gap-3 text-sm">
          <li className="text-slate-400">Home</li>
          <li>/</li>
          <li className="font-medium">Cart</li>
        </ul>
      </section>

      {/* Cart Section */}
      <section className="container mx-auto mb-20">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#db4444]"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-4">Your cart is empty</h3>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-grow">
              {/* Cart Header - Desktop */}
              <div className="hidden lg:grid grid-cols-12 gap-4 p-4 bg-white rounded shadow mb-4">
                <div className="col-span-6 font-medium text-gray-700">Product</div>
                <div className="col-span-2 text-center font-medium text-gray-700">Price</div>
                <div className="col-span-2 text-center font-medium text-gray-700">Quantity</div>
                <div className="col-span-2 text-center font-medium text-gray-700">Subtotal</div>
              </div>
              {/* Cart Items */}
             
              {cartItems.map((item) => {
                // Find the correct variation from product variations array
                const itemVariation = item.product.variations.find(v => v._id === item.variation);

                // Get price based on whether there's a sale
                const regularPrice = itemVariation?.price || 0;
                const salePrice = item.salePrice || regularPrice;
                const price = item.sale ? salePrice : regularPrice;

                return (
                  <div key={item._id} className="bg-white rounded shadow p-4 mb-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="lg:col-span-6 flex items-center gap-4">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700 text-xl font-bold"
                        >
                          ×
                        </button>
                        <img
                          src={BASE_URL + "/image/" + item.product.images[0]?.filename}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">
                            Size: {itemVariation?.name}
                          </p>
                          {item.sale && (
                            <p className="text-xs text-[#db4444]">
                              {item.sale.discountPercentage}% OFF
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="lg:col-span-2 text-center">
                        {item.sale ? (
                          <div>
                            <p className="text-[#db4444] font-medium">
                              NGN {salePrice.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-400 line-through">
                              NGN {regularPrice.toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p>NGN {price.toFixed(2)}</p>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="lg:col-span-2 flex justify-center">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => handleQuantityUpdate(item._id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (value && value > 0) {
                                handleQuantityUpdate(item._id, value);
                              }
                            }}
                            className="w-12 text-center border-x focus:outline-none"
                          />
                          <button
                            onClick={() => handleQuantityUpdate(item._id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                            disabled={item.quantity >= itemVariation?.quantity}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="lg:col-span-2 text-center font-medium">
                        <p className={item.sale ? "text-[#db4444]" : ""}>
                          NGN {(price * item.quantity).toFixed(2)}
                        </p>
                        {item.sale && (
                          <p className="text-sm text-gray-400 line-through">
                            NGN {(regularPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Cart Actions */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 border border-black/50 rounded hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate('/checkout')}
                  className="px-6 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-[400px]">
              <CartTotal />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;