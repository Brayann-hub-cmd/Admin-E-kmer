import api from "./api";

export const salesService = {
  getAll: () => api.get("ventes/"),
};