import React from "react";

function BrandsSection() {
  return (
    <div>
      <section className="container mx-auto items-center mt-10 p-4 px-6 md:px-10 lg:px-16 lg:py-16">
        <h3 className="text-red-500 font-bold text-xl text-center mb-6">OUR BRANDS</h3>
        <div className="flex justify-center flex-wrap gap-6">
          <img
            src="/brands-img/Frame 570.jpg"
            className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
            alt="Brand 1"
          />
          <img
            src="/brands-img/Frame 571.png"
            className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
            alt="Brand 2"
          />
          <img
            src="/brands-img/image.png"
            className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
            alt="Brand 3"
          />
        </div>
      </section>
    </div>
  );
}

export default BrandsSection;
