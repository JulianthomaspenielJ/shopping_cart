import { HOME } from '../../type'

const customerHomeReducer = (state = {}, action) => {
  switch (action.type) {
    case HOME.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case HOME.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        homeData: action.data
      })
    case HOME.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case HOME.SEARCH:
      return Object.assign({}, state, {
        loading: false,
        searchData: action.searchData
      })
    case HOME.SELECTED_COOK:
      return Object.assign({}, state, {
        loading: false,
        selectedCookData: action.selectedCookData
      })
    default:
      return state
  }
}

export default customerHomeReducer
