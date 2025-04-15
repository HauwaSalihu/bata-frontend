import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCategories } from "../utils/api/category";
import { getAds } from "../utils/api/ads";
import { BASE_URL } from "../utils/variables";

function Hero() {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]); 
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleToggleCategory = (catId) => {
    setExpandedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories
        const categoriesResponse = await getCategories({});
        if (categoriesResponse.status) {
          setCategories(categoriesResponse.data.categories);
        }

        // Fetch active ads
        const adsResponse = await getAds({});
        if (adsResponse.status) {
          setAds(adsResponse.data);
        }

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate ads if there are multiple
  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => 
          prevIndex === ads.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change ad every 5 seconds
      return () => clearInterval(interval);
    }
  }, [ads]);

  return (
    <div className="w-full container mx-auto">
      <section className="w-full mx-auto flex flex-col md:flex-row justify-start items-center border-b border-t pb-10">
        {/* Side nav */}
        <div className="xl:flex-col items-start min-h-[400px] xl:gap-5 border-r border-gray-200 px-8 pt-10 -mt-48 hidden xl:block text-justify w-[20%]">
          <h2 className="font-semibold text-lg mb-6 text-gray-800">Categories</h2>
          <ul className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-4 bg-gray-200 rounded w-3/4"></div>
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <li
                  key={category._id}
                  className="relative"
                  onMouseEnter={() =>
                    setExpandedCategories((prev) =>
                      prev.includes(category._id)
                        ? prev
                        : [...prev, category._id]
                    )
                  }
                  onMouseLeave={() =>
                    setExpandedCategories((prev) =>
                      prev.filter((id) => id !== category._id)
                    )
                  }
                >
                  <div className="flex items-center justify-between py-2 w-full text-gray-600 hover:text-red-600 transition-all duration-200">
                    <Link
                      to={`/collection?category=${category._id}`}
                      className="text-sm font-medium"
                    >
                      {category.name}
                    </Link>
                    {category.subcategories?.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleToggleCategory(category._id);
                        }}
                        className="ml-2 focus:outline-none"
                      >
                        <img
                          src={assets.dropdown_icon}
                          className="h-3 rotate-90"
                          alt=""
                        />
                      </button>
                    )}
                  </div>
                  {category.subcategories?.length > 0 &&
                    expandedCategories.includes(category._id) && (
                      <div className="ml-4 mt-1">
                        <ul className="space-y-2">
                          {category.subcategories.map((subcat) => (
                            <li key={subcat._id}>
                              <Link
                                to={`/collection?subcategory=${subcat._id}`}
                                className="block text-gray-600 hover:text-red-600 transition-colors"
                              >
                                {subcat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  <div className="h-[1px] bg-gray-100 mt-2"></div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 xl:gap-20 px-4 sm:px-6 lg:px-8 pt-10">
          {/* Left text content */}
          <div className="flex flex-col text-center md:text-left mt-10 max-w-2xl">
            <h1 className="font-bold text-4xl md:text-7xl">
              BATA SINCE <br />
              1894
            </h1>
            <p className="text-red-600 font-semibold mt-4">
              Originally, we set out to ʻShoe the Worldʼ. This led us to where
              we are now: The No. 1 global footwear company and an international
              fashion icon.
            </p>
            <form 
              onSubmit={handleSearch} 
              className="mt-6 flex items-center justify-between gap-3 border border-gray-200 bg-white shadow-sm p-2 w-full rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <img src={assets.search_icon} className="h-3 ml-2 opacity-60" alt="search" />
              <input
                type="search"
                className="w-full outline-none bg-transparent text-sm px-2"
                placeholder="Find the best brands"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-[#db4444] px-4 py-2 rounded-lg text-white text-sm font-medium hover:bg-[#c03838] transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
          
          {/* Full-width Ad Carousel */}
          <div className="w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] relative rounded-lg shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            ) : ads.length > 0 ? (
              <>
                {ads.map((ad, index) => (
                  <div 
                    key={ad._id}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === currentAdIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      src={`${BASE_URL}/image/${ad.image.filename}`}
                      className="w-full h-full object-cover"
                      alt={ad.product?.name || "Advertisement"}
                    />
                    {ad.product && (
                      <Link 
                        to={`/product/${ad.product.slug}`}
                        className="absolute bottom-4 left-4 bg-[#db4444] text-white px-4 py-2 rounded-lg hover:bg-[#c03838] transition-colors duration-200"
                      >
                        Shop Now
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Navigation dots */}
                {ads.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {ads.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAdIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentAdIndex ? 'bg-[#db4444]' : 'bg-white'}`}
                        aria-label={`Go to ad ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <img
                src="/bata-home.jpg"
                className="w-full h-full object-cover"
                alt="Bata default"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;