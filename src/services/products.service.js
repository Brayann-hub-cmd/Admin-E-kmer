import api from "./api";

const productsService = {
  getAll: async () => {
    const { data } = await api.get("/annonces/");
    return data;
  },

  getByCode: async (code) => {
    const { data } = await api.get(`/annonces/${code}/`);
    return data;
  },

  create: async (formData) => {
    const { data } = await api.post("/annonces/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  update: async (code, formData) => {
    const { data } = await api.put(`/annonces/${code}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  delete: async (code) => {
    const { data } = await api.delete(`/annonces/${code}/`);
    return data;
  },

  search: async (titre, categorie = "") => {
    const { data } = await api.get("/rechercher-annonce/", {
      params: {
        titre,
        categorie,
      },
    });

    return data;
  },
};

export default productsService;