import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/annonces/");
  return response.data;
};

export const deleteProduct = async (code) => {
  const response = await api.delete(`/annonces/${code}/`);
  return response.data;
};