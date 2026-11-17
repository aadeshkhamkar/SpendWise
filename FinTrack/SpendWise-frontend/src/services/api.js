import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8181/api', headers: { 'Content-Type': 'application/json' } });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('spendwise_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getExpenses = () => api.get('/expenses');
export const addExpense = (data) => api.post('/expenses', data);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/signup', data);
