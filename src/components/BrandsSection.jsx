import React, { useEffect, useRef } from "react";

function BrandsSection() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // Adjust for faster/slower scrolling

    const scrollLogos = () => {
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.offsetWidth
      ) {
        scrollAmount = 0; // Reset scroll position when reaching the end
      }
      scrollAmount += scrollSpeed;
      scrollContainer.scrollLeft = scrollAmount;
    };

    const intervalId = setInterval(scrollLogos, 20); // Adjust interval for smoother scrolling

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <section className="container mx-auto items-center mt-10 p-4 px-6 md:px-10 lg:px-16 lg:py-16">
        <h3 className="text-red-500 font-bold text-xl text-center mb-6">
          OUR BRANDS
        </h3>
        <div
          ref={scrollContainerRef}
          style={{
            scrollbarWidth: "none" /* For Firefox */,
            msOverflowStyle: "none" /* For Internet Explorer and Edge */,
          }}
          className="overflow-x-auto whitespace-nowrap py-4 "
        >
          <div className="inline-flex gap-6">
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
              src="/brands-img/BFirst-Logo-NEW2-01-copy.png"
              className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              alt="Brand 3"
            />
            <img
              src="/brands-img/image.png"
              className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              alt="Brand 4"
            />
            <img
              src="/brands-img/BubbleGummers.png"
              className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              alt="Brand 5"
            />
            <img
              src="/brands-img/PataPata-Logo-Black-trim.png"
              className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              alt="Brand 6"
            />
            <img
              src="/brands-img/Power_logo-blue.png"
              className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              alt="Brand 7"
            />
            <img
              src="/brands-img/Toughees_Primary_Logo_3d09dbd5-6fac-4afe-9768-84a9476ee9f5.avif"
              className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              alt="Brand 8"
            />
            <img
              src="/brands-img/BataIndustrials_logo_proposition_onwhite_rgb1-sm.png"
              className="max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              alt="Brand 9"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default BrandsSection;
