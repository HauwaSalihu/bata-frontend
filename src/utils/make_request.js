import store from "./store";
import axiosInstance from "./axiosInstance";
import { startLoading, stopLoading } from "./slicers/loadingSlice";
import { addNotification } from "./slicers/notificationSlice";

const makeRequest = async (config, method, endpoint, data, queryParams) => {
  const config_data = {show_loader: true, show_error_status: true, ...config};
  if (config_data.show_loader) {
      store.dispatch(startLoading());
  }
//  console.log(config,method,endpoint)
  try {
      const url = `/${endpoint}`;
      let axiosConfig = {
          method,
          url,
          params: queryParams, // Query parameters
          // headers configuration
          headers: data instanceof FormData 
              ? { 'Content-Type': 'multipart/form-data' }
              : { 'Content-Type': 'application/json' }
      };

    //   console.log(axiosConfig)
      // If there's data, add it to config
      if (data) {
          axiosConfig.data = data;
      }

      // console.log('Request config:', axiosConfig);
      
      // Make the request with the complete config
      const response = await axiosInstance(axiosConfig);

      const { status, message } = response.data;

      if (status) {
          return response.data;
      } else {
          if (config_data.show_error_status) {
              store.dispatch(
                  addNotification({
                      type: "error",
                      title: "Operation Failed!",
                      description: message || "Request Failed.",
                  })
              );
          }
          return response.data;
      }
  } catch (error) {
      if (config_data.show_error_status) {
          store.dispatch(
              addNotification({
                  type: "error",
                  title: "Operation Failed!",
                  description: error?.response?.data?.message || "Error handling request.",
              })
          );
      }
      return error?.response?.data || null;
  } finally {
      if (config_data.show_loader) {
          store.dispatch(stopLoading());
      }
  }
};

export default makeRequest;