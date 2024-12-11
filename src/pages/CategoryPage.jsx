import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addNotification } from "../utils/slicers/notificationSlice";
import { useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem";
import { getCategories } from "../utils/api/category";
import { getProducts } from "../utils/api/product";
import { BASE_URL } from "../utils/variables";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });
  const [priceStats, setPriceStats] = useState({
    min: 0,
    max: 10000,
    avg: 5000
  });

  // Get filters from URL or defaults
  const filters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "published",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
    page: parseInt(searchParams.get("page")) || 1
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories({});
      if (response.status) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts({params:{
        ...filters,
        limit: 12
      }});

      if (response.status) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
        setPriceStats(response.data.priceStats);
      } else {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: "Failed to fetch products"
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to fetch products"
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setSearchParams(prev => {
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      if (key !== 'page') prev.set('page', '1');
      return prev;
    });
  };

  const handlePriceChange = (min, max) => {
    setSearchParams(prev => {
      if (min) prev.set('minPrice', min);
      else prev.delete('minPrice');
      if (max) prev.set('maxPrice', max);
      else prev.delete('maxPrice');
      prev.set('page', '1');
      return prev;
    });
  };

  return (
    <main className="px-5 lg:px-20 mt-10 mb-10">
      {/* Breadcrumb */}
      <section className="container mx-auto mb-8">
        <ul className="flex gap-3 text-sm text-gray-500">
          <li>Home</li>
          <li>/</li>
          <li className="text-gray-900">All Products</li>
        </ul>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4 space-y-6">
          <div className="flex items-center justify-between lg:justify-start gap-2">
            <h2 className="text-lg font-medium">Filters</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden text-sm text-[#db4444]"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search products..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categories</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handlePriceChange(e.target.value, filters.maxPrice)}
                  placeholder="Min"
                  className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceChange(filters.minPrice, e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
              <div className="text-xs text-gray-500">
                Price range: ₦{priceStats.min.toLocaleString()} - ₦{priceStats.max.toLocaleString()}
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => setSearchParams(new URLSearchParams({ status: 'published' }))}
              className="w-full py-2 text-sm text-[#db4444] border border-[#db4444] rounded-md hover:bg-red-50 transition"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {products.length} of {pagination.totalProducts} products
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductItem
                  product={product}
                    key={product._id}
                    name={product.name}
                    price={product?.variations[0]?.price || 0}
                    id={product._id}
                    image={BASE_URL+"/image/"+product.images[0]?.filename}
                    sale={product.activeSale}
                    slug={product.slug}
                    discount={product?.activeSale?.discountPercentage}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => handleFilterChange('page', pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handleFilterChange('page', i + 1)}
                      className={`
                        px-4 py-2 rounded
                        ${pagination.currentPage === i + 1
                          ? 'bg-[#db4444] text-white'
                          : 'border hover:bg-red-50'
                        }
                      `}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handleFilterChange('page', pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;