import api from "./api";

export const getProducts = async () => {
  const response = await api.get("annonces/");
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.results)) return response.data.results;
  return [];
};

export const getProduct = async (code) => {
  const response = await api.get(`annonces/${code}/`);
  return response.data;
};

export const updateProductStatus = async (code, data) => {
  const response = await api.patch(`annonces/${code}/statut/`, data);
  return response.data;
};

export const deleteProduct = async (code) => {
  const response = await api.delete(`annonces/${code}/`);
  return response.data;
};
