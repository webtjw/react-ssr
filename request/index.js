import axios from './axios'

export function getHomeArticle () {
  return axios.get('/index')
}

export async function getArchive (index = 1) {
  return axios.get('/archive', {
    params: {
      index
    }
  })
}

export async function getArticleDetail (id) {
  return /^[0-9]+$/.test(id) ? axios.get(`/article/${id}`) : null
}

export async function getAllTags () {
  return axios.get('/tags')
}

export async function getArticleByTag (tag, index = 1) {
  if (tag && typeof index === 'number' && index > 0) {
    return axios.get(`/tag/list`, {
      params: { index, tag }
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
    url: `/save`,
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
