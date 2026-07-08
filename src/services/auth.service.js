import api from "./api";

const authService = {
  login: async (email, password) => {
    const response = await api.post(
      "auth/login/",
      {
        email,
        password,
      }
    );

    if (response.data.token) {
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
    }

    return response;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  profile: async () => {
    const response = await api.get("auth/profile/");
    return response.data;
  },

  updateProfile: async (data) => {
    const headers = data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
    const response = await api.put("auth/profile/", data, { headers });
    
    if (response.data) {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          const userObj = JSON.parse(stored);
          const updatedUser = { ...userObj, ...response.data };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return response.data;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
