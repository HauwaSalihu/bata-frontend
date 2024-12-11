import makeRequest from "../make_request";

const BASE_URL = 'product/';

export const getBestSelling = async ({config,query}) => makeRequest(config,'get', BASE_URL+"best-selling", {}, query);
export const getProductBySlug = async ({config,slug}) => makeRequest(config,'get', BASE_URL+slug, {});
export const getProducts = async ({config,params}) => makeRequest(config,'get', BASE_URL, {},params);

export const me = async ({config}) => makeRequest(config,'get', BASE_URL+'me', {});
// export const chartUsers = async ({config,query}) => makeRequest(config,'get', BASE_URL+'chart_users', {}, query);
// export const getUser = async ({config,query}) => makeRequest(config,'get', BASE_URL+'get_user', {}, query);
// export const getUserWallet = async ({config,identifier}) => makeRequest(config,'get', BASE_URL+`get_user_wallet/${identifier}`);
// export const getUsers = async ({config,query}) => makeRequest(config,'get', BASE_URL+'get_users', {}, query);
// // Add more functions for other device endpoints