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
  },
  UPDATE_REQUEST_PREMISE(state, data) {
    state.currentRequest.premise = data[0]
  },

  UPDATE_APARTMENT(state, id) {
    state.currentRequest.apartment.id = id
  },
  SORT_BY_NUMBER(state, direction) {
    if (direction === 'desc') state.reqList.sort((a, b) => b.number - a.number)

    if (direction === 'asc') state.reqList.sort((a, b) => a.number - b.number)
  },
  SORT_BY_DATE(state, direction) {
    if (direction === 'desc')
      state.reqList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    if (direction === 'asc')
      state.reqList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  },
  SORT_BY_STATUS(state, direction) {
    if (direction === 'desc') state.reqList.sort((a, b) => b.status.id - a.status.id)

    if (direction === 'asc') state.reqList.sort((a, b) => a.status.id - b.status.id)
  }
}
