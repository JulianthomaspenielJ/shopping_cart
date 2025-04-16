import {
  USERBOOKING,
  USERPASTBOOKING,
  RATING,
  WEEKLYEARNING,
  TODAYEARNING,
  GET_ORDERS
} from '../../type'

const userMyBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case USERBOOKING.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case USERBOOKING.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userCurrentBooking: action.data ? action.data.data : null,
        page: action.page
      })
    case USERBOOKING.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        userCurrentBooking: null,
        page: action.page
      })
    case USERPASTBOOKING.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case USERPASTBOOKING.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userPastBooking: action.data ? action.data.data : null,
        page: action.page
      })
    case USERPASTBOOKING.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        userPastBooking: null,
        page: action.page
      })
    case RATING.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        myRatingstatus: action.status
      })
    case RATING.CLEAR:
      return Object.assign({}, state, {
        myRatingstatus: ''
      })
    case TODAYEARNING.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case TODAYEARNING.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        workerTodayEarningData: action.data ? action.data.jobList : null,
        adminTranscationList: action.data ? action.data.adminTranscationList : null
      })
    case TODAYEARNING.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        workerTodayEarningData: null
      })
    case WEEKLYEARNING.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case WEEKLYEARNING.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        workerWeeklyEarningData: action.data ? action.data.jobList : null,
        adminTranscationList: action.data ? action.data.adminTranscationList : null
      })
    case WEEKLYEARNING.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        workerWeeklyEarningData: null
      })
    case GET_ORDERS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case GET_ORDERS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        orderData: action.orderData
      })
    default:
      return state
  }
}

export default userMyBookingReducer
