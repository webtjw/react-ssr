import axios from 'axios'

const axiosRequest = axios.create({
  baseURL: '/blog',
  withCredentials: false,
})

axiosRequest.interceptors.response.use(response => {
  const cookieTexts = response.headers['set-cookie']
  if (cookieTexts) {
    const regExp = /csrfToken=(.+?);/i
    for (let item of cookieTexts) {
      if (item && item.includes('csrfToken')) {
        const result = item.match(regExp)
        if (result && result[1]) {
          axiosRequest.defaults.headers.post['x-csrf-token'] = result[1]
          break
        }
      }
    }
  }

  return response && response.data && response.data.success && response.data.data
    ? response.data.data
    : null
}, error => {
  console.log(`请求 ${error.request.path} 失败：${error}`)
  return Promise.resolve(null) // component AsyncTips has to receive result even if the request fails.
})

export default axiosRequest