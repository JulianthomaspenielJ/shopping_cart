import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import { corn, gold, white } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../assets/styles/header'
import { getData } from '../../lib/storage'
import { USER, KEY } from '../../lib/const'
import { DrawerActions } from '@react-navigation/native'
import whiteMenu from '../../assets/icons/whiteMenu.png'
import IonIcon from 'react-native-vector-icons/Ionicons'
import menu from '../../assets/images/menu.png'
import { withTranslation } from 'react-i18next'

const Header = (props) => {
  const [userType, setUserType] = useState('')
  const { title, navigation, subMenu, padding, hamburger, t } = props
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.USER_TYPE)
        .then(user => {
          if (user) {
            setUserType(user)
          }
        })
    })
    return unsubscribe
  }, [navigation])
  return (
    <LinearGradient
      colors={userType === USER ? [white, white] : [corn, gold]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={[styles.header, padding ? { paddingTop: Platform.OS === 'ios' ? 50 : 15 } : '']}>
        {subMenu ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 18 }}><IonIcon name='ios-arrow-back' size={18} /> {t('back')}</Text>
          </TouchableOpacity>
        ) : <View />}
        <Text style={[styles.title, hamburger ? styles.blacktitle : '']}>{title || ''}</Text>
        {(!subMenu || hamburger) ? (
          <TouchableOpacity style={styles.menuDrawerIcon} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image style={styles.backArrow} source={hamburger ? menu : whiteMenu} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </LinearGradient>
  )
}

export default (withTranslation()(Header))
