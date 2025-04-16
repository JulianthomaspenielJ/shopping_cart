import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  Platform,
  Linking,
  StatusBar,
  ImageBackground
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import SplashScreen from 'react-native-splash-screen'
import { home } from '../assets/styles/home'
import logo from '../assets/images/logo1.png'
import { transparent, white, black, darkCyan } from '../assets/styles/colors'
import { setData } from '../lib/storage'
import { COOK, USER, KEY, PLATFORM, EVENT_CAT, PAGE, SESSION } from '../lib/const'
import { connect } from 'react-redux'
import {
  getAppConfig,
  getAppConfigAreas
} from './config/configActions'
import { getVersion } from 'react-native-device-info'
import UpdateAlertModal from './ui-components/updateAlertModal'
import { screenViewed, eventTriggered } from '../lib/ga'
import { Dropdown } from 'react-native-material-dropdown'
import AsyncStorage from '@react-native-community/async-storage'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0
const Home = (props) => {
  const { navigation, dispatch, t, i18n, appConfig, loading } = props
  const [lang, setLang] = useState('en')
  const [showUpdateAlert, setShowUpdateAlert] = useState(false)
  const [showClose, setShowClose] = useState(true)
  const [loadAppConfig, setLoadAppConfig] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const reqConfigData = {
        deviceType: Platform.OS === 'ios' ? PLATFORM.IOS : PLATFORM.ANDROID,
        versionCode: getVersion()
      }
      dispatch(getAppConfig(reqConfigData))
      dispatch(getAppConfigAreas())
      screenViewed(PAGE.HOME)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (loadAppConfig) {
      AsyncStorage.getItem(SESSION.TOKEN).then((data) => {
        if (data !== null) {
          AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
            if (userdata === COOK) {
              navigation.push('AppDrawerCook')
            } else {
              navigation.push('AppDrawer')
            }
          })
        }
      })
    }
  }, [loadAppConfig])

  useEffect(() => {
    analytics().setAnalyticsCollectionEnabled(true)
    analytics().logEvent('Homepage', { item: 'homme Cookk' })
    crashlytics().log('Home page mounted')
    setInterval(() => {
      SplashScreen.hide()
    }, 3000)
  }, [])

  useEffect(() => {
    if (!loadAppConfig) {
      setLoadAppConfig(appConfig)
    }
    if (appConfig && appConfig.lang && appConfig.lang.en_us) {
      i18n.addResourceBundle('en', 'translation', appConfig.lang.en_us, true, true)
    }
    if (appConfig && appConfig.lang && appConfig.lang.ta_in) {
      i18n.addResourceBundle('ta', 'translation', appConfig.lang.ta_in, true, true)
    }
    if (appConfig && appConfig.lang && appConfig.lang.hindhi_in) {
      i18n.addResourceBundle('hi', 'translation', appConfig.lang.hindhi_in, true, true)
    }
    const isUpdateAvailable = appConfig && parseInt(appConfig.isUpdateAvailable)
    const isForceUpdate = appConfig && parseInt(appConfig.isForceUpdate)
    if (isUpdateAvailable) {
      setShowUpdateAlert(true)
      if (isForceUpdate) {
        setShowClose(false)
      }
    }
  }, [appConfig])

  const onUpdate = () => {
    if (Platform.OS === 'ios') {
      // update flow for ios here
    } else if (Platform.OS === 'android') {
      Linking.openURL(appConfig.storeMarketId)
    }
    setShowUpdateAlert(false)
  }

  const loginAsUser = () => {
    setLanguage(lang)
    setData(KEY.USER_TYPE, USER).then(() => {
      navigation.navigate('Info')
      eventTriggered(EVENT_CAT.SELECTION, 'Login as User')
    })
  }

  const loginAsCook = () => {
    setLanguage(lang)
    setData(KEY.USER_TYPE, COOK).then(() => {
      navigation.navigate('CookLogin')
      eventTriggered(EVENT_CAT.SELECTION, 'Login as Cook')
    })
  }

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setData(KEY.SELECTED_LANGUAGE, lang)
    setLang(lang)
  }
  const langs = [
    {
      value: 'en',
      label: 'English'
    },
    {
      value: 'ta',
      label: 'தமிழ்'
    },
    {
      value: 'hi',
      label: 'हिन्दी'
    }
  ]
  return (
    <SafeAreaView style={home.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
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
        <LinearGradient
          colors={[white, white]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={home.container}
        >
          <View style={home.logo}>
            <ImageBackground
              style={home.img}
              source={logo}
            >
              <View style={home.languageContainer}>
                <Dropdown
                  value='en'
                  onChangeText={(value) => setLanguage(value)}
                  labelHeight={2}
                  fontSize={13}
                  baseColor={darkCyan}
                  labelFontSize={0}
                  containerStyle={{
                    width: '22%'
                  }}
                  rippleInsets={{ top: 0, bottom: 0, right: 0, left: 0 }}
                  inputContainerStyle={{ borderBottomColor: transparent }}
                  selectedItemColor={black}
                  textColor={darkCyan}
                  placeholderTextColor={darkCyan}
                  data={langs}
                />
              </View>
            </ImageBackground>
          </View>
          <View>
            <Text style={home.whoLoveCook}>{t('info_title')}</Text>
            <Text style={home.cooksText}>{t('info_description')}</Text>
          </View>
        </LinearGradient>
        <View style={home.loginText}>
          {!loading ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                paddingHorizontal: 15
              }}
            >
              <TouchableHighlight
                onPress={() => loginAsUser()}
                underlayColor={transparent}
                style={{
                  width: '48%'
                }}
              >
                <Text style={home.loginUser}>{t('Customer')}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => loginAsCook()}
                underlayColor={transparent}
                style={{
                  width: '48%',
                  marginHorizontal: 15
                }}
              >
                <Text style={home.loginUser}>{t('cook')}</Text>
              </TouchableHighlight>
            </View>
          ) : (null)}
        </View>
        <UpdateAlertModal
          showClose={showClose}
          show={showUpdateAlert}
          onClose={() => setShowUpdateAlert(false)}
          onUpdate={() => onUpdate()}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  const { configReducer } = state
  return {
    appConfig: configReducer && configReducer.appConfig ? configReducer.appConfig : null,
    loading: configReducer && configReducer.loading ? configReducer.loading : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
