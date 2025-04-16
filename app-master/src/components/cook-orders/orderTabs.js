import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CurrentOrders from './currentOrders'
import PastOrders from './pastOrders'
import { View, Platform } from 'react-native'
import TabHeader from '../ui-components/tabHeader'
import { common } from '../../assets/styles/common'
import CustomStatusBar from '../ui-components/statusbar'

const Tab = createMaterialTopTabNavigator()

const OrderTabs = (props) => {
  const { navigation } = props
  return (
    <View style={[common.containerBackground]}>
      {Platform.OS === 'ios' && <CustomStatusBar navigation={navigation} />}
      <Tab.Navigator lazy={false} tabBar={props => <TabHeader {...props} title='My Orders' />}>
        <Tab.Screen name='CurrentOrders' userCurrentBooking={[]} component={CurrentOrders} options={{ tabBarLabel: 'Current' }} />
        <Tab.Screen name='PastOrders' userCurrentBooking={[]} component={PastOrders} options={{ tabBarLabel: 'Past' }} />
      </Tab.Navigator>
    </View>
  )
}

export default OrderTabs
