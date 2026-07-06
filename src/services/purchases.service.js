import api from "./api";

export const getPurchases = async () => {
  const response = await api.get("achats/");
  return Array.isArray(response.data) ? response.data : [];
};
