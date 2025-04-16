import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  lightGrey,
  white,
  malachite
} from '../../assets/styles/colors'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Dropdown } from 'react-native-material-dropdown'
import { feedback } from './actions'
import { getProfile } from '../profile/actions'
import {
  PROFILE,
  RESPONSE_MSG,
  PLATFORM
} from '../../lib/const'
import Toast from 'react-native-simple-toast'
import { getVersion } from 'react-native-device-info'
import { getAppConfig } from '../config/configActions'
import {
  CONTACTUS
} from '../../type'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const ContctUs = (props) => {
  const { navigation, profileData, feedbackStatus, feedbackStatusMsg, dispatch, t, appConfig } = props

  const [feedbackQuestion, setQuestion] = useState('')
  const [feedbackComments, setMsg] = useState('')
  const [, setState] = useState('')
  const [isfeedback, setIsfeedback] = useState(false)
  const [feedBackQuestions, setFeedBackQuestions] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      const reqConfigData = {
        deviceType: Platform.OS === 'ios' ? PLATFORM.IOS : PLATFORM.ANDROID,
        versionCode: getVersion()
      }
      dispatch(getAppConfig(reqConfigData))
    })
    return unsubscribe
  }, [navigation])

  const backToLogin = () => {
    navigation.navigate('CustomerSupportMenus')
  }

  const sendFeedBack = () => {
    setIsfeedback(true)
    if (validate() && profileData && profileData._id) {
      const data = {
        type: 'FEEDBACK',
        feedbackComments,
        feedbackQuestion
      }
      dispatch(feedback(data))
    }
  }

  const validate = () => {
    let valid = true
    let errorMsg = ''
    setMsg(feedbackComments.trim())
    if (!feedbackComments) {
      errorMsg = t('enter_feedback')
      valid = false
    } else if (!feedbackQuestion) {
      errorMsg = t('enter_feedbackQues')
      valid = false
    }
    if (errorMsg) {
      Toast.showWithGravity(errorMsg, Toast.LONG, Toast.BOTTOM)
    }
    return valid
  }

  useEffect(() => {
    setState({})
    if (appConfig && appConfig.feedback_questions) {
      setFeedBackQuestions(appConfig.feedback_questions)
    } else {
      setFeedBackQuestions([])
    }
  }, [appConfig])

  useEffect(() => {
    setState({})
    if (isfeedback && feedbackStatus === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity('Your feedback sent.', Toast.LONG, Toast.BOTTOM)
      setMsg('')
      backToLogin()
    }
    if (isfeedback && feedbackStatus === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity('Please try again.', Toast.LONG, Toast.BOTTOM)
    }
    dispatch({ type: CONTACTUS.CLEAR })
  }, [feedbackStatus, feedbackStatusMsg])

  return (
    <>
      {
        Platform.OS === 'ios' && (
          <>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: white }}>
              <StatusBar
                translucent
                backgroundColor={white}
                barStyle='dark-content'
              />
            </View>
          </>
        )
      }
      <View style={[supportMenu.container, { backgroundColor: lightGrey }]}>
        <TouchableOpacity
          onPress={backToLogin}
        >
          <Text style={{ fontSize: 18, paddingTop: 10 }}><Icon name='ios-arrow-back' size={20} style={supportMenu.arrowBack} /> {t('back')}</Text>
        </TouchableOpacity>
        <View style={{
          alignItems: 'center',
          marginVertical: 20
        }}
        >
          <Text style={supportMenu.customerSupportText}>{t('contact_us')}</Text>
        </View>
        <View>
          <View>
            <Text style={supportMenu.question}>Let us know what this is regarding</Text>
          </View>
          <Dropdown
            label={!feedbackQuestion ? 'Select Your Question' : ''}
            onChangeText={(value) => setQuestion(value)}
            labelHeight={13}
            itemPadding={15}
            baseColor={malachite}
            labelTextStyle={{
              paddingLeft: 15

            }}
            fontSize={13}
            labelFontSize={0}
            containerStyle={{
              width: '100%',
              marginTop: 12
            }}
            inputContainerStyle={{
              borderColor: white,
              backgroundColor: white,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderBottomColor: white,
              paddingHorizontal: 15,
              height: 50,
              borderRadius: 15
            }}
            dropdownOffset={{
              top: 120, left: 0
            }}
            dropdownMargins={{
              min: 30, max: 35
            }}
            selectedItemColor={malachite}
            textColor={malachite}
            placeholderTextColor='red'
            data={feedBackQuestions}
          />
        </View>
        <View>
          <Text style={supportMenu.question}>Message</Text>
          <TextInput
            onChangeText={(val) => setMsg(val)}
            style={supportMenu.textInput}
            multiline
            numberOfLines={5}
            placeholder='Give your valuable comments...'
            placeholderTextColor={malachite}
            value={feedbackComments}
            underlineColorAndroid='transparent'
          />
        </View>
        <TouchableOpacity onPress={() => sendFeedBack()}>
          <Text style={supportMenu.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const mapStateToProps = (state) => {
  const { profileReducer, customerSupportReducer, configReducer } = state
  return {
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    feedbackStatus: customerSupportReducer && customerSupportReducer.feedbackStatus ? customerSupportReducer.feedbackStatus : '',
    feedbackStatusMsg: customerSupportReducer && customerSupportReducer.feedbackStatusMsg ? customerSupportReducer.feedbackStatusMsg : '',
    appConfig: configReducer && configReducer.appConfig ? configReducer.appConfig : null,
    loading: !!(profileReducer && profileReducer.loading)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContctUs))
