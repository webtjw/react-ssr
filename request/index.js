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