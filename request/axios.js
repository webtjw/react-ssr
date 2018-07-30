import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: '/blogApi',
  withCredentials: true
})

axiosRequest.interceptors.response.use(response => {
  if (response && response.data && response.data.success && response.data.data) return response.data.data
  else return null
}, error => {
  console.log(`请求 ${error.request.path} 失败：${error}`)
  return Promise.resolve(null) // component AsyncTips has to receive result even if the request fails.
})

export default axiosRequest