import axios from './axios'

export async function getHomeArticle () {
  const result = await axios.get('/article/index')
  return result
}

export async function getArchive (index = 0, size = 20) {
  return axios({
    url: '/article/getArchive',
    method: 'POST',
    data: {index, size}
  })
}

export async function getArticleDetail (id) {
  return /^[0-9]+$/.test(id) ? axios({
    url: `/article/data`,
    method: 'POST',
    data: {id}
  }) : null;
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