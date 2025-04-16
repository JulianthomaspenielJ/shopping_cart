import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { lightGrey } from '../../assets/styles/colors'
import { WebView } from 'react-native-webview'
import { apiUrl } from '../../apiUrl'
import { withTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-community/async-storage'
import {
  KEY,
  COOK
} from '../../lib/const'

const GettingStarted = (props) => {
  const { navigation, t } = props
  const [userType, setUserType] = useState('')
  const [lang, setLang] = useState('en')

  const backToLogin = () => {
    navigation.navigate('CustomerSupportMenus')
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
    <View style={[supportMenu.container, { backgroundColor: lightGrey, padding: 0 }]}>
      <View style={{ paddingHorizontal: 30, paddingTop: 30, paddingBottom: 10 }}>

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
          <Text style={supportMenu.customerSupportText}>{t('CustomerSupport')}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '90%',
              alignItems: 'center'
            }}
          >
            <Text style={supportMenu.titleText}>{t('getting_started')}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={[supportMenu.toAppText, { textTransform: 'capitalize' }]}>WELCOME</Text>
            <Text style={[supportMenu.toAppText, { textTransform: 'lowercase', paddingRight: 3 }]}>to</Text>
            <Text style={[supportMenu.welcomeText, { textTransform: 'uppercase' }]}>BACO</Text>
          </View>
        </View>
      </View>
      {
        lang === 'en' && userType === COOK ? <WebView source={{ uri: `${apiUrl.GETTING_STARTED}` }} /> : null
      }
      {
        lang === 'en' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.GETTING_STARTED}` }} /> : null
      }
      {
        lang === 'ta' && userType === COOK
          ? (
            <WebView source={{ uri: `${apiUrl.GETTING_STARTED_TAMIL}` }} />
          ) : null
      }
      {
        lang === 'ta' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.GETTING_STARTED_TAMIL}` }} /> : null
      }
      {
        lang === 'hi' && userType === COOK ? <WebView source={{ uri: `${apiUrl.GETTING_STARTED}` }} /> : null
      }
      {
        lang === 'hi' && userType !== COOK ? <WebView source={{ uri: `${apiUrl.GETTING_STARTED}` }} /> : null
      }
    </View>
  )
}

export default (withTranslation()(GettingStarted))
