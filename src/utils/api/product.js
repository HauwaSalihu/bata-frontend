import makeRequest from "../make_request";

const BASE_URL = 'product/';

export const createProduct = async ({config,data}) => makeRequest(config,'post', BASE_URL, data);
export const updateProduct = async ({config,slug,data}) => makeRequest(config,'patch', BASE_URL+slug, data);
export const getBestSelling = async ({config,query}) => makeRequest(config,'get', BASE_URL+"best-selling", {}, query);
export const getProductBySlug = async ({config,slug}) => makeRequest(config,'get', BASE_URL+slug, {});
export const getProducts = async ({config,params}) => makeRequest(config,'get', BASE_URL, {},params);
export const getProductStats = async ({config,params}) => makeRequest(config,'get', BASE_URL+"admin/products/stats", {},params);