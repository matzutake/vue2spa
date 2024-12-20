import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dev.moydomonline.ru/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const postQuery = async (url, data, config = {}) => {
  try {
    const { headers = {}, ...restConfig } = config

    const response = await apiClient.post(url, data, {
      ...restConfig,
      headers: {
        ...apiClient.defaults.headers,
        ...headers
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export default postQuery
