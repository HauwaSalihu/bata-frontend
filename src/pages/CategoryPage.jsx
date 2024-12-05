import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";

// import axios from "axios";

function CategoryPage() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategorry] = useState([]);
  // const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSorttype] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategorry((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategorry((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // const [allProducts, setAllProducts] = useState([]);

  // async function getProducts() {
  //   try {
  //     const response = await axios.get(
  //       "https://batanigeria.com/api/v1/product"
  //     );
  //     const products = response.data.data.products;
  //     setAllProducts(products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <main className="px-5 lg:px-20 mt-20">
      {/* Hyperlink section */}
      <section className="container mx-auto">
        <ul className="flex gap-3 text-gray-400">
          <li>All Collections</li>
        </ul>
      </section>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-1">
        {/* filter options */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            Filters
          </p>
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
          {/*  */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            }`}
          >
            <p className="mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name=""
                  className="w-3"
                  value={"Men"}
                  onChange={toggleCategory}
                  id=""
                />{" "}
                Men
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name=""
                  className="w-3"
                  onChange={toggleCategory}
                  value={"Women"}
                  id=""
                />{" "}
                Women
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name=""
                  className="w-3"
                  onChange={toggleCategory}
                  value={"Kids"}
                  id=""
                />{" "}
                Kids
              </p>
            </div>
          </div>
        </div>
        {/* righ side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            {/* product sort */}
            <select
              onChange={(e) => setSorttype(e.target.value)}
              className="border-2 border-gray-300 text-sm px-2"
            >
              <option value="relevant">Sort by : Relevant</option>
              <option value="low-high">Sort by: Low to hight</option>
              <option value="high-low">Sort by high to low</option>
            </select>
          </div>
          {/* map products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                price={item.price}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default CategoryPage;
