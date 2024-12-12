import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { getProducts } from "../../utils/api/product";
import { useDispatch } from "react-redux";
import { addNotification } from "../../utils/slicers/notificationSlice";
import { BASE_URL } from "../../utils/variables";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts({
        params: {
          page: currentPage,
          limit: 10,
          ...filters
        }
      });

      if (response.status) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || "Failed to fetch products");
      }
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          title: "Error",
          description: error.message
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex">        
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <Link 
              to="/admin/products/create"
              className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] transition"
            >
              Add New Product
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
              <div>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                >
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>
              <div>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                >
                  <option value="createdAt">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
              <div>
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
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Price Range</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Loading...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No products found</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={BASE_URL + "/image/" + product.images[0]?.filename}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-gray-500 text-sm truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {product.category?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${product.status === 'published' ? 'bg-green-100 text-green-800' : 
                            product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        ₦{Math.min(...product.variations.map(v => v.price)).toLocaleString()} - 
                        ₦{Math.max(...product.variations.map(v => v.price)).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <Link 
                          to={`/admin/products/edit/${product.slug}`}
                          className="text-[#db4444] hover:text-[#c03838]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 p-4">
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminProducts;