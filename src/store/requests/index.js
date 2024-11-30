import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  reqData: {},
  reqList: [],
  premises: [],
  apartments: [],
  currentRequest: {
    premise: {
      id: null
    },
    apartment: {
      id: null
    },
    due_date: null,
    applicant: {
      last_name: '',
      first_name: '',
      patronymic_name: '',
      username: ''
    },
    status: {
      id: 1
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
