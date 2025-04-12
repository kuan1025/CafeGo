import api from "../../utils/axios";

export const signUp = async (formData) => {
    const fullUrl = `${import.meta.env.VITE_API_BASE_URL}/user`;
    console.log("Requesting:", fullUrl); 
    const res = await api.post("/user", formData);
    return res.data;
};


export const login = async (formData) => {
    const res = await api.post("/user/login", formData);
    return res.data;
};
