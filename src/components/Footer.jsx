import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <footer className="flex flex-col sm:flex-row sm:flex-wrap gap-5 justify-around text-white px-10 lg:p-10 p-16">
        <div className="flex flex-col gap-5 max-w-xs">
          <h3 className="font-bold text-xl tracking-wide">BATA NIGERIA</h3>
          <p className="font-medium">Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="border flex max-w-[250px]">
            <input
              type="email"
              placeholder="enter your email"
              className="w-full p-2"
            />
            <i className="far fa-paper-plane p-2"></i>
          </div>
        </div>

        <div className="flex flex-col gap-5 max-w-xs">
          <h3 className="font-bold text-xl tracking-wide">Support</h3>
          <p className="font-medium">Bata Nigeria Enugu</p>
          <p>batanigeria@gmail.com</p>
          <p>+234-90-456-789</p>
        </div>

        <div className="flex flex-col gap-2 max-w-xs">
          <h3 className="font-bold text-xl tracking-wide">Account</h3>
          <ul className="flex flex-col gap-5">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div className="flex flex-col gap-5 max-w-xs">
          <h3 className="font-bold text-xl tracking-wide">Quick Link</h3>
          <ul className="flex flex-col gap-5">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="flex gap-10 mt-5 sm:mt-0">
          {/* <i className="fab fa-twitter"></i> */}
          <img src={assets.facebook} className="h-6" alt="" />
          <img src={assets.instagram} className="h-6" alt="" />
          <img src={assets.linkedin} className="h-6" alt="" />
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
