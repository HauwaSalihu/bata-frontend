import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { createProduct, updateProduct, getProductBySlug } from "../../utils/api/product";
import { getCategories } from "../../utils/api/category"; // Removed getSubcategoriesByCategory import
import { addNotification } from "../../utils/slicers/notificationSlice";
import { BASE_URL } from "../../utils/variables";

const ProductForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(slug);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [variations, setVariations] = useState([{ name: '', price: '', quantity: '' }]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    status: "draft"
  });

  // Fetch categories and product data if in edit mode
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesResponse = await getCategories({ populate: 'subcategories' }); // Request populated subcategories
        if (categoriesResponse.status) {
          setCategories(categoriesResponse.data.categories);
        }

        if (isEditMode) {
          const productResponse = await getProductBySlug({ slug });
          if (productResponse.status) {
            const product = productResponse.data;
            setFormData({
              name: product.name,
              description: product.description,
              category: product.category._id,
              subcategory: product.subcategory?._id || "",
              status: product.status
            });
            setVariations(product.variations);
            setPreviewImages(
              product.images.map(img => ({
                url: BASE_URL + "/image/" + img.filename,
                filename: img.filename,
                isExisting: true
              }))
            );

            // Find and set subcategories from the already loaded categories
            if (product.category._id) {
              const selectedCategory = categoriesResponse.data.categories.find(
                c => c._id === product.category._id
              );
              if (selectedCategory) {
                setSubcategories(selectedCategory.subcategories || []);
              }
            }
          }
        }
      } catch (error) {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: "Failed to load form data"
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, dispatch, isEditMode]);

  // Load subcategories when category changes
  const handleCategoryChange = (categoryId) => {
    const selectedCategory = categories.find(c => c._id === categoryId);
    const newSubcategories = selectedCategory?.subcategories || [];

    setSubcategories(newSubcategories);
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      subcategory: "" // Reset subcategory when category changes
    }));
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);

    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      filename: file.name,
      isExisting: false
    }));

    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleVariationChange = (index, field, value) => {
    const newVariations = variations.map((v, i) => {
      if (i === index) {
        return { ...v, [field]: value };
      }
      return v;
    });
    setVariations(newVariations);
  };

  const addVariation = () => {
    setVariations([...variations, { name: '', price: '', quantity: '' }]);
  };

  const removeVariation = (index) => {
    if (variations.length > 1) {
      setVariations(variations.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      if (formData.subcategory) {
        formDataToSend.append('subcategory', formData.subcategory);
      }
      formDataToSend.append('status', formData.status);
      formDataToSend.append('variations', JSON.stringify(variations));

      // Append new images
      selectedImages.forEach(image => {
        formDataToSend.append('images', image);
      });

      // Handle existing images in edit mode
      if (isEditMode) {
        const existingImages = previewImages
          .filter(img => img.isExisting)
          .map(img => img.filename);
        formDataToSend.append('existingImages', JSON.stringify(existingImages));
      }

      const response = isEditMode
        ? await updateProduct({ slug, data: formDataToSend })
        : await createProduct({ data: formDataToSend });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: `Product ${isEditMode ? 'updated' : 'created'} successfully`
        }));
        navigate('/admin/products');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || `Failed to ${isEditMode ? 'update' : 'create'} product`
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="max-w">
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">Basic Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={e => handleCategoryChange(e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                      disabled={loading}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subcategory
                    </label>
                    <select
                      value={formData.subcategory}
                      onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                      disabled={!formData.category || loading}
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories.map(subcategory => (
                        <option key={subcategory._id} value={subcategory._id}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                      disabled={loading}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="outOfStock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">Product Images</h2>
                <p className="text-sm text-gray-500">At least one image is required</p>

                <div className="flex flex-wrap gap-4">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>

              {/* Variations */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="text-lg font-medium">Product Variations</h2>
                  <button
                    type="button"
                    onClick={addVariation}
                    className="text-[#db4444] hover:text-[#c03838]"
                    disabled={loading}
                  >
                    + Add Variation
                  </button>
                </div>

                {variations.map((variation, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Variation Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={variation.name}
                        onChange={e => handleVariationChange(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                        disabled={loading}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={variation.price}
                        onChange={e => handleVariationChange(index, 'price', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                        disabled={loading}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={variation.quantity}
                        onChange={e => handleVariationChange(index, 'quantity', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                        disabled={loading}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVariation(index)}
                      className="mt-6 text-red-500 hover:text-red-700"
                      disabled={loading || variations.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products')}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEditMode ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : isEditMode ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProductForm;