import api from "./api";

export const ordersService = {
  getAll: () => api.get("commandes/"),

  confirm: (id) =>
    api.post(`commandes/${id}/confirmer/`),
};