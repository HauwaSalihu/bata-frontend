// utils/api/category.js
import makeRequest from "../make_request";

const BASE_URL = 'category/';

export const createCategory = async ({data}) => makeRequest({},'post', BASE_URL, data);
export const getCategories = async ({params}) => makeRequest({},'get', BASE_URL, {}, params);
export const getCategoryBySlug = async ({slug}) => makeRequest({},'get', BASE_URL + slug);
export const updateCategory = async ({slug, data}) => makeRequest({},'patch', BASE_URL + slug, data);
export const deleteCategory = async ({slug}) => makeRequest({},'delete', BASE_URL + slug);
export const searchCategories = async ({params}) => makeRequest({},'get', BASE_URL + "search", {}, params);