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
    return Promise.reject(error)
  }
)

export default instance