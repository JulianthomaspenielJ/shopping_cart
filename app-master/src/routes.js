import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './components/home'
import Info from './components/info'
import CookLogin from './components/cook-login/login'
import CookSignUp from './components/cook-login/signUp'
import BookingTabs from './components/booking/bookingTabs'
import UserLogin from './components/user-login/login'
import UserLanding from './components/user-landing/userLandingPage'
import WelcomeCook from './components/welcome-cook/welcomeCook'
import CustomDrawer from './components/ui-components/CustomDrawer'
import Checkout from './components/booking/checkout'
import Profile from './components/profile/profile'
import AddBank from './components/profile/addbank'
import OrderTabs from './components/cook-orders/orderTabs'
import CurrentOrders from './components/cook-orders/currentOrders'
import PastOrders from './components/cook-orders/pastOrders'
import CurrentBookings from './components/user-bookings/currentBookings'
import PastBookings from './components/user-bookings/pastBookings'
import MyBookings from './components/user-bookings/myBookingTabs'
import SetLocation from './components/location/setLocation'
import SetLocationMap from './components/location/setLocationMap'
import CookEarnings from './components/cook-earnings/cookEarnings'
import TodayEarnings from './components/cook-earnings/todayEarnings'
import weekEarnings from './components/cook-earnings/weekEarnings'
import Wallet from './components/cook-wallet/wallet'
import DirectionMap from './components/location/directionMap'
import DocumentUpload from './components/profile/documentUpload'
import HomeSearch from './components/user-landing/homeSearch'
import { Provider } from 'react-redux'
import store from './store'
import { withTranslation } from 'react-i18next'
import { ONESIGNAL_APP_ID } from 'react-native-dotenv'
import OneSignal from 'react-native-onesignal'
import Details from './components/user-bookings/details'
import CookDetails from './components/booking/cookDetails'
import UserCookProfile from './components/user-landing/userCookProfile'
import ShowAllCuisines from './components/user-landing/showAllCuisines'
import UserProfile from './components/profile/userProfile'
import CustomerSupportMenus from './components/customer-support/customerSupportMenus'
import TermsAndConditions from './components/customer-support/terms'
import Troubleshoot from './components/customer-support/troubleshooting'
import BillingAndPayment from './components/customer-support/billingPayment'
import GettingStarted from './components/customer-support/gettingStarted'
import ContctUs from './components/customer-support/contactUs'
import Legal from './components/customer-support/legal'
import CopyRights from './components/customer-support/copyRights'
import CookiesPolicy from './components/customer-support/cookiesPolicy'
import PrivacyPolicy from './components/customer-support/privacyPolicy'
import AboutUs from './components/customer-support/aboutUs'
import Faq from './components/customer-support/faq'
import Notification from './components/notification/notification'
import ViewNotification from './components/notification/viewNotification'
import EmergencyContact from './components/customer-support/emergencycontact'
import UserWallet from './components/cook-wallet/userwallet'

const Drawer = createDrawerNavigator()
const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName='BookingTabs'
      drawerPosition='right'
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name='UserLanding' component={UserLanding} />
      <Drawer.Screen name='UserWallet' component={UserWallet} />
      <Drawer.Screen name='BookingTabs' component={BookingTabs} />
      <Drawer.Screen name='Profile' component={UserProfile} />
      <Drawer.Screen name='MyBookings' component={MyBookings} />
      <Drawer.Screen name='Checkout' component={Checkout} />
      <Drawer.Screen name='SetLocation' component={SetLocation} />
      <Drawer.Screen name='SetLocationMap' component={SetLocationMap} />
      <Drawer.Screen name='Details' component={Details} />
      <Drawer.Screen name='AboutUs' component={AboutUs} />
      <Drawer.Screen name='Notification' component={Notification} />
    </Drawer.Navigator>
  )
}

