import api from "./api";

const purchasesService = {
  getAll: async () => {
    const { data } = await api.get("/achats/");
    return data;
  },
};

export default purchasesService;