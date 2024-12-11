import makeRequest from "../make_request";

const BASE_URL = 'sale/';

export const getOngoingSales = async ({config,query}) => makeRequest(config,'get', BASE_URL+"ongoing", {}, query);

// export const sendOTP = async ({config,data}) => makeRequest(config,'post', BASE_URL+'send_otp', data);
// export const verifyIdentifier = async ({config,data}) => makeRequest(config,'post', BASE_URL+'verify_identifier', data);
// export const verifyOTP = async ({config,data}) => makeRequest(config,'post', BASE_URL+'verify_otp', data);


export const me = async ({config}) => makeRequest(config,'get', BASE_URL+'me', {});
// export const chartUsers = async ({config,query}) => makeRequest(config,'get', BASE_URL+'chart_users', {}, query);
// export const getUser = async ({config,query}) => makeRequest(config,'get', BASE_URL+'get_user', {}, query);
// export const getUserWallet = async ({config,identifier}) => makeRequest(config,'get', BASE_URL+`get_user_wallet/${identifier}`);
// export const getUsers = async ({config,query}) => makeRequest(config,'get', BASE_URL+'get_users', {}, query);
// // Add more functions for other device endpoints