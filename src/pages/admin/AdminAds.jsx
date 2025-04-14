import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "../../utils/slicers/notificationSlice";
import { getAds, createAd, deleteAd } from "../../utils/api/ads";
import { getProducts } from "../../utils/api/product";
import { BASE_URL } from "../../utils/variables";

const AdminAds = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAd, setNewAd] = useState({
    product: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch ads and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch active ads
        const adsResponse = await getAds({});
        if (adsResponse.status) {
          setAds(adsResponse.data);
        }

        // Fetch products for dropdown
        const productsResponse = await getProducts({ params: { status: 'published', limit: 1000 } });
        if (productsResponse.status) {
          setProducts(productsResponse.data.products);
        }

      } catch (error) {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: "Failed to load data"
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAd({ ...newAd, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateAd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!newAd.product || !newAd.image) {
        throw new Error("Product and image are required");
      }

      const formData = new FormData();
      formData.append('product', newAd.product);
      formData.append('image', newAd.image);

      const response = await createAd({data:formData});
      if (response.status) {
        setAds([...ads, response.data]);
        setShowCreateForm(false);
        setNewAd({ product: "", image: null });
        setImagePreview(null);
        
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Ad created successfully"
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to create ad"
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAd = async (id) => {
    try {
      setLoading(true);
      const response = await deleteAd({itemId:id});
      if (response.status) {
        setAds(ads.filter(ad => ad._id !== id));
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Ad deleted successfully"
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to delete ad"
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Manage Ads</h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
            >
              {showCreateForm ? 'Cancel' : 'Create New Ad'}
            </button>
          </div>

          {/* Create Ad Form */}
          {showCreateForm && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-lg font-medium mb-4">Create New Ad</h2>
              <form onSubmit={handleCreateAd}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={newAd.product}
                      onChange={(e) => setNewAd({ ...newAd, product: e.target.value })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      <option value="">Select Product</option>
                      {products.map(product => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Image <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="w-24 h-24 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        {imagePreview ? (
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <span className="text-2xl text-gray-400">+</span>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          required
                        />
                      </label>
                      <span className="text-sm text-gray-500">
                        {newAd.image ? newAd.image.name : "Select an image"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewAd({ product: "", image: null });
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating...' : 'Create Ad'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Ads List */}
          {loading && ads.length === 0 ? (
            <div className="text-center py-12">Loading ads...</div>
          ) : ads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No active ads found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {ads.map(ad => (
                  <div key={ad._id} className="border rounded-lg overflow-hidden">
                    <div className="relative">
                      <img
                        src={BASE_URL + "/image/" + ad.image.filename}
                        alt={ad.product?.name || "Ad"}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => handleDeleteAd(ad._id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        disabled={loading}
                      >
                        ×
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1">
                        {ad.product?.name || "Product not found"}
                      </h3>
                      {ad.product && (
                        <a
                          href={`/product/${ad.product.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#db4444] text-sm hover:underline"
                        >
                          View Product
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminAds;