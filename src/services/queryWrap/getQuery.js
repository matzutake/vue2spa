import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dev.moydomonline.ru/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const getQuery = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await apiClient.get(endpoint, {
      params,
      headers
    })

    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || error.message || 'Произошла ошибка при выполнении запроса'

    console.error(`Ошибка GET-запроса к ${endpoint}:`, error.response || error)
    throw new Error(errorMessage)
  }
}

export default getQuery
