import {
  LOGIN,
  VERIFY_OTP,
  NEW_USER_CHECK,
  CHECK_SOCIAL_USER,
  GUEST_LOGIN,
  CHECK_GUEST_EXIST
} from '../../type'

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN.INIT_LOADING:
      return Object.assign({}, state, {
        loading: true,
        errorVerifyOtp: null
      })
    case LOGIN.LOGIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        sendOtpStatus: ''
      })
    case LOGIN.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        sendOtpStatus: action.status
      })
    case LOGIN.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        errorVerifyOtp: action.status,
        errorVerifyMsg: action.message
      })
    case LOGIN.LOGIN_CLEAR:
      return Object.assign({}, state, {
        sendOtpStatus: '',
        errorVerifyOtp: action.status,
        errorVerifyMsg: action.message
      })
    case VERIFY_OTP.REQUEST:
      return Object.assign({}, state, {
        otpInprogress: true
      })
    case VERIFY_OTP.SUCCESS:
      return Object.assign({}, state, {
        verifyOtpStatus: action.status,
        otpInprogress: false,
        authToken: action.authToken
      })
    case VERIFY_OTP.FAILURE:
      return Object.assign({}, state, {
        errorVerifyOtp: action.status,
        errorVerifyMsg: action.message,
        otpInprogress: false
      })
    case VERIFY_OTP.CLEAR:
      return Object.assign({}, state, {
        verifyOtpStatus: '',
        errorVerifyMsg: '',
        errorVerifyOtp: ''
      })
    case NEW_USER_CHECK.REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case GUEST_LOGIN.REQUEST:
      return Object.assign({}, state, {
        guestLoginLoading: true
      })
    case NEW_USER_CHECK.SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        isNewUser: NEW_USER_CHECK.SUCCESS
      })
    case NEW_USER_CHECK.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        isNewUser: NEW_USER_CHECK.FAILURE
      })
    case NEW_USER_CHECK.CLEAR:
      return Object.assign({}, state, {
        isNewUser: ''
      })
    case CHECK_SOCIAL_USER.SUCCESS:
      return Object.assign({}, state, {
        loading: true,
        isSocialUser: CHECK_SOCIAL_USER.SUCCESS,
        socialUserType: action.socialUserType
      })
    case CHECK_SOCIAL_USER.FAILURE:
      return Object.assign({}, state, {
        loading: false,
        isSocialUser: CHECK_SOCIAL_USER.FAILURE,
        socialUserType: action.socialUserType
      })
    case CHECK_SOCIAL_USER.CLEAR:
      return Object.assign({}, state, {
        loading: false,
        isSocialUser: '',
        socialUserType: ''
      })
    case GUEST_LOGIN.SUCCESS:
      return Object.assign({}, state, {
        guestLoginLoading: false,
        guestLoginStatus: action.status
      })
    case GUEST_LOGIN.FAILURE:
      return Object.assign({}, state, {
        guestLoginLoading: false
      })
    case GUEST_LOGIN.CLEAR:
      return Object.assign({}, state, {
        guestLoginLoading: false,
        guestLoginStatus: ''
      })
    case CHECK_GUEST_EXIST.REQUEST:
      return Object.assign({}, state, {
        checkGuestExistLoading: true
      })
    case CHECK_GUEST_EXIST.SUCCESS:
      return Object.assign({}, state, {
        checkGuestExistLoading: false,
        existingGuestData: action.existingGuestData
      })
    case CHECK_GUEST_EXIST.FAILURE:
      return Object.assign({}, state, {
        checkGuestExistLoading: false
      })
    case CHECK_GUEST_EXIST.CLEAR:
      return Object.assign({}, state, {
        checkGuestExistLoading: false,
        existingGuestData: ''
      })
    default:
      return state
  }
}

export default loginReducer
