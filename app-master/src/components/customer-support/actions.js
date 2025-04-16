import API from '../../lib/axios-config'
import {
  CONTACTUS,
  RESCHEDULE,
  RESCHEDULEORDER
} from '../../type'
import { apiUrl } from '../../apiUrl'
import { RESPONSE_MSG } from '../../lib/const'

export const feedback = (data) => {
  return dispatch => {
    dispatch({ type: CONTACTUS.REQUEST })
    return API.post(apiUrl.FEEDBACK, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: CONTACTUS.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: CONTACTUS.SUCCESS,
            status: res.data.status,
            message: res.data.message
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: CONTACTUS.FAILURE,
          error: error
        })
      })
  }
}

export const rescheduleAction = (data) => {
  return dispatch => {
    dispatch({ type: RESCHEDULE.REQUEST })    
    return API.post(apiUrl.RESCHEDULE, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: RESCHEDULE.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: RESCHEDULE.SUCCESS,
            status: res.data.status,
            message: res.data.message,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: RESCHEDULE.FAILURE,
          error: error
        })
      })
  }
}

export const rescheduleOrderAction = (bookingId, data) => {
  return dispatch => {
    dispatch({ type: RESCHEDULEORDER.REQUEST })
    return API.put(`${apiUrl.RESCHEDULEORDER}/${bookingId}`, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: RESCHEDULEORDER.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: RESCHEDULEORDER.SUCCESS,
            status: res.data.status,
            message: res.data.message
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: RESCHEDULEORDER.FAILURE,
          error: error
        })
      })
  }
}
