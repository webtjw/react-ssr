import axios from './axios'

export function getHomeArticle () {
  return axios.get('/article/index')
}

export async function getArchive (index = 0, size = 20) {
  return axios.post('/article/getArchive', {index, size})
}

export async function getArticleDetail (id) {
  return /^[0-9]+$/.test(id) ? axios.get(`/article/data/${id}`) : null
}

export async function getAllTags () {
  return axios.get('/article/allTags')
}

export async function getArticleByTag (tag, pageIndex = 0) {
  if (tag && typeof pageIndex === 'number' && pageIndex >= 0) {
    return axios({
      url: '/article/getArticleByTag',
      method: 'POST',
      data: {tag, pageIndex}
    })
  }
}

export async function login (token) {
  return axios({
    url: `/article/login`,
    method: 'POST',
    data: {token}
  })
}

export async function saveArticle (article) {
  return axios({
    url: `/article/save`,
    method: 'POST',
    data: article
  })
}

export async function uploadFile (file) {
  const formdata = new FormData()
  formdata.append('file', file)

  return axios({
    url: '/commonApi/upload',
    baseURL: '',
    method: 'POST',
    data: formdata,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
