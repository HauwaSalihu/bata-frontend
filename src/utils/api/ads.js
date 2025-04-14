import makeRequest from "../make_request";

const BASE_URL = 'ad/';

export const getAds = async ({config}) => makeRequest(config,'get', BASE_URL);
export const createAd = async ({config,data}) => makeRequest(config,'post', BASE_URL, data);
export const deleteAd = async ({config,itemId}) => makeRequest(config,'delete', BASE_URL+"/"+itemId, {});
