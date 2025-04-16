import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Book from './book'
import QuickBook from './quickBook'
import { common } from '../../assets/styles/common'
import {
  View,
  Platform,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native'
import { poppinSemiBold } from '../../assets/styles/fonts'
import { darkCyan, lightBlue, yellow, white } from '../../assets/styles/colors'
import { styles } from '../../assets/styles/userLanding'
import menu from '../../assets/images/menu.png'
import { DrawerActions } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const Tab = createMaterialTopTabNavigator()
const BookingTabs = (props) => {
  const { navigation, t } = props
  return (
    <View style={common.containerBackground}>
      {Platform.OS === 'ios' && (
        <>
          <View style={{ height: STATUS_BAR_HEIGHT }}>
            <StatusBar
              translucent
              backgroundColor={white}
              barStyle='dark-content'
            />
          </View>
        </>
      )}
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 30,
        padding: 30,
        justifyContent: 'flex-end'
      }}
      >
        <View />
        <View>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image style={styles.menuImg} source={menu} />
          </TouchableOpacity>
        </View>
      </View>
      <Tab.Navigator
        lazy={false}
        tabBarOptions={{
          activeTintColor: darkCyan,
          inactiveTintColor: darkCyan,
          style: {
            backgroundColor: lightBlue,
            borderBottomColor: lightBlue,
            marginLeft: 20,
            marginRight: 20,
            elevation: 0,
            shadowOpacity: 0,
            borderRadius: 13
          },
          indicatorStyle: {
            height: '100%',
            backgroundColor: yellow,
            borderRadius: 13

          },
          labelStyle: {
            fontFamily: poppinSemiBold,
            textTransform: 'capitalize',
            fontSize: 13,
            fontWeight: '600'
          }
        }}
      >
        <Tab.Screen name={t('book')} component={Book} />
        <Tab.Screen name={t('quick_book')} component={QuickBook} />
      </Tab.Navigator>
    </View>
  )
}

export default (withTranslation()(BookingTabs))
