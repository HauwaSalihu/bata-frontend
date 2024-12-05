import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";

function Hero() {
  return (
    <div>
      <section className="container mx-auto flex flex-col md:flex-row justify-start items-center lg:gap-32 border-b border-t pb-10">
        {/* <!-- side nav --> */}
        <ul className=" xl:flex-col items-start h-[350px] xl:gap-5 border-r gap-10 px-20 pt-10 -mt-48 hidden xl:block text-justify  w-[20%]">
          <Link to="/collection">
            <li className="flex gap-6 items-center">
              School Shoes{" "}
              <img
                src={assets.dropdown_icon}
                className="h-3"
                //   className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                alt=""
              />
            </li>
            <li className="flex gap-8  items-center">
              Safety Boots{" "}
              <img
                src={assets.dropdown_icon}
                className="h-3"
                //   className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                alt=""
              />
            </li>
            <li>Sports</li>
            <li>Men</li>
            <li>Women</li>
            <li>Security Shoes</li>
          </Link>
        </ul>
        {/* <!-- ends here --> */}

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
            <div className="flex items-center justify-between gap-3 border bg-gray-50 p-1 w-full md:w-80 rounded-lg">
              <img src={assets.search_icon} className="h-3" alt="" />
              <input
                type="search"
                className="w-full"
                placeholder="Find the best brands"
              />
              <button className="bg-red-600 p-1 w-24 rounded-lg text-white">
                Search
              </button>
            </div>
          </div>
          <img
            src="/bata-home.jpg"
            className="hero-img md:max-h-sm lg:max-h-[500px]"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;
