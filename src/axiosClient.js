import Axios from "axios";

const axiosClient = Axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL, //reads from .env
   //timeout:10000,
   //withCredentials:true,    //uncomment to implement authentication
});

// Add authenticator token COMMENT OUT FOR TESTING!!! ---------------------------------
axiosClient.interceptors.request.use(
    (config) => {
      const username = "user";
      const password = "500d1e6b-8884-4f9f-86af-8dbf483a5ee8"; // same one that worked

  const basicToken = btoa(`${username}:${password}`);
  config.headers.Authorization = `Basic ${basicToken}`;

  //not necessary unless we use maybe JWT token later
  // if (!config.headers) {
  // config.headers = {};
//}

// if (!config.headers.Authorization) {
//   config.headers.Authorization = `Basic ${basicToken}`;
// }
        return config;
    },
    (error) => Promise.reject(error)
);
//---------------------------------------------------------------------------------------------


// Optional: response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle common errors here, e.g. 401
    return Promise.reject(error);
  }
);


export default axiosClient;