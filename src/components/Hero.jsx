import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCategories } from "../utils/api/category";

function Hero() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories({});
        if (response.status) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <section className="container mx-auto flex flex-col md:flex-row justify-start items-center lg:gap-32 border-b border-t pb-10">
        {/* side nav */}
        <div className="xl:flex-col items-start min-h-[400px] xl:gap-5 border-r border-gray-200 px-8 pt-10 -mt-48 hidden xl:block text-justify w-[20%]">
          <h2 className="font-semibold text-lg mb-6 text-gray-800">Categories</h2>
          <ul className="space-y-4">
            {isLoading ? (
              // Loading state
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-4 bg-gray-200 rounded w-3/4"></div>
                ))}
              </div>
            ) : (
              // Categories list
              categories.map((category) => (
                <li key={category._id}>
                  <Link 
                    to={`/collection?category=${category._id}`}
                    className="group flex items-center justify-between py-2 w-full text-gray-600 hover:text-red-600 transition-all duration-200"
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    {category.hasSubcategories && (
                      <img
                        src={assets.dropdown_icon}
                        className="h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        alt=""
                      />
                    )}
                  </Link>
                  <div className="h-[1px] bg-gray-100 mt-2"></div>
                </li>
              ))
            )}
          </ul>
        </div>
        {/* ends here */}

        <div className="flex flex-col-reverse lg:flex-row lg:justify-around lg:-ml-20 pt-10 gap-20 pl-10 lg:pl-36 xl:pl-10 pr-10">
          <div className="flex gap-5 flex-col text-center md:text-left mt-10">
            <h1 className="font-bold text-4xl md:text-7xl">
              BATA SINCE <br />
              1894
            </h1>
            <p className="text-red-600 md:w-96 font-semibold">
              Originally, we set out to ʻShoe the Worldʼ. This led us to where
              we are now: The No. 1 global footwear company and an international
              fashion icon.
            </p>
            <form 
      onSubmit={handleSearch} 
      className="flex items-center justify-between gap-3 border border-gray-200 bg-white shadow-sm p-2 w-full md:w-80 rounded-lg hover:shadow-md transition-shadow duration-200"
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
          <img
            src="/bata-home.jpg"
            className="hero-img md:max-h-sm lg:max-h-[500px] rounded-lg shadow-lg"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;