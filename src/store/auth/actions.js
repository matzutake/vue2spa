import postQuery from '@/services/queryWrap/postQuery'

export default {
  async login({ commit }, payload) {
    try {
      const response = await postQuery('/auth/login/', payload)
      return response
    } catch (error) {
      throw error
    }
  }
}
