import API from '../../lib/axios-config'
import {
  BOOKING,
  SUMMARY,
  CHECKOUT,
  COOKCANCEL,
  PENDING_REVIEW,
  QUICK_BOOK,
  COUPON,
  CREATERAZORORDER,
  CONTACTUS
} from '../../type'
import { apiUrl } from '../../apiUrl'
import { RESPONSE_MSG } from '../../lib/const'

export const bookingconfigList = (params = null) => {
  return dispatch => {
    dispatch({ type: BOOKING.REQUEST })
    return API.get(apiUrl.BOOKING_CONFIG, { params })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: BOOKING.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          res.data.data.data.meals = res.data.data.data.meals.map(item => {
            item.isSelect = false
            item.isAvailable = false
            return item
          })
          dispatch({
            type: BOOKING.SUCCESS,
            data: res.data.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: BOOKING.FAILURE,
          error: error
        })
      })
  }
}

export const summary = (summarydata) => {
  return dispatch => {
    dispatch({ type: SUMMARY.REQUEST })
    return API.post(apiUrl.SUMMARY, summarydata)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: SUMMARY.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: SUMMARY.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: SUMMARY.FAILURE,
          error: error
        })
      })
  }
}
export const addonsummary = (summarydata, mealName = null) => {
  return dispatch => {
    dispatch({ type: SUMMARY.ADDONREQUEST })
    return API.post(apiUrl.SUMMARY, summarydata)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: SUMMARY.ADDONFAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: SUMMARY.ADDONSUCCESS,
            data: res.data,
            mealName: mealName
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: SUMMARY.ADDONFAILURE,
          error: error
        })
      })
  }
}
export const checkoutAPI = (checkoutdata) => {
  return dispatch => {
    dispatch({ type: CHECKOUT.REQUEST })
    return API.post(apiUrl.CHECKOUT, checkoutdata)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: CHECKOUT.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: CHECKOUT.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: CHECKOUT.FAILURE,
          error: error
        })
      })
  }
}
export const cancelorder = (bookingId, data) => {
  return dispatch => {
    dispatch({ type: COOKCANCEL.REQUEST })
    return API.put(`${apiUrl.COOKCANCELORDER}/${bookingId}`, { data })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COOKCANCEL.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: COOKCANCEL.SUCCESS,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COOKCANCEL.FAILURE,
          error: error
        })
      })
  }
}
export const pendingReview = (data) => {
  return dispatch => {
    dispatch({ type: PENDING_REVIEW.REQUEST })
    return API.post(apiUrl.PENDING_REVIEW, data)
      .then((res) => {
        const { data } = res
        dispatch({
          type: PENDING_REVIEW.SUCCESS,
          pendingReview: data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: PENDING_REVIEW.FAILURE,
          error: error
        })
      })
  }
}
export const getCombo = (params) => {
  const url = `${apiUrl.QUICK_BOOK}?status=${params.status}&cuisine=${params.cuisine}`
  return dispatch => {
    dispatch({ type: QUICK_BOOK.REQUEST })
    return API.post(url, {})
      .then((res) => {
        const { data } = res
        dispatch({
          type: QUICK_BOOK.SUCCESS,
          comboData: data.data
        })
      })
      .catch((error) => {
        dispatch({
          type: QUICK_BOOK.FAILURE,
          error: error
        })
      })
  }
}

export const couponApply = (coupon) => {
  return dispatch => {
    dispatch({ type: COUPON.REQUEST })
    return API.post(apiUrl.APPLYCOUPON, coupon)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: COUPON.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: COUPON.SUCCESS,
            status: res.data.status,
            data: res.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: COUPON.FAILURE,
          error: error
        })
      })
  }
}

export const createRazorOrder = (data, reqPage) => {
  return dispatch => {
    dispatch({ type: CREATERAZORORDER.REQUEST })
    return API.post(apiUrl.CREATERAZORORDER, data)
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: CREATERAZORORDER.FAILURE,
            status: res.data.status,
            message: res.data.message,
            page: reqPage
          })
        } else {
          dispatch({
            type: CREATERAZORORDER.SUCCESS,
            status: res.data.status,
            data: res.data,
            page: reqPage
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: CREATERAZORORDER.FAILURE,
          error: error
        })
      })
  }
}
