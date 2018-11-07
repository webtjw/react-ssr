import axios from './axios'

export function getHomeArticle () {
  return axios.get('/index')
}

export function getArchive (index = 1) {
  return axios.get('/archive', {
    params: {
      index
    }
  })
}

export function getArticleDetail (id) {
  return /^[0-9]+$/.test(id) ? axios.get(`/article/${id}`) : null
}

export function getAllTags () {
  return axios.get('/tags')
}

export function getArticleByTag (tag, index = 1) {
  if (tag && typeof index === 'number' && index > 0) {
    return axios.get(`/tag/list`, {
      params: { index, tag }
    })
  }
}

export function login (token) {
  return axios({
    url: `/login`,
    method: 'POST',
    data: { token }
  })
}

export function saveArticle (article) {
  return axios({
    url: `/save`,
    method: 'POST',
    data: article
  })
}

export function uploadFile (file) {
  const formdata = new FormData()
  formdata.append('file', file)
  return axios({
    url: '/common/upload',
    baseURL: '',
    method: 'POST',
    data: formdata,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export async function checkDeveloper () {
  // 首次打开网站时，由 Next 在服务端渲染页面，
  // 客户端执行时，向服务端发起 get 请求检查开发者凭证是否仍然有效
  const checkResult = await axios.get('/isDeveloper')
  // 上述的请求同时也会携带 egg 自带的防范 csrf cookie，需要在 post 请求中设置 header
  const { cookie } = document
  if (cookie && cookie.includes('csrfToken')) {
    const reg = cookie.match(/csrfToken=(.+?)(;|$)/i)
    if (reg && reg[1]) {
      axios.defaults.headers.post['x-csrf-token'] = reg[1]
    }
  }
  return checkResult && checkResult.success && checkResult.data
}
