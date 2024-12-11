import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getProducts } from "../utils/api/product";
import { addNotification } from "../utils/slicers/notificationSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/variables";

const RelatedProduct = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category?._id) return;

      try {
        setIsLoading(true);
        const response = await getProducts({
          params: {
            category: category._id,
            limit: 5, // Get 5 products
            page: 1,
            status: "published",
          },
        });

        if (response.status) {
          // Filter out current product and take first 4
          const filteredProducts = response.data.products
            .filter((product) => product._id !== currentProductId)
            .slice(0, 4);

          setRelatedProducts(filteredProducts);
        } else {
          throw new Error(
            response.message || "Failed to fetch related products"
          );
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
        dispatch(
          addNotification({
            type: "error",
            title: "Error",
            description: "Failed to load related products",
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category?._id, currentProductId, dispatch]);

  if (!category?._id) return null;

  return (
    <section className="container mx-auto px-4  mb-10 lg:px-10">
      <h2 className="text-[#db4444] text-base font-semibold mb-4">
        Related Items
      </h2>

      {isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-64 w-full rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <ProductItem
              key={item._id}
              product={item}
              id={item._id}
              image={BASE_URL + "/image/" + item.images[0]?.filename}
              name={item.name}
              slug={item.slug}
              price={item.variations[0]?.price}
              discount={
                item?.activeSale?.discountPercentage &&
                item.activeSale.discountPercentage + "%"
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No related products found
        </p>
      )}
    </section>
  );
};

export default RelatedProduct;
