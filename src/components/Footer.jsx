import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-red-500 text-white">
      <footer className="flex flex-col sm:flex-row flex-wrap gap-10 justify-around px-6 py-12 lg:px-16">
        {/* About Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h3 className="font-bold text-xl tracking-wide">BATA NIGERIA</h3>
          <p className="font-medium">Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="flex items-center rounded-lg bg-red-400 overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-red-400 text-white placeholder-white/70 focus:outline-none"
            />
            <div className=" h-full flex items-center pr-3">
              <img src="/images/icon-send.png" alt="" />
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h3 className="font-bold text-xl tracking-wide">Support</h3>
          <h5 className="font-bold">BATA NIGERIA HEADQUARTERS</h5>
          <p className="font-medium ">
            House 13, Road 8, FHA Estate Lugbe, Abuja, Nigeria.
          </p>
          <p>bata.helpline@gmail.com</p>
          <p>+234 810 005 7615</p>
        </div>

        {/* Account Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h3 className="font-bold text-xl tracking-wide">Account</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link className="hover:text-gray-300" to="/account">
                My Account
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/login">
                Login / Register
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/wishlist">
                Wishlist
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/collection">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h3 className="font-bold text-xl tracking-wide">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link className="hover:text-gray-300" to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/terms">
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-300" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-5 mt-5 sm:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.facebook}
              className="h-6 hover:opacity-80"
              alt="Facebook"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.instagram}
              className="h-6 hover:opacity-80"
              alt="Instagram"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.linkedin}
              className="h-6 hover:opacity-80"
              alt="LinkedIn"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
