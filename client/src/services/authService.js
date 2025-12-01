import api from './api';

// Register user
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('account', JSON.stringify(response.data.account));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/auth/login', userData);

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('account', JSON.stringify(response.data.account));
  }

  return response.data;
};

// Get current user
const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Update settings
const updateSettings = async (settings) => {
  const response = await api.put('/auth/settings', settings);

  if (response.data.account) {
    localStorage.setItem('account', JSON.stringify(response.data.account));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('account');
};

const authService = {
  register,
  login,
  getMe,
  updateSettings,
  logout
};

export default authService;
