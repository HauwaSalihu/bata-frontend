import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getBestSelling } from "../utils/api/product";
import { BASE_URL } from "../utils/variables";
import { Link } from "react-router-dom";

function ProductCard() {
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await getBestSelling({ query: { days: 100, limit: 8 } });
        if (response.status) {
          setBestSellers(response.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);


  return (
    <div>
      <section className="container mx-auto px-10 mt-10 lg:px-16 lg:py-16">
        <h6 className="text-red-500 text-sm md:text-base">This Month</h6>
        <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
          <h3 className="text-2xl md:text-3xl font-bold">
            Best Selling Products
          </h3>
           <Link to="/collection">
          <button className="p-2 md:p-3 bg-red-500 rounded text-white hover:bg-red-600 transition-colors duration-200">
           
            View All
          </button>
           </Link>
        </div>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading ? (
            // Loading skeleton
            [...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 w-full rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            // Product items
            bestSellers.map((product) => (
              <ProductItem
                product={product}
                key={product._id}
                id={product._id}
                slug={product.slug}
                name={product.name}
                image={BASE_URL + "/image/" + product.images[0]?.filename}
                price={product.variations[0]?.price}
                discount={product?.activeSale?.discountPercentage}
              // You might want to pass more props based on your ProductItem component
              />
            ))
          )}
        </section>
      </section>
    </div>
  );
}

export default ProductCard;