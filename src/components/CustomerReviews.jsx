import React from "react";

const reviews = [
  {
    name: "Rebecca Thompson",
    date: "August 18",
    review: "Love everything about Bata Nigeria, from the products down to the customer service! Superb experience so far.",
    avatar: "https://via.placeholder.com/64", // Replace with actual image URL
  },
  {
    name: "John Doe",
    date: "July 12",
    review: "Amazing quality and fast delivery. Bata Nigeria never disappoints!",
    avatar: "https://via.placeholder.com/64",
  },
  {
    name: "Sarah Johnson",
    date: "June 25",
    review: "Great variety of products and exceptional customer care. Highly recommended!",
    avatar: "https://via.placeholder.com/64",
  },
];

const CustomerReviews = () => {
  return (
    <section className="flex justify-center items-center py-16 px-4">
      <div className="relative max-w-[90%] lg:w-[1138px]">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-[#db4444] text-xl font-semibold font-poppins">
            CUSTOMER REVIEWS
          </h2>
        </div>

        {/* Reviews Section */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={`${review.name}'s avatar`}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="text-black text-sm font-bold">
                    {review.name}
                  </div>
                  <div className="text-gray-500 text-xs">{review.date}</div>
                </div>
              </div>
              <p className="text-black text-sm font-poppins leading-normal">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
