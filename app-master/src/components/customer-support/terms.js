import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { WebView } from 'react-native-webview'
import { apiUrl } from '../../apiUrl'
import { withTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-community/async-storage'
import {
  KEY,
  COOK
} from '../../lib/const'

const TermsAndConditions = (props) => {
  const { navigation, t } = props
  const [userType, setUserType] = useState('')
  const [lang, setLang] = useState('en')

  const backToLogin = () => {
    navigation.goBack()
  }

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

  return (
    <View style={supportMenu.container}>
      <TouchableOpacity
        onPress={backToLogin}
      >
        <Text style={{ fontSize: 18, paddingTop: 10 }}><Icon name='ios-arrow-back' size={20} style={supportMenu.arrowBack} /> {t('back')}</Text>
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <Text style={[supportMenu.customerSupportText, { alignSelf: 'center' }]}>{t('terms_conditions_menu')}</Text>
      </View>
      {
        lang === 'en' && userType === COOK ? <WebView source={{ uri: `${apiUrl.TERMS_CONDITIONS}` }} /> : null
      }
      {
        lang === 'en' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.TERMS_CONDITIONS}` }} /> : null
      }
      {
        lang === 'ta' && userType === COOK ? <WebView source={{ uri: `${apiUrl.TERMS_AND_CONDITIONS_TAMIL_COOK}` }} /> : null
      }
      {
        lang === 'ta' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.TERMS_AND_CONDITIONS_TAMIL_CUSTOMER}` }} /> : null
      }
      {
        lang === 'hi' && userType === COOK ? <WebView source={{ uri: `${apiUrl.TERMS_CONDITIONS}` }} /> : null
      }
      {
        lang === 'hi' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.TERMS_CONDITIONS}` }} /> : null
      }
    </View>
  )
}

export default (withTranslation()(TermsAndConditions))
