import { api, api_formData } from "../../utils/axios";


export const createProduct = async (formData) => {
  try {
    const response = await api_formData.post('/product', formData);
    // console.log(response)
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  const response = await api_formData.put(`/product/${id}`, data);
  return response;
};


export const deleteProduct = async (id) =>{
  return await api.delete(`/product/${id}`);
}


export const getAllProducts = async ({ page = 1, limit = 12, category = "", sort = "" }) => {
  return await api.get('/product', {
    params: { page, limit, category, sort }
  });
};
