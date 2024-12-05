import React from "react";

const CustomerReviews = () => {
  return (
    <section className="flex justify-center items-center py-16">
      <div className="relative max-w-[90%] lg:w-[1138px] lg:h-[602px]">
        {/* Header Section */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-start items-start gap-16">
          <div className="flex justify-between items-end w-full">
            <div className="flex flex-col justify-start items-start gap-5">
              <div className="flex items-center gap-4">
                <div className="text-[#db4444] text-base font-semibold font-poppins leading-tight">
                  CUSTOMER REVIEWS
                </div>
                <div className="w-5 h-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Card */}
        <div className="absolute left-1/2 top-[190px] transform -translate-x-1/2 bg-white rounded-3xl shadow-lg p-8 w-full max-w-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
              <div className="text-black text-xs font-roboto font-normal leading-none">
                Rebecca Thompson
              </div>
              <div className="text-black/40 text-[11px] font-medium font-roboto leading-none mt-1">
                August 18
              </div>
            </div>
          </div>
          <p className="text-black text-base font-poppins leading-normal mt-6">
            Love everything about Bata Nigeria, from the products down to the
            customer service! Superb experience so far.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
