import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

import ProductItem from "./ProductItem";
function ProductCard() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 4));
  }, []);
  return (
    <div>
      <section className="container mx-auto px-10 mt-10 lg:px-16 lg:py-16">
        <h6 className="text-red-500 text-sm md:text-base">This Month</h6>
        <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
          <h3 className="text-2xl md:text-3xl font-bold">
            Best Selling Products
          </h3>
          <button className="p-2 md:p-3 bg-red-500 rounded text-white">
            View All
          </button>
        </div>
        {/* <!-- cards senction --> */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* <!-- sengle card --> */}
          {bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </section>
      </section>
    </div>
  );
}

export default ProductCard;
