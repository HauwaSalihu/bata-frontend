import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discount, rating }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className=" text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="flex flex-col shadow-md pb-5 px-5 bg-white rounded-lg">
        <div className="relative h-64">
          <div className="absolute top-2 left-2 px-3 py-1 bg-[#db4444] text-white text-xs rounded">
            {discount}
          </div>
          <img
            src={image[0]}
            alt={name}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium">{name}</p>
          <p className="text-[#db4444] text-base font-medium">{price}</p>
          <p className="text-sm text-gray-500">{rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
