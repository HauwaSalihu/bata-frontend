import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { createProduct, updateProduct, getProductBySlug } from "../../utils/api/product";
import { getCategories } from "../../utils/api/category";
import { addNotification } from "../../utils/slicers/notificationSlice";
import { BASE_URL } from "../../utils/variables";

const ProductForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(slug);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [variations, setVariations] = useState([{ name: '', price: '', quantity: '' }]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    status: "draft"
  });

  // Fetch categories and product data if in edit mode
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategories({});
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
              status: product.status
            });
            setVariations(product.variations);
            // Set preview images for existing product images
            setPreviewImages(
              product.images.map(img => ({
                url: BASE_URL + "/image/" + img.filename,
                filename: img.filename,
                isExisting: true
              }))
            );
          }
        }
      } catch (error) {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: "Failed to load form data"
        }));
      }
    };

    fetchData();
  }, [slug]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);
    
    // Create preview URLs
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
    setVariations(variations.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('variations', JSON.stringify(variations));
  
      // Append new images
      selectedImages.forEach(image => {
        formDataToSend.append('images', image);
      });
  
      // If editing, handle existing images as an array
if (isEditMode) {
    // Get existing image filenames
    previewImages
      .filter(img => img.isExisting)
      .forEach(img => {
        formDataToSend.append('existingImages[]', img.filename);
      });
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
        
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w">
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium border-b pb-2">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
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
                    Description
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
                      Category
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
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
                      Status
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
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
                  >
                    + Add Variation
                  </button>
                </div>

                {variations.map((variation, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Size/Name
                      </label>
                      <input
                        type="text"
                        required
                        value={variation.name}
                        onChange={e => handleVariationChange(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        required
                        value={variation.price}
                        onChange={e => handleVariationChange(index, 'price', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        required
                        value={variation.quantity}
                        onChange={e => handleVariationChange(index, 'quantity', e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                      />
                    </div>
                    {variations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariation(index)}
                        className="mt-6 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products')}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
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