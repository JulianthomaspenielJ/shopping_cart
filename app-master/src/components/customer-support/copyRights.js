import React from 'react'
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

const CopyRights = (props) => {
  const { navigation, t } = props

  const backToLogin = () => {
    navigation.goBack()
  }

  return (
    <View style={[supportMenu.container, { backgroundColor: lightGrey, padding: 0 }]}>
      <View style={{
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 10

      }}
      >
        <TouchableOpacity
          onPress={() => backToLogin()}
        >
          <Text style={{ fontSize: 18, paddingTop: 10, marginTop: 10, marginHorizontal: 10, color: 'black' }}><Icon name='ios-arrow-back' size={20} /> Back </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            width: '90%'
          }}
        >
          <Text style={supportMenu.customerSupportText}>{t('copy_rights')}</Text>
        </View>
      </View>
      <WebView source={{ uri: `${apiUrl.COPY_RIGHTS}` }} />
    </View>
  )
}

export default (withTranslation()(CopyRights))
