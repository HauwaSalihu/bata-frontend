import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div>
      {/* Cart Total Box */}
      <div className="w-full lg:w-[470px] h-[324px] relative rounded border border-black">
        <h4 className="left-[24px] top-[32px] absolute text-black text-xl font-medium font-['Poppins'] leading-7">
          Cart Total
        </h4>
        <div className="left-[24px] top-[84px] absolute justify-start items-start gap-[307px] inline-flex">
          <h5 className="text-black text-base font-normal font-['Poppins'] leading-normal">
            Subtotal:
          </h5>
          <p className="text-black text-base font-normal font-['Poppins'] leading-normal">
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <div className="left-[24px] top-[140px] absolute justify-start items-start gap-[314px] inline-flex">
          <h5 className="text-black text-base font-normal font-['Poppins'] leading-normal">
            Shipping:
          </h5>
          <p className="text-black text-base font-normal font-['Poppins'] leading-normal">
            {currency} {delivery_fee}.00
          </p>
        </div>
        <div className="left-[24px] top-[196px] absolute justify-start items-start gap-[335px] inline-flex">
          <h5 className="text-black text-base font-normal font-['Poppins'] leading-normal">
            Total:
          </h5>
          <p className="text-black text-base font-normal font-['Poppins'] leading-normal">
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
