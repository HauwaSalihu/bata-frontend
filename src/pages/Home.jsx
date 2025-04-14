import React from "react";
import SalesHome from "../components/SalesHome";
import ProductCard from "../components/ProductCard";
// import FeaturedSection from "../components/FeaturedSection";
import BrandsSection from "../components/BrandsSection";
// import CustomerReviews from "../components/CustomerReviews";
import LocationsSection from "../components/LocationsSection";
import LastHome from "../components/LastHome";
import Hero from "../components/Hero";

function Home() {
  return (
    <div>
      <Hero />
      <SalesHome />
      <ProductCard />
    
      <BrandsSection />
      {/* <CustomerReviews /> */}
      <LocationsSection />
      <LastHome />
    </div>
  );
}

export default Home;
