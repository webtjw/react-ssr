import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: '/blogApi',
  withCredentials: true
})

axiosRequest.interceptors.response.use(response => {
  if (response && response.data && response.data.success && response.data.data) return response.data.data
  else return null
}, error => {
  return Promise.resolve(error) // component AsyncTips has to receive result even if the request fails.
})

export default axiosRequest