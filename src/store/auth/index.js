import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  username: '',
  password: '',
  id: null,
  key: null
}

export default {
  state,
  getters,
  mutations,
  actions
}
