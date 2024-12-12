import makeRequest from "../make_request";

const BASE_URL = 'user/';

export const login = async ({config,data}) => makeRequest(config,'post', BASE_URL+'login', data);
export const register = async ({config,data}) => makeRequest(config,'post', BASE_URL+'register', data);
export const verify_email = async ({config,token}) => makeRequest(config,'get', BASE_URL+'verify-email/'+token);
export const forgotPassword = async ({config,data}) => makeRequest(config,'post', BASE_URL+'forgot-password', data);
export const resetPassword = async ({config,token,data}) => makeRequest(config,'post', BASE_URL+'reset-password/'+token, data);
export const updateProfile = async ({config,data}) => makeRequest(config,'patch', BASE_URL+'update-profile', data);
export const changePassword = async ({config,data}) => makeRequest(config,'patch', BASE_URL+'change-password', data);


export const getAllUsers = async ({config,params}) => makeRequest(config,'get', BASE_URL + "admin/users", {}, params);
export const getUserStats = async ({config}) => makeRequest(config,'get', BASE_URL + "admin/users/stats");
export const searchUsers = async ({config,params}) => makeRequest(config,'get', BASE_URL + "admin/search", {}, params);
export const updateUser = async ({config, userId, data}) => makeRequest(config,'patch', BASE_URL + `admin/users/${userId}`, data);

export const me = async ({config}) => makeRequest(config,'get', BASE_URL+'me', {});
