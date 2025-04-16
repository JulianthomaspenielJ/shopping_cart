import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Linking,
  Platform
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { lightGrey } from '../../assets/styles/colors'
import message from '../../assets/images/message.png'
import phone from '../../assets/images/phone.png'
import emergencyalert from '../../assets/images/emergencyalert.png'
import alert from '../../assets/images/alert.png'
import AsyncStorage from '@react-native-community/async-storage'
import {
  KEY,
  COOK,
  PROFILE,
  PAGE
} from '../../lib/const'
import { getProfile } from '../profile/actions'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'

const EmergencyContact = (props) => {
  const { navigation, profileData, dispatch } = props
  const [userType, setUserType] = useState('')
  const [sOSNumber, setSOSNumber] = useState(0)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfile({ type: PROFILE.PROFILE }))

      AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
        setUserType(userdata)
      })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.CUSTOMERSUPPORT)
    analytics().logEvent(PAGE.CUSTOMERSUPPORT, { })
    crashlytics().log('Emergency page mounted')
  }, [])

  useEffect(() => {
    if (profileData && profileData.SOSNumber) {
      setSOSNumber(profileData.SOSNumber)
    }
  }, [profileData])

  const backToLogin = () => {
    navigation.goBack()
  }

  return (
    <View style={[supportMenu.container, { backgroundColor: lightGrey, padding: 35 }]}>
      <TouchableOpacity
      onPress={() => backToLogin()}
      >
        <Text style={{ fontSize: 18, paddingTop: 10, marginTop: 10, marginHorizontal: 10, color: 'black' }}><Icon name='ios-arrow-back' size={20} /> Back </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '90%',
          alignItems: 'center'
        }}
      >
        <Text style={supportMenu.customerSupportText}>Emergency Contact</Text>
      </View>
      <View style={supportMenu.borderLine} />
      <View
        style={{
          alignItems: 'center',
          marginVertical: 25
        }}
      >
        <ImageBackground style={[supportMenu.bglogo]} source={emergencyalert}>
          <Image source={alert} style={[supportMenu.logo]} />
        </ImageBackground>
        <Text style={[supportMenu.titleText, supportMenu.emergencytext]}>USE INCASE OF EMERGENCY</Text>
      </View>
      <View style={supportMenu.borderLine} />
      <View
        style={supportMenu.emergencySec}
      >
        <View style={{ flex: 1 }}>
          <Image source={phone} style={supportMenu.phone} />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => { Linking.openURL(`tel:${100}`) }} style={{ flex: 1 }}>
            <Text style={supportMenu.inside}>Call Police</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={supportMenu.borderLine} />
      <View
        style={supportMenu.emergencySec}
      >
        <View style={{ flex: 1 }}>
          <Image source={message} style={supportMenu.phone} />
        </View>
        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${sOSNumber}`) }} style={{ flex: 1 }}>
          <Text style={supportMenu.inside}>Alert Your Emergence Contact</Text>
        </TouchableOpacity>
      </View>
      <View style={supportMenu.borderLine} />
      <View style={{
        marginVertical: 30,
        flexDirection: 'row'
      }}
      >
        <Text style={supportMenu.emergencyText}>Use the emergency number during unsafe situations like when you are not feeling safe at your place or fire emergency or health emergency</Text>
      </View>
      <View style={supportMenu.borderLine} />
    </View>
  )
}

const mapStateToProps = (state) => {
  const { profileReducer } = state
  return {
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EmergencyContact))