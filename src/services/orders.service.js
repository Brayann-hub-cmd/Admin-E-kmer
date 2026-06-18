import api from "./api";

const ordersService = {
  getAll: async () => {
    const { data } = await api.get("/orders/");
    return data;
  },

  create: async () => {
    const { data } = await api.post("/orders/");
    return data;
  },

  confirm: async (orderId) => {
    const { data } = await api.post(
      `/orders/${orderId}/confirm/`
    );

    return data;
  },
};

export default ordersService;