import {
  WELCOMECOOK,
  COOKACCEPT,
  COOKREJECTORDER,
  ONLINE,
  MANUALNOTIFICATION,
  COOKACCEPTRESCHEDULE,
  COOKREJECTRESCHEDULE,
  COOKSTARTORDER,
  COVID_ALERT
} from '../../type'

const welcomCookReducer = (state = {}, action) => {
  switch (action.type) {
    case WELCOMECOOK.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case WELCOMECOOK.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        cookRequestData: action.data ? action.data.data : null,
        cookCurrRequestData: action.data ? action.data.data : null
      })
    case WELCOMECOOK.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        cookRequestData: null,
        cookCurrRequestData: null
      })
    case COOKACCEPT.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case COOKACCEPT.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        acceptorder: action.data ? action.data : null
      })
    case COOKACCEPT.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        accepterror: action.data
      })
    case COOKREJECTORDER.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case COOKREJECTORDER.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        rejectorder: action.data ? action.data : null
      })
    case COOKREJECTORDER.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        rejecterror: action.data
      })
    case COOKSTARTORDER.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case COOKSTARTORDER.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        startorderStatus: action.status ? action.status : null
      })
    case COOKSTARTORDER.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        startorderStatus: action.status ? action.status : null
      })
    case ONLINE.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case ONLINE.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        onlineStatus: action.data ? action.data : null
      })
    case ONLINE.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case COOKACCEPTRESCHEDULE.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case COOKACCEPTRESCHEDULE.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        rescheduleacceptorder: action.data ? action.data : null
      })
    case COOKACCEPTRESCHEDULE.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        rescheduleaccepterror: action.data
      })
    case COOKREJECTRESCHEDULE.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case COOKREJECTRESCHEDULE.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        reschedulerejectorder: action.data ? action.data : null
      })
    case COOKREJECTRESCHEDULE.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        reschedulerejecterror: action.data
      })

    case MANUALNOTIFICATION.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case MANUALNOTIFICATION.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        manulaNotificanList: action.data ? action.data.data : null
      })
    case MANUALNOTIFICATION.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    case MANUALNOTIFICATION.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        manulaNotificanList: null
      })
    case WELCOMECOOK.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        rejectorder: null,
        acceptorder: null,
        onlineStatus: null,
        accepterror: null,
        rejecterror: null,
        reschedulerejectorder: null,
        rescheduleacceptorder: null,
        rescheduleaccepterror: null,
        reschedulerejecterror: null,
        startorderStatus: null
      })
    case WELCOMECOOK.NOTIFICATIONCLEAR:
      return Object.assign({}, state, {
        cookRequestData: null,
        cookCurrRequestData: null
      })
    case COVID_ALERT.REQUEST:
      return Object.assign({}, state, {
        covidStatusLoding: true
      })
    case COVID_ALERT.SUCCESS:
      return Object.assign({}, state, {
        covidStatusLoding: false,
        covidStatus: action.status
      })
    case COVID_ALERT.FAILURE:
      return Object.assign({}, state, {
        covidStatusLoding: false,
        covidStatus: action.status
      })
    case COVID_ALERT.CLEAR:
      return Object.assign({}, state, {
        covidStatusLoding: false,
        covidStatus: ''
      })
    default:
      return state
  }
}

export default welcomCookReducer
