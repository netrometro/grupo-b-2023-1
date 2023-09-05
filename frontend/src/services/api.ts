import axios from 'axios';

export const api = axios.create({
  baseURL: "https://optistaff-api.onrender.com",
});

export const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws",
});