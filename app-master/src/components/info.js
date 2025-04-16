import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native'
import chef from '../assets/images/chef.png'
import { userInfo } from '../assets/styles/info'
import Icon from 'react-native-vector-icons/Ionicons'
import { withTranslation } from 'react-i18next'

const Info = (props) => {
  const { navigation, t } = props

  const skip = () => {
    navigation.navigate('UserLogin')
  }

  return (
    <SafeAreaView style={userInfo.container}>
      <View style={userInfo.imageContainer}>
        <Image style={userInfo.chefImage} source={chef} />
      </View>
      <View style={userInfo.Content}>
        <View style={userInfo.textContainer}>
          <Text style={userInfo.infoText}>{t('info_happy_food')}</Text>
          <Text style={userInfo.infoTitle}>{t('info_booking')}</Text>
          <Text style={userInfo.infoDetail}>{t('info_text')}</Text>
        </View>
        <View style={userInfo.getRecipes}>
          <TouchableOpacity
            onPress={() => skip()}
          >
            <Text
              style={userInfo.skipText}
            >
              {t('skip')} <Icon style={userInfo.skipIcon} name='ios-arrow-forward' />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default (withTranslation()(Info))
