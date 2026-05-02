import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Create a dedicated axios instance for auth
const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
authAxios.interceptors.request.use(
  (config) => {
    console.log('Auth Request:', {
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      method: config.method,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
authAxios.interceptors.response.use(
  (response) => {
    console.log('Auth Response:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set token in both axios instances
    if (token) {
      authAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      delete authAxios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
      console.log('Attempting login to:', `${apiUrl}/auth/login`);
      console.log('Login data:', { username, password: '***' });
      
      const response = await authAxios.post('/auth/login', {
        username,
        password,
      });
      
      console.log('Login response:', response.data);
      
      const { token: authToken } = response.data;
      
      if (!authToken) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setIsAuthenticated(true);
      
      // Set token for future requests
      authAxios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed';
      if (error.response) {
        console.error('Error response:', error.response.data);
        errorMessage = error.response.data?.message || error.response.data?.error || 'Invalid credentials';
      } else if (error.request) {
        console.error('No response received');
        errorMessage = 'No response from server. Please check if the backend is running.';
      } else {
        errorMessage = error.message || 'An error occurred during login';
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete authAxios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      console.log('Attempting registration to:', `${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/auth/register`);
      
      const response = await authAxios.post('/auth/register', userData);
      
      console.log('Registration response:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || 'Registration failed';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check if the backend is running.';
      } else {
        errorMessage = error.message || 'An error occurred during registration';
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
