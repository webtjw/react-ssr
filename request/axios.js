import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: '/blog',
  withCredentials: false,
})

axiosRequest.interceptors.response.use(response => {
  return response && response.data && response.data.success && response.data.data
    ? response.data.data
    : null
}, error => {
  console.log(`请求 ${error.request.path} 失败：${error}`)
  return Promise.resolve(null) // component AsyncTips has to receive result even if the request fails.
})

export default axiosRequest