import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [method, setMethod] = useState("cod");

  const { navigate } = useContext(ShopContext);

  return (
    <main className="lg:px-20 mt-20">
      {/* Hyperlink Section */}
      <section className="container mx-auto px-10 mb-10">
        <ul className="flex gap-3">
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
      {/* End Hyperlink Section */}

      <h3 className="px-10 mb-10 text-black text-4xl font-medium font-['Inter'] leading-[30px] tracking-wider">
        Billing Details
      </h3>

      {/* New Section */}
      <section className="container w-full flex gap-20 mx-auto mb-20 px-10 flex-wrap lg:flex-nowrap">
        {/* Right Section */}
        <div className="flex-col justify-start items-start gap-6 inline-flex w-full lg:w-1/2">
          <div className="flex-col justify-start items-start gap-8 flex">
            {/* Form Group */}
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
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded"
              />
            </div>
            {/* Form Group */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <p className="opacity-40 text-black text-base font-normal font-['Poppins'] leading-normal">
                Company Name
              </p>
              <input
                type="text"
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded"
              />
            </div>
            {/* Form Group */}
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
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded"
              />
            </div>
            {/* Form Group */}
            <div className="flex-col justify-start items-start gap-2 flex">
              <p className="opacity-40 text-black text-base font-normal font-['Poppins'] leading-normal">
                Apartment, floor, etc. (optional)
              </p>
              <input
                type="text"
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded"
              />
            </div>
            {/* Form Group */}
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
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded"
              />
            </div>
            {/* Form Group */}
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
                type="text"
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded"
              />
            </div>
            {/* Form Group */}
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
                type="text"
                className="w-full lg:w-[470px] h-[50px] relative bg-neutral-100 rounded"
              />
            </div>
          </div>
          <div className="justify-start items-start gap-4 inline-flex">
            <div className="w-6 h-6 relative bg-[#db4444] text-center rounded">
              <i className="fas fa-check text-white"></i>
            </div>
            <p className="text-black text-base font-normal font-['Poppins'] leading-normal">
              Save this information for faster check-out next time
            </p>
          </div>
        </div>
        {/* End Right Section */}

        {/* Right side */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>
          <div className="mt-12">
            {/* paymen t method selector */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
              </div>
              <div
                onClick={() => setMethod("razorpay")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4 ">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                onClick={() => navigate("/orders")}
                className="bg-[#db4444] text-white px-16 py-3 text-sm"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;
