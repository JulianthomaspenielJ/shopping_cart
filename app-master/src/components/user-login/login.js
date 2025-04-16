import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView
} from 'react-native'
import { cookLogin } from '../../assets/styles/cookLogin'
import { userLogin } from '../../assets/styles/userLogin'
import { transparent, darkYellow, white, darkCyan, lightGreyShade, vividTangelo } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import Input from '../ui-components/input'
import {
  LOGIN_TYPE,
  KEY,
  RESPONSE_MSG,
  PLATFORM,
  OTP,
  EVENT_CAT,
  PAGE,
  SOCIAL_TYPE,
  USER,
  REGEX,
  MSG,
  SESSION,
  COOK,
  GUEST
} from '../../lib/const'
import { common } from '../../assets/styles/common'
import { connect } from 'react-redux'
import { sendOtp, verifyOtp, verifySocialUser, guestUserLogin, checkGuestExist } from './loginActions'
import { getData, setData } from '../../lib/storage'
import { LOGIN, VERIFY_OTP, CHECK_SOCIAL_USER, GUEST_LOGIN } from '../../type'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import { screenViewed, eventTriggered } from '../../lib/ga'
import { MOBILE_NUMBER_LENGTH } from 'react-native-dotenv'
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import Spinner from '../ui-components/Spinner'
import OneSignal from 'react-native-onesignal'
import userLoginImg from '../../assets/images/userLogin.png'
import userLoginImg2 from '../../assets/images/userLogin2.png'
import fblogin from '../../assets/icons/fblogin.png'
import gPlusLogin from '../../assets/icons/gPlusLogin.png'
import unchecked1 from '../../assets/icons/unchecked1.png'
import checked1 from '../../assets/icons/checked1.png'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-simple-toast'
import { withTranslation } from 'react-i18next'
import { SignInWithAppleButton } from 'react-native-apple-authentication'
import appleLogin from '../../assets/icons/apple.png'
import Icon from 'react-native-vector-icons/Ionicons'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const UserLogin = (props) => {
  const {
    navigation,
    dispatch,
    sendOtpStatus,
    verifyOtpStatus,
    errorVerifyOtp,
    t,
    loading,
    otpInprogress,
    isSocialUser,
    socialUserType,
    errorVerifyMsg,
    guestLoginLoading,
    guestLoginStatus,
    existingGuestData
  } = props
  const [otp, setOtp] = useState({
    otpInput1: '',
    otpInput2: '',
    otpInput3: '',
    otpInput4: ''
  })
  let otpFocus2
  let otpFocus3
  let otpFocus4
  const [otpScreen, setOtpScreen] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [userType, setUserType] = useState('')
  const [user, setUser] = useState(null)
  const [inProcess, setInProcess] = useState(false)
  const [socialType, setSocialType] = useState('')
  const [otpErr, setOtpErr] = useState('')
  const [oneSignalId, setOneSignalId] = useState('')
  const [oneSignalToken, setOneSignalToken] = useState('')
  const [terms, setTerms] = useState(false)
  const [checkIosLogin, setCheckIosLogin] = useState(false)
  const [userIos, setUserIos] = useState(null)

  const onIds = (oneSignal) => {
    if (oneSignal && oneSignal.userId && oneSignal.pushToken) {
      setOneSignalId(oneSignal.userId)
      setOneSignalToken(oneSignal.pushToken)
    }
  }
  useEffect(() => {
    const data = {
      userType: GUEST
    }
    dispatch(checkGuestExist(data))
  }, [guestLoginStatus])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.USER_TYPE)
        .then(user => {
          if (user) {
            setUserType(user)
          }
        })
      AsyncStorage.getItem(SESSION.TOKEN).then((data) => {
        if (data !== null) {
          AsyncStorage.getItem(KEY.GUEST_USER).then((guestData) => {
            if (guestData !== GUEST) {
              AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
                if (userdata === COOK) {
                  navigation.navigate('AppDrawerCook')
                } else {
                  navigation.navigate('AppDrawer')
                }
              })
            }
          })
        }
      })
      AsyncStorage.getItem(KEY.GUEST_USER).then((data) => {
        if (user === GUEST) {
          const data = {
            userType: GUEST
          }
          dispatch(checkGuestExist(data))
        }
      })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      OneSignal.addEventListener('ids', onIds)
      screenViewed(PAGE.USER_LOGIN)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    getData(KEY.USER_TYPE)
      .then(user => {
        if (user) {
          setUserType(user)
        }
      })
    if (sendOtpStatus === RESPONSE_MSG.SUCCESS) {
      setOtpScreen(true)
      setOtpErr('')
      eventTriggered(EVENT_CAT.ACTION, 'Login triggered')
      dispatch({ type: LOGIN.LOGIN_CLEAR })
    }
  }, [sendOtpStatus])

  useEffect(() => {
    if (guestLoginStatus === RESPONSE_MSG.SUCCESS) {
      navigation.navigate('AppDrawer')
      dispatch({ type: GUEST_LOGIN.CLEAR })
    }
  }, [guestLoginStatus])

  useEffect(() => {
    if (verifyOtpStatus === RESPONSE_MSG.SUCCESS) {
      navigation.navigate('AppDrawer')
    }
    if (errorVerifyOtp === RESPONSE_MSG.ERROR) {
      if (MSG.OTPEXPIRED === errorVerifyMsg) {
        setOtpErr('OTP expired')
      }
      if (errorVerifyMsg === MSG.USERINACTIVE) {
        setOtpErr(t('server_error.login.inactive_user'))
      }
      if (errorVerifyMsg === MSG.UNABLE_CREATE_USER) {
        setOtpErr(t('server_error.otp.unable_to_create_user'))
      }
      if (errorVerifyMsg === MSG.OTPINVALID && otp) {
        setOtpErr(OTP.INVALID_OTP)
      }
    }
    dispatch({ type: VERIFY_OTP.CLEAR })
  }, [verifyOtpStatus, errorVerifyMsg, errorVerifyOtp])

  useEffect(() => {
    if (isSocialUser === CHECK_SOCIAL_USER.SUCCESS && !terms) {
      Toast.showWithGravity(t('termsconditions'), Toast.LONG, Toast.BOTTOM)
    } else {
      if (isSocialUser === CHECK_SOCIAL_USER.SUCCESS && socialUserType === USER) {
        navigation.navigate('AppDrawer')
      } else if (socialUserType === USER) {
        setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
      }
      dispatch({ type: CHECK_SOCIAL_USER.CLEAR })
    }
  }, [isSocialUser])

  const login = () => {
    setName(name.trim())
    if (mobileNumber.length === parseInt(MOBILE_NUMBER_LENGTH) &&
    REGEX.PHONE.test(mobileNumber) && REGEX.TEXTONLY.test(name) && terms) {
      const data = {
        mobileNumber: mobileNumber,
        type: LOGIN_TYPE.LOGIN,
        userType: userType
      }
      dispatch(sendOtp(data))
    }
    if (!REGEX.TEXTONLY.test(name)) {
      setErrorName(t('enter_name'))
    } else {
      setErrorName('')
    }
    if (!terms) {
      Toast.showWithGravity(t('termsconditions'), Toast.LONG, Toast.BOTTOM)
    }
    if ((!mobileNumber.length === parseInt(MOBILE_NUMBER_LENGTH) || (!REGEX.PHONE.test(mobileNumber)))) {
      setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
    } else {
      setErrorMsg('')
    }
  }

  const handleGoogleLogin = () => {
    if (!terms) {
      Toast.showWithGravity(t('termsconditions'), Toast.LONG, Toast.BOTTOM)
    } else {
      if (!inProcess) {
        setInProcess(true)
        GoogleSignin.configure()
        GoogleSignin.hasPlayServices().then(() => {
          GoogleSignin.signIn().then((userInfo) => {
            setInProcess(false)
            setSocialType(SOCIAL_TYPE.GOOGLE)
            if (userInfo && userInfo.user) {
              setUser(userInfo.user)
              const userData = {
                socialId: userInfo.user.id,
                userType: USER
              }
              dispatch(verifySocialUser(userData))
            } else {
              setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
            }
          }).catch(() => {
            setInProcess(false)
            // setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
          })
        }).catch((error) => {
          setInProcess(false)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            setErrorMsg(t('server_error.login.playServiceNotAvailable'))
          } else {
            setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
          }
        })
      }
    }
  }
  const handleFacebookLogin = () => {
    if (!terms) {
      Toast.showWithGravity(t('termsconditions'), Toast.LONG, Toast.BOTTOM)
    } else {
      if (!inProcess) {
        setInProcess(true)
        setSocialType(SOCIAL_TYPE.FACEBOOK)
        if (Platform.OS === 'android') {
          LoginManager.setLoginBehavior('web_only')
        }
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
          (userInfo) => {
            if (userInfo.isCancelled) {
              setInProcess(false)
              // setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
            } else {
              initFbUser()
            }
          }).catch(() => {
          setInProcess(false)
          setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
        })
      }
    }
  }
  const initFbUser = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=id,email,name,first_name,gender,last_name,picture.type(large)',
      null,
      (error, result) => {
        setInProcess(false)
        if (error) {
          setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
        } else {
          setUser(result)
          const userData = {
            socialId: result.id,
            userType: USER
          }
          dispatch(verifySocialUser(userData))
        }
      }
    )
    new GraphRequestManager().addRequest(infoRequest).start()
  }

  const appleSignIn = (result) => {
    if (oneSignalId && oneSignalToken) {
      if (!inProcess) {
        setSocialType(SOCIAL_TYPE.IOS)
        if (result && result.user) {
          setUserIos(result)
          const userData = {
            socialId: result.user,
            userType: USER
          }
          dispatch(verifySocialUser(userData))
        } else {
          setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
        }
      }
    } else {
      Toast.showWithGravity(t('server_error.try_again'), Toast.LONG, Toast.BOTTOM)
    }
  }
  const otpVerification = () => {
    setData(KEY.GUEST_USER, USER)
    const otpData = `${otp.otpInput1}${otp.otpInput2}${otp.otpInput3}${otp.otpInput4}`
    if (otpData) {
      const data = {
        mobileNumber: mobileNumber,
        type: LOGIN_TYPE.LOGIN,
        userType: userType,
        code: otpData,
        isSocialLogin: 'false',
        userDetails: {
          mobileNumber: mobileNumber,
          deviceType: Platform.OS === 'android' ? PLATFORM.ANDROID : PLATFORM.IOS,
          pushToken: oneSignalToken,
          playerId: oneSignalId,
          name: name,
          guestId: existingGuestData && existingGuestData.guestId ? existingGuestData.guestId : ''
        }
      }
      if (existingGuestData && existingGuestData._id) {
        data._id = existingGuestData._id
      }
      if (user && user.id) {
        data.isSocialLogin = 'true'
        data.userDetails.socialId = user.id
        data.userDetails.socialType = socialType
        data.userDetails.name = user.name
        data.userDetails.email = user.email
      }
      if (userIos && userIos.user) {
        data.isSocialLogin = 'true'
        data.userDetails.socialId = userIos.user
        data.userDetails.socialType = socialType
        data.userDetails.name = userIos && userIos.fullName && userIos.fullName.givenName
      }
      setOtpErr('')
      dispatch(verifyOtp(data))
    } else {
      setOtpErr(t('otp_error'))
    }
  }
  const handleOtpInputs = (value, name) => {
    setOtp({
      ...otp,
      [name]: value
    })
    if (name === 'otpInput1' && value.length) {
      otpFocus2.focus()
    } else if (name === 'otpInput2' && value.length) {
      otpFocus3.focus()
    } else if (name === 'otpInput3' && value.length) {
      otpFocus4.focus()
    } else if (name === 'otpInput4' && value.length) {
      otpFocus4.blur()
    }
    if ((name === 'otpInput1' && !value) ||
      (name === 'otpInput2' && !value) ||
      (name === 'otpInput3' && !value) ||
      (name === 'otpInput4' && !value)) {
      setOtpErr('')
    }
  }

  const onChangeName = (value) => {
    setName(value)
    if (!REGEX.TEXTONLY.test(value)) {
      setErrorName(t('enter_name'))
    } else {
      setErrorName('')
    }
  }

  const acceptConditions = () => {
    setTerms(!terms)
  }
  const onChangeMobile = (value) => {
    if (value !== mobileNumber) { setOtpErr('') }
    setMobileNumber(value)
    if ((!value.length === parseInt(MOBILE_NUMBER_LENGTH) || (!REGEX.PHONE.test(value)))) {
      setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
    } else {
      setErrorMsg('')
    }
  }
  const otpInputs = () => {
    const otpInputSec = (
      <>
        <TextInput
          name='otpInput1'
          style={[userLogin.otpInputText, { borderColor: darkCyan, color: darkCyan, borderRadius: 15 }]}
          keyboardType='number-pad'
          maxLength={1}
          autoFocus
          onChangeText={(e) => handleOtpInputs(e, 'otpInput1')}
        />
        <TextInput
          name='otpInput2'
          style={[userLogin.otpInputText, { borderColor: darkCyan, color: darkCyan, borderRadius: 15 }]}
          keyboardType='number-pad'
          maxLength={1}
          ref={(r) => { otpFocus2 = r }}
          onChangeText={(e) => handleOtpInputs(e, 'otpInput2')}
        />
        <TextInput
          name='otpInput3'
          style={[userLogin.otpInputText, { borderColor: darkCyan, color: darkCyan, borderRadius: 15 }]}
          keyboardType='number-pad'
          maxLength={1}
          ref={(r) => { otpFocus3 = r }}
          onChangeText={(e) => handleOtpInputs(e, 'otpInput3')}
        />
        <TextInput
          name='otpInput4'
          style={[userLogin.otpInputText, { borderColor: darkCyan, color: darkCyan, borderRadius: 15 }]}
          keyboardType='number-pad'
          maxLength={1}
          ref={(r) => { otpFocus4 = r }}
          onChangeText={(e) => handleOtpInputs(e, 'otpInput4')}
        />
      </>
    )
    return otpInputSec
  }

  const guestLogin = () => {
    setData(KEY.GUEST_USER, GUEST)
    AsyncStorage.getItem(SESSION.TOKEN).then((data) => {
      if (data !== null) {
        navigation.navigate('AppDrawer')
      } else {
        const timeStamp = Date.now()
        const randomStr = Math.random().toString().substr(2, 2)
        if (timeStamp && randomStr) {
          const guestData = `GUEST_${randomStr}_${timeStamp}`
          const data = {
            userType: GUEST,
            role: GUEST,
            userDetails: {
              guestId: guestData
            }
          }
          dispatch(guestUserLogin(data))
        }
      }
    })
  }

  const getTerms = () => {
    navigation.navigate('TermsAndConditions')
  }
  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      {
        Platform.OS === 'ios' && (
          <>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: white }}>
              <StatusBar
                translucent
                backgroundColor={white}
                barStyle='dark-content'
              />
            </View>
          </>
        )
      }
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={userLogin.body}>
            <View
              style={{
                flex: 1
              }}
            >
              {otpScreen
                ? (
                  <Image
                    source={userLoginImg2}
                    style={{
                      width: '100%',
                      resizeMode: 'contain'
                    }}
                  />
                ) : (
                  <>
                    <TouchableHighlight
                      underlayColor={transparent}
                      onPress={() => guestLogin()}
                      style={userLogin.skipTextContainer}
                    >
                      {guestLoginLoading ? <Spinner color={vividTangelo} /> : (
                        <Text
                          style={userLogin.skipText}
                        >
                          {t('skip')} <Icon style={userLogin.skipIcon} name='ios-arrow-forward' />
                        </Text>
                      )}

                    </TouchableHighlight>
                    <Image
                      source={userLoginImg}
                      style={{
                        width: '100%',
                        resizeMode: 'contain'
                      }}
                    />
                  </>
                )}
            </View>
            <View style={cookLogin.container}>
              <View style={userLogin.container}>
                <View style={cookLogin.form}>
                  {!otpScreen
                    ? (
                      <>
                        <View style={userLogin.inputTextBox}>
                          <Input
                            label={t('name')}
                            userType='cook'
                            onChangeText={(value) => onChangeName(value)}
                            value={name}
                          />
                          <Text style={common.errorMsgText}>{errorName || ''}</Text>
                        </View>
                        <View style={userLogin.inputTextBox}>
                          <Input
                            label={t('mobileno')}
                            userType='cook'
                            keyboardType='number-pad'
                            maxLength={parseInt(MOBILE_NUMBER_LENGTH) || 10}
                            onChangeText={(value) => onChangeMobile(value)}
                            value={mobileNumber}
                          />
                          {errorMsg ? <Text style={common.errorMsgText}>{errorMsg || ''}</Text> : null}
                          {otpErr ? <Text style={common.errorMsgText}>{otpErr}</Text> : null}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 0,
                            marginTop: 0,
                            marginBottom: 5
                          }}
                        >
                          <TouchableOpacity
                            onPress={acceptConditions}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 7
                            }}
                          >
                            <Image
                              source={terms ? checked1 : unchecked1} style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain'
                              }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={getTerms}
                          >
                            <Text style={[userLogin.terms, userLogin.termsText]}>
                              {t('terms_cond')}<Text style={{ color: '#0066C0' }}>{t('terms_cond1')}</Text>{t('terms_cond2')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableHighlight
                          underlayColor={transparent}
                          onPress={() => login()}
                        >
                          <LinearGradient
                            colors={[darkYellow, darkYellow]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={userLogin.login}
                          >
                            {loading ? <Spinner /> : <Text style={userLogin.loginText}>{t('send_otp')}</Text>}
                          </LinearGradient>
                        </TouchableHighlight>
                      </>
                    ) : (
                      <>
                        <View style={userLogin.otpContainer}>
                          <View style={userLogin.otpTextContainer}>
                            <Text style={[userLogin.otpText, { color: darkCyan }]}>{t('enter_otp')}</Text>
                          </View>
                          <View>
                            <View style={userLogin.otpInputContainer}>
                              {otpInputs()}
                            </View>
                            <Text style={[common.errorMsgText, userLogin.emptyOtp]}>{otpErr}</Text>
                          </View>
                          <TouchableHighlight
                            underlayColor={transparent}
                            onPress={() => otpVerification()}
                          >
                            <LinearGradient
                              colors={[darkYellow, darkYellow]}
                              start={{ x: 0, y: 1 }}
                              end={{ x: 1, y: 0 }}
                              style={[cookLogin.login, { borderRadius: 15 }]}
                            >
                              {otpInprogress ? <Spinner /> : <Text style={[cookLogin.loginText, { color: darkCyan }]}>{t('verify')}</Text>}
                            </LinearGradient>
                          </TouchableHighlight>
                        </View>
                        <View style={cookLogin.note}>
                          <Text style={cookLogin.haveAccount}>{t('dontreceiveotp')} <Text style={[userLogin.vividTangeloColorText, cookLogin.haveAccountDiff]}>{t('resendOTP')}</Text>
                          </Text>
                        </View>
                      </>)}
                  {!otpScreen ? (
                    <View style={cookLogin.splitSocial}>
                      <View style={cookLogin.borderBottom} />
                      <Text style={cookLogin.orText}>or</Text>
                      <View style={cookLogin.borderBottom} />
                    </View>) : null}
                  {!otpScreen ? (
                    <View style={cookLogin.socialNetworks}>
                      <View style={cookLogin.icons}>
                        <TouchableOpacity
                          onPress={() => handleFacebookLogin()}
                          style={userLogin.socialLoginFacebook}
                        >
                          <View
                            style={userLogin.inRow}
                          >
                            <Image style={cookLogin.socialLogin} source={fblogin} />
                            {Platform.OS === 'android' ? <Text style={[userLogin.socialText, { marginRight: 20 }]}>{t('facebook')}</Text> : (null)}
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={cookLogin.icons}>
                        <TouchableOpacity
                          onPress={() => handleGoogleLogin()}
                          style={[userLogin.socialLoginFacebook, userLogin.socialLoginGoogle]}
                        >
                          <View
                            style={userLogin.inRow}
                          >
                            <Image style={cookLogin.socialLogin1} source={gPlusLogin} />
                            {Platform.OS === 'android' ? <Text style={[userLogin.socialText, { marginRight: 20 }]}>{t('google')}</Text> : (null)}
                          </View>
                        </TouchableOpacity>
                      </View>
                      {Platform.OS === 'ios' ? (
                        <View style={cookLogin.icons}>
                          <TouchableOpacity
                            style={[userLogin.socialLoginFacebook, userLogin.socialLoginGoogle, { backgroundColor: lightGreyShade }]}
                            onPress={() => setCheckIosLogin(true)}
                          >
                            {checkIosLogin ? (
                              terms ? (
                                <>
                                  <Image style={cookLogin.socialLogin1} source={appleLogin} />
                                  {
                                    SignInWithAppleButton({
                                      callBack: appleSignIn,
                                      buttonText: 'iOS',
                                      buttonStyle: {
                                        opacity: 1,
                                        position: 'absolute'
                                      },
                                      textStyle: {
                                        height: 37,
                                        width: 37,
                                        color: transparent
                                      }
                                    })
                                  }
                                </>
                              ) : (
                                <>
                                  {Toast.showWithGravity(t('termsconditions'), Toast.LONG, Toast.BOTTOM)}
                                  <Image style={cookLogin.socialLogin1} source={appleLogin} />
                                </>
                              )
                            ) : (
                              <Image style={cookLogin.socialLogin1} source={appleLogin} />
                            )}
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>) : null}
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>

  )
}
const mapStateToProps = (state) => {
  const { loginReducer } = state
  return {
    loading: !!(loginReducer && loginReducer.loading),
    otpInprogress: !!(loginReducer && loginReducer.otpInprogress),
    sendOtpStatus: loginReducer && loginReducer.sendOtpStatus ? loginReducer.sendOtpStatus : '',
    verifyOtpStatus: loginReducer && loginReducer.verifyOtpStatus ? loginReducer.verifyOtpStatus : '',
    errorVerifyOtp: loginReducer && loginReducer.errorVerifyOtp ? loginReducer.errorVerifyOtp : '',
    errorVerifyMsg: loginReducer && loginReducer.errorVerifyMsg ? loginReducer.errorVerifyMsg : '',
    isSocialUser: loginReducer && loginReducer.isSocialUser ? loginReducer.isSocialUser : '',
    socialUserType: loginReducer && loginReducer.socialUserType ? loginReducer.socialUserType : '',
    guestLoginLoading: loginReducer && loginReducer.guestLoginLoading ? loginReducer.guestLoginLoading : false,
    guestLoginStatus: loginReducer && loginReducer.guestLoginStatus ? loginReducer.guestLoginStatus : '',
    existingGuestData: loginReducer && loginReducer.existingGuestData ? loginReducer.existingGuestData : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserLogin))
