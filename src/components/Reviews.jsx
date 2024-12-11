import React, { useState, useEffect } from 'react';
import { getProductReviews } from "../utils/api/review";

const Reviews = ({ productId, productName }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchReviews = async (page) => {
    try {
      setLoading(true);
      const response = await getProductReviews({ 
        productId,
        params: { page, limit: 5 }
      });

      if (response.status) {
        setReviews(response.data.reviews);
        setStats(response.data.stats);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("here")
    fetchReviews(currentPage);
  }, [productId, currentPage]);

  return (
    <section className="container mx-auto px-4 lg:px-10 mb-10">
      <h2 className="text-2xl font-medium mb-6">Customer Reviews</h2>
      
      {/* Reviews Stats */}
      {stats && (
        <div className="flex items-start gap-8 mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#db4444] mb-2">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 justify-center mb-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-xl ${
                    index < Math.round(stats.averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {stats.totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-grow">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 mb-2">
                <span className="text-sm w-12">{rating} stars</span>
                <div className="flex-grow bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#db4444]"
                    style={{
                      width: `${((stats.ratingDistribution[rating] || 0) / stats.totalReviews) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm w-12 text-right">
                  {stats.ratingDistribution[rating] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet for {productName}
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`${
                            index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(pagination.totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`
                px-4 py-2 rounded
                ${currentPage === index + 1
                  ? 'bg-[#db4444] text-white'
                  : 'border hover:bg-red-50'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Reviews;