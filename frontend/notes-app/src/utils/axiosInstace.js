// axios instance
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",  
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
