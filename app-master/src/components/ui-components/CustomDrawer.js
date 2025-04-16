import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { brightSun, gold, corn } from '../../assets/styles/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from '../../assets/styles/customDrawer'
import user from '../../assets/images/profile.png'
import female from '../../assets/images/profileFemale.png'
import { getData } from '../../lib/storage'
import { USER, KEY, PAGE, PROFILE, SESSION, RESPONSE_MSG, PROFILEUPDATE, GUEST } from '../../lib/const'
import { GoogleSignin } from 'react-native-google-signin'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { getProfile, profileUpdate } from '../profile/actions'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage'
import { SUMMARY, WELCOMECOOK, GETPROFILE } from '../../type'
import { DrawerActions } from '@react-navigation/native'

const CustomDrawer = (props) => {
  const { navigation, profileData, dispatch, t, onlineStatus, profileupdateStatus, page } = props
  const [userType, setUserType] = useState('')
  const [islogout, setIslogout] = useState(false)
  const [guestUser, setGuestUser] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.USER_TYPE)
        .then(user => {
          if (user) {
            setUserType(user)
          }
        })
      dispatch(getProfile({ type: PROFILE.PROFILE }))
    })
    return unsubscribe
  }, [navigation, profileData])

  useEffect(() => {
    getData(KEY.GUEST_USER)
      .then(gUser => {
        if (gUser) {
          setGuestUser(gUser)
        }
      })
  }, [navigation])

  useEffect(() => {
    if (islogout && onlineStatus) {
      AsyncStorage.removeItem(SESSION.TOKEN)
      navigation.navigate('Home')
    }
  }, [onlineStatus])

  useEffect(() => {
    getData(KEY.USER_TYPE)
      .then(user => {
        if (user) {
          setUserType(user)
        }
      })
  }, [])

  const menuUser = [
    { id: '1', title: t('home'), route: 'BookingTabs' },
    { id: '2', title: t('Wallet'), route: 'UserWallet' },
    { id: '3', title: t('MyBookings'), route: 'MyBookings' },
    { id: '4', title: t('Recommended'), route: 'UserLanding' },
    { id: '5', title: t('Profile'), route: 'Profile' },
    { id: '6', title: t('Address'), route: 'SetLocation' },
    { id: '7', title: t('CustomerSupport'), route: 'CustomerSupportMenus' },
    { id: '8', title: t('Notifications'), route: 'Notification' },
    { id: '10', title: t('Logout'), route: PAGE.LOGOUT }
  ]

  const menuGuset = [
    { id: '1', title: t('home'), route: 'BookingTabs' },
    { id: '2', title: t('Wallet'), route: 'UserWallet' },
    { id: '3', title: t('MyBookings'), route: 'MyBookings' },
    { id: '4', title: t('Recommended'), route: 'UserLanding' },
    { id: '5', title: t('Profile'), route: 'Profile' },
    { id: '6', title: t('Address'), route: 'SetLocation' },
    { id: '7', title: t('CustomerSupport'), route: 'CustomerSupportMenus' },
    { id: '8', title: t('Notifications'), route: 'Notification' }
  ]

  const menuCook = [
    { id: '1', title: t('home'), route: 'WelcomeCook' },
    { id: '2', title: t('MyOrders'), route: 'OrderTabs' },
    { id: '3', title: t('MyEarnings'), route: 'CookEarnings' },
    { id: '4', title: t('Wallet'), route: 'Wallet' },
    { id: '5', title: t('Profile'), route: 'Profile' },
    { id: '6', title: t('Address'), route: 'SetLocation' },
    { id: '7', title: t('Help'), route: 'CustomerSupportMenus' },
    { id: '8', title: t('Notifications'), route: 'Notification' },
    { id: '10', title: t('Logout'), route: PAGE.LOGOUT }
  ]

  const menu = (guestUser === GUEST ? menuGuset : (userType === USER ? menuUser : menuCook))
  const handleMenuItemClick = (item) => {
    if (item === PAGE.LOGOUT) {
      GoogleSignin.isSignedIn().then(isSignedIn => {
        setIslogout(true)
        if (isSignedIn) {
          GoogleSignin.revokeAccess().then(() => {
            GoogleSignin.signOut()
          })
        }
        dispatch({
          type: SUMMARY.CLEAR_SUMMARY_VALUE
        })
        dispatch({ type: WELCOMECOOK.NOTIFICATIONCLEAR })
        dispatch({ type: GETPROFILE.CLEAR })
      })
      const userdata = {
        pushToken: '',
        playerId: '',
        role: userType
      }
      if (userType !== USER && userType !== GUEST) {
        userdata.worker = {
          status: 'OFFLINE'
        }
      }
      dispatch(profileUpdate(userdata, 'logout'))
    } else if (guestUser === GUEST && item === 'UserWallet') {
      navigation.dispatch(DrawerActions.closeDrawer())
      navigation.navigate('UserLogin')
    } else {
      navigation.navigate(item)
    }
  }

  useEffect(() => {
    if (page === 'logout' && (profileupdateStatus === RESPONSE_MSG.SUCCESS)) {
      AsyncStorage.removeItem(SESSION.TOKEN)
      AsyncStorage.removeItem(KEY.COVID)
      AsyncStorage.removeItem(KEY.SELECTED_LANGUAGE)
      dispatch({ type: PROFILEUPDATE.CLEAR })
      navigation.navigate('Home')
    }
  }, [profileupdateStatus])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={userType === USER ? [brightSun, brightSun] : [gold, corn]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradiant}
      >
        <View style={styles.closeHolder}>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Icon name='ios-close' style={styles.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <Image source={profileData.avatar ? { uri: `${IMAGE_BASE_URL}${profileData.avatar}` } : (profileData.gender === 'MALE' ? user : female)} style={styles.profileImg} />
          <Text style={styles.name}>{profileData.name && profileData.name}</Text>
          <Text style={styles.phone}>{profileData.mobileNumber && profileData.mobileNumber}</Text>
        </View>
        <View style={styles.menu}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {menu.map((item, index) => {
              return (
                <View key={index} style={styles.menuItem}>
                  <TouchableOpacity onPress={() => handleMenuItemClick(item.route)}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </TouchableOpacity>
                  <View style={styles.hline} />
                </View>)
            })}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { profileReducer, welcomCookReducer } = state
  return {
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    onlineStatus: welcomCookReducer && welcomCookReducer.onlineStatus ? welcomCookReducer.onlineStatus : '',
    loading: !!(profileReducer && profileReducer.loading),
    page: profileReducer && profileReducer.page ? profileReducer.page : '',
    profileupdateStatus: profileReducer && profileReducer.profileupdateStatus ? profileReducer.profileupdateStatus : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CustomDrawer))
