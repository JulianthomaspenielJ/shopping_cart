import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TodayEarnings from './todayEarnings'
import weekEarnings from './weekEarnings'
import { View, Platform } from 'react-native'
import TabHeader from '../ui-components/tabHeader'
import { common } from '../../assets/styles/common'
import CustomStatusBar from '../ui-components/statusbar'

const Tab = createMaterialTopTabNavigator()

const CookEarnings = (props) => {
  const { navigation } = props
  return (
    <View style={common.containerBackground}>
      {Platform.OS === 'ios' && <CustomStatusBar navigation={navigation} />}
      <Tab.Navigator lazy={false} tabBar={props => <TabHeader {...props} title='My Earnings' />}>
        <Tab.Screen name='TodayEarnings' component={TodayEarnings} options={{ tabBarLabel: 'Today' }} />
        <Tab.Screen name='weekEarnings' component={weekEarnings} options={{ tabBarLabel: 'Week' }} />
      </Tab.Navigator>
    </View>
  )
}
export default CookEarnings
