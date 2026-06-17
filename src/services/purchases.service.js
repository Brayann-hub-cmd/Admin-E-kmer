import api from "./api";

export const purchasesService = {
  getAll: () => api.get("achats/"),
};