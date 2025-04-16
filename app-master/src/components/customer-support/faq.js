import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { lightGrey } from '../../assets/styles/colors'
import { WebView } from 'react-native-webview'
import { apiUrl } from '../../apiUrl'
import {
  KEY,
  COOK
} from '../../lib/const'
import AsyncStorage from '@react-native-community/async-storage'
import { withTranslation } from 'react-i18next'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight

const Faq = (props) => {
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
    navigation.navigate('CustomerSupportMenus')
  }

  return (
    <View style={[supportMenu.container, { backgroundColor: lightGrey, padding: 0 }]}>
      {Platform.OS === 'ios' && (
        <>
          <View style={{ height: STATUS_BAR_HEIGHT }}>
            <StatusBar
              translucent
              backgroundColor='white'
              barStyle='dark-content'
            />
          </View>
        </>
      )}
      <View style={{ padding: 30 }}>
        <TouchableOpacity
          onPress={backToLogin}
        >
          <Text style={{ fontSize: 18, paddingTop: 10 }}><Icon name='ios-arrow-back' size={20} style={supportMenu.arrowBack} /> {t('back')}</Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <Text style={supportMenu.customerSupportText}>{t('faq')}</Text>
        </View>
      </View>
      {
        lang === 'en' && userType === COOK ? <WebView source={{ uri: `${apiUrl.FAQ_COOK}` }} /> : null
      }
      {
        lang === 'en' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.FAQ_CUSTOMER}` }} /> : null
      }
      {
        lang === 'ta' && userType === COOK ? <WebView source={{ uri: `${apiUrl.FAQ_TAMIL_COOK}` }} /> : null
      }
      {
        lang === 'ta' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.FAQ_TAMIL_CUSTOMER}` }} /> : null
      }
      {
        lang === 'hi' && userType === COOK ? <WebView source={{ uri: `${apiUrl.FAQ_COOK}` }} /> : null
      }
      {
        lang === 'hi' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.FAQ_CUSTOMER}` }} /> : null
      }
    </View>
  )
}

export default (withTranslation()(Faq))
