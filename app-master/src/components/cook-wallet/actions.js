import API from '../../lib/axios-config'
import { TRANSCATION_LIST, UPDATEWALLET, WITHDRAW, WITHDRAWLIST } from '../../type'
import { apiUrl } from '../../apiUrl'
import { RESPONSE_MSG } from '../../lib/const'

export const transcationList = () => {
  return dispatch => {
    dispatch({ type: TRANSCATION_LIST.REQUEST })
    const url = `${apiUrl.TRANSCATION_LIST}`
    return API.post(url, { })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: TRANSCATION_LIST.FAILURE,
            error: res.data.status
          })
        } else {
          dispatch({
            type: TRANSCATION_LIST.SUCCESS,
            data: res.data.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: TRANSCATION_LIST.FAILURE,
          error: error
        })
      })
  }
}

export const updateUserWallet = (walletAmount, razorpayPaymentId) => {
  return dispatch => {
    dispatch({ type: UPDATEWALLET.REQUEST })
    return API.post(apiUrl.UPDATEWALLET, { walletAmount: walletAmount, razorpayPaymentId: razorpayPaymentId })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: UPDATEWALLET.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: UPDATEWALLET.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATEWALLET.FAILURE,
          error: error
        })
      })
  }
}
export const withdraw = (withdrawAmount) => {
  return dispatch => {
    dispatch({ type: WITHDRAW.REQUEST })
    return API.post(apiUrl.WITHDRAW, { withdrawAmount: withdrawAmount })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: WITHDRAW.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: WITHDRAW.SUCCESS,
            data: res.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: WITHDRAW.FAILURE,
          error: error
        })
      })
  }
}
export const withdrawList = (params = null) => {
  return dispatch => {
    dispatch({ type: WITHDRAWLIST.REQUEST })
    return API.post(apiUrl.WITHDRAWLIST, { })
      .then((res) => {
        if (res.data.status === RESPONSE_MSG.ERROR) {
          dispatch({
            type: WITHDRAWLIST.FAILURE,
            status: res.data.status,
            message: res.data.message
          })
        } else {
          dispatch({
            type: WITHDRAWLIST.SUCCESS,
            data: res.data.data,
            status: res.data.status
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: WITHDRAWLIST.FAILURE,
          error: error
        })
      })
  }
}
