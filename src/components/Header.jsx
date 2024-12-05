import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [visible, setVisible] = useState(false);
  // const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div>
      <header className="container mx-auto ">
        <nav className="flex justify-between px-10 p-3 mb-5 lg:px-16 gap-4 items-center flex-wrap md:flex-nowrap">
          <Link to="/">
            <img src="/image.png" alt="" className="h-5" />
          </Link>

          <ul className="flex justify-between items-center gap-5 font-medium flex-wrap md:flex-nowrap">
            <li className="text-sm md:text-base">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-sm md:text-base">
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="text-sm md:text-base">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="text-sm md:text-base">
              <NavLink to="/login">Login/SignUp</NavLink>
            </li>
          </ul>
          <div className="flex gap-2 md:gap-5 items-center mt-4 md:mt-0">
            <div className="flex items-center gap-3 border bg-gray-50 py-2 px-5 rounded-lg w-full md:w-auto">
              <input
                type="search"
                className="bg-none w-full md:w-48"
                placeholder="What are you looking for?"
              />
              <img src={assets.search_icon} className="h-3" alt="" />
            </div>

            <div className="group relative">
              <Link>
                <img
                  className="w-5 cursor-pointer"
                  src={assets.profile_icon}
                  alt=""
                />
              </Link>
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-72 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">
                    Manage My Account
                  </p>
                  <p className="cursor-pointer hover:text-black">My Order</p>
                  <p className="cursor-pointer hover:text-black">
                    My Cancellations
                  </p>
                  <p className="cursor-pointer hover:text-black">My Reviews</p>
                  <p className="cursor-pointer hover:text-black">Logout</p>
                </div>
              </div>
            </div>

            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {/* {getCartCount()} */}
              </p>
            </Link>
          </div>
        </nav>
      </header>{" "}
    </div>
  );
};

export default Header;
