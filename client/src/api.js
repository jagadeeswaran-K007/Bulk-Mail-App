import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bulk-mail-app-taupe.vercel.app', // replace local host link
});

export default API;
