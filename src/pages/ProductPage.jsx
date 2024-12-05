import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const ProductPage = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null); // Initialize as null
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId); // Use `find` instead of `map`
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  return productData ? (
    <main className="lg:px-20 mt-20">
      {/* Hyperlink Section */}
      <section className="container mx-auto px-4 lg:px-10 mb-10">
        <ul className="flex gap-3 text-sm">
          <li className="text-slate-400">Account</li>
          <li>/</li>
          <li className="text-slate-400">Product</li>
          <li>/</li>
          <li className="font-medium">{productData.name}</li>
        </ul>
      </section>

      {/* Main Content */}
      <section className="container mx-auto flex flex-wrap lg:flex-nowrap gap-10 px-4 lg:px-10 mb-10">
        {/* Thumbnail Images */}
        <div className="flex lg:flex-col gap-4 lg:gap-0">
          {productData.image?.map(
            (
              item,
              index // Optional chaining for `image`
            ) => (
              <img
                className="w-28 h-20 lg:w-[170px] lg:h-[138px] mb-5 rounded"
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt="Thumbnail"
              />
            )
          )}
        </div>

        {/* Main Product Details */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Large Product Image */}
          <img
            className="w-full lg:w-[500px] lg:h-[600px] rounded"
            src={image}
            alt="Product"
          />

          {/* Product Info */}
          <div>
            <h1 className="text-black text-2xl font-semibold leading-normal tracking-wide">
              {productData.name}
            </h1>
            <p className="text-black text-2xl font-normal leading-normal tracking-wide">
              {currency}
              {productData.price}
            </p>

            <div className="mt-2 flex items-center gap-4">
              <span className="opacity-50 text-sm">
                <div className="flex items-center gap-1 mt-2">
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                  <p className="pl-2">(122)</p>
                </div>
              </span>
              <span className="text-[#00ff66] text-sm opacity-60">
                In Stock
              </span>
            </div>

            <p className="mt-4 text-sm text-black">{productData.description}</p>

            {/* Colors */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xl">Colors:</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#a0bce0] rounded-full border border-black"></div>
                <div className="w-5 h-5 bg-[#e07575] rounded-full"></div>
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xl">Size:</span>
              <div className="flex items-center gap-2">
                {productData.sizes?.map(
                  (
                    item,
                    index // Optional chaining for `sizes`
                  ) => (
                    <button
                      onClick={() => setSize(item)}
                      className={`w-8 h-8 flex justify-center items-center border rounded ${
                        item === size
                          ? "border-orange-500 bg-[#db4444] text-white "
                          : ""
                      }`}
                      key={index}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Buy Section */}
            <div className="mt-4 flex items-center gap-4">
              <div className="w-[159px] h-11 flex justify-start items-start">
                {/* Left section */}
                <div className="w-10 h-11 px-2 py-2.5 rounded-tl rounded-bl border border-black/50 flex text-center justify-center items-center">
                  <div className=" text-black text-2xl font-medium font-[Poppins] leading-7 ">
                    -
                  </div>
                </div>

                {/* Middle section */}
                <div className="h-11 py-2 border-t border-b border-black/50 flex justify-center items-center">
                  <div className="text-black text-xl w-10 font-medium font-[Poppins] leading-7">
                    2
                  </div>
                </div>

                {/* Right section */}
                <div className="w-[41px] h-11 pl-[9px] pr-2 py-2.5 bg-[#db4444] rounded-tr rounded-br flex justify-center items-center">
                  <p className="text-2xl text-white">+</p>
                </div>
              </div>
              <button
                onClick={() => addToCart(productData._id, size)}
                className="bg-[#db4444] text-white px-6 py-2 rounded"
              >
                Buy Now
              </button>
              <div class="w-10 h-10 p-1 rounded border border-black/50 justify-center items-center inline-flex">
                <img src={assets.wishlist} alt="" />
              </div>
            </div>

            {/* Delivery Details */}
            <div className="mt-4 border p-4 rounded">
              <div className="mb-2">
                <strong>Free Delivery</strong>: Enter your postal code for
                delivery availability.
              </div>
              <div>
                <strong>Return Delivery</strong>: Free 30 Days Delivery Returns.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Display Related Products Section ---------- */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </main>
  ) : (
    <div className=" opacity-0"></div>
  );
};

export default ProductPage;
