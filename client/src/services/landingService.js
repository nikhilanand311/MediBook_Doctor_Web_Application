import axios from 'axios';

const API_URL = 'http://localhost:5000/api/landing';

// Create a standalone instance if we wanted specific config, but simple axios is fine for public endpoints.
// We return the axios promise directly to match the behavior of the previous api.jsx implementation
// which allows components to access response.data.

export const getDoctors = () => axios.get(`${API_URL}/doctors`);

export const getDoctorById = (id) => axios.get(`${API_URL}/doctors/${id}`);

export const bookAppointment = (data) => axios.post(`${API_URL}/appointment`, data);

export const contactUs = (data) => axios.post(`${API_URL}/contact`, data);

export const subscribeNewsletter = (data) => axios.post(`${API_URL}/newsletter`, data);

// Default export object to match typical usage
const landingAPI = {
    getDoctors,
    getDoctorById,
    bookAppointment,
    contactUs,
    subscribeNewsletter
};

export default landingAPI;
