import api from "../../utils/axios";

export const createCategory = async (formData) => {
    const res = await api.post("/category", formData);
    return res.data;
}

export const getAllCategories = async () => {
  return await api.get("/category");
};

export const deleteCategory = async (id) => {
  return await api.delete(`/category/${id}`);
};


export const updateCategory = async (id, updatedData) => {
  const res = await api.put(`/category/${id}`, updatedData);
  return res.data;
};