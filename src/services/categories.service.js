import api from "./api";

export const getCategories = async () => {
  const response = await api.get("categories/");
  return Array.isArray(response.data) ? response.data : [];
};

export const createCategory = async (data) => {
  const response = await api.post("categories/", data);
  return response.data;
};

export const updateCategory = async (code, data) => {
  const response = await api.put(`categories/${code}/`, data);
  return response.data;
};

export const deleteCategory = async (code) => {
  const response = await api.delete(`categories/${code}/`);
  return response.data;
};

export const getSubCategories = async () => {
  const response = await api.get("sous_categories/");
  return Array.isArray(response.data) ? response.data : [];
};

export const getSubCategoriesByCategory = async (code) => {
  const response = await api.get(
    `low_categories/${code}/sous_categories/`
  );
  return Array.isArray(response.data) ? response.data : [];
};

export const createSubCategory = async (data) => {
  const response = await api.post(
    "sous_categories/",
    data
  );
  return response.data;
};

export const updateSubCategory = async (
  code,
  data
) => {
  const response = await api.put(
    `sous_categories/${code}/`,
    data
  );
  return response.data;
};

export const deleteSubCategory = async (
  code
) => {
  const response = await api.delete(
    `sous_categories/${code}/`
  );
  return response.data;
};
