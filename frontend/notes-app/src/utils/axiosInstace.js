// axios instance
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://notes-app-backend-k0t1.onrender.com",  
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});
 

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
