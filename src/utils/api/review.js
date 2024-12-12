import makeRequest from "../make_request";

const BASE_URL = 'review/';

export const createReview = async ({config,data}) => makeRequest(config,'post', BASE_URL, data);
export const getProductReviews = async ({config,productId,params}) => makeRequest(config,'get', BASE_URL+"product/"+productId, {}, params);
export const getUserReviews = async ({config}) => makeRequest(config,'get', BASE_URL+"my-reviews");
export const getUserProductReview = async ({config,productId}) => makeRequest(config,'get', BASE_URL+"my-review/"+productId);
export const getAllReviews= async ({config,params}) => makeRequest(config,'get', BASE_URL+"admin/reviews",{},params);
export const getReviewStats= async ({config}) => makeRequest(config,'get', BASE_URL+"admin/reviews/stats");
export const updateUserProductReview = async ({config,productId,data}) => makeRequest(config,'patch', BASE_URL+"my-review/"+productId,data);
export const deleteReview = async ({config,reviewId}) => makeRequest(config,'delete', BASE_URL+reviewId);
