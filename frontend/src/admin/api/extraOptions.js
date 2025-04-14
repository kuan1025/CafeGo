import api from "../../utils/axios";


export const getAllExtraOptions = async () => {
    return await api.get("/extraOption");
  };
