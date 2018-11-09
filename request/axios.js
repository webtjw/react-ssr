import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: '/blog',
  withCredentials: true,
})

axiosRequest.interceptors.response.use(response => {
  return response && response.data && response.data.finish
    ? response.data
    : null
}, error => {
  console.log(`请求 ${error.request.path} 失败：${error}`)
  return Promise.resolve(null)
})

export default axiosRequest