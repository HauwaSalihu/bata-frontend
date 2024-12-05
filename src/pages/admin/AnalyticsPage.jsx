import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="w-full h-screen relative bg-white">
      {/* Analytics Section */}
      <div className="w-full md:w-[926px] h-[301.78px] absolute top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col justify-start items-start">
        <div className="w-full h-[301.78px] bg-[#fefeff] rounded-md shadow"></div>
        <div className="text-black text-[26.04px] font-bold font-['Cairo']">
          Analytics
        </div>
        <div className="px-3 py-2 bg-white rounded border border-[#e4e6eb] flex items-center">
          <div className="flex items-center gap-3">
            <div className="text-[#4b4543] text-xs font-normal font-['Commissioner']">
              Earnings (NGN)
            </div>
          </div>
        </div>
        <div className="px-3 py-2 bg-[#f5f6f7] rounded border border-[#e4e6eb] flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-[16.54px] h-[16.54px] relative"></div>
            <div className="w-[66.14px] text-[#4b4543] text-xs font-normal font-['Commissioner']">
              All Time
            </div>
          </div>
        </div>
        {/* Y-Axis Label */}
        <div className="absolute left-0 top-0 text-right text-[#4b4543] text-[9.92px] font-normal font-['Commissioner']">
          <div className="mb-[41px]">750k</div>
          <div className="mb-[41px]">500k</div>
          <div className="mb-[41px]">250k</div>
          <div className="mb-[41px]">100k</div>
          <div className="mb-[41px]">0k</div>
        </div>
        {/* Horizontal Grid */}
        <div className="absolute w-full h-full grid grid-cols-10 gap-[10px]">
          <div className="border border-[#edeef5] rotate-90"></div>
          {/* Repeat the divs for more grid lines */}
        </div>
        {/* X-Axis Labels (Months) */}
        <div className="flex justify-start gap-[46.30px] mt-[200px]">
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month) => (
            <div
              key={month}
              className="w-[26.46px] h-[16.54px] text-center text-[#130e00] text-[9.92px] font-normal font-['Commissioner']"
            >
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Red Section */}
      <div className="w-full md:w-[926px] h-[343.94px] absolute top-[50%] left-1/2 transform -translate-x-1/2 bg-[#fd0000] rounded-md">
        <div className="absolute w-full h-full bg-[#fd0000] rounded-md">
          {/* Data Cards */}
          <div className="absolute left-[624px] top-[94px] bg-white opacity-5 rounded-md w-[281.11px] h-[104.18px]">
            <div className="absolute top-[24px] left-[24px] flex flex-col justify-start items-start gap-3">
              <div className="text-[#f2f5fb] text-sm font-light font-['Cairo']">
                Total Registered Users
              </div>
              <div className="text-white text-[24.80px] font-medium font-['Cairo']">
                12
              </div>
            </div>
          </div>
          <div className="absolute left-[20.67px] top-[219.10px] bg-white opacity-5 rounded-md w-[281.11px] h-[104.18px]">
            <div className="absolute top-[24px] left-[24px] flex flex-col justify-start items-start gap-3">
              <div className="text-[#f2f5fb] text-sm font-light font-['Cairo']">
                Total Orders Completed
              </div>
              <div className="text-white text-[24.80px] font-medium font-['Cairo']">
                375
              </div>
            </div>
          </div>
          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
