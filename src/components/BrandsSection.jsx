import React from "react";

function BrandsSection() {
  return (
    <div>
      <section className="container mx-auto items-center mt-10 p-4 px-10 lg:px-16 lg:py-16">
        <h3 className="text-red-500 font-bold text-xl">OUR BRANDS</h3>
        <div className="flex h-40 justify-around flex-wrap">
          <img
            src="/brands-img/Frame 570.jpg"
            className="max-w-[100px]"
            alt=""
          />
          <img
            src="/brands-img/Frame 571.png"
            className="max-w-[100px]"
            alt=""
          />
          <img src="/brands-img/image.png" className="max-w-[100px]" alt="" />
        </div>
      </section>
    </div>
  );
}

export default BrandsSection;
