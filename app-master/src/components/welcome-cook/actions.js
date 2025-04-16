import API from '../../lib/axios-config'
import {
  WELCOMECOOK,
  COOKACCEPT,
  COOKREJECTORDER,
  ONLINE,
  MANUALNOTIFICATION,
  COOKREJECTRESCHEDULE,
  COOKACCEPTRESCHEDULE,
  COOKSTARTORDER,
  COVID_ALERT
} from '../../type'
import { apiUrl } from '../../apiUrl'
import { RESPONSE_MSG } from '../../lib/const'

export const wlcomecookList = () => {
  return dispatch => {
    dispatch({ type: WELCOMECOOK.REQUEST })
    return API.post(apiUrl.NOTIFICATION, { type: 'TODAY' })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: WELCOMECOOK.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: WELCOMECOOK.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: WELCOMECOOK.FAILURE,
          error: error
        })
      })
  }
}
export const cookacceptorder = (bookingId) => {
  return dispatch => {
    dispatch({ type: COOKACCEPT.REQUEST })
    return API.put(`${apiUrl.COOKACCEPTORDER}/${bookingId}`, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COOKACCEPT.FAILURE,
            status: res.data.status,
            message: res.data.message,
            data: res.data
          })
        } else {
          dispatch({
            type: COOKACCEPT.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COOKACCEPT.FAILURE,
          error: error
        })
      })
  }
}
export const cookrejectorder = (bookingId) => {
  return dispatch => {
    dispatch({ type: COOKREJECTORDER.REQUEST })
    return API.put(`${apiUrl.COOKREJECTORDER}/${bookingId}`, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COOKREJECTORDER.FAILURE,
            status: res.data.status,
            message: res.data.message,
            data: res.data
          })
        } else {
          dispatch({
            type: COOKREJECTORDER.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COOKREJECTORDER.FAILURE,
          error: error
        })
      })
  }
}
export const changeAvailableStatus = (data) => {
  return dispatch => {
    dispatch({ type: ONLINE.REQUEST })
    return API.put(apiUrl.PROFILE, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: ONLINE.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: ONLINE.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: ONLINE.FAILURE,
          error: error
        })
      })
  }
}
export const getManulalNotificationsList = (userType) => {
  return dispatch => {
    dispatch({ type: MANUALNOTIFICATION.REQUEST })
    const url = `${apiUrl.MANULANOTIFICATION}?&usertype=${userType}`
    return API.post(url, { })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: MANUALNOTIFICATION.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: MANUALNOTIFICATION.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: MANUALNOTIFICATION.FAILURE,
          error: error
        })
      })
  }
}
export const cookrescheduleacceptorder = (bookingId) => {
  return dispatch => {
    dispatch({ type: COOKACCEPTRESCHEDULE.REQUEST })
    return API.put(`${apiUrl.COOKRESCHEDULEACCEPTORDER}/${bookingId}`, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COOKACCEPTRESCHEDULE.FAILURE,
            status: res.data.status,
            message: res.data.message,
            data: res.data
          })
        } else {
          dispatch({
            type: COOKACCEPTRESCHEDULE.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COOKACCEPTRESCHEDULE.FAILURE,
          error: error
        })
      })
  }
}
export const cookreschedulerejecttorder = (bookingId) => {
  return dispatch => {
    dispatch({ type: COOKREJECTRESCHEDULE.REQUEST })
    return API.put(`${apiUrl.COOKRESCHEDULEREJECTORDER}/${bookingId}`, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COOKREJECTRESCHEDULE.FAILURE,
            status: res.data.status,
            message: res.data.message,
            data: res.data
          })
        } else {
          dispatch({
            type: COOKREJECTRESCHEDULE.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COOKREJECTRESCHEDULE.FAILURE,
          error: error
        })
      })
  }
}
export const cookStartorder = (bookingId) => {
  return dispatch => {
    dispatch({ type: COOKSTARTORDER.REQUEST })
    return API.put(`${apiUrl.COOKSTARTORDER}/${bookingId}`, {})
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COOKSTARTORDER.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: COOKSTARTORDER.SUCCESS,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COOKSTARTORDER.FAILURE,
          error: error
        })
      })
  }
}
export const covidAlert = (data) => {
  return dispatch => {
    dispatch({ type: COVID_ALERT.REQUEST })
    return API.post(apiUrl.COVID_STATUS, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COVID_ALERT.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: COVID_ALERT.SUCCESS,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COVID_ALERT.FAILURE,
          error: error
        })
      })
  }
}
