import api from "./api";

export const getOrders = async () => {
  const response = await api.get("commandes/");
  return Array.isArray(response.data) ? response.data : [];
};

export const confirmOrder = async (id) => {
  const response = await api.post(
    `commandes/${id}/confirmer/`
  );

  return response.data;
};

export const getOrderStats = async () => {
  const orders = await getOrders();
  const total = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

  return {
    total,
    count: orders.length,
    average: orders.length ? Math.round(total / orders.length) : 0,
  };
};
