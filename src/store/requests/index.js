import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  reqData: {},
  reqList: [],
  premises: [],
  apartments: [],
  currentRequest: {}
}

export default {
  state,
  getters,
  mutations,
  actions
}
