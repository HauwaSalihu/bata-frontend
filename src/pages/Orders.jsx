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
      <span className="text-xs sm:text-sm">{config.text}</span>
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
    <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hyperlink Section */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <ul className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-0">
          <li className="hidden sm:inline">Home</li>
          <li className="hidden sm:inline">/</li>
          <li className="font-medium text-black">My Orders</li>
        </ul>
        <div className="flex items-center text-xs sm:text-sm">
          <span className="text-black mr-1">Welcome!</span>
          <span className="text-[#db4444] truncate max-w-[150px]">{user?.name}</span>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block col-span-1">
          <AccountSidebar />
        </div>

        {/* Orders Content */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-4">
            <AccountSidebar />
          </div>

          {/* Filters */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
            <h3 className="text-base sm:text-lg font-medium border-b pb-4 mb-4">Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilter}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
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
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilter}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilter}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
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
                <div key={order._id} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                  {/* Order Header */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-4 border-b">
                    <div className="col-span-1">
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="text-xs sm:text-sm font-medium truncate max-w-[120px]">{order._id}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="text-xs sm:text-sm font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-xs sm:text-sm font-medium">₦{order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="col-span-1 flex justify-end items-center">
                      <OrderStatusBadge status={order.orderStatus} />
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 sm:space-y-4 mt-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 sm:gap-4">
                        <img
                          src={BASE_URL + "/image/" + item.product.images[0].filename}
                          alt={item.product.name}
                          className="w-12 h-12 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-grow overflow-hidden">
                          <h4 className="text-xs sm:text-sm font-medium truncate">{item.product.name}</h4>
                          <p className="text-[10px] sm:text-xs text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end mt-4 pt-4 border-t">
                    <Link
                      to={`/orders/${order._id}`}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-[#db4444] border border-[#db4444] rounded hover:bg-red-50 transition text-xs sm:text-sm"
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
            <div className="flex justify-center gap-1 sm:gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm
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
                className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border rounded disabled:opacity-50"
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