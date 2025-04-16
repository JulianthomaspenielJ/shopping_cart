import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  KEY,
  COOK,
  NOTIFICATIONSTATUS,
  WELCOMECOOK,
  PROFILE,
  RESPONSE_MSG
} from '../../lib/const'
import AsyncStorage from '@react-native-community/async-storage'
import { notificationStyle } from '../../assets/styles/notificationStyle'
import StatusSwitch from '../ui-components/switch'
import { getProfile } from '../profile/actions'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { changeAvailableStatus as notificationStatus, getManulalNotificationsList } from '../welcome-cook/actions'
import Toast from 'react-native-simple-toast'
import moment from 'moment'
import NoRecords from '../ui-components/noRecords'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight

const Notification = (props) => {
  const { navigation, profileData, dispatch, onlineStatus, t, manulaNotificanList } = props
  const [userType, setUserType] = useState('')
  const [switchValue, setSwitchValue] = useState(true)
  const [mannualPushNotificationListData, setManualPushNotificationLitData] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      if (profileData && profileData.notificationStatus === NOTIFICATIONSTATUS.OFF) {
        setSwitchValue(false)
      }
      if (profileData && profileData.notificationStatus === NOTIFICATIONSTATUS.ON) {
        setSwitchValue(true)
      }
      AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
        dispatch(getManulalNotificationsList(userdata))
        setUserType(userdata)
      })
    })
    return unsubscribe
  }, [navigation, profileData])

  useEffect(() => {
    AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
      setUserType(userdata)
    })
    if (onlineStatus && onlineStatus.status === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity(t('notification_status_success'), Toast.LONG, Toast.BOTTOM)
    }
    if (onlineStatus && onlineStatus.status === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity(t('notification_status_fail'), Toast.LONG, Toast.BOTTOM)
    }
    dispatch({ type: WELCOMECOOK.CLEAR })
  }, [onlineStatus])

  useEffect(() => {
    const newArray = []
    manulaNotificanList && manulaNotificanList.length && manulaNotificanList.forEach((element, index, array) => {
      if (element.createdAt >= profileData.createdAt) {
        newArray.push(element)
      }
    })
    setManualPushNotificationLitData(newArray)
  }, [manulaNotificanList])

  const backToLogin = () => {
    if (userType === COOK) {
      navigation.navigate('WelcomeCook')
    } else {
      navigation.navigate('UserLanding')
    }
  }

  const changeStatus = () => {
    setSwitchValue(!switchValue)
    let status = NOTIFICATIONSTATUS.ON
    if (switchValue) {
      status = NOTIFICATIONSTATUS.OFF
    }
    const data = {
      notificationStatus: status,
      role: userType
    }
    dispatch(notificationStatus(data))
  }

  return (
    <View style={[supportMenu.container, { padding: 25 }]}>
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
        justifyContent: 'space-between'
      }}
      >
        <TouchableOpacity
          onPress={backToLogin}
        >
          <Text style={{ fontSize: 18, paddingTop: 10 }}><Icon name='ios-arrow-back' size={20} style={supportMenu.arrowBack} /> Back </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
          marginTop: 30
        }}
      >
        <Text style={notificationStyle.notificationTitle}>{t('Notifications')}</Text>
        <View style={{
          flexDirection: 'row'
        }}
        >
          <StatusSwitch
            shape='pill'
            onChange={() => changeStatus()}
            value={switchValue}
            showText
          />
        </View>
      </View>
      <View>
        <ScrollView
          style={{
            height: '85%'
          }}
          showsVerticalScrollIndicator={false}
        >

          {
            mannualPushNotificationListData && mannualPushNotificationListData.length > 0
              ? mannualPushNotificationListData.map((item, index) => {
                return (
                  <View
                    key={index}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%'
                      }}
                    >
                      <TouchableOpacity
                        style={[notificationStyle.notificationContainer, { width: '100%' }]}
                      >
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                        >
                          <View>
                            <Text style={notificationStyle.titleName}>{item.title ? item.title : ''}</Text>
                          </View>
                          <View style={{
                            flexDirection: 'row'
                          }}
                          >
                            <Text style={[notificationStyle.titleName, { fontSize: 11, paddingRight: 2 }]}>{item.createdAt ? moment(item.createdAt).format('DD.MM.YYYY') : ''},</Text>
                            <Text style={[notificationStyle.titleName, { fontSize: 11, textTransform: 'none' }]}>{item.createdAt ? moment(item.createdAt).format('LT hh:mm a') : ''}</Text>
                          </View>
                        </View>
                        <View>
                          <Text style={notificationStyle.titleMsg}>{item.message ? item.message : ''}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
              )
              : (
                <View style={{ height: 400 }}>
                  <NoRecords msg={t('no_results_found')} enableEmoji />
                </View>
              )
          }
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { walletReducer, profileReducer, welcomCookReducer } = state
  return {
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    onlineStatus: welcomCookReducer && welcomCookReducer.onlineStatus ? welcomCookReducer.onlineStatus : '',
    manulaNotificanList: welcomCookReducer && welcomCookReducer.manulaNotificanList ? welcomCookReducer.manulaNotificanList : '',
    loading: walletReducer && walletReducer.loading ? walletReducer.loading : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Notification))
