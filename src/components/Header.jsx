import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../utils/slicers/userSlice";
import { clearCart } from "../utils/slicers/cartSlice";
import { selectCartItemCount } from "../utils/slicers/cartSlice";
import { assets } from "../assets/assets";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Get user and cart state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const cartItemCount = useSelector(selectCartItemCount);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <header className="sticky top-0 px-5 lg:px-20 py-2 border-b bg-white z-40 shadow-sm">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={"/image.png"} alt="" className="h-5 w-auto" />
        </Link>

        {/* Main Navigation - Desktop */}
        <ul className="hidden md:flex gap-8">
          <li>
            <Link to="/" className="text-gray-600 hover:text-[#db4444]">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/collection"
              className="text-gray-600 hover:text-[#db4444]"
            >
              Collection
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-[#db4444]">
              About
            </Link>
          </li>
          <li>
            <Link to="/csr" className="text-gray-600 hover:text-[#db4444]">
              CSR
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-600 hover:text-[#db4444]">
              Contact
            </Link>
          </li>
        
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center justify-between gap-3 border border-gray-200 bg-white py-1.5 px-2 w-80 rounded-lg"
          >
            <img
              src={assets.search_icon}
              className="h-3 ml-2 opacity-60"
              alt=""
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full outline-none bg-transparent text-sm px-2"
              placeholder="Find the best brands"
            />
            <button
              type="submit"
              className="bg-[#db4444] px-3 py-1.5 rounded text-white text-sm font-medium hover:bg-[#c03838] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Cart Link with Count */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="Cart" className="w-5 h-5" />
            {cartItemCount > 0 && (
              <div className="absolute -top-1.5 -right-1.5 bg-[#db4444] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </div>
            )}
          </Link>

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2">
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="w-5 h-5"
                />
              </button>
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-[#db4444]">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#db4444] px-4 py-1.5 rounded text-white hover:bg-[#c03838] transition-colors text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <img src={assets.menu_icon} alt="Menu" className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-2 pt-2 border-t">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center border rounded-lg p-2">
              <img
                src={assets.search_icon}
                className="h-3 ml-2 opacity-60"
                alt=""
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none bg-transparent text-sm px-2"
                placeholder="Find the best brands"
              />
              <button
                type="submit"
                className="bg-[#db4444] px-3 py-1.5 rounded text-white text-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Mobile Navigation */}
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/collection" className="block text-gray-600">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-gray-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/csr" className="block text-gray-600">
                CSR
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-gray-600">
                Contact
              </Link>
            </li>
          
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login" className="block text-gray-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="block text-[#db4444]">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
