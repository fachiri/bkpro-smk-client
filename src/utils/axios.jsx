import axios from 'axios'
import { apiUrl } from './../constants/config'

const instance = axios.create({
  baseURL: apiUrl
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log('error')
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance