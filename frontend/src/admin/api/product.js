import axios from "axios";

export const createProduct = async (formData) => {
  return axios.post("/product", formData, {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
