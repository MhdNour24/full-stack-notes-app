// axios instance
import axios from "axios";
import store from "../store"; // تأكد من تعديل هذا حسب مسار store الخاص بك

const axiosInstance = axios.create({
  baseURL: "https://notes-app-backend-k0t1.onrender.com",  
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().notes.token; // استخدام store.getState()
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
