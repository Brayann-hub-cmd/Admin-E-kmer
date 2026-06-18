import api from "./api";

const categoriesService = {
  getCategories: async () => {
    const { data } = await api.get("/categories/");
    return data;
  },

  createCategory: async (payload) => {
    const { data } = await api.post("/categories/", payload);
    return data;
  },

  updateCategory: async (code, payload) => {
    const { data } = await api.put(`/categories/${code}/`, payload);
    return data;
  },

  deleteCategory: async (code) => {
    const { data } = await api.delete(`/categories/${code}/`);
    return data;
  },

  getSubCategories: async () => {
    const { data } = await api.get("/sous_categories/");
    return data;
  },

  createSubCategory: async (payload) => {
    const { data } = await api.post("/sous_categories/", payload);
    return data;
  },

  updateSubCategory: async (code, payload) => {
    const { data } = await api.put(`/sous_categories/${code}/`, payload);
    return data;
  },

  deleteSubCategory: async (code) => {
    const { data } = await api.delete(`/sous_categories/${code}/`);
    return data;
  },

  getSubCategoriesByCategory: async (categorieCode) => {
    const { data } = await api.get(
      `/categories/${categorieCode}/sous_categories`
    );

    return data;
  },
};

export default categoriesService;