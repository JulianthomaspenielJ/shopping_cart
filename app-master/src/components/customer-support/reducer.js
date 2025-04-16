import { CONTACTUS, RESCHEDULE, RESCHEDULEORDER } from '../../type'

const customerSupportReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACTUS.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case CONTACTUS.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        feedbackStatus: action.status,
        feedbackStatusMsg: action.message
      })
    case CONTACTUS.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        feedbackStatus: action.status,
        feedbackStatusMsg: action.message,
        error: action.error
      })
    case RESCHEDULE.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case RESCHEDULE.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        rescheduleStatus: action.status,
        rescheduleStatusMsg: action.message,
        rescheduleAmt: action.data ? action.data.data : null
      })
    case RESCHEDULE.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        rescheduleAmt: null,
        rescheduleStatus: action.status,
        rescheduleStatusMsg: action.message,
        error: action.error
      })
    case RESCHEDULEORDER.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case RESCHEDULEORDER.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        rescheduleOrderStatus: action.status,
        rescheduleOrderStatusMsg: action.message
      })
    case RESCHEDULEORDER.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        rescheduleAmt: null,
        rescheduleOrderStatus: action.status,
        rescheduleOrderStatusMsg: action.message,
        error: action.error
      })
    case CONTACTUS.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        feedbackStatus: null,
        feedbackStatusMsg: null,
        rescheduleStatus: null,
        rescheduleStatusMsg: null,
        rescheduleOrderStatus: null,
        rescheduleOrderStatusMsg: null,
        rescheduleAmt: null,
        error: null
      })
    default:
      return state
  }
}

export default customerSupportReducer
