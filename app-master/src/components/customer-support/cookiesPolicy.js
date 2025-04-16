import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { lightGrey } from '../../assets/styles/colors'
import AsyncStorage from '@react-native-community/async-storage'
import {
  KEY,
  COOK
} from '../../lib/const'
import { WebView } from 'react-native-webview'
import { apiUrl } from '../../apiUrl'
import { withTranslation } from 'react-i18next'

const CookiesPolicy = (props) => {
  const { navigation, t } = props
  const [userType, setUserType] = useState('')
  const [lang, setLang] = useState('en')
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
        setUserType(userdata)
      })
      AsyncStorage.getItem(KEY.SELECTED_LANGUAGE).then((langData) => {
        if (langData) {
          setLang(langData)
        } else {
          setLang('en')
        }
      })
    })
    return unsubscribe
  }, [navigation])
  const backToLogin = () => {
    if (userType === COOK) {
      navigation.navigate('CustomerSupportMenus')
    } else {
      navigation.navigate('Legal')
    }
  }
  return (
    <View style={[supportMenu.container, { backgroundColor: lightGrey, padding: 0 }]}>
      <View style={{ padding: 30 }}>
        <TouchableOpacity
          onPress={backToLogin}
        >
          <Text style={{ fontSize: 18, paddingTop: 10 }}><Icon name='ios-arrow-back' size={20} style={supportMenu.arrowBack} /> {t('back')}</Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            marginBottom: 20
          }}
        >
          <Text style={supportMenu.customerSupportText}>{t('cookies_policy')}</Text>
        </View>
      </View>
      {
        lang === 'en' && userType === COOK ? <WebView source={{ uri: `${apiUrl.COOKIES_POLICY}` }} /> : null
      }
      {
        lang === 'en' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.COOKIES_POLICY}` }} /> : null
      }
      {
        lang === 'ta' && userType === COOK ? <WebView source={{ uri: `${apiUrl.COOKIES_POLICY_TAMIL_COOKS}` }} /> : null
      }
      {
        lang === 'ta' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.COOKIES_POLICY_TAMIL_CUSTOMER}` }} /> : null
      }
      {
        lang === 'hi' && userType === COOK ? <WebView source={{ uri: `${apiUrl.COOKIES_POLICY}` }} /> : null
      }
      {
        lang === 'hi' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.COOKIES_POLICY}` }} /> : null
      }
    </View>
  )
}

export default (withTranslation()(CookiesPolicy))
