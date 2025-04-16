import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CurrentBookings from './currentBookings'
import pastBookings from './pastBookings'
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native'
import { common } from '../../assets/styles/common'
import { darkCyan, lightBlue, yellow, bigStone } from '../../assets/styles/colors'
import { poppinSemiBold } from '../../assets/styles/fonts'
import { styles } from '../../assets/styles/userLanding'
import Icon from 'react-native-vector-icons/Ionicons'
import menu from '../../assets/images/menu.png'
import { DrawerActions } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const Tab = createMaterialTopTabNavigator()

const MyBookings = (props) => {
  const { navigation, t } = props
  return (
    <View style={common.containerBackground}>
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
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 30
      }}
      >
        <TouchableOpacity style={styles.hederSec} onPress={() => navigation.navigate('BookingTabs')}>
          <Text style={{ fontSize: 18 }}><Icon name='ios-arrow-back' style={[styles.arrowIcon, { color: bigStone, fontWeight: 'bold' }]} size={19} /> {t('back')}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image style={styles.menuImg} source={menu} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bookingTitle}>
        <Text style={styles.bookingTitleText}>{t('MyBookings')}</Text>
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
        <Tab.Screen name='CurrentBookings' userCurrentBooking={[]} component={CurrentBookings} options={{ tabBarLabel: `${t('current')}` }} />
        <Tab.Screen name='pastBookings' userCurrentBooking={[]} component={pastBookings} options={{ tabBarLabel: `${t('past')}` }} />
      </Tab.Navigator>
    </View>
  )
}

export default (withTranslation()(MyBookings))
