import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { lightGrey } from '../../assets/styles/colors'
import { withTranslation } from 'react-i18next'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight

const Legal = (props) => {
  const { navigation, t } = props
  const menu = [
    {
      id: '1',
      title: t('privacy_policy'),
      route: 'PrivacyPolicy'
    },
    {
      id: '2',
      title: t('cookies_policy'),
      route: 'CookiesPolicy'
    },
    {
      id: '3',
      title: t('terms_conditions_menu'),
      route: 'TermsAndConditions'
    },
    {
      id: '4',
      title: t('copy_rights'),
      route: 'CopyRights'
    }
  ]
  const backToLogin = () => {
    navigation.navigate('CustomerSupportMenus')
  }

  const toMenuContent = (item) => {
    if (item.route) {
      navigation.navigate(`${item.route}`)
    }
  }

  return (
    <View style={[supportMenu.container, { backgroundColor: lightGrey }]}>
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
          <Text style={supportMenu.titleText}>{t('legal')}</Text>
        </View>
        <View style={supportMenu.borderLine} />
        <View
          style={{ marginBottom: 20 }}
        >
          <ScrollView
            style={{
              height: '85%'
            }}
            showsVerticalScrollIndicator={false}
          >
            {menu.map((item, index) => {
              return (
                <View
                  key={index}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%'
                    }}
                    onPress={() => toMenuContent(item)}
                  >
                    <Text style={supportMenu.titleText}>{item.title}</Text>
                    <Icon name='ios-arrow-forward' size={24} style={{ paddingVertical: 20 }} />
                  </TouchableOpacity>
                  <View style={supportMenu.borderLine} />
                </View>)
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default (withTranslation()(Legal))
