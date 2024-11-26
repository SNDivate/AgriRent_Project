
"use client";


import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : null;

if (!API_URL) {
  console.error('API_URL is undefined. Please check your environment variables.');
}

// Initialize axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for handling authorization tokens
api.interceptors.request.use(
  (config) => {
    // Check if running in the browser to access localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling authentication and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page if unauthorized
      }
    }
    console.error('API error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

// Authentication related functions
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token); // Store token in localStorage
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Booking related functions
export const getUserBookings = async () => {
  try {
    const response = await api.get('/bookings/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateBooking = async (bookingId, bookingData) => {
  try {
    const response = await api.put(`/bookings/${bookingId}`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting booking:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Equipment related functions
export const addEquipment = async (equipmentData) => {
  try {
    const response = await api.post('/equipment', equipmentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding equipment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getEquipment = async () => {
  try {
    const response = await api.get('/equipment/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching equipment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAllEquipment = async () => {
  try {
    const response = await api.get('/equipment/all');
    console.log('All equipment data:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching all equipment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateEquipment = async (equipmentId, equipmentData) => {
  try {
    const response = await api.put(`/equipment/${equipmentId}`, equipmentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating equipment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteEquipment = async (equipmentId) => {
  try {
    const response = await api.delete(`/equipment/${equipmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting equipment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return typeof window !== 'undefined' && !!localStorage.getItem('token');
};

export default api;



// "use client";

// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : '';

// // Create a base API instance
// const createApiInstance = () => {
//   return axios.create({
//     baseURL: API_URL,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// // Token management functions
// const getToken = () => {
//   try {
//     return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//   } catch {
//     return null;
//   }
// };

// const setToken = (token) => {
//   try {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('token', token);
//     }
//   } catch (error) {
//     console.error('Error setting token:', error);
//   }
// };

// const removeToken = () => {
//   try {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('token');
//     }
//   } catch (error) {
//     console.error('Error removing token:', error);
//   }
// };

// // Create API instance with interceptors
// const api = createApiInstance();

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       removeToken();
//       if (typeof window !== 'undefined') {
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Custom hook for authentication state
// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsAuthenticated(!!getToken());
//     setIsLoading(false);
//   }, []);

//   return { isAuthenticated, isLoading };
// };

// // Authentication functions
// export const registerUser = async (userData) => {
//   try {
//     const response = await api.post('/users/register', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error registering user:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const loginUser = async (credentials) => {
//   try {
//     const response = await api.post('/users/login', credentials);
//     setToken(response.data.token);
//     return response.data;
//   } catch (error) {
//     console.error('Error logging in:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const logout = () => {
//   removeToken();
//   if (typeof window !== 'undefined') {
//     window.location.href = '/login';
//   }
// };

// // API functions with proper error handling
// export const getUserProfile = async () => {
//   try {
//     const response = await api.get('/users/profile');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user profile:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const getUserBookings = async () => {
//   try {
//     const response = await api.get('/bookings/user');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user bookings:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const createBooking = async (bookingData) => {
//   try {
//     const response = await api.post('/bookings', bookingData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating booking:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const updateBooking = async (bookingId, bookingData) => {
//   try {
//     const response = await api.put(`/bookings/${bookingId}`, bookingData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating booking:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const deleteBooking = async (bookingId) => {
//   try {
//     const response = await api.delete(`/bookings/${bookingId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting booking:', error.response?.data || error.message);
//     throw error;
//   }
// };

// // Equipment related functions with proper error handling
// export const addEquipment = async (equipmentData) => {
//   try {
//     const response = await api.post('/equipment', equipmentData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding equipment:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const getEquipment = async () => {
//   try {
//     const response = await api.get('/equipment/user');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching equipment:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const getAllEquipment = async () => {
//   try {
//     const response = await api.get('/equipment/all');
//     return Array.isArray(response.data) ? response.data : [];
//   } catch (error) {
//     console.error('Error fetching all equipment:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const updateEquipment = async (equipmentId, equipmentData) => {
//   try {
//     const response = await api.put(`/equipment/${equipmentId}`, equipmentData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error updating equipment:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const deleteEquipment = async (equipmentId) => {
//   try {
//     const response = await api.delete(`/equipment/${equipmentId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting equipment:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export default api;