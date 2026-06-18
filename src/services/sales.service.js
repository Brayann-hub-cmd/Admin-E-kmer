import api from "./api";

const salesService = {
  getAll: async () => {
    const { data } = await api.get("/ventes-vendeur/");
    return data;
  },

  getDetails: async (code) => {
    const { data } = await api.get(`/ventes/${code}/`);
    return data;
  },
};

export default salesService;