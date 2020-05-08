import axios from 'axios'
axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
  method: 'get',
  baseURL: 'http://404scholar.cn',
  timeout: 5000
})
