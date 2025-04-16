import api from "../../utils/axios";

export const signUp = async (formData) => {
    const res = await api.post("/auth", formData);
    return res.data;
};


export const login = async (formData) => {
    const res = await api.post("/auth/login", formData);
    return res.data;
};
