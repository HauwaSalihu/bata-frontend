import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrders } from "../utils/api/order";
import { addNotification } from "../utils/slicers/notificationSlice";
import AccountSidebar from "../components/AccountSidebar";
import { BASE_URL } from "../utils/variables";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-500', text: 'Pending' },
    processing: { color: 'bg-blue-500', text: 'Processing' },
    shipped: { color: 'bg-purple-500', text: 'Shipped' },
    delivered: { color: 'bg-green-500', text: 'Delivered' },
    cancelled: { color: 'bg-red-500', text: 'Cancelled' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className="text-sm md:text-base">{config.text}</span>
    </div>
  );
};

const OrdersPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: ''
  });

  const fetchOrders = async (page) => {
    try {
      setLoading(true);
      const response = await getMyOrders({
        query: {
          page,
          limit: 5,
          ...filters
        }
      });

      if (response.status) {
        setOrders(response.data.orders);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: "Failed to fetch orders"
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to fetch orders"
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, filters]);

  const handleFilter = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setCurrentPage(1);
  };

  return (
    <main className="px-4 lg:px-20 mb-10 mt-10">
      {/* Hyperlink Section */}
      <section className="container flex flex-wrap justify-between items-center mx-auto mb-8">
        <ul className="flex gap-2 text-sm text-gray-500">
          <li>Home</li>
          <li>/</li>
          <li className="font-medium text-black">My Orders</li>
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
          {/* Filters */}
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
            <h3 className="text-lg font-medium border-b pb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilter}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilter}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilter}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
            </div>
          </div>
          {/* Orders List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm border">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                  {/* Order Header */}
                  <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium">₦{order.totalAmount.toLocaleString()}</p>
                    </div>
                    <OrderStatusBadge status={order.orderStatus} />
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex flex-wrap md:flex-nowrap items-start gap-4 py-4">
                        <img
                          src={BASE_URL + "/image/" + item.product.images[0].filename}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-grow min-w-[200px]">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end pt-4 border-t">
                    <Link
                      to={`/orders/${order._id}`}
                      className="px-4 py-2 text-[#db4444] border border-[#db4444] rounded hover:bg-red-50 transition text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    px-4 py-2 rounded
                    ${currentPage === page
                      ? 'bg-[#db4444] text-white'
                      : 'border hover:bg-red-50'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default OrdersPage;