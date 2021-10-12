import * as fromLocalStorage from "@/services/localStorage";

export const withInterceptors = client => {
  client.interceptors.request.use(function(config) {
    const token = fromLocalStorage.loadEntry("token");
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    return config;
  });

  client.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response && error.response.status === 401) {
        fromLocalStorage.removeEntry("token");
      }
      return Promise.reject(error);
    }
  );
  return client;
};
