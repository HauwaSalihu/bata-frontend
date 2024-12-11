import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../utils/slicers/cartSlice";

function CartTotal() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const DELIVERY_FEE = 10; // You might want to move this to a constants file
  const currency = "NGN "; // You might want to get this from a global config

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const variation = item.product.variations.find(v => v._id === item.variation);
    return total + (variation?.price || 0) * item.quantity;
  }, 0);

  // Calculate total with delivery fee
  const total = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h4 className="text-xl font-medium mb-6">
        Cart Total
      </h4>

      <div className="space-y-6">
        {/* Subtotal Row */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h5 className="text-gray-600">
            Subtotal:
          </h5>
          <p className="font-medium">
            {currency}{subtotal.toFixed(2)}
          </p>
        </div>

        {/* Shipping Row */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h5 className="text-gray-600">
            Shipping:
          </h5>
          <p className="font-medium">
            {subtotal > 0 ? `${currency}${DELIVERY_FEE.toFixed(2)}` : 'N/A'}
          </p>
        </div>

        {/* Total Row */}
        <div className="flex justify-between items-center pt-2">
          <h5 className="text-lg font-medium">
            Total:
          </h5>
          <p className="text-lg font-bold text-[#db4444]">
            {currency}{total.toFixed(2)}
          </p>
        </div>

        {/* Additional Info */}
        {subtotal > 0 && (
          <div className="mt-4 pt-4 border-t text-sm text-gray-500">
            {/* <p className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-green-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              Free shipping for orders over ${100}
            </p> */}
            <p className="mt-2 flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-blue-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" 
                />
                <path 
                  d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h1.1a2.5 2.5 0 014.9 0H16a1 1 0 001-1V5a1 1 0 00-1-1H3zm11 3a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1zm-3 0a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1zm-3 0a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1z" 
                />
              </svg>
              Estimated delivery: 3-5 business days
            </p>
          </div>
        )}

        {/* Proceed to Checkout Button */}
        {/* <button
          className="w-full py-3 mt-4 bg-[#db4444] text-white rounded-lg hover:bg-[#c03838] 
            transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={subtotal === 0}
        >
          Proceed to Checkout
        </button> */}
      </div>
    </div>
  );
}

export default CartTotal;