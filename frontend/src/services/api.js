import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Patient Records API
export const patientRecordAPI = {
  getAll: () => axiosInstance.get('/patient-records'),
  getById: (id) => axiosInstance.get(`/patient-records/${id}`),
  getByOrganization: (organizationId) => axiosInstance.get(`/patient-records/organization/${organizationId}`),
  create: (data) => axiosInstance.post('/patient-records', data),
  update: (id, data) => axiosInstance.put(`/patient-records/${id}`, data),
  updateQA: (id, qaData) => axiosInstance.put(`/patient-records/${id}/quality-assurance`, qaData),
};

// Workflow Configuration API
export const workflowAPI = {
  getAll: () => axiosInstance.get('/workflows'),
  getById: (id) => axiosInstance.get(`/workflows/${id}`),
  getByType: (type) => axiosInstance.get(`/workflows/type/${type}`),
  getByOrganization: (organizationId) => axiosInstance.get(`/workflows/organization/${organizationId}`),
  create: (data) => axiosInstance.post('/workflows', data),
  update: (id, data) => axiosInstance.put(`/workflows/${id}`, data),
  deploy: (workflowId, organizationId) => axiosInstance.post(`/workflows/${workflowId}/deploy/${organizationId}`),
};

// Organization API
export const organizationAPI = {
  getAll: () => axiosInstance.get('/organizations'),
  getById: (id) => axiosInstance.get(`/organizations/${id}`),
  create: (data) => axiosInstance.post('/organizations', data),
  update: (id, data) => axiosInstance.put(`/organizations/${id}`, data),
};

// Incident Report API
export const incidentReportAPI = {
  getAll: () => axiosInstance.get('/incident-reports'),
  getById: (id) => axiosInstance.get(`/incident-reports/${id}`),
  getByOrganization: (organizationId) => axiosInstance.get(`/incident-reports/organization/${organizationId}`),
  create: (data) => axiosInstance.post('/incident-reports', data),
  update: (id, data) => axiosInstance.put(`/incident-reports/${id}`, data),
};

// Default export
const apiService = {
  patientRecordAPI,
  workflowAPI,
  organizationAPI,
  incidentReportAPI,
};

export default apiService;
