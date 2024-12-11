import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getOngoingSales } from "../utils/api/sale";
import { BASE_URL } from "../utils/variables";

function SalesHome() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [saleInfo, setSaleInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchSaleData = async () => {
      try {
        const response = await getOngoingSales({});
        console.log(response);
        
        if (response.status && response.data.sales && response.data.sales.length > 0) {
          // Get the first active sale
          const firstSale = response.data.sales[0];
          
          setSaleInfo(firstSale.saleInfo);
          setSaleProducts(firstSale.products);

          // Initialize countdown with sale's remaining time
          if (firstSale.saleInfo.timeRemaining) {
            setTimeRemaining(firstSale.saleInfo.timeRemaining);
          }
        }
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleData();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!saleInfo) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        // Calculate new time
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Sale ended
                clearInterval(timer);
                return prev;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [saleInfo]);

  const padNumber = (num) => String(num).padStart(2, '0');

  // Calculate sale price for a product
  const calculateSalePrice = (product) => {
    const variation = product.variations[0]; // Using first variation as base price
    const price = variation.price;
    return Math.round(price * (1 - product.discountPercentage / 100));
  };

  return (
    <section className="container mx-auto px-6 sm:px-10 lg:px-16 lg:py-16 mt-10">
      <div className="flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <p className="text-[#db4444] text-base font-semibold">Today's</p>
            <h2 className="text-black text-4xl font-semibold tracking-wider">
              {saleInfo?.name || "Ongoing Sales"}
            </h2>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Days</p>
              <h5 className="text-[32px] font-bold">{padNumber(timeRemaining.days)}</h5>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Hours</p>
              <h5 className="text-[32px] font-bold">{padNumber(timeRemaining.hours)}</h5>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Minutes</p>
              <h5 className="text-[32px] font-bold">{padNumber(timeRemaining.minutes)}</h5>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-medium">Seconds</p>
              <h5 className="text-[32px] font-bold">{padNumber(timeRemaining.seconds)}</h5>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading ? (
            // Loading skeleton
            [...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 w-full rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : saleProducts.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              id={product._id}
              slug={product.slug}
              image={BASE_URL + "/image/" + product.images?.[0]?.filename}
              name={product.name}
              price={product.variations[0].price}
              discount={product.discountPercentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SalesHome;