import api from "./api";

export const getProducts = async () => {
  const response = await api.get("annonces/");
  return Array.isArray(response.data) ? response.data : [];
};

export const getProduct = async (code) => {
  const response = await api.get(`annonces/${code}/`);
  return response.data;
};

export const updateProductStatus = async (code, data) => {
  const response = await api.patch(`annonces/${code}/`, data);
  return response.data;
};

export const deleteProduct = async (code) => {
  const response = await api.delete(`annonces/${code}/`);
  return response.data;
};
