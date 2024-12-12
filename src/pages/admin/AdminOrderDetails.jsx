import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrderById, updateOrderStatus } from "../../utils/api/order";
import { addNotification } from "../../utils/slicers/notificationSlice";
import { BASE_URL } from "../../utils/variables";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
  const paymentStatuses = ["pending", "completed", "failed"];

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await getOrderById({ orderId });
      if (response.status) {
        setOrder(response.data);
      } else {
        throw new Error(response.message);
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

  const handleStatusUpdate = async (type, newStatus) => {
    try {
      const response = await updateOrderStatus({
        orderId,
        data: {
          [type === 'order' ? 'orderStatus' : 'paymentStatus']: newStatus
        }
      });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Order status updated successfully"
        }));
        fetchOrderDetails();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to update status"
      }));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="p-8 text-center">Order not found</div>;
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{order._id.slice(-6)}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 text-[#db4444] border border-[#db4444] rounded hover:bg-red-50"
        >
          Back to Orders
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Status Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Order Status</h2>
          <select
            value={order.orderStatus}
            onChange={(e) => handleStatusUpdate('order', e.target.value)}
            className={`w-full p-2 rounded border ${getStatusColor(order.orderStatus)}`}
          >
            {orderStatuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Status Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Payment Status</h2>
          <select
            value={order.paymentStatus}
            onChange={(e) => handleStatusUpdate('payment', e.target.value)}
            className={`w-full p-2 rounded border ${getStatusColor(order.paymentStatus)}`}
          >
            {paymentStatuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Total Amount</h2>
          <p className="text-2xl font-bold text-[#db4444]">
            ₦{order.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Customer Information */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Contact Details</h3>
            <p className="mt-2">{order.user.name}</p>
            <p className="text-gray-600">{order.user.email}</p>
            <p className="text-gray-600">{order.user.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
            <p className="mt-2">{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
            <p>{order.shippingAddress.country}, {order.shippingAddress.zipCode}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Order Items</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Variation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={BASE_URL + "/image/" + item.product.images[0]?.filename}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.product.variations.find(v => v._id === item.variation)?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  ₦{item.product.variations.find(v => v._id === item.variation)?.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ₦{(item.product.variations.find(v => v._id === item.variation)?.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderDetails;