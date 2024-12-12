import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../utils/slicers/cartSlice";

function CartTotal() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const DELIVERY_FEE = 0; // You might want to move this to a constants file
  const currency = "₦"; // You might want to get this from a global config

  // Calculate subtotal with discount consideration
  const subtotal = cartItems.reduce((total, item) => {
    const variation = item.product.variations.find(v => v._id === item.variation);
    const discountPercentage = item.sale?.discountPercentage || 
                                item.discountPercentage || 0;
    const originalPrice = variation?.price || 0;
    const discountedPrice = originalPrice * (1 - discountPercentage / 100);
    
    return total + discountedPrice * item.quantity;
  }, 0);

  // Calculate original subtotal (before discount)
  const originalSubtotal = cartItems.reduce((total, item) => {
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
          <div className="flex items-center gap-2">
            {originalSubtotal !== subtotal && (
              <p className="text-gray-400 line-through">
                {currency}{originalSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
            <p className="font-medium text-[#db4444]">
              {currency}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Shipping Row */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h5 className="text-gray-600">
            Shipping:
          </h5>
          <p className="font-medium">
            {subtotal > 0 ? `${currency}${DELIVERY_FEE.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'}
          </p>
        </div>

        {/* Total Row */}
        <div className="flex justify-between items-center pt-2">
          <h5 className="text-lg font-medium">
            Total:
          </h5>
          <p className="text-lg font-bold text-[#db4444]">
            {currency}{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Savings Row */}
        {originalSubtotal !== subtotal && (
          <div className="flex justify-between items-center text-sm text-green-600 mt-2">
            <span>Total Savings:</span>
            <span>
              {currency}{(originalSubtotal - subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}

        {/* Additional Info */}
        {subtotal > 0 && (
          <div className="mt-4 pt-4 border-t text-sm text-gray-500">
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
      </div>
    </div>
  );
}

export default CartTotal;