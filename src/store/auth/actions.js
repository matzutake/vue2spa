import postQuery from '@/services/queryWrap/postQuery'
import getQuery from '@/services/queryWrap/getQuery'
import store from '@/store'

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
