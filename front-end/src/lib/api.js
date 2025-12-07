// API configuration - Update this URL when your backend is deployed
const API_BASE_URL = "http://localhost:5500/api/v1";

// Helper to get auth token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Helper for making authenticated requests
const authFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await authFetch("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    // Backend returns { success, message, data: { token, user } }
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  signup: async (name, email, password) => {
    const response = await authFetch("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    // Backend returns { success, message, data: { token, user } }
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Subscriptions API
export const subscriptionsAPI = {
  getAll: () => authFetch("/subscriptions"),

  getById: (id) => authFetch(`/subscriptions/${id}`),

  create: (subscription) =>
    authFetch("/subscriptions", {
      method: "POST",
      body: JSON.stringify(subscription),
    }),

  update: (id, subscription) =>
    authFetch(`/subscriptions/${id}`, {
      method: "PUT",
      body: JSON.stringify(subscription),
    }),

  delete: (id) =>
    authFetch(`/subscriptions/${id}`, {
      method: "DELETE",
    }),

  cancel: (id) =>
    authFetch(`/subscriptions/${id}/cancel`, {
      method: "PUT",
    }),
};

// User API
export const userAPI = {
  getProfile: () => authFetch("/users"),
  
  updateProfile: (data) =>
    authFetch("/users", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

export default { authAPI, subscriptionsAPI, userAPI };
