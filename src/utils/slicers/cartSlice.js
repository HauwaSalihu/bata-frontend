// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: {
        items: [], // Array of cart items with product details
        user: null,
    },
    total: 0,
    itemCount: 0,
    invalidItems: [], // Track items with stock issues
    isLoading: false,
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCartError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateCart: (state, action) => {
            // Expect payload to match backend response format
            const { cart, total, itemCount, invalidItems } = action.payload;
            state.cart = cart;
            state.total = total;
            state.itemCount = itemCount;
            state.invalidItems = invalidItems || [];
            state.isLoading = false;
            state.error = null;
        },
        clearCart: (state) => {
            state.cart = {
                items: [],
                user: state.cart.user
            };
            state.total = 0;
            state.itemCount = 0;
            state.invalidItems = [];
            state.isLoading = false;
            state.error = null;
        }
    },
});

export const { setCartLoading, setCartError, updateCart, clearCart } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.cart;
export const selectCartItems = (state) => state.cart.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectInvalidItems = (state) => state.cart.invalidItems;
export const selectCartLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;

// Helper selector to check if product is in cart
export const selectProductInCart = (state, productId, variationId) => 
    state.cart.cart.items.find(item => 
        item.product._id === productId && 
        item.variation === variationId
    );

// Helper selector to get cart item quantity
export const selectCartItemQuantity = (state, productId, variationId) => {
    const item = state.cart.cart.items.find(item =>
        item.product._id === productId &&
        item.variation === variationId
    );
    return item ? item.quantity : 0;
};

export default cartSlice.reducer;