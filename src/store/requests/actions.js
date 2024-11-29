import getQuery from '@/services/queryWrap/getQuery'
import store from '@/store'

export default {
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
  },

  async getPremises({ commit }) {
    try {
      const response = await getQuery(
        '/geo/v2.0/user-premises/',
        {},
        {
          Authorization: `Token ${store.getters.key}`
        }
      )

      commit('SET_PREMISES', response.results)

      return response
    } catch (error) {
      throw error
    }
  },

  async getCurrentReq({ commit }, id) {
    try {
      const response = await getQuery(
        `/appeals/v1.0/appeals/${id}/`,
        {},
        {
          Authorization: `Token ${store.getters.key}`
        }
      )

      commit('SET_CURRENT_REQUEST', response)

      return response
    } catch (error) {
      throw error
    }
  }
}
