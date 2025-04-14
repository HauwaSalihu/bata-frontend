import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
  addSubcategory,
  removeSubcategory
} from "../../utils/api/category";
import { addNotification } from "../../utils/slicers/notificationSlice";

const AdminCategories = () => {
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subcategories: []
  });
  const [subcategoryForm, setSubcategoryForm] = useState({
    name: ""
  });

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  useEffect(() => {
    if (search.trim()) {
      handleSearch();
    } else {
      fetchCategories();
    }
  }, [search]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories({
        params: {
          page: currentPage,
          limit: 10
        }
      });

      if (response.status) {
        setCategories(response.data.categories);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Failed to fetch categories"
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      const response = await searchCategories({
        params: {
          query: search,
          page: currentPage,
          limit: 10
        }
      });

      if (response.status) {
        setCategories(response.data.categories);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Failed to search categories"
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        subcategories: category.subcategories || []
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", subcategories: [] });
    }
    setShowModal(true);
  };

  const handleOpenSubcategoryModal = (category) => {
    setCurrentCategory(category);
    setSubcategoryForm({ name: "" });
    setShowSubcategoryModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowSubcategoryModal(false);
    setEditingCategory(null);
    setCurrentCategory(null);
    setFormData({ name: "", description: "", subcategories: [] });
    setSubcategoryForm({ name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Category name is required"
      }));
      return;
    }

    try {
      const dataToSend = {
        name: formData.name,
        description: formData.description,
        subcategories: formData.subcategories
      };

      const response = editingCategory
        ? await updateCategory({
            slug: editingCategory.slug,
            data: dataToSend
          })
        : await createCategory({
            data: dataToSend
          });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: `Category ${editingCategory ? 'updated' : 'created'} successfully`
        }));
        handleCloseModal();
        fetchCategories();
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || `Failed to ${editingCategory ? 'update' : 'create'} category`
      }));
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    
    console.log(subcategoryForm)
    if (!subcategoryForm.name.trim()) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Subcategory name is required"
      }));
      return;
    }

    try {
      const response = await addSubcategory({
        slug: currentCategory.slug,
        data: { name: subcategoryForm.name }
      });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Subcategory added successfully"
        }));
        handleCloseModal();
        fetchCategories();
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to add subcategory"
      }));
    }
  };

  const handleRemoveSubcategory = async (categorySlug, subSlug) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;

    try {
      const response = await removeSubcategory({
        slug: categorySlug,
        subSlug
      });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Subcategory removed successfully"
        }));
        fetchCategories();
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to remove subcategory"
      }));
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await deleteCategory({ slug });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Category deleted successfully"
        }));
        fetchCategories();
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to delete category"
      }));
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Categories</h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
        >
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full md:w-96 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcategories
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {category.description || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {category.subcategories?.length > 0 ? (
                        category.subcategories.map((sub) => (
                          <div key={sub.slug} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{sub.name}</span>
                            <button
                              onClick={() => handleRemoveSubcategory(category.slug, sub.slug)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">No subcategories</span>
                      )}
                      <button
                        onClick={() => handleOpenSubcategoryModal(category)}
                        className="text-xs text-blue-600 hover:text-blue-800 mt-2"
                      >
                        + Add Subcategory
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {category.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.slug)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
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
                disabled={currentPage === pagination.totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="Enter category description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategories
                  </label>
                  <div className="space-y-2">
                    {formData.subcategories?.map((sub, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>{sub.name}</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            subcategories: prev.subcategories.filter((_, i) => i !== index)
                          }))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="flex">
                      <input
                        type="text"
                        value={formData.newSubcategory || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, newSubcategory: e.target.value }))}
                        className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-red-200"
                        placeholder="Add new subcategory"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.newSubcategory?.trim()) {
                            setFormData(prev => ({
                              ...prev,
                              subcategories: [...prev.subcategories, {
                                name: prev.newSubcategory,
                                // slug: prev.newSubcategory.toLowerCase().replace(/\s+/g, '-')
                              }],
                              newSubcategory: ''
                            }));
                          }
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {showSubcategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">
                Add Subcategory to {currentCategory?.name}
              </h3>
            </div>

            <form onSubmit={handleAddSubcategory} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory Name *
                  </label>
                  <input
                    type="text"
                    value={subcategoryForm.name}
                    onChange={(e) => setSubcategoryForm({ name: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="Enter subcategory name"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
                >
                  Add Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;