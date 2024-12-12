import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  getAllSales, 
  cancelSale 
} from "../../utils/api/sale";
import { addNotification } from "../../utils/slicers/notificationSlice";
import { BASE_URL } from "../../utils/variables";
import { useNavigate } from "react-router-dom";

const AdminSales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  const statusOptions = ["draft", "active", "ended", "cancelled"];
  const sortOptions = [
    { value: "createdAt", label: "Created Date" },
    { value: "startDate", label: "Start Date" },
    { value: "endDate", label: "End Date" },
    { value: "name", label: "Name" },
    { value: "status", label: "Status" }
  ];

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await getAllSales({
        params: {
          page: currentPage,
          limit: 10,
          ...filters
        }
      });

      if (response.status) {
        setSales(response.data.sales);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to fetch sales"
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [currentPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  const handleCancelSale = async (saleId) => {
    if (window.confirm("Are you sure you want to cancel this sale?")) {
      try {
        const response = await cancelSale({ saleId });

        if (response.status) {
          dispatch(addNotification({
            type: "success",
            title: "Success",
            description: "Sale cancelled successfully"
          }));
          fetchSales();
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: error.message || "Failed to cancel sale"
        }));
      }
    }
  };

  const formatTimeRemaining = (timeRemaining) => {
    if (!timeRemaining) return null;
    const { days, hours, minutes } = timeRemaining;
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      active: "bg-green-100 text-green-800",
      ended: "bg-red-100 text-red-800",
      cancelled: "bg-yellow-100 text-yellow-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-8">
      {/* Header with Add Sale Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Management</h1>
        <button
          onClick={() => navigate('/admin/sales/create')}
          className="bg-[#db4444] text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          + Add Sale
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search sales..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <option value="">All Status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
        </div>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="divide-y">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : sales.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No sales found</div>
          ) : (
            sales.map((sale) => (
              <div key={sale._id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">{sale.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                        {sale.status}
                      </span>
                      {sale.timeRemaining && (
                        <span className="text-sm text-gray-500">
                          {formatTimeRemaining(sale.timeRemaining)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{sale.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Start: {new Date(sale.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(sale.endDate).toLocaleDateString()}</span>
                      <span>Products: {sale.products.length}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/sales/edit/${sale._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    {sale.status !== 'cancelled' && sale.status !== 'ended' && (
                      <button
                        onClick={() => handleCancelSale(sale._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {sale.products.map((product) => (
                    <div key={product._id} className="flex gap-4 bg-gray-50 p-3 rounded">
                      {product.images?.[0] && (
                        <img
                          src={BASE_URL + "/image/" + product.images[0].filename}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-grow">
                        <p className="font-medium">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            Discount: {product.discountPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="p-4 border-t flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
                    px-4 py-2 rounded
                    ${currentPage === index + 1
                      ? 'bg-[#db4444] text-white'
                      : 'border hover:bg-red-50'
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSales;