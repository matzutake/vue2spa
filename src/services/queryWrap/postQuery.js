import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dev.moydomonline.ru/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const postQuery = async (url, data, config = {}) => {
  try {
    const response = await apiClient.post(url, data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export default postQuery
