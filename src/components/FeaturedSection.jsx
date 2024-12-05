import React from "react";

const FeaturedSection = () => {
  return (
    <div className="h-[768px] conainer mx-auto px-20 flex flex-col justify-start items-start gap-16">
      {/* Header Section */}
      <div className="flex flex-col justify-start items-start gap-5">
        <div className="flex justify-start items-center gap-4">
          <div className="text-[#db4444] text-base font-semibold font-poppins leading-tight">
            Featured
          </div>
          <div className="w-5 h-10 relative"></div>
        </div>
        <div className="text-black text-4xl font-semibold font-inter leading-[48px] tracking-wider">
          New Arrival
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-wrap justify-start items-start gap-8">
        {/* Large Box */}
        <div className="w-[570px] h-[600px] relative bg-black rounded">
          <img
            src="https://via.placeholder.com/570x435"
            alt="Exclusive Running Shoes"
            className="w-full h-[435px] absolute top-0 left-0 object-cover"
          />
          <div className="absolute left-8 bottom-6 flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="text-[#f9f9f9] text-2xl font-semibold font-inter leading-normal tracking-wide">
                Exclusive Running Shoes
              </div>
              <div className="text-[#f9f9f9] text-sm font-normal font-poppins leading-[21px]">
                Blue and White version of the Bata Nigeria coming out on sale.
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="text-white text-base font-medium font-poppins leading-normal">
                Shop Now
              </div>
              <div className="w-[81px] h-[0px] border border-white opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-start items-center gap-8">
          {/* Medium Box */}
          <div className="w-[570px] h-[284px] relative bg-[#0d0d0d] rounded">
            <img
              src="https://via.placeholder.com/432x286"
              alt="Women's Collections"
              className="w-[432px] h-[286px] absolute top-0 right-0 object-cover rotate-180"
            />
            <div className="absolute left-6 bottom-8 flex flex-col justify-start items-start gap-4">
              <div className="flex flex-col justify-start items-start gap-4">
                <div className="text-[#f9f9f9] text-2xl font-semibold font-inter leading-normal tracking-wide">
                  Women’s <span className="text-[#0d0d0d]">Collections</span>
                </div>
                <div className="text-[#f9f9f9] text-sm font-normal font-poppins leading-[21px]">
                  Featured woman collections that give you another vibe.
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="text-white text-base font-medium font-poppins leading-normal">
                  Shop Now
                </div>
                <div className="w-[81px] h-[0px] border border-white opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Small Boxes */}
          <div className="flex justify-center items-center gap-8">
            <div className="w-[270px] h-[284px] relative bg-black rounded">
              <div className="absolute left-6 bottom-8 flex flex-col justify-start items-start gap-2">
                <div className="text-[#f9f9f9] text-2xl font-semibold font-inter leading-normal tracking-wide">
                  Sneakers
                </div>
                <div className="text-[#f9f9f9] text-sm font-normal font-poppins leading-[21px]">
                  Cute Sneakers for Kids
                </div>
                <div className="text-white text-base font-medium font-poppins leading-normal">
                  Shop Now
                </div>
                <div className="w-[81px] h-[0px] border border-white opacity-50"></div>
              </div>
            </div>

            <div className="w-[270px] h-[284px] relative bg-black rounded">
              <div className="absolute left-6 bottom-8 flex flex-col justify-start items-start gap-2">
                <div className="text-[#f9f9f9] text-2xl font-semibold font-inter leading-normal tracking-wide">
                  Air Forces
                </div>
                <div className="text-[#f9f9f9] text-sm font-normal font-poppins leading-[21px]">
                  Home Staple
                </div>
                <div className="text-white text-base font-medium font-poppins leading-normal">
                  Shop Now
                </div>
                <div className="w-[81px] h-[0px] border border-white opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
