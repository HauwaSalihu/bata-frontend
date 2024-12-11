// store.js
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './slicers/notificationSlice';
import userReducer from './slicers/userSlice';
import loadingReducer from './slicers/loadingSlice';
import cartReducer from './slicers/cartSlice';


const store = configureStore({
	reducer: {
		notifications: notificationsReducer,
		user: userReducer,
		loading: loadingReducer,
		cart: cartReducer
		// Add other reducers if needed
	},
	// Add middleware or other configurations as needed
});

export default store;