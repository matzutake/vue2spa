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
  },

  async getReqList({ commit }, payload) {
    try {
      const response = await getQuery('/appeals/v1.0/appeals/', payload, {
        Authorization: `Token ${store.getters.key}`
      })

      commit('SET_REQ_DATA', response)
      commit('SET_REQ_LIST', response.results)

      return response
    } catch (error) {
      throw error
    }
  }
}
