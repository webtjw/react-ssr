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
    url: '/commonApi/upload',
    baseURL: '',
    method: 'POST',
    data: formdata,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
