import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createSale, updateSale, getSaleById } from "../../utils/api/sale";
import { getProducts } from "../../utils/api/product";
import { addNotification } from "../../utils/slicers/notificationSlice";
import { BASE_URL } from "../../utils/variables";

export const SaleForm = ({ isEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [productSearch, setProductSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [products, setProducts] = useState([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [originalState, setOriginalState] = useState({
        formData: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            status: "draft"
        },
        products: []
    });

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "draft"
    });

    // Status options
    const statusOptions = ["draft", "active", "ended", "cancelled"];

    const [currentProducts, setCurrentProducts] = useState([]); // All current products
    const [productsToAdd, setProductsToAdd] = useState([]); // New products to be added
    const [productsToRemove, setProductsToRemove] = useState([]); // Products to be removed
    const [productsToUpdate, setProductsToUpdate] = useState([]); // Products with updated discounts

    useEffect(() => {
        if (isEdit && id) {
            fetchSaleDetails();
        }
    }, [isEdit, id]);

    useEffect(() => {
        // Check for changes
        const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(originalState.formData);
        const hasProductChanges = JSON.stringify(products) !== JSON.stringify(originalState.products);
        setHasUnsavedChanges(hasFormChanges || hasProductChanges);
    }, [formData, products, originalState]);

    const fetchSaleDetails = async () => {
        try {
            setLoading(true);
            const response = await getSaleById({ saleId: id });

            if (response.status) {
                const { name, description, startDate, endDate, products: saleProducts, status } = response.data;
                const formattedProducts = saleProducts
                    .filter(p => p)
                    .map(p => ({
                        product: p,
                        discountPercentage: p.discountPercentage
                    }));

                const formattedFormData = {
                    name,
                    description,
                    startDate: new Date(startDate).toISOString().split('T')[0],
                    endDate: new Date(endDate).toISOString().split('T')[0],
                    status: status || "draft"
                };

                setFormData(formattedFormData);
                setProducts(formattedProducts);
                setCurrentProducts(formattedProducts);
                setOriginalState({
                    formData: formattedFormData,
                    products: formattedProducts
                });
                setProductsToAdd([]);
                setProductsToRemove([]);
                setProductsToUpdate([]);
            }
        } catch (error) {
            dispatch(addNotification({
                type: "error",
                title: "Error",
                description: error.message || "Failed to fetch sale details"
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleProductSearch = async (value) => {
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setSearchLoading(true);
            const response = await getProducts({
                params: {
                    search: value,
                    status: 'published',
                    limit: 10
                }
            });

            if (response.status) {
                const existingProductIds = new Set(products.map(p => p.product._id));
                const filteredProducts = response.data.products.filter(
                    product => !existingProductIds.has(product._id)
                );
                setSearchResults(filteredProducts);
            }
        } catch (error) {
            dispatch(addNotification({
                type: "error",
                title: "Error",
                description: "Failed to search products"
            }));
        } finally {
            setSearchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProductSelect = (product) => {
        setSelectedProducts(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(product._id)) {
                newSelected.delete(product._id);
            } else {
                newSelected.add(product._id);
            }
            return newSelected;
        });
    };

    const handleAddSelectedProducts = () => {
        const newProducts = searchResults
            .filter(product => selectedProducts.has(product._id))
            .map(product => ({
                productId: product._id,
                discountPercentage: 10
            }));

        if (isEdit) {
            setProductsToAdd(prev => [...prev, ...newProducts]);
        }
        
        setCurrentProducts(prev => [
            ...prev,
            ...searchResults
                .filter(product => selectedProducts.has(product._id))
                .map(product => ({
                    product,
                    discountPercentage: 10
                }))
        ]);

        setSelectedProducts(new Set());
        setShowProductModal(false);
        setSearchResults([]);
        setProductSearch("");
    };

    const handleDiscountChange = (productId, value) => {
        const newValue = parseInt(value) || 0;
        
        setCurrentProducts(prev => prev.map(p => 
            p.product._id === productId 
                ? { ...p, discountPercentage: newValue }
                : p
        ));

        if (isEdit) {
            // Track for update if not a new product
            const isNewProduct = productsToAdd.some(p => p.productId === productId);
            if (!isNewProduct) {
                const updateIndex = productsToUpdate.findIndex(p => p.productId === productId);
                if (updateIndex >= 0) {
                    // Update existing entry
                    setProductsToUpdate(prev => prev.map((p, i) => 
                        i === updateIndex 
                            ? { ...p, discountPercentage: newValue }
                            : p
                    ));
                } else {
                    // Add new entry
                    setProductsToUpdate(prev => [...prev, { 
                        productId, 
                        discountPercentage: newValue 
                    }]);
                }
            }
        }
    };

    const handleRemoveProduct = (productId) => {
        if (isEdit) {
            // Add to remove list if it's an existing product
            const isNewProduct = productsToAdd.some(p => p.productId === productId);
            if (!isNewProduct) {
                setProductsToRemove(prev => [...prev, productId]);
            }
            // Remove from add list if it's a new product
            setProductsToAdd(prev => prev.filter(p => p.productId !== productId));
            // Remove from update list
            setProductsToUpdate(prev => prev.filter(p => p.productId !== productId));
        }
        
        // Remove from current products
        setCurrentProducts(prev => prev.filter(p => p.product._id !== productId));
    };

    const validateForm = () => {
        if (!formData.name || !formData.startDate || !formData.endDate) {
            dispatch(addNotification({
                type: "error",
                title: "Validation Error",
                description: "Please fill in all required fields"
            }));
            return false;
        }

        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            dispatch(addNotification({
                type: "error",
                title: "Validation Error",
                description: "End date must be after start date"
            }));
            return false;
        }

        if (currentProducts.length === 0) {
            dispatch(addNotification({
                type: "error",
                title: "Validation Error",
                description: "Please add at least one product"
            }));
            return false;
        }

        const invalidDiscounts = currentProducts.some(p =>
            !p.discountPercentage ||
            p.discountPercentage < 1 ||
            p.discountPercentage > 99 ||
            !Number.isInteger(p.discountPercentage)
        );

        if (invalidDiscounts) {
            dispatch(addNotification({
                type: "error",
                title: "Validation Error",
                description: "Discount must be an integer between 1 and 99"
            }));
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            setLoading(true);
            const submitData = {
                ...formData,
                productsToAdd,
                productsToRemove,
                productsToUpdate
            };
    
            const response = isEdit
                ? await updateSale({ saleId: id, data: submitData })
                : await createSale({ 
                    data: {
                        ...formData,
                        products: currentProducts.map(p => ({
                            productId: p.product._id,
                            discountPercentage: p.discountPercentage
                        }))
                    }
                });
    
            if (response.status) {
                dispatch(addNotification({
                    type: "success",
                    title: "Success",
                    description: `Sale ${isEdit ? 'updated' : 'created'} successfully`
                }));
                navigate('/admin/sales');
            }
        } catch (error) {
            console.log(error)
            dispatch(addNotification({
                type: "error",
                title: "Error",
                description: error.message || `Failed to ${isEdit ? 'update' : 'create'} sale`
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium">
                        {isEdit ? 'Edit Sale' : 'Create New Sale'}
                    </h2>
                    {hasUnsavedChanges && (
                        <span className="text-sm text-yellow-600">* You have unsaved changes</span>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sale Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                                placeholder="Enter sale name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                                placeholder="Enter sale description"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Status Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sale Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date *
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date *
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Sale Products</h3>
                            <button
                                type="button"
                                onClick={() => setShowProductModal(true)}
                                className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
                            >
                                Add Products
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentProducts.map((item) => (
                                <div key={item.product._id} className="flex gap-4 bg-gray-50 p-3 rounded">
                                    {item.product.images?.[0] && (
                                        <img
                                            src={BASE_URL + "/image/" + item.product.images[0].filename}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                    <div className="flex-grow">
                                        <p className="font-medium">{item.product.name}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <input
                                                type="number"
                                                value={item.discountPercentage}
                                                onChange={(e) => handleDiscountChange(item.product._id, e.target.value)}
                                                className="w-20 p-1 border rounded text-sm"
                                                placeholder="0%"
                                                min="1"
                                                max="99"
                                            />
                                            <span className="text-sm text-gray-500">% off</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProduct(item.product._id)}
                                                className="text-red-600 hover:text-red-800 text-sm ml-auto"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {currentProducts.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                No products added to sale yet
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (hasUnsavedChanges && 
                                    !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
                                    return;
                                }
                                navigate('/admin/sales');
                            }}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || (currentProducts.length === 0) || 
                                     (isEdit && !hasUnsavedChanges)}
                            className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 
                             hasUnsavedChanges ? '* Save Changes' : 
                             isEdit ? 'Update Sale' : 'Create Sale'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Product Selection Modal */}
            {showProductModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-medium">Select Products</h3>
                            <button
                                onClick={() => {
                                    setShowProductModal(false);
                                    setSearchResults([]);
                                    setProductSearch("");
                                    setSelectedProducts(new Set());
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={productSearch}
                                    onChange={(e) => {
                                        setProductSearch(e.target.value);
                                        handleProductSearch(e.target.value);
                                    }}
                                    placeholder="Search products..."
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                                />
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto">
                                {searchLoading ? (
                                    <div className="text-center py-4">Loading...</div>
                                ) : searchResults.length === 0 ? (
                                    <div className="text-center py-4 text-gray-500">
                                        {productSearch ? "No products found" : "Start typing to search products"}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {searchResults.map((product) => {
                                            const isSelected = selectedProducts.has(product._id);
                                            const isAlreadyInSale = currentProducts.some(
                                                p => p.product._id === product._id
                                            );

                                            return (
                                                <div
                                                    key={product._id}
                                                    className={`flex gap-4 p-3 rounded border ${
                                                        isSelected ? 'border-[#db4444] bg-red-50' : 
                                                        isAlreadyInSale ? 'border-gray-200 bg-gray-100' :
                                                        'border-gray-200'
                                                    }`}
                                                >
                                                    {product.images?.[0] && (
                                                        <img
                                                            src={BASE_URL + "/image/" + product.images[0].filename}
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                    )}
                                                    <div className="flex-grow">
                                                        <p className="font-medium">{product.name}</p>
                                                        {isAlreadyInSale ? (
                                                            <span className="text-sm text-gray-500">
                                                                Already in sale
                                                            </span>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleProductSelect(product)}
                                                                className={`text-sm mt-2 ${
                                                                    isSelected 
                                                                        ? 'text-red-600 hover:text-red-800'
                                                                        : 'text-blue-600 hover:text-blue-800'
                                                                }`}
                                                            >
                                                                {isSelected ? 'Remove' : 'Select'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end gap-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowProductModal(false);
                                        setSearchResults([]);
                                        setProductSearch("");
                                        setSelectedProducts(new Set());
                                    }}
                                    className="px-4 py-2 border rounded hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddSelectedProducts}
                                    className="px-4 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838]"
                                    disabled={selectedProducts.size === 0}
                                >
                                    Add Selected ({selectedProducts.size})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// CreateSale component
export const CreateSale = () => {
    return <SaleForm isEdit={false} />;
};

// EditSale component
export const EditSale = () => {
    return <SaleForm isEdit={true} />;
};

export default SaleForm;