import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

function SalesHome() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 4));
  }, []);
  return (
    <section className="container mx-auto px-6 sm:px-10 lg:px-16 lg:py-16 mt-10">
      <div className="flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#db4444] text-base font-semibold">Today’s</p>
            <h2 className="text-black text-4xl font-semibold tracking-wider">
              Ongoing Sales
            </h2>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Days</p>
              <h5 className="text-[32px] font-bold">01</h5>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Hours</p>
              <h5 className="text-[32px] font-bold">23</h5>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Minutes</p>
              <h5 className="text-[32px] font-bold">19</h5>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Seconds</p>
              <h5 className="text-[32px] font-bold">10</h5>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              rating={item.rating}
              discount={item.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SalesHome;
