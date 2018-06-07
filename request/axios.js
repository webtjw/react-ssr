import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: '/sapi',
  withCredentials: true
})

axiosRequest.interceptors.response.use(response => {
  if (response && response.data) return response.data
  else return null
}, error => {
  console.log(error)
  return Promise.resolve(error) // component AsyncTips has to receive result even if the request fails.
})

export default axiosRequest