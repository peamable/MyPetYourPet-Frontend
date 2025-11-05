import Axios from "axios";

const axiosClient = Axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL, //reads from .env
   //timeout:10000,
   //withCredentials:true,    //uncomment to implement authentication
});

//Add authenticator token
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle common errors here, e.g. 401
    return Promise.reject(error);
  }
);

export default axiosClient;