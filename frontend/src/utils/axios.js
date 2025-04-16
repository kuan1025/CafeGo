import axios from "axios";
import rateLimit from "axios-rate-limit";

export const api = rateLimit(axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
}), {
  maxRequests: 5,          // 5 request
  perMilliseconds: 1000   // 1 s
});


export const api_formData = rateLimit(axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 10000,
}), {
  maxRequests: 5,
  perMilliseconds: 1000
});


const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

//  add Token to every req 
api.interceptors.request.use(attachToken, (error) => Promise.reject(error));
api_formData.interceptors.request.use(attachToken, (error) => Promise.reject(error));



export default api;
