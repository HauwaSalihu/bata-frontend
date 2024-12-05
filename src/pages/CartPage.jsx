import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <main className="lg:px-20 mt-20">
      {/* Hyperlink Section */}
      <section className="container mx-auto px-10 mb-10">
        <ul className="flex gap-3">
          <li className="text-slate-400">Home</li>
          <li>/</li>
          <li className="font-medium">Cart</li>
        </ul>
      </section>

      {/* Cart Section */}

      <section className="container mx-auto px-10 mb-20">
        <div className="flex-col justify-start items-start gap-20 inline-flex h-auto lg:h-[840px]">
          <div className="flex-col justify-start items-start gap-6 flex">
            <div className="flex-col justify-start items-start gap-10 flex">
              {/* Cart Header */}
              <div className="w-full lg:w-[1170px] h-[72px] pl-10 pr-[39px] py-6 bg-white rounded shadow justify-center items-center inline-flex">
                <div className="justify-start items-center gap-[284px] inline-flex">
                  <h5 className="text-black text-base font-normal font-['Poppins'] leading-normal">
                    Product
                  </h5>
                  <h5 className="text-black text-base font-normal font-['Poppins'] leading-normal">
                    Price
                  </h5>
                  <h5 className="text-black text-base font-normal font-['Poppins'] leading-normal">
                    Quantity
                  </h5>
                  <h5 className="text-black text-base font-normal font-['Poppins'] leading-normal">
                    Subtotal
                  </h5>
                </div>
              </div>

              {/* Cart Items */}
              {cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );
                return (
                  <div
                    key={index}
                    className="w-full lg:w-[1170px] h-[102px] relative bg-white rounded shadow"
                  >
                    <p className="left-[387px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="left-[1063px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                      {item.size}
                    </p>
                    <div className="w-[72px] h-11 px-3 py-1.5 left-[710px] top-[29px] absolute rounded border border-black/40 justify-center items-center inline-flex">
                      <input
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(
                                item._id,
                                item.size,
                                Number(e.target.value)
                              )
                        }
                        className=" border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />
                    </div>
                    <div className="w-[54px] h-[54px] px-0.5 pt-2 pb-[7px] left-[40px] top-[24px] absolute justify-center items-center inline-flex">
                      <img
                        className="w-[50px] h-[39px]"
                        src={productData.image[0]}
                        alt="Product"
                      />
                    </div>
                    <h5 className="left-[114px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                      {productData.name}
                    </h5>
                    <div
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="w-6 h-6 left-[30px] text-center text-white rounded-full border bg-red-600 top-[20px] absolute"
                    >
                      <p>X</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Buttons for Cart Updates */}
            <div className="justify-start items-start gap-[757px] inline-flex">
              <div className="px-12 py-4 rounded border border-black/50 justify-center items-center gap-2.5 flex">
                <button className="text-black text-base font-medium font-['Poppins'] leading-normal">
                  Return To Shop
                </button>
              </div>
              <div className="px-12 py-4 rounded border border-black/50 justify-center items-center gap-2.5 flex">
                <button className="text-black text-base font-medium font-['Poppins'] leading-normal">
                  Update Cart
                </button>
              </div>
            </div>
          </div>

          {/* Cart Total */}
          <div className="justify-start items-start gap-[173px] inline-flex">
            <div className="justify-start items-end gap-4 flex">
              <div className="pl-6 pr-[164px] py-4 rounded border border-black justify-start items-center flex">
                <input
                  placeholder=" Coupon Code"
                  className="opacity-50 text-black text-base font-normal font-['Poppins'] leading-normal"
                />
              </div>
              <div className="px-12 py-4 bg-[#db4444] rounded justify-center items-center gap-2.5 flex">
                <button className="text-[#f9f9f9] text-base font-medium font-['Poppins'] leading-normal">
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Cart Total Box */}
            <CartTotal />
          </div>
          <div className="px-12 py-4  bg-[#db4444] rounded   self-end gap-2.5 inline-flex">
            <button
              onClick={() => navigate("/place-order")}
              className="text-[#f9f9f9] text-base font-medium font-['Poppins'] leading-normal"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
