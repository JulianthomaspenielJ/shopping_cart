import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { lightGrey } from '../../assets/styles/colors'
import cookLogo from '../../assets/images/cook-logo-text.png'
import copyright from '../../assets/icons/copyright.png'
import { withTranslation } from 'react-i18next'

const AboutUs = (props) => {
  const { navigation, t } = props
  const backToLogin = () => {
    navigation.navigate('CustomerSupportMenus')
  }
  return (
    <View style={[supportMenu.container, { backgroundColor: lightGrey }]}>
      <TouchableOpacity
        onPress={backToLogin}
      >
        <Text style={{ fontSize: 18, paddingTop: 10 }}><Icon name='ios-arrow-back' size={20} style={supportMenu.arrowBack} /> {t('back')}</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '90%',
          alignItems: 'center'
        }}
      >
        <Text style={supportMenu.customerSupportText}>{t('AboutUs')}</Text>
      </View>
      <View style={supportMenu.borderLine} />
      <View
        style={{
          alignItems: 'center',
          marginVertical: 25
        }}
      >
        <Image source={cookLogo} style={supportMenu.logo} />
        <Text style={supportMenu.titleText}>Version 1.1</Text>
      </View>
      <View style={supportMenu.borderLine} />
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <Text style={[supportMenu.socialLink, { marginVertical: 30 }]}>Web : www.bookacookonline.com</Text>
        <Text style={[supportMenu.socialLink, { marginBottom: 60 }]}>Email : thisisbaco@gmail.com</Text>
      </View>
      <View style={supportMenu.borderLine} />
      <View style={{
        marginVertical: 30,
        flexDirection: 'row'
      }}
      >
        <Image source={copyright} style={supportMenu.copyright} />
        <Text style={supportMenu.copyrightText}>copyrights {new Date().getFullYear()} Baco Enterprise Ltd, Chennai, Tamilnadu.</Text>
      </View>
      <View style={supportMenu.borderLine} />
    </View>
  )
}

export default (withTranslation()(AboutUs))
