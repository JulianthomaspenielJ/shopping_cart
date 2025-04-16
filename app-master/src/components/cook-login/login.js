import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'
import cookImage from '../../assets/images/cook-logo-text.png'
import cookMask from '../../assets/images/cook-mask.png'
import faceBook from '../../assets/images/facebook.png'
import google from '../../assets/images/googleLogin.png'
import { cookLogin } from '../../assets/styles/cookLogin'
import { userLogin } from '../../assets/styles/userLogin'
import { transparent, gold, corn, lightGreyShade, shamrock } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import Input from '../ui-components/input'
import { connect } from 'react-redux'
import { verifyNewUser, sendOtp, verifyOtp, verifySocialUser } from '../../components/user-login/loginActions'
import { getData } from '../../lib/storage'
import { LOGIN, VERIFY_OTP, NEW_USER_CHECK, CHECK_SOCIAL_USER, ADDADDRESS } from '../../type'
import { common } from '../../assets/styles/common'
import {
  LOGIN_TYPE,
  KEY,
  RESPONSE_MSG,
  PLATFORM,
  OTP,
  SOCIAL_TYPE,
  COOK,
  REGEX,
  MSG,
  SESSION
} from '../../lib/const'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { MOBILE_NUMBER_LENGTH } from 'react-native-dotenv'
import Spinner from '../ui-components/Spinner'
import OneSignal from 'react-native-onesignal'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import { withTranslation } from 'react-i18next'
import { SignInWithAppleButton } from 'react-native-apple-authentication'
import appleLogin from '../../assets/images/appleIcon.png'

const CookLogin = (props) => {
  const {
    navigation,
    route,
    dispatch,
    sendOtpStatus,
    verifyOtpStatus,
    errorVerifyOtp,
    t,
    isNewUser,
    loading,
    otpInprogress,
    isSocialUser,
    socialUserType,
    errorVerifyMsg,
    addAddressStatus,
    addAddressError,
    mapCurrentAddress
  } = props
  const signupData = route && route.params && route.params.signupData
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
  const [errorMsg, setErrorMsg] = useState('')
  const [userType, setUserType] = useState('')
  const [user, setUser] = useState(null)
  const [inProcess, setInProcess] = useState(false)
  const [socialType, setSocialType] = useState('')
  const [otpErr, setOtpErr] = useState('')
  const [oneSignalId, setOneSignalId] = useState('')
  const [oneSignalToken, setOneSignalToken] = useState('')
  const [errorMsgType, setErrorMsgType] = useState('')
  const [userIos, setUserIos] = useState(null)

  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0
  })
  useEffect(() => {
    if ((addAddressStatus === RESPONSE_MSG.SUCCESS)) {
      dispatch({ type: ADDADDRESS.CLEAR })
    }
    if ((addAddressStatus === RESPONSE_MSG.ERROR)) {
      dispatch({ type: ADDADDRESS.CLEAR })
    }
  }, [addAddressStatus, addAddressError])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.USER_TYPE)
        .then(user => {
          if (user) {
            setUserType(user)
          }
        })
      if (signupData) {
        setOtpScreen(true)
      }
      AsyncStorage.getItem(SESSION.TOKEN).then((data) => {
        if (data !== null) {
          AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
            if (userdata === COOK) {
              navigation.navigate('AppDrawerCook')
            } else {
              navigation.navigate('AppDrawer')
            }
          })
        }
      })
    })
    return unsubscribe
  }, [navigation])

  const onIds = (oneSignal) => {
    if (oneSignal.userId && oneSignal.pushToken) {
      setOneSignalId(oneSignal.userId)
      setOneSignalToken(oneSignal.pushToken)
    }
  }
  useEffect(() => {
    OneSignal.addEventListener('ids', onIds)
  }, [])
  useEffect(() => {
    if (sendOtpStatus === RESPONSE_MSG.SUCCESS) {
      setOtpScreen(true)
      setOtpErr('')
      setErrorMsgType('')
      dispatch({ type: LOGIN.LOGIN_CLEAR })
    }
  }, [sendOtpStatus])

  useEffect(() => {
    if (verifyOtpStatus === RESPONSE_MSG.SUCCESS) {
      navigation.navigate('AppDrawerCook')
      setErrorMsgType('')
    }
    if (errorVerifyOtp === RESPONSE_MSG.ERROR) {
      setErrorMsgType('')
      if (MSG.OTPEXPIRED === errorVerifyMsg) { setOtpErr('OTP expired') }
      if (errorVerifyMsg === MSG.USERINACTIVE) {
        setErrorMsgType(errorVerifyMsg)
        setOtpErr(t('server_error.login.inactive_user'))
      }
      if (errorVerifyMsg === MSG.UNABLE_CREATE_USER) {
        setOtpErr(t('server_error.otp.unable_to_create_user'))
      }
      if (errorVerifyMsg === MSG.OTPINVALID) {
        setOtpErr(OTP.INVALID_OTP)
      }
    }
    dispatch({ type: VERIFY_OTP.CLEAR })
  }, [verifyOtpStatus, errorVerifyMsg, errorVerifyOtp])

  useEffect(() => {
    if (isNewUser === NEW_USER_CHECK.SUCCESS) {
      navigation.navigate('CookSignUp', { phone: mobileNumber, userGmail: user })
    } else if (isNewUser === NEW_USER_CHECK.FAILURE) {
      const data = {
        mobileNumber: mobileNumber,
        type: LOGIN_TYPE.LOGIN,
        userType: userType
      }
      dispatch(sendOtp(data))
    }
    dispatch({ type: NEW_USER_CHECK.CLEAR })
  }, [isNewUser])

  useEffect(() => {
    if (isSocialUser === CHECK_SOCIAL_USER.SUCCESS && socialUserType === COOK) {
      navigation.navigate('AppDrawerCook')
    } else if (socialUserType === COOK) {
      setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
    }
    dispatch({ type: CHECK_SOCIAL_USER.CLEAR })
  }, [isSocialUser])

  const login = () => {
    setErrorMsg('')
    if (mobileNumber.length === parseInt(MOBILE_NUMBER_LENGTH) && REGEX.PHONE.test(mobileNumber)) {
      const data = {
        mobileNumber,
        userType: COOK
      }
      dispatch(verifyNewUser(data))
    } else {
      setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
    }
  }

  const otpVerification = () => {
    const otpData = `${otp.otpInput1}${otp.otpInput2}${otp.otpInput3}${otp.otpInput4}`
    if (otpData) {
      setOtpErr('')
      setErrorMsgType('')
      if (!signupData) {
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
            playerId: oneSignalId
          }
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
        dispatch(verifyOtp(data))
      } else {
        const data = {
          mobileNumber: signupData.mobileNumber,
          type: LOGIN_TYPE.SIGN_UP,
          userType: COOK,
          code: otpData,
          isSocialLogin: signupData.socialType ? 'true' : 'false',
          userDetails: {
            mobileNumber: signupData.mobileNumber,
            name: signupData.name,
            dob: signupData.dob,
            gender: signupData.gender,
            email: signupData.email,
            city: signupData.city,
            state: signupData.state,
            area: signupData.area,
            covid: signupData.covid,
            address: {
              completeAddress: `${signupData.address}, ${signupData.area}, ${signupData.city}`,
              pinCode: signupData.pincode,
              city: signupData.city,
              state: signupData.state,
              area: signupData.area,
              country: 'INDIA',
              type: 'HOME',
              location: { type: 'Point', coordinates: [currentPosition.lat, currentPosition.long] },
              position: {
                lat: currentPosition.lat,
                long: currentPosition.long
              }
            },
            deviceType: Platform.OS === 'ios' ? PLATFORM.IOS : PLATFORM.ANDROID,
            pushToken: signupData.pushToken,
            playerId: signupData.playerId
          }
        }
        if (signupData.socialId) {
          data.userDetails.socialId = signupData.socialId
          data.userDetails.socialType = signupData.socialType
        }
        dispatch(verifyOtp(data))
      }
    } else {
      setOtpErr(t('otp_error'))
    }
  }
  useEffect(() => {
    if (mapCurrentAddress) {
      mapCurrentAddress.length > 0 && mapCurrentAddress.map((result, index) => {
        if ((index === 0)) {
          setCurrentPosition({
            lat: result.geometry.location.lat,
            long: result.geometry.location.lng
          })
        }
      })
    }
  }, [mapCurrentAddress])

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
  }

  const handleGoogleLogin = () => {
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
              userType: COOK
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

  const handleFacebookLogin = () => {
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
            userType: COOK
          }
          dispatch(verifySocialUser(userData))
        }
      }
    )
    new GraphRequestManager().addRequest(infoRequest).start()
  }

  const appleSignIn = (result) => {
    if (!inProcess) {
      setSocialType(SOCIAL_TYPE.IOS)
      if (result && result.user) {
        setUserIos(result)
        const userData = {
          socialId: result.user,
          userType: COOK
        }
        dispatch(verifySocialUser(userData))
      } else {
        setErrorMsg(t('server_error.login.plsEnterMobileNumber'))
      }
    }
  }

  const otpInputs = () => {
    const otpInputSec = (
      <>
        <TextInput
          name='otpInput1'
          style={[userLogin.otpInputText, cookLogin.signUpText]}
          keyboardType='numeric'
          maxLength={1}
          autoFocus
          onChangeText={(e) => handleOtpInputs(e, 'otpInput1')}
        />
        <TextInput
          name='otpInput2'
          style={[userLogin.otpInputText, cookLogin.signUpText]}
          keyboardType='numeric'
          maxLength={1}
          ref={(r) => { otpFocus2 = r }}
          onChangeText={(e) => handleOtpInputs(e, 'otpInput2')}
        />
        <TextInput
          name='otpInput3'
          style={[userLogin.otpInputText, cookLogin.signUpText]}
          keyboardType='numeric'
          maxLength={1}
          ref={(r) => { otpFocus3 = r }}
          onChangeText={(e) => handleOtpInputs(e, 'otpInput3')}
        />
        <TextInput
          name='otpInput4'
          style={[userLogin.otpInputText, cookLogin.signUpText]}
          keyboardType='numeric'
          maxLength={1}
          ref={(r) => { otpFocus4 = r }}
          onChangeText={(e) => handleOtpInputs(e, 'otpInput4')}
        />
      </>
    )
    return otpInputSec
  }

  const signUp = () => {
    navigation.navigate('CookSignUp')
  }

  return (
    <SafeAreaView style={cookLogin.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={cookLogin.body}>
            <ImageBackground source={cookMask} style={cookLogin.mask}>
              <View style={cookLogin.container}>
                <View style={cookLogin.loginContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={{ fontSize: 18, color: 'black' }}><Icon name='ios-arrow-back' size={20} /> Back </Text>
                  </TouchableOpacity>
                </View>
                <View style={cookLogin.imageContainer}>
                  <Image style={cookLogin.img} source={cookImage} />
                  <Text style={cookLogin.loginTitle}>Cook Login</Text>
                </View>
                {errorMsgType === MSG.USERINACTIVE ? <Text style={[common.errorMsgText, { marginTop: 10, marginBottom: 25, textAlign: 'center' }]}>{t('inactive_user_msg')}</Text> : null}
                <View style={userLogin.container}>
                  <View style={cookLogin.form}>
                    {!otpScreen
                      ? (
                        <>
                          <Input
                            label='Mobile No'
                            keyboardType='numeric'
                            maxLength={parseInt(MOBILE_NUMBER_LENGTH) || 10}
                            onChangeText={(value) => setMobileNumber(value)}
                            value={mobileNumber}
                          />
                          {errorMsg ? <Text style={common.errorMsgText}>{errorMsg || ''}</Text> : null}
                          <TouchableHighlight
                            underlayColor={transparent}
                            onPress={() => login()}
                          >
                            <LinearGradient
                              colors={[gold, corn]}
                              start={{ x: 0, y: 1 }}
                              end={{ x: 1, y: 0 }}
                              style={cookLogin.login}
                            >
                              {loading ? <Spinner /> : <Text style={cookLogin.loginText}>{t('Login')}</Text>}
                            </LinearGradient>
                          </TouchableHighlight>
                          <View style={cookLogin.note}>
                            <Text style={cookLogin.haveAccount}>{t('donthaveacc')}
                              <Text
                                style={[cookLogin.signUpText, cookLogin.haveAccountDiff]}
                                underlayColor={transparent}
                                onPress={() => signUp()}
                              >&nbsp;{t('signup')}
                              </Text>
                            </Text>
                          </View>
                        </>
                      )
                      : (
                        <>
                          <View style={userLogin.otpContainer}>
                            <View style={userLogin.otpTextContainer}>
                              <Text style={userLogin.otpText}>{t('enter_otp')}</Text>
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
                                colors={[gold, corn]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={cookLogin.login}
                              >
                                {otpInprogress ? <Spinner /> : <Text style={cookLogin.loginText}>{t('verify')}</Text>}
                              </LinearGradient>
                            </TouchableHighlight>
                          </View>
                          <View style={cookLogin.note}>
                            <Text style={cookLogin.haveAccount}>{t('dontreceiveotp')}<Text style={[cookLogin.signUpText, cookLogin.haveAccountDiff]}>&nbsp;{t('resendOTP')}</Text>
                            </Text>
                          </View>
                        </>
                      )}
                    {!otpScreen ? (
                      <View style={cookLogin.splitSocial}>
                        <View style={cookLogin.borderBottom} />
                        <View><Text style={cookLogin.orText}>{t('or')}</Text></View>
                        <View style={cookLogin.borderBottom} />
                      </View>) : null}
                    {!otpScreen ? (
                      <View style={cookLogin.socialNetworks}>
                        <View style={cookLogin.icons}>
                          <TouchableOpacity
                            style={userLogin.socialLoginFacebook}
                            onPress={() => handleFacebookLogin()}
                          >
                            <Image style={cookLogin.socialLogin} source={faceBook} />
                          </TouchableOpacity>
                        </View>
                        <View style={cookLogin.icons}>
                          <TouchableOpacity
                            style={[userLogin.socialLoginFacebook, { backgroundColor: shamrock, borderColor: shamrock }]}
                            onPress={() => handleGoogleLogin()}
                          >
                            <Image style={[cookLogin.socialLogin1, { borderRadius: 50 }]} source={google} />
                          </TouchableOpacity>
                        </View>
                        {Platform.OS === 'ios' ? (
                          <View style={[cookLogin.icons]}>
                            <TouchableOpacity
                              style={[userLogin.socialLoginFacebook, userLogin.socialLoginGoogle, { backgroundColor: lightGreyShade, borderColor: lightGreyShade }]}
                            >
                              <Image style={[cookLogin.socialLogin1, { position: 'absolute', top: 2, left: 4 }]} source={appleLogin} />
                              {SignInWithAppleButton({
                                callBack: appleSignIn,
                                buttonText: 'iOS',
                                buttonStyle: {
                                  opacity: 1
                                },
                                textStyle: {
                                  height: 37,
                                  width: 38,
                                  color: transparent
                                }
                              })}
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>) : null}
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}
const mapStateToProps = (state) => {
  const { loginReducer, mapLocationReducer } = state
  return {
    loading: !!(loginReducer && loginReducer.loading),
    otpInprogress: !!(loginReducer && loginReducer.otpInprogress),
    sendOtpStatus: loginReducer && loginReducer.sendOtpStatus ? loginReducer.sendOtpStatus : '',
    verifyOtpStatus: loginReducer && loginReducer.verifyOtpStatus ? loginReducer.verifyOtpStatus : '',
    errorVerifyOtp: loginReducer && loginReducer.errorVerifyOtp ? loginReducer.errorVerifyOtp : '',
    errorVerifyMsg: loginReducer && loginReducer.errorVerifyMsg ? loginReducer.errorVerifyMsg : '',
    isNewUser: loginReducer && loginReducer.isNewUser ? loginReducer.isNewUser : '',
    isSocialUser: loginReducer && loginReducer.isSocialUser ? loginReducer.isSocialUser : '',
    socialUserType: loginReducer && loginReducer.socialUserType ? loginReducer.socialUserType : '',
    addAddressStatus: mapLocationReducer && mapLocationReducer.addAddressStatus ? mapLocationReducer.addAddressStatus : '',
    addAddressError: mapLocationReducer && mapLocationReducer.addAddressError ? mapLocationReducer.addAddressError : '',
    mapCurrentAddress: mapLocationReducer && mapLocationReducer.mapCurrentAddress ? mapLocationReducer.mapCurrentAddress : ''

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CookLogin))