const AppDrawerCook = () => {
  return (
    <Drawer.Navigator
      initialRouteName='WelcomeCook'
      drawerPosition='right'
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name='WelcomeCook' component={WelcomeCook} />
      <Drawer.Screen name='OrderTabs' component={OrderTabs} />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='CookEarnings' component={CookEarnings} />
      <Drawer.Screen name='Wallet' component={Wallet} />
      <Drawer.Screen name='CustomerSupportMenus' component={CustomerSupportMenus} />
      <Drawer.Screen name='AboutUs' component={AboutUs} />
      <Drawer.Screen name='Notification' component={Notification} />
    </Drawer.Navigator>
  )
}

const Stack = createStackNavigator()
const Routes = (props) => {
  const { t, i18n } = props
  OneSignal.init(ONESIGNAL_APP_ID, { kOSSettingsKeyAutoPrompt: true })
  OneSignal.enableSound(true)
  OneSignal.enableVibrate(true)
  permissions = {
    alert: true,
    badge: true,
    sound: true
  };
  OneSignal.requestPermissions(permissions)
  return (
    <Provider store={store()}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home'>{props => <Home {...props} t={t} i18n={i18n} />}</Stack.Screen>
          <Stack.Screen name='Info'>{props => <Info {...props} t={t} i18n={i18n} />}</Stack.Screen>
          <Stack.Screen name='CookLogin'>{props => <CookLogin {...props} t={t} i18n={i18n} />}</Stack.Screen>
          <Stack.Screen name='UserLogin'>{props => <UserLogin {...props} t={t} i18n={i18n} />}</Stack.Screen>
          <Stack.Screen name='CookSignUp'>{props => <CookSignUp {...props} t={t} i18n={i18n} />}</Stack.Screen>
          <Stack.Screen name='AddBank' component={AddBank} />
          <Stack.Screen options={{
              gestureEnabled: false,
            }} name='AppDrawer' component={AppDrawer} />
          <Stack.Screen name='Checkout' component={Checkout} />
          <Stack.Screen options={{
              gestureEnabled: false,
            }} name='AppDrawerCook' component={AppDrawerCook} />
          <Stack.Screen name='CurrentOrders' component={CurrentOrders} />
          <Stack.Screen name='PastOrders' component={PastOrders} />
          <Stack.Screen name='CurrentBookings' component={CurrentBookings} />
          <Stack.Screen name='PastBookings' component={PastBookings} />
          <Stack.Screen name='SetLocation' component={SetLocation} />
          <Stack.Screen name='SetLocationMap' component={SetLocationMap} />
          <Stack.Screen name='TodayEarnings' component={TodayEarnings} />
          <Stack.Screen name='weekEarnings' component={weekEarnings} />
          <Stack.Screen name='DirectionMap' component={DirectionMap} />
          <Stack.Screen name='DocumentUpload' component={DocumentUpload} />
          <Stack.Screen name='Details'>{props => <Details {...props} t={t} i18n={i18n} />}</Stack.Screen>
          <Stack.Screen name='HomeSearch' component={HomeSearch} />
          <Stack.Screen name='CookDetails'>{props => <CookDetails {...props} t={t} i18n={i18n} />}</Stack.Screen>
          <Stack.Screen name='UserCookProfile' component={UserCookProfile} />
          <Stack.Screen name='ShowAllCuisines' component={ShowAllCuisines} />
          <Stack.Screen name='UserProfile' component={UserProfile} />
          <Stack.Screen name='CustomerSupportMenus' component={CustomerSupportMenus} />
          <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />
          <Stack.Screen name='Troubleshoot' component={Troubleshoot} />
          <Stack.Screen name='BillingAndPayment' component={BillingAndPayment} />
          <Stack.Screen name='GettingStarted' component={GettingStarted} />
          <Stack.Screen name='ContctUs' component={ContctUs} />
          <Stack.Screen name='Legal' component={Legal} />
          <Stack.Screen name='CopyRights' component={CopyRights} />
          <Stack.Screen name='CookiesPolicy' component={CookiesPolicy} />
          <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
          <Stack.Screen name='Faq' component={Faq} />
          <Stack.Screen name='emergencycontact' component={EmergencyContact} />
          <Stack.Screen name='Notification' component={Notification} />
          <Stack.Screen name='ViewNotification' component={ViewNotification} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default withTranslation()(Routes)
