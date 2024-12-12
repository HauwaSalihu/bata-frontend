import { useState, useEffect } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../utils/api/order";
import { addNotification } from "../utils/slicers/notificationSlice";

const CheckoutPage = () => {
  const [method, setMethod] = useState("paystack");
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // List of countries (you can expand this)
  const countries = [
    "Nigeria", 
    // "United States", 
    // "United Kingdom", 
    // "Canada", 
    // "Australia"
  ];

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });

  // Populate form with user data initially
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user?.billing?.address || '',
        city: user?.billing?.city || '',
        state: user?.billing?.state || '',
        country: user?.billing?.country || '',
        zipCode: user?.billing?.zipCode || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);

      // Validate required fields
      const requiredFields = ['address', 'city', 'state', 'country'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        dispatch(addNotification({
          type: "error",
          title: "Missing Information",
          description: "Please fill in all required fields"
        }));
        return;
      }

      const response = await createOrder({
        data: {
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zipCode: formData.zipCode,
          }
        }
      });

      if (response.status && response.data?.authorizationUrl) {
        // Redirect to Paystack checkout page
        window.location.href = response.data.authorizationUrl;
      } else {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: response?.message || "Failed to process order"
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to process order"
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="lg:px-20 mt-10">
      {/* Hyperlink Section */}
      <section className="container mx-auto px-10 mb-10">
        <ul className="flex gap-3 text-sm">
          <li className="text-slate-400">Account</li>
          <li>/</li>
          <li className="text-slate-400">My Account</li>
          <li>/</li>
          <li className="text-slate-400">Product</li>
          <li>/</li>
          <li className="text-slate-400">View Cart</li>
          <li>/</li>
          <li className="font-medium">Checkout</li>
        </ul>
      </section>

      <h3 className="px-10 mb-10 text-black text-4xl font-medium font-['Inter'] leading-[30px] tracking-wider">
        Billing Details
      </h3>

      <section className="container w-full flex gap-20 mx-auto mb-20 px-10 flex-wrap lg:flex-nowrap">
        {/* Left Section */}
        <div className="flex-col justify-start items-start gap-6 inline-flex w-full lg:w-1/2">
          <div className="flex-col justify-start items-start gap-8 flex">
            {/* Name */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black font-['Poppins'] leading-normal">
                  First Name
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <input
                type="text"
                name="name"
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded px-4"
                value={formData.name}
                disabled
              />
            </div>

            {/* Email */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Email Address
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <input
                type="email"
                name="email"
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded px-4"
                value={formData.email}
                disabled
              />
            </div>

            {/* Phone */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Phone Number
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <input
                type="tel"
                name="phone"
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded px-4"
                value={formData.phone}
                disabled
              />
            </div>

            {/* Address */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Street Address
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <input
                type="text"
                name="address"
                className="w-full lg:w-[470px] h-[50px] relative bg-white border rounded px-4"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your street address"
              />
            </div>

            {/* City */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Town/City
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <input
                type="text"
                name="city"
                className="w-full lg:w-[470px] h-[50px] relative bg-white border rounded px-4"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </div>

            {/* State */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black text-base font-normal font-['Poppins'] leading-normal">
                  State
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <input
                type="text"
                name="state"
                className="w-full lg:w-[470px] h-[50px] relative bg-white border rounded px-4"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
              />
            </div>

            {/* Country */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Country
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <select
                name="country"
                className="w-full lg:w-[470px] h-[50px] relative bg-white border rounded px-4"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Zip Code */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <div className="opacity-40">
                <span className="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Postal Code
                </span>
                <span className="text-[#db4444] text-base font-normal font-['Poppins'] leading-normal">
                  *
                </span>
              </div>
              <input
                type="text"
                name="zipCode"
                className="w-full lg:w-[470px] h-[50px] relative bg-white border rounded px-4"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>
          <div className="mt-12">
            {/* Payment method selector */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("paystack")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  method === "paystack" ? "border-[#db4444] bg-red-50" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    method === "paystack" ? "border-[#db4444] bg-[#db4444]" : ""
                  }`}
                />
                <img
                  src={assets.paystack}
                  className="h-5 mx-4"
                  alt="Paystack"
                />
                Paystack
              </div>
              <div
                className="flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50"
              >
                <div className="w-4 h-4 rounded-full border-2" />
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY (Not Available)
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#db4444] hover:bg-[#c03838]'
                } text-white px-16 py-3 text-sm transition-colors`}
              >
                {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;