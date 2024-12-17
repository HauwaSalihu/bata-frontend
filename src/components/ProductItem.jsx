import { Link } from "react-router-dom";

const ProductItem = ({
  product,
  id,
  slug,
  image,
  name,
  price,
  discount,
  rating,
}) => {
  // Format price with currency
  const formatPrice = (amount) => {
    return `NGN ${(amount || 0).toLocaleString()}`;
  };

  // Calculate sale price for a product
  const calculateSalePrice = (product) => {
    const variation = product?.variations[0]; // Using first variation as base price
    const price = variation.price;
    return Math.round(
      price *
        (1 -
          (product?.discountPercentage ||
            product?.activeSale?.discountPercentage) /
            100)
    );
  };
  const salePrice = discount ? calculateSalePrice(product) : undefined;
  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${slug}`}
      state={{ product }}
    >
      <div className="flex flex-col shadow-md pb-5 px-5 bg-white rounded-lg">
        <div className="relative h-64">
          {discount && (
            <div className="absolute top-2 left-2 px-3 py-1 bg-[#db4444] text-white text-xs rounded">
              {discount + "%"}
            </div>
          )}
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain rounded-lg"
          />
        </div>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-lg font-medium text-center">{name}</p>
          <div className="flex items-center gap-2 mt-1">
            {salePrice ? (
              <>
                <p className="text-[#db4444] text-base font-semibold">
                  {formatPrice(salePrice)}
                </p>
                <p className="text-gray-500 text-sm line-through">
                  {formatPrice(price)}
                </p>
              </>
            ) : (
              <p className="text-[#db4444] text-base font-semibold">
                {formatPrice(price)}
              </p>
            )}
          </div>
          {rating && <p className="text-sm text-gray-500 mt-1">{rating}</p>}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
