import Axios from "axios";
import { getAuth } from "firebase/auth";

const axiosClient = Axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL, 
});

axiosClient.interceptors.request.use(
  

  async (config) => {
    const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;