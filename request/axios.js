import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001' : '/',
  withCredentials: true
})

axiosRequest.interceptors.response.use(response => {
  if (response && response.data) return response.data
  else return null
}, error => {
  return Promise.resolve(error) // component AsyncTips has to receive result even if the request fails.
})

export default axiosRequest