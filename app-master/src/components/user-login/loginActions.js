import API from '../../lib/axios-config'
import {
  LOGIN,
  VERIFY_OTP,
  NEW_USER_CHECK,
  CHECK_SOCIAL_USER,
  GUEST_LOGIN,
  CHECK_GUEST_EXIST
} from '../../type'
import { apiUrl } from '../../apiUrl'
import { setData } from '../../lib/storage'
import { SESSION, RESPONSE_MSG, USERTYPE } from '../../lib/const'
import AsyncStorage from '@react-native-community/async-storage'

export const sendOtp = (loginData) => {
  return dispatch => {
    dispatch({ type: LOGIN.LOGIN_REQUEST })
    API.post(apiUrl.LOGIN, loginData)
      .then((res) => {
        const { data } = res
        if (data.status === RESPONSE_MSG.SUCCESS) {
          dispatch({
            type: LOGIN.LOGIN_SUCCESS,
            status: data.status
          })
        } else {
          dispatch({
            type: LOGIN.LOGIN_FAILURE,
            status: data.status,
            message: data.message
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGIN.LOGIN_FAILURE,
          error: error
        })
      })
  }
}

export const verifyOtp = (otpData) => {
  return dispatch => {
    dispatch({ type: VERIFY_OTP.REQUEST })
    API.post(apiUrl.OTP_VERIFICATION, otpData)
      .then((res) => {
        const { data } = res
        if (data.status === RESPONSE_MSG.SUCCESS) {
          if (data && data.data && data.data.token) {
            setData(SESSION.TOKEN, data.data.token)
            setData(USERTYPE, otpData.userType)
            dispatch({
              type: VERIFY_OTP.SUCCESS,
              status: data.status,
              authToken: data.data.token
            })
          } else {
            dispatch({
              type: VERIFY_OTP.FAILURE,
              status: data.status,
              message: data.message
            })
          }
        } else {
          dispatch({
            type: VERIFY_OTP.FAILURE,
            status: data.status,
            message: data.message
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: VERIFY_OTP.FAILURE,
          error: error
        })
      })
  }
}

export const verifyNewUser = (userData) => {
  return dispatch => {
    dispatch({ type: NEW_USER_CHECK.REQUEST })
    API.post(apiUrl.IS_NEW_USER, userData)
      .then(res => {
        const { data } = res
        if (data.status === RESPONSE_MSG.SUCCESS) {
          dispatch({ type: NEW_USER_CHECK.SUCCESS })
        } else {
          dispatch({
            type: NEW_USER_CHECK.FAILURE,
            status: data.status
          })
        }
      })
      .catch(error => {
        dispatch({ type: NEW_USER_CHECK.FAILURE, error })
      })
  }
}

export const verifySocialUser = (userData) => {
  return dispatch => {
    dispatch({ type: CHECK_SOCIAL_USER.REQUEST })
    API.post(apiUrl.CHECK_SOCIAL_USER, userData)
      .then(res => {
        const { data } = res
        if (data.status === RESPONSE_MSG.SUCCESS) {
          if (data && data.data && data.data.token) {
            setData(SESSION.TOKEN, data.data.token)
            dispatch({
              type: CHECK_SOCIAL_USER.SUCCESS,
              status: data.status,
              socialUserType: userData.userType,
              authToken: data.data.token
            })
          } else {
            dispatch({
              type: CHECK_SOCIAL_USER.FAILURE,
              status: data.status,
              socialUserType: userData.userType
            })
          }
        } else {
          dispatch({
            type: CHECK_SOCIAL_USER.FAILURE,
            status: data.status,
            socialUserType: userData.userType
          })
        }
      })
      .catch(error => {
        dispatch({ type: CHECK_SOCIAL_USER.FAILURE, error })
      })
  }
}

export const guestUserLogin = (guestData) => {
  return dispatch => {
    dispatch({ type: GUEST_LOGIN.REQUEST })
    API.post(apiUrl.SKIP_LOGIN, guestData)
      .then(res => {
        const { data } = res
        if (data.status === RESPONSE_MSG.SUCCESS) {
          if (data && data.data && data.data.token) {
            AsyncStorage.setItem(SESSION.TOKEN, data.data.token)
            dispatch({
              type: GUEST_LOGIN.SUCCESS,
              status: data.status
            })
          } else {
            dispatch({
              type: GUEST_LOGIN.FAILURE,
              status: data.status
            })
          }
        } else {
          dispatch({
            type: GUEST_LOGIN.FAILURE,
            status: data.status
          })
        }
      })
      .catch(error => {
        dispatch({ type: GUEST_LOGIN.FAILURE, error })
      })
  }
}

export const checkGuestExist = (verifyData) => {
  return dispatch => {
    dispatch({ type: CHECK_GUEST_EXIST.REQUEST })
    API.post(apiUrl.CHECK_GUEST_EXIST, verifyData)
      .then(res => {
        const { data } = res
        if (data.status === RESPONSE_MSG.SUCCESS) {
          dispatch({
            type: CHECK_GUEST_EXIST.SUCCESS,
            status: data.status,
            existingGuestData: data.data
          })
        } else {
          dispatch({
            type: CHECK_GUEST_EXIST.FAILURE,
            status: data.status
          })
        }
      })
      .catch(error => {
        dispatch({ type: CHECK_GUEST_EXIST.FAILURE, error })
      })
  }
}
