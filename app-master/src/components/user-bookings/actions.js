import API from '../../lib/axios-config'
import {
  USERBOOKING,
  USERPASTBOOKING,
  RATING,
  TODAYEARNING,
  WEEKLYEARNING,
  UPDATE_ORDER,
  GET_ORDERS,
  UPDATE_SUBORDER
} from '../../type'
import { apiUrl } from '../../apiUrl'
import { RESPONSE_MSG } from '../../lib/const'

export const currentbooking = (bookingType, usertype, page) => {
  return dispatch => {
    dispatch({ type: USERBOOKING.REQUEST })
    const url = `${apiUrl.MYBOOKING}?userType=${usertype}`
    return API.post(url, { type: bookingType, userType: usertype })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: USERBOOKING.FAILURE,
            status: res.data.status,
            message: res.data.message,
            bookingType: bookingType,
            page: page
          })
        } else {
          dispatch({
            type: USERBOOKING.SUCCESS,
            data: res.data,
            status: res.data.status,
            bookingType: bookingType,
            page: page
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: USERBOOKING.FAILURE,
          error: error,
          page: page
        })
      })
  }
}
export const pastbooking = (bookingType, usertype, page) => {
  return dispatch => {
    dispatch({ type: USERPASTBOOKING.REQUEST })
    const url = `${apiUrl.MYBOOKING}?userType=${usertype}&type=${bookingType}`
    return API.post(url, { type: bookingType, userType: usertype })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: USERPASTBOOKING.FAILURE,
            status: res.data.status,
            message: res.data.message,
            page: page
          })
        } else {
          dispatch({
            type: USERPASTBOOKING.SUCCESS,
            data: res.data,
            status: res.data.status,
            page: page
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: USERPASTBOOKING.FAILURE,
          error: error,
          page: page
        })
      })
  }
}
export const sendRatings = (ratingData) => {
  return dispatch => {
    dispatch({ type: RATING.REQUEST })
    API.post(apiUrl.RATINGS, ratingData)
      .then((res) => {
        const { data } = res
        dispatch({
          type: RATING.SUCCESS,
          status: data.status
        })
      })
      .catch((error) => {
        dispatch({
          type: RATING.FAILURE,
          error: error
        })
      })
  }
}
export const todayEarnings = (earningType) => {
  return dispatch => {
    dispatch({ type: TODAYEARNING.REQUEST })
    const url = `${apiUrl.MYEARNING}?type=${earningType}`
    return API.post(url, { type: earningType })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: TODAYEARNING.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: TODAYEARNING.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: TODAYEARNING.FAILURE,
          error: error
        })
      })
  }
}
export const weeklyEarnings = (earningType) => {
  return dispatch => {
    dispatch({ type: WEEKLYEARNING.REQUEST })
    const url = `${apiUrl.MYEARNING}?type=${earningType}`
    return API.post(url, { type: earningType })
      .then((res) => {
        const { data } = res
        if (data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: WEEKLYEARNING.FAILURE,
            status: data.status,
            message: data.message
          })
        } else {
          dispatch({
            type: WEEKLYEARNING.SUCCESS,
            data: data.data,
            status: data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: WEEKLYEARNING.FAILURE,
          error: error
        })
      })
  }
}
export const orderComplete = (dataId, updatedData) => {
  const url = `${apiUrl.ORDERS_UPDATE}/${dataId}`
  return dispatch => {
    dispatch({ type: UPDATE_ORDER.REQUEST })
    API.put(url, updatedData)
      .then((res) => {
        const { data } = res
        dispatch({
          type: UPDATE_ORDER.SUCCESS,
          status: data.status
        })
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_ORDER.FAILURE,
          error: error
        })
      })
  }
}

export const subOrderComplete = (id, updatedData) => {
  const url = `${apiUrl.SUB_ORDERS_UPDATE}/${id}`
  return dispatch => {
    dispatch({ type: UPDATE_SUBORDER.REQUEST })
    API.put(url, updatedData)
      .then((res) => {
        const { data } = res
        dispatch({
          type: UPDATE_SUBORDER.SUCCESS,
          status: data.status
        })
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_SUBORDER.FAILURE,
          error: error
        })
      })
  }
}

export const getOrders = (usertype) => {
  return dispatch => {
    dispatch({ type: GET_ORDERS.REQUEST })
    const url = `${apiUrl.MYBOOKING}?userType=${usertype}&reqType=CANCEL_RESHEDULE`
    API.post(url, { userType: usertype, reqType: 'CANCEL_RESHEDULE' })
      .then((res) => {
        const { data } = res
        dispatch({
          type: GET_ORDERS.SUCCESS,
          orderData: data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDERS.FAILURE,
          error: error
        })
      })
  }
}
