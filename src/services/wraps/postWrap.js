import axios from 'axios'

async function postQuery(path, args = {}) {
  const response = {
    status: false,
    code: 0,
    error: null,
    errorCode: null,
    data: null
  }

  const appendFormData = (formData, data, parentKey = '') => {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      Object.keys(data).forEach((key) => {
        appendFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
      })
    } else if (Array.isArray(data)) {
      if (data.length === 0) {
        formData.append(`${parentKey}[]`, null)
      } else {
        data.forEach((item, index) => {
          appendFormData(formData, item, `${parentKey}[${index}]`)
        })
      }
    } else {
      formData.append(parentKey, data)
    }
  }

  try {
    const formData = new FormData()
    appendFormData(formData, args)

    const result = await axios.post(`https://dev.moydomonline.ru/api/${path}`, formData, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })

    response.code = result.status
    response.status = result.data.status
    response.data = result.data.response

    if (result.data.error) {
      response.error = result.data.error.message || null
      response.errorCode = result.data.error.code || null
    }
  } catch (e) {
    if (!e.response) {
      response.errorCode = 0
      response.error = e.message
    } else {
      const error = e.response.data.error || { code: 0, message: 'Не указано' }
      response.code = e.response.status
      response.errorCode = error.code
      response.error = error.message
    }
  }

  return response
}

export default postQuery
