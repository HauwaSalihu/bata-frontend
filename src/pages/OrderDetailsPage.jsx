import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderById, cancelOrder, retryPayment } from "../utils/api/order";
import { addNotification } from "../utils/slicers/notificationSlice";
import AccountSidebar from "../components/AccountSidebar";
import { BASE_URL } from "../utils/variables";
import ReviewModal from "../components/ReviewModal";
import { createReview, getUserProductReview, updateUserProductReview } from "../utils/api/review";

const OrderTimeline = ({ status }) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStep = steps.indexOf(status);

    return (
        <div className="py-6">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        {/* Step Circle */}
                        <div className="relative">
                            <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${index <= currentStep ? 'border-[#db4444] bg-[#db4444]' : 'border-gray-300'}
              `}>
                                <div className={`
                  w-3 h-3 rounded-full
                  ${index <= currentStep ? 'bg-white' : 'bg-gray-300'}
                `} />
                            </div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                                {step.charAt(0).toUpperCase() + step.slice(1)}
                            </div>
                        </div>

                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                            <div className={`
                flex-1 h-1 mx-2
                ${index < currentStep ? 'bg-[#db4444]' : 'bg-gray-300'}
              `} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Add these states to the component
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const fetchOrderDetails = async () => {
        try {
          setLoading(true);
          const response = await getOrderById({ orderId });
          if (response.status) {
            // Fetch reviews for each product in the order
            const orderData = response.data;
            const itemsWithReviews = await Promise.all(
              orderData.items.map(async (item) => {
                const reviewResponse = await getUserProductReview({ productId: item.product._id });
                return {
                  ...item,
                  userReview: reviewResponse.status ? reviewResponse.data : null
                };
              })
            );
      
            setOrder({
              ...orderData,
              items: itemsWithReviews
            });
          } else {
            dispatch(addNotification({
              type: "error",
              title: "Error",
              description: response?.message || "Failed to fetch order details"
            }));
          }
        } catch (error) {
          dispatch(addNotification({
            type: "error",
            title: "Error",
            description: error.message || "Failed to fetch order details"
          }));
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const handleCancelOrder = async () => {
        try {
            const response = await cancelOrder({ orderId });
            if (response.status) {
                dispatch(addNotification({
                    type: "success",
                    title: "Success",
                    description: "Order cancelled successfully"
                }));
                fetchOrderDetails();
            } else {
                dispatch(addNotification({
                    type: "error",
                    title: "Error",
                    description: response?.message || "Failed to cancel order"
                }));
            }
        } catch (error) {
            dispatch(addNotification({
                type: "error",
                title: "Error",
                description: error.message || "Failed to cancel order"
            }));
        }
    };

    const handleRetryPayment = async () => {
        try {
            const response = await retryPayment({ orderId });

            if (response.status) {
                // Redirect to Paystack payment page
                window.location.href = response.data.authorizationUrl;
            } else {
                dispatch(addNotification({
                    type: "error",
                    title: "Error",
                    description: response?.message || "Failed to retry payment"
                }));
            }
        } catch (error) {
            dispatch(addNotification({
                type: "error",
                title: "Error",
                description: error.message || "Failed to retry payment"
            }));
        }
    };

// Update the handleReviewSubmit function
const handleReviewSubmit = async (reviewData) => {
    try {
      let response;
      
      if (currentReview) {
        // Update existing review
        response = await updateUserProductReview({
          productId: selectedProduct._id,
          data: reviewData
        });
      } else {
        // Create new review
        response = await createReview({
          data: {
            product: selectedProduct._id,
            ...reviewData
          }
        });
      }
  
      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: `Review ${currentReview ? 'updated' : 'submitted'} successfully`
        }));
        setIsReviewModalOpen(false);
        setCurrentReview(null);  // Reset current review
        fetchOrderDetails();  // Refresh to show updated review
      } else {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: response?.message || `Failed to ${currentReview ? 'update' : 'submit'} review`
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || `Failed to ${currentReview ? 'update' : 'submit'} review`
      }));
    }
  };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (!order) {
        return <div className="text-center py-8">Order not found</div>;
    }

    return (
        <main className="px-4 lg:px-20 mb-10 mt-10">
            {/* Breadcrumb */}
            <section className="container flex flex-wrap justify-between items-center mx-auto mb-8">
                <ul className="flex gap-2 text-sm text-gray-500">
                    <li>Home</li>
                    <li>/</li>
                    <li>My Orders</li>
                    <li>/</li>
                    <li className="font-medium text-black">Order Details</li>
                </ul>
                <div className="flex items-center text-sm">
                    <span className="text-black mr-1">Welcome!</span>
                    <span className="text-[#db4444]">{user?.name}</span>
                </div>
            </section>

            {/* Main Content */}
            <section className="flex flex-wrap lg:flex-nowrap justify-between gap-8">
                <AccountSidebar />

                <div className="w-full lg:w-3/4 space-y-6">
                    {/* Order Status Timeline */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-medium mb-4">Order Status</h3>
                        {order.orderStatus !== 'cancelled' ? (
                            <OrderTimeline status={order.orderStatus} />
                        ) : (
                            <div className="text-center py-4 text-red-500">
                                This order has been cancelled
                            </div>
                        )}
                    </div>

                    {/* Order Details */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-medium">Order Details</h3>
                                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                                <p className="text-sm text-gray-500">
                                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                {order.orderStatus === 'pending' && (
                                    <button
                                        onClick={handleCancelOrder}
                                        className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                                {(order.orderStatus === 'pending' || order.paymentStatus === 'failed') && (
                                    <button
                                        onClick={handleRetryPayment}
                                        className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
                                    >
                                        Retry Payment
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-4">
                            <h4 className="font-medium border-b pb-2">Order Items</h4>
                            {order.items.map((item, index) => (
  <div key={index} className="space-y-4 py-4 border-b">
    {/* Product Info */}
    <div className="flex flex-wrap md:flex-nowrap items-start gap-4">
      <img
        src={BASE_URL + "/image/" + item.product.images[0]?.filename}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-grow">
        <h5 className="font-medium">{item.product.name}</h5>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₦{(item.product.variations.find(v => v._id === item.variation)?.price || 0).toLocaleString()}</p>
        </div>
      </div>

{order.orderStatus === 'delivered' && (
  <button
    onClick={() => {
      setSelectedProduct(item.product);
      setCurrentReview(item.userReview);  // Set the current review if it exists
      setIsReviewModalOpen(true);
    }}
    className="px-4 py-2 text-[#db4444] border border-[#db4444] rounded hover:bg-red-50"
  >
    {item.userReview ? 'Edit Review' : 'Write Review'}
  </button>
)}
    </div>

    {/* User's Review */}
    {item.userReview && (
      <div className="ml-32 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">Your Review</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i}
                className={`text-sm ${i < item.userReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {new Date(item.userReview.createdAt).toLocaleDateString()}
          </span>
        </div>
        {item.userReview.comment && (
          <p className="text-sm text-gray-600">{item.userReview.comment}</p>
        )}
      </div>
    )}
  </div>
))}
                        </div>
                        {/* Payment and Shipping Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <h4 className="font-medium mb-3">Payment Information</h4>
                                <div className="text-sm space-y-2">
                                    <p>Status:
                                        <span className={`font-medium ml-2 ${order.paymentStatus === 'completed'
                                            ? 'text-green-500'
                                            : order.paymentStatus === 'failed'
                                                ? 'text-red-500'
                                                : 'text-yellow-500'
                                            }`}>
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </span>
                                    </p>
                                    <p>Total Amount: ₦{order.totalAmount.toLocaleString()}</p>
                                    {order.paymentStatus === 'failed' && (
                                        <p className="text-red-500">
                                            Payment failed. Please try again using the Retry Payment button above.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">Shipping Address</h4>
                                <div className="text-sm space-y-2">
                                    <p>{order.shippingAddress.address}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                    <p>{order.shippingAddress.country}, {order.shippingAddress.zipCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ReviewModal
  isOpen={isReviewModalOpen}
  onClose={() => {
    setIsReviewModalOpen(false);
    setSelectedProduct(null);
    setCurrentReview(null);  // Reset current review on close
  }}
  onSubmit={handleReviewSubmit}
  productName={selectedProduct?.name}
  existingReview={currentReview}  // Pass the existing review if editing
/>
        </main>
    );
};

export default OrderDetailsPage;