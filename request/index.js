import axios from './axios'

export async function getHomeArticle () {
  const result = await axios.get('/article/index')
  return result
}