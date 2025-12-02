import axios from 'axios';

const baseURL = 'http://192.168.100.199:8081'; 

const api = axios.create({
  baseURL: baseURL,
});

export default api;