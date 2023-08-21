import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://optistaff-api.onrender.com',
});
