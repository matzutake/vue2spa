import getQuery from '@/services/queryWrap/getQuery'
import postQuery from '@/services/queryWrap/postQuery'
import patchQuery from '@/services/queryWrap/patchQuery'
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

  async getApartments({ commit }, payload) {
    try {
      const response = await getQuery(`/geo/v1.0/apartments/`, payload, {
        Authorization: `Token ${store.getters.key}`
      })

      commit('SET_APARTMENTS', response.results)

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
      store.dispatch('getApartments', { premise_id: response.premise.id })

      return response
    } catch (error) {
      throw error
    }
  },

  async updatePremise({ commit }, payload) {
    try {
      const response = await getQuery(`/geo/v2.0/user-premises/`, payload, {
        Authorization: `Token ${store.getters.key}`
      })

      commit('UPDATE_REQUEST_PREMISE', response.results)

      return response
    } catch (error) {
      throw error
    }
  },

  async updateRequest({ commit }, payload) {
    try {
      const response = await patchQuery(`/appeals/v1.0/appeals/${payload.id}/`, payload, {
        headers: {
          Authorization: `Token ${store.getters.key}`
        }
      })

      return response
    } catch (error) {
      throw error
    }
  },

  async createRequest({ commit }, payload) {
    try {
      const response = await postQuery('/appeals/v1.0/appeals/', payload, {
        headers: {
          Authorization: `Token ${store.getters.key}`
        }
      })

      return response
    } catch (error) {
      throw error
    }
  }
}
