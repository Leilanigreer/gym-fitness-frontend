// src/config/axios.js
import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';

// Base URL configuration
const baseURL = isDevelopment 
  ? 'http://localhost:3000'
  : import.meta.env.VITE_API_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;

// Usage example:
// import apiClient from '../config/axios';
// 
// const createWorkoutLog = async (params) => {
//   try {
//     const response = await apiClient.post('/workout_logs', params);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating workout log:', error);
//     throw error;
//   }
// };