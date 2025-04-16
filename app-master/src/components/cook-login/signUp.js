import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import userSignUpImage from '../../assets/images/signup-cook.png'
import cookMask from '../../assets/images/cook-mask.png'
import { cookLogin } from '../../assets/styles/cookLogin'
import { cookSignUp } from '../../assets/styles/cookSignUp'
import { userLogin } from '../../assets/styles/userLogin'
import Input from '../ui-components/input'
import cookSignUpTitle from '../../assets/icons/cook-signup.png'
import { gold, corn, transparent, darkCyan, dangerText } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import { PLATFORM, SOCIAL_TYPE, COOK, LOGIN_TYPE, GENDER, REGEX } from '../../lib/const'
import { connect } from 'react-redux'
import { sendOtp, verifyNewUser } from '../../components/user-login/loginActions'
import Spinner from '../ui-components/Spinner'
import { MOBILE_NUMBER_LENGTH, PINCODE_LENGTH } from 'react-native-dotenv'
import DateSelector from '../ui-components/dateSelector'
import RadioGroup from '../ui-components/radioGroup'
import OneSignal from 'react-native-onesignal'
import { Dropdown } from 'react-native-material-dropdown'
import unchecked1 from '../../assets/icons/unchecked1.png'
import checked1 from '../../assets/icons/checked1.png'
import Toast from 'react-native-simple-toast'
import { getMapCurrentAddress } from '../location/actions'
import { NEW_USER_CHECK } from '../../type'
import { getAppConfig, getAppConfigAreas } from '../config/configActions'
import { getVersion } from 'react-native-device-info'
import { withTranslation } from 'react-i18next'
import Autocomplete from 'react-native-autocomplete-input'

const CookSignUp = (props) => {
  const {
    navigation,
    route,
    dispatch,
    loading,
    isNewUser,
    t,
    appConfigArea
  } = props
  const phone = route && route.params && route.params.phone
  const userGmail = route && route.params && route.params.userGmail
  const options = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
  ]
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [dobErr, setDobErr] = useState(false)
  const [genderErr, setGenderErr] = useState(false)
  const [mobileErr, setMobileErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [addressErr, setAddressErr] = useState(false)
  const [pincodeErr, setPincodeErr] = useState(false)
  const [stateErr, setStateErr] = useState(false)
  const [cityErr, setCityErr] = useState(false)
  const [areaErr, setAreaErr] = useState(false)
  const [genderSelected, setGenderSelected] = useState('')
  const [oneSignalId, setOneSignalId] = useState('')
  const [oneSignalToken, setOneSignalToken] = useState('')
  const [terms, setTerms] = useState(false)
  const [isValidMobileNo, setIsValidMobileNo] = useState(true)
  const [citiesList, setCitiesList] = useState([])
  const [stateList, setStateList] = useState([])
  const [areaList, setAreaList] = useState([])
  const [showPandemicAlert, setShowPandemicAlert] = useState(false)
  const [covid, setCovid] = useState(false)

  let valid = false
  const redirectLogin = () => {
    navigation.navigate('CookLogin')
  }
  const onIds = (oneSignal) => {
    setOneSignalId(oneSignal.userId)
    setOneSignalToken(oneSignal.pushToken)
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const reqConfigData = {
        deviceType: Platform.OS === 'ios' ? PLATFORM.IOS : PLATFORM.ANDROID,
        versionCode: getVersion()
      }
      dispatch(getAppConfig(reqConfigData))
      dispatch(getAppConfigAreas())
    })
    setShowPandemicAlert(true)
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (appConfigArea && appConfigArea.cities) {
      setCitiesList(appConfigArea.cities)
    }
    if (appConfigArea && appConfigArea.state) {
      setStateList(appConfigArea.state)
    }
    if (appConfigArea && appConfigArea.area) {
      setAreaList(appConfigArea.area)
    }
  }, [appConfigArea])

  useEffect(() => {
    OneSignal.addEventListener('ids', onIds)
    if (phone) {
      setMobileNumber(phone)
    }
    if (userGmail) {
      if (userGmail.name) {
        setName(userGmail.name)
      }
      if (userGmail.email) {
        setEmail(userGmail.email)
      }
    }
  }, [])

  const validate = () => {
    valid = true
    setName(name.trim())
    setMobileNumber(mobileNumber.trim())
    setEmail(email.trim())
    setAddress(address.trim())
    setPincode(pincode.trim())
    setNameErr(false)
    setDobErr(false)
    setGenderErr(false)
    setMobileErr(false)
    setEmailErr(false)
    setAddressErr(false)
    setPincodeErr(false)
    setStateErr(false)
    setCityErr(false)
    setAreaErr(false)
    if (!name) {
      setNameErr(true)
    }
    if (!REGEX.DOB.test(dob)) {
      setDobErr(true)
      valid = false
    }
    if (gender) {
      setGenderErr(false)
    } else {
      setGenderErr(true)
    }
    if (!REGEX.PHONE.test(mobileNumber)) {
      setMobileErr(true)
      valid = false
    }
    if (!isValidMobileNo) {
      setMobileErr(true)
      Toast.showWithGravity('Mobile Number already exists', Toast.LONG, Toast.BOTTOM)
      valid = false
    }
    if (!REGEX.EMAIL.test(email)) {
      setEmailErr(true)
      valid = false
    }
    if (!address) {
      setAddressErr(true)
    }
    if (!REGEX.PINCODE.test(pincode)) {
      setPincodeErr(true)
      valid = false
    }
    if (!name.trim() || !dob.trim() || !gender.trim() ||
      !mobileNumber.trim() || !email.trim() || !address.trim() || !pincode.trim()) {
      valid = false
    }
    if (!state) {
      setStateErr(true)
      valid = false
    }
    if (!city) {
      setCityErr(true)
      valid = false
    }
    if (!area) {
      setAreaErr(true)
      valid = false
    }
    if (!terms) {
      Toast.showWithGravity(t('termsconditions'), Toast.LONG, Toast.BOTTOM)
      valid = false
    }
    return valid
  }

  const acceptConditions = () => {
    setTerms(!terms)
  }

  useEffect(() => {
    if (mobileNumber.length === parseInt(MOBILE_NUMBER_LENGTH) && REGEX.PHONE.test(mobileNumber)) {
      const data = {
        mobileNumber,
        userType: COOK
      }
      dispatch(verifyNewUser(data))
    }
  }, [mobileNumber])

  useEffect(() => {
    if (isNewUser === NEW_USER_CHECK.SUCCESS) {
      setIsValidMobileNo(true)
      setMobileErr(false)
    } else if (isNewUser === NEW_USER_CHECK.FAILURE) {
      setIsValidMobileNo(false)
      setMobileErr(true)
      Toast.showWithGravity('Mobile Number already exists', Toast.LONG, Toast.BOTTOM)
      dispatch({ type: NEW_USER_CHECK.CLEAR })
    }
  }, [isNewUser])

  const getTerms = () => {
    navigation.navigate('TermsAndConditions')
  }
  const handleSignUp = () => {
    if (validate()) {
      const signupData = {
        name,
        dob,
        gender,
        mobileNumber,
        email,
        address,
        pincode,
        state,
        city,
        area,
        covid,
        deviceType: Platform.OS === 'android' ? PLATFORM.ANDROID : PLATFORM.IOS,
        pushToken: oneSignalToken || '',
        playerId: oneSignalId
      }
      if (userGmail && userGmail.id) {
        signupData.socialType = SOCIAL_TYPE.GOOGLE
        signupData.socialId = userGmail.id
      }
      const data = {
        mobileNumber: mobileNumber,
        type: LOGIN_TYPE.SIGN_UP,
        userType: COOK
      }
      const param = city + ',' + area + ',' + address
      dispatch(getMapCurrentAddress(param))
      dispatch(sendOtp(data))
      navigation.navigate('CookLogin', { signupData })
    }
  }

  const onGenderChange = (gender) => {
    setGenderErr('')
    setGenderSelected(gender)
    if (gender === 0) {
      setGender(GENDER.MALE)
    } else {
      setGender(GENDER.FEMALE)
    }
  }

  const onChangeDropdown = (val, name) => {
    if (name === 'state') {
      setCity('')
      setArea('')
      setState(val)
    } else if (name === 'city') {
      setArea('')
      setCity(val)
    }
  }

  const findArea = (area, areaDataList) => {
    if (area === '') {
      return []
    }
    const regex = new RegExp(`${area.trim()}`, 'i')
    return areaDataList.filter(o => o.label.search(regex) >= 0)
  }

  const findDataList = (type, list) => {
    let cityDataCollection = []
    if (list && list.length) {
      list.forEach((element, index, array) => {
        if (element) {
          cityDataCollection = element && element[`${type}`] ? element[`${type}`] : []
        }
      })
    }
    return cityDataCollection
  }

  const onSelectArea = (item) => {
    setArea(item.label)
    setPincode((item.pincode).toString())
  }

  const onPandemicSubmit = (type) => {
    setCovid(type)
    setShowPandemicAlert(false)
  }

  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()
  const citiesDataList = findDataList(state, citiesList)
  const areaDataList = findDataList(city, areaList)
  const areasListData = findArea(area, areaDataList)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={cookLogin.body}>
          <ImageBackground source={cookMask} style={cookLogin.mask}>
            <View>
              <ScrollView keyboardShouldPersistTaps='always'>
                <View style={cookSignUp.titleContainer}>
                  <View style={cookSignUp.titleTextContainer}>
                    <View style={[userLogin.leftBorder, cookSignUp.beforeBorderColor]} />
                    <Text style={userLogin.bookCookText}>Book a Cook</Text>
                  </View>
                  <View style={cookSignUp.titleImageContainer}>
                    <Image style={cookSignUp.titleImage} source={userSignUpImage} />
                  </View>
                </View>
                <View style={cookLogin.container}>
                  <View style={cookSignUp.formContainer}>
                    <View style={cookSignUp.formContent}>
                      <View style={cookSignUp.signUpTitleTextContainer}>
                        <Image style={cookSignUp.signUpTitleImage} source={cookSignUpTitle} />
                        <Text style={cookSignUp.signUpTitleText}>Cook Signup</Text>
                      </View>
                      <View style={cookSignUp.formInput}>
                        <Input
                          label='Name'
                          value={name}
                          showError={nameErr}
                          onChangeText={(val) => setName(val)}
                          placeholder='Jonny'
                        />
                      </View>
                      <View style={cookSignUp.formInput}>
                        <Input
                          label='Date of Birth'
                          value={dob}
                          showError={dobErr}
                          keyboardType='number-pad'
                          onChangeText={(val) => setDob(val)}
                          placeholder='DD-MM-YYYY'
                        />
                        <DateSelector
                          style={cookSignUp.datePicker}
                          date={dob}
                          onDateChange={(date) => { setDob(date) }}
                        />
                      </View>
                      <View style={cookSignUp.formInput}>
                        <Text style={genderErr ? [cookSignUp.legendText, cookSignUp.legendErr] : cookSignUp.legendText}>Gender</Text>
                        <View style={cookSignUp.radioInputs}>
                          <RadioGroup
                            selected={genderSelected}
                            buttonOuterColor={corn}
                            buttonInnerColor={corn}
                            options={options}
                            genderErr={genderErr}
                            onPress={(value) => { onGenderChange(value) }}
                          />
                        </View>
                      </View>
                      <View style={cookSignUp.formInput}>
                        <Input
                          label='Mobile Number'
                          value={mobileNumber}
                          showError={mobileErr}
                          maxLength={parseInt(MOBILE_NUMBER_LENGTH, 10)}
                          keyboardType='number-pad'
                          onChangeText={(val) => setMobileNumber(val)}
                          placeholder='Mobile Number'
                        />
                      </View>
                      <View style={cookSignUp.formInput}>
                        <Input
                          label='Email Address'
                          value={email}
                          showError={emailErr}
                          onChangeText={(val) => setEmail(val)}
                          placeholder='username@email.com'
                        />
                      </View>
                      <View style={cookSignUp.formInput}>
                        <Input
                          label='Address'
                          value={address}
                          showError={addressErr}
                          onChangeText={(val) => setAddress(val)}
                          placeholder='Address'
                        />
                      </View>
                      <View style={cookSignUp.formInput}>
                        <Text style={[cookSignUp.dropdownText, { color: stateErr ? dangerText : darkCyan }]}>State</Text>
                        <Dropdown
                          label={!state ? 'Select State' : ''}
                          placeholderText='600001'
                          onChangeText={(value) => onChangeDropdown(value, 'state')}
                          labelHeight={13}
                          labelTextStyle={{
                            paddingLeft: 15
                          }}
                          fontSize={13}
                          labelFontSize={0}
                          containerStyle={{
                            width: '100%'
                          }}
                          inputContainerStyle={{
                            borderColor: stateErr ? dangerText : darkCyan,
                            borderWidth: 1,
                            borderBottomWidth: 1,
                            borderBottomColor: stateErr ? dangerText : darkCyan,
                            borderRadius: 15,
                            paddingHorizontal: 15,
                            paddingTop: 10,
                            height: 50
                          }}
                          dropdownOffset={{
                            top: 70, left: 0
                          }}
                          dropdownMargins={{
                            min: 50, max: 50
                          }}
                          selectedItemColor={darkCyan}
                          textColor={darkCyan}
                          placeholderTextColor={darkCyan}
                          data={stateList}
                        />
                      </View>
                      {state ? (
                        <View
                          style={{ marginTop: 25 }}
                        >
                          <Text style={[cookSignUp.dropdownText, { color: cityErr ? dangerText : darkCyan }]}>City</Text>
                          <Dropdown
                            label={!city ? 'Select City' : ''}
                            placeholderText='600001'
                            onChangeText={(value) => onChangeDropdown(value, 'city')}
                            labelHeight={13}
                            labelTextStyle={{
                              paddingLeft: 15
                            }}
                            fontSize={13}
                            labelFontSize={0}
                            containerStyle={{
                              width: '100%'
                            }}
                            inputContainerStyle={{
                              borderColor: cityErr ? dangerText : darkCyan,
                              borderWidth: 1,
                              borderBottomWidth: 1,
                              borderBottomColor: cityErr ? dangerText : darkCyan,
                              borderRadius: 15,
                              paddingHorizontal: 15,
                              paddingTop: 10,
                              height: 50
                            }}
                            dropdownOffset={{
                              top: 70, left: 0
                            }}
                            dropdownMargins={{
                              min: 50, max: 50
                            }}
                            selectedItemColor={darkCyan}
                            value={city || ''}
                            textColor={darkCyan}
                            placeholderTextColor={darkCyan}
                            data={citiesDataList || []}
                          />
                        </View>
                      ) : null}
                      {state && city ? (
                        <View style={[cookSignUp.autoCompleteMaincontainer]}>
                          <Text style={[cookSignUp.dropdownText, { color: areaErr ? dangerText : darkCyan }, { top: 0, height: 30 }]}>Area</Text>
                          <Autocomplete
                            autoCapitalize='none'
                            autoCorrect={false}
                            containerStyle={cookSignUp.autocompleteContainer}
                            data={areasListData.length === 1 && comp(area, areasListData[0].value) ? [] : areasListData}
                            defaultValue={area}
                            onChangeText={text => setArea(text)}
                            placeholder='Enter the area'
                            placeholderTextColor
                            listStyle={{ height: 200 }}
                            inputContainerStyle={{
                              height: 50,
                              borderColor: areaErr ? dangerText : darkCyan,
                              paddingHorizontal: 15,
                              borderRadius: 15,
                              marginTop: 10,
                              paddingVertical: 5
                            }}
                            renderItem={({ item }) => (
                              <TouchableOpacity onPress={() => onSelectArea(item)}>
                                <Text style={cookSignUp.itemText}>
                                  {item.label}
                                </Text>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      ) : null}
                      {
                        area ? (
                          <View
                            style={{ marginTop: 10 }}
                          >
                            <Input
                              label='Pincode'
                              value={pincode}
                              showError={pincodeErr}
                              keyboardType='number-pad'
                              maxLength={parseInt(PINCODE_LENGTH, 10)}
                              onChangeText={(val) => setPincode(val)}
                              placeholder={pincode || '600001'}
                            />
                          </View>
                        ) : null
                      }
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
                        onPress={() => handleSignUp()}
                      >
                        <LinearGradient
                          colors={[gold, corn]}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0 }}
                          style={cookLogin.login}
                        >
                          {loading ? <Spinner /> : <Text style={cookLogin.loginText}>Signup</Text>}
                        </LinearGradient>
                      </TouchableHighlight>
                      <View style={cookLogin.note}>
                        <Text style={cookLogin.haveAccount}>Already have an account?
                          <Text
                            style={[cookLogin.signUpText, cookLogin.haveAccountDiff]}
                            onPress={() => redirectLogin()}
                          >&nbsp;Login here
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  const { loginReducer, configReducer } = state
  return {
    loading: !!(loginReducer && loginReducer.loading),
    isNewUser: loginReducer && loginReducer.isNewUser ? loginReducer.isNewUser : '',
    appConfigArea: configReducer && configReducer.appConfigArea ? configReducer.appConfigArea : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CookSignUp))
