import api from "./api";

export const getSales = async () => {
  const response = await api.get("ventes/");
  return Array.isArray(response.data) ? response.data : [];
};

export const getVendorSales = async () => {
  const response = await api.get("ventes/vendeur/");
  return Array.isArray(response.data) ? response.data : [];
};

export const getSaleDetails = async (code) => {
  const response = await api.get(`ventes/${code}/`);
  return response.data;
};
