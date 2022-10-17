import axios from 'axios';

if (sessionStorage.token) {
  axios.defaults.headers.common['token'] = `${sessionStorage.getItem('token')}`;
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
