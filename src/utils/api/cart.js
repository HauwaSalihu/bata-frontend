import makeRequest from "../make_request";

const BASE_URL = 'cart/';

export const getCart = async ({config,query}) => makeRequest(config,'get', BASE_URL, {}, query);
export const addUpdateCart = async ({config,data}) => makeRequest(config,'post', BASE_URL+'items', data);
export const removeFromCart = async ({config,itemId}) => makeRequest(config,'delete', BASE_URL+"items/"+itemId, {});
export const updateQuantity = async ({config,itemId,data}) => makeRequest(config,'patch', BASE_URL+"items/"+itemId, data);
// export const verifyOTP = async ({config,data}) => makeRequest(config,'post', BASE_URL+'verify_otp', data);


// export const me = async ({config}) => makeRequest(config,'get', BASE_URL+'me', {});
// export const chartUsers = async ({config,query}) => makeRequest(config,'get', BASE_URL+'chart_users', {}, query);
// export const getUser = async ({config,query}) => makeRequest(config,'get', BASE_URL+'get_user', {}, query);
// export const getUserWallet = async ({config,identifier}) => makeRequest(config,'get', BASE_URL+`get_user_wallet/${identifier}`);
// export const getUsers = async ({config,query}) => makeRequest(config,'get', BASE_URL+'get_users', {}, query);
// // Add more functions for other device endpoints