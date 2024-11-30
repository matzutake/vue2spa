export default {
  SET_REQ_DATA(state, data) {
    state.reqData = data
  },
  SET_REQ_LIST(state, data) {
    state.reqList = data
  },
  SET_PREMISES(state, data) {
    state.premises = data
  },
  SET_CURRENT_REQUEST(state, data) {
    state.currentRequest = data
  },
  UPDATE_CURRENT_REQUEST(state, { field, value }) {
    state.currentRequest[field] = value
  },
  UPDATE_REQUEST_APPLICANT(state, { field, value }) {
    state.currentRequest.applicant[field] = value
  },
  SET_APARTMENTS(state, data) {
    state.apartments = data
  }
}
