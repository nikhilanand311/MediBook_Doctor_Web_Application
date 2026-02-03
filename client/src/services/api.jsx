import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

export const appointmentAPI = {
  getMyAppointments: () => api.get("/appointments"),
  getAllAppointments: () => api.get("/appointments/all"),
  updateAppointment: (id, data) => api.put(`/appointments/${id}`, data),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`),
};

export const doctorAPI = {
  createDoctor: (data) => {
    // If data is FormData (has file), use multipart, otherwise use JSON
    if (data instanceof FormData) {
      return api.post("/doctors", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }
    return api.post("/doctors", data);
  },
  updateDoctor: (id, data) => {
    // If data is FormData (has file), use multipart, otherwise use JSON
    if (data instanceof FormData) {
      return api.put(`/doctors/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }
    return api.put(`/doctors/${id}`, data);
  },
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
};



export default api;
