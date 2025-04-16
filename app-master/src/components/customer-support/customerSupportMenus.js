import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableHighlight,
  Keyboard
} from 'react-native'
import { supportMenu } from '../../assets/styles/supportMenuStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  KEY,
  COOK,
  RESPONSE_MSG,
  PROFILE,
  DATE_TYPE,
  MSG,
  PAGE
} from '../../lib/const'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { styles } from '../../assets/styles/alertModal'
import { styles as checkoutStyles } from '../../assets/styles/checkout'
import orderIcon from '../../assets/icons/orderIcon.png'
import calender3 from '../../assets/icons/calender3.png'
import paySuccess1 from '../../assets/images/paySuccess1.png'
import paymentSuccess from '../../assets/icons/successPay.png'
import timeImg from '../../assets/icons/time.png'
import paySuccess2 from '../../assets/images/paySuccess2.png'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Dropdown } from 'react-native-material-dropdown'
import { gold, corn, transparent } from '../../assets/styles/colors'
import { getOrders } from '../user-bookings/actions'
import { feedback, rescheduleAction, rescheduleOrderAction } from './actions'
import {
  CONTACTUS,
  CREATERAZORORDER
} from '../../type'
import Toast from 'react-native-simple-toast'
import Spinner from '../ui-components/Spinner'
import AlertModal from '../ui-components/alertModal'
import _ from 'lodash'
import { getProfile } from '../profile/actions'
import { createRazorOrder } from '../booking/actions'
import RazorpayCheckout from 'react-native-razorpay'
import { RAZORPAYKEY, PHONECODE } from 'react-native-dotenv'
import { Appearance } from 'react-native-appearance'
import { withTranslation } from 'react-i18next'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import LinearGradient from 'react-native-linear-gradient'
import checked from '../../assets/icons/checked1.png'
import unchecked from '../../assets/icons/unchecked1.png'

const colorScheme = Appearance.getColorScheme()
const isDarkModeEnabled = colorScheme === 'dark'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight

const CustomerSupportMenus = (props) => {
  const {
    navigation,
    dispatch,
    orderData,
    feedbackStatus,
    feedbackStatusMsg,
    loading,
    rescheduleStatusMsg,
    rescheduleStatus,
    rescheduleAmt,
    profileData,
    razorOrderData,
    razorOrderStatus,
    rescheduleOrderStatusMsg,
    rescheduleOrderStatus,
    razorOrderStatusPage,
    t,
    razorloading
  } = props

  const menuUser = [
    {
      id: '1',
      title: t('getting_started'),
      route: 'GettingStarted'
    },
    {
      id: '2',
      title: t('billing_payment_issue'),
      route: 'BillingAndPayment'
    },
    {
      id: '3',
      title: t('troubleshoot'),
      route: 'Troubleshoot'
    },
    {
      id: '4',
      title: t('cancel_reschedule'),
      route: 'CancelReschedule'
    },
    {
      id: '5',
      title: t('contact_us'),
      route: 'ContctUs'
    },
    {
      id: '6',
      title: t('legal'),
      route: 'Legal'
    },
    {
      id: '7',
      title: t('faq'),
      route: 'Faq'
    },
    {
      id: '8',
      title: t('AboutUs'),
      route: 'AboutUs'
    }
  ]
  const menuCook = [
    {
      id: '1',
      title: t('getting_started'),
      route: 'GettingStarted'
    },
    {
      id: '2',
      title: t('billing_payment_issue'),
      route: 'BillingAndPayment'
    },
    {
      id: '3',
      title: t('troubleshoot'),
      route: 'Troubleshoot'
    },
    {
      id: '4',
      title: t('cancel_reschedule'),
      route: 'CancelReschedule'
    },
    {
      id: '5',
      title: t('contact_us'),
      route: 'ContctUs'
    },
    {
      id: '6',
      title: t('privacy_policy'),
      route: 'PrivacyPolicy'
    },
    {
      id: '7',
      title: t('cookies_policy'),
      route: 'CookiesPolicy'
    },
    {
      id: '8',
      title: t('terms_conditions_menu'),
      route: 'TermsAndConditions'
    },
    {
      id: '9',
      title: t('copy_rights'),
      route: 'CopyRights'
    },
    {
      id: '10',
      title: t('faq'),
      route: 'Faq'
    },
    {
      id: '11',
      title: t('AboutUs'),
      route: 'AboutUs'
    }
  ]

  const [userType, setUserType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [reschedule, setReschdule] = useState(false)
  const [cancellation, setCancellation] = useState(false)
  const [msg, setMsg] = useState('')
  const [action, setAction] = useState(true)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [, setState] = useState()
  const [reschduledDate, setRescheduledDate] = useState('')// eslint-disable-line
  const [orderId, setOrderId] = useState('')
  const [ordersList, setOrdersList] = useState([])
  const [label, setLabel] = useState(null)
  const [support, setSupport] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState([])
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState(null)
  const [timePickerVisible, setTimePickerVisible] = useState(false)
  const [timeSlot, setTimeSlot] = useState('')
  const [orderAmt, setOrderAmt] = useState('')
  const [rescheduleFlow, setRescheduleFlow] = useState(false)// eslint-disable-line
  const [pickedTime, setPickedTime] = useState('')
  const [pickedTimeId, setPickedTimeId] = useState('')
  const [selectedBookingDetails, setSelectedBookingDetails] = useState('')
  const [minDate, setMinDate] = useState('')
  const [reschduleAvailable, setReschduleAvailable] = useState(false)
  const [todatePickerVisible, setTodatePickerVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [walletAmount, setWalletAmount] = useState('')
  const [walletSelected, setWalletSelected] = useState(false)
  const [payableWalletAmount, setPayableWalletAmount] = useState(0)// eslint-disable-line
  const [orderRescheduleAmt, setOrderRescheduleAmt] = useState(0)
  const [msgErr, setMsgErr] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({ type: CONTACTUS.CLEAR })
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      AsyncStorage.getItem(KEY.USER_TYPE).then((userdata) => {
        setUserType(userdata)
      })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (profileData && profileData.customer && profileData.customer.walletAmount) {
      setWalletAmount(profileData.customer.walletAmount)
    }
  }, [profileData])

  const onWalletChecked = (checked) => {
    if (checked) {
      if (walletAmount > 0) {
        if (walletAmount > orderRescheduleAmt) {
          setPayableWalletAmount(orderRescheduleAmt)
        } else {
          setPayableWalletAmount(walletAmount)
        }
      } else {
        setPayableWalletAmount(0)
      }
    } else {
      setPayableWalletAmount(0)
    }
    setWalletSelected(checked)
    setState({})
  }

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.CUSTOMERSUPPORT)
    analytics().logEvent(PAGE.CUSTOMERSUPPORT, { })
    crashlytics().log('Customer support page mounted')
  }, [])

  const backToLogin = () => {
    if (userType === COOK) {
      navigation.navigate('WelcomeCook')
    } else {
      navigation.navigate('UserLanding')
    }
  }
  const toMenuContent = (item) => {
    if (item.route === 'CancelReschedule') {
      setShowModal(true)
    } else {
      navigation.navigate(`${item.route}`)
    }
  }
  useEffect(() => {
    if (!cancellation && !reschedule && !action) {
      setTimeout(function () {
        setAction(true)
        setCancellation(false)
        setReschdule(false)
        setShowModal(false)
        setMsg('')
      }, 3000)
    }
  }, [cancellation, reschedule, action])

  const onModalClose = () => {
    setAction(true)
    setCancellation(false)
    setReschdule(false)
    setShowModal(false)
  }

  const goToReschedule = () => {
    setMsg('')
    setMsgErr('')
    setAction(false)
    setCancellation(false)
    setReschdule(true)
  }

  const goToCancellation = () => {
    setMsg('')
    setMsgErr('')
    setAction(false)
    setReschdule(false)
    setCancellation(true)
  }

  const confirmCancellation = () => {
    setSupport(true)
    setMsg(msg.trim())
    if (msg) {
      dispatch({ type: CONTACTUS.REQUEST })
      if (userType === COOK) {
        const data = {
          worker: orderData[label].worker._id,
          booking: orderId,
          feedbackComments: msg,
          type: 'CANCELLATION'
        }
        dispatch(feedback(data))
      } else {
        const data = {
          customer: orderData[label].customer._id,
          booking: orderId,
          feedbackComments: msg,
          type: 'CANCELLATION'
        }
        dispatch(feedback(data))
      }
      analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
        customerSupport: 'Order cancelled'
      })
    } else {
      setMsgErr(t('enter_comments'))
    }
  }

  const rescheduleOrder = (razorpay_payment_id = null) => {
    const tempSelectedBookingSlot = selectedBooking
    const tempSelectedBookingDetails = selectedBookingDetails
    const currentbookingSlot = []
    let selectedSlot = {}
    const mealType = []
    tempSelectedBookingSlot.map((item) => {
      mealType.push(item.mealType._id)
      selectedSlot = {
        mealType: item.mealType._id,
        fromTime: item.fromTime,
        toTime: item.toTime,
        slotTime: item.slotTime
      }
      currentbookingSlot.push(selectedSlot)
    })
    tempSelectedBookingDetails.slot = currentbookingSlot
    tempSelectedBookingDetails.rescheduleAmt = rescheduleAmt
    tempSelectedBookingDetails.razorpay_payment_id = razorpay_payment_id// eslint-disable-line
    tempSelectedBookingDetails.feedbackComments = msg
    analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
      customerSupport: 'Rescheduled processing'
    })
    dispatch(rescheduleOrderAction(orderId, tempSelectedBookingDetails))
  }

  const confirmReschedule = () => {
    setMsg(msg.trim())
    if (msg) {
      dispatch({ type: CONTACTUS.REQUEST })
      const data = {
        booking: orderId,
        feedbackComments: msg,
        type: 'RESCHEDULED'
      }
      dispatch(rescheduleAction(data))
    } else {
      setMsgErr(t('enter_comments'))
    }
  }

  useEffect(() => {
    if (rescheduleStatus === RESPONSE_MSG.SUCCESS) {

    }
    if (rescheduleAmt) {
      setOrderRescheduleAmt(rescheduleAmt)
    }
    if (rescheduleStatus === RESPONSE_MSG.ERROR && rescheduleStatusMsg === MSG.ALREADY_RESCHEDULED) {
      Toast.showWithGravity(t(rescheduleStatusMsg), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: CONTACTUS.CLEAR })
    }
  }, [rescheduleAmt, rescheduleStatus, rescheduleStatusMsg])

  const payRescheduleAmt = () => {
    setMsg(msg.trim())
    if (msg) {
      dispatch({ type: CREATERAZORORDER.REQUEST })
      if (orderRescheduleAmt > walletAmount || !walletSelected) {
        let amount = orderRescheduleAmt
        if (walletSelected) {
          amount = orderRescheduleAmt - walletAmount
        }
        const data = {
          amount: (amount * 100),
          currency: 'INR',
          receipt: '',
          payment_capture: 1
        }
        analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
          customerSupport: 'Order Rescheduled using Payment gateway'
        })
        dispatch(createRazorOrder(data, 'SUPPORT'))
      } else {
        analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
          customerSupport: 'Order Rescheduled using wallet'
        })
        rescheduleOrder()
      }
    } else {
      setMsgErr(t('enter_comments'))
    }
  }

  // const payRescheduleAmt = () => {
  //   dispatch({
  //     type: CHECKOUT.REQUEST
  //   })
  //   const data = {
  //     amount: (rescheduleAmt * 100),
  //     currency: 'INR',
  //     receipt: '',
  //     payment_capture: 1
  //   }
  //   dispatch(createRazorOrder(data, 'SUPPORT'))
  // }

  useEffect(() => {
    if (razorOrderStatusPage === 'SUPPORT' && razorOrderStatus === RESPONSE_MSG.SUCCESS && razorOrderData && razorOrderData.id) {
      setShowModal(false)
      setTimeout(() => { payment(razorOrderData.id, razorOrderData.amount) }, 1000)
      setState({})
      // setReschdule(false)
    }
    if (razorOrderStatus === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity('Failed to create order', Toast.LONG, Toast.BOTTOM)
      dispatch({ type: CONTACTUS.CLEAR })
    }
  }, [razorOrderData, razorOrderStatus])

  useEffect(() => {
    if (rescheduleOrderStatus === RESPONSE_MSG.SUCCESS) {
      setShowModal(false)
      setIsSuccess(true)
      // setRescheduleFlow(true)
      Toast.showWithGravity('Rescheduled succesfully', Toast.LONG, Toast.BOTTOM)
      setState({})
      dispatch(getOrders(userType))
      analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
        customerSupport: 'Rescheduled succesfully'
      })
    }
    if (razorOrderStatus === RESPONSE_MSG.ERROR) {
      setIsSuccess(false)
      analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
        customerSupport: 'Failed to Rescheduled'
      })
      Toast.showWithGravity('Failed to create order', Toast.LONG, Toast.BOTTOM)
    }
    dispatch({ type: CONTACTUS.CLEAR })
    dispatch({
      type: CREATERAZORORDER.CLEAR
    })
  }, [rescheduleOrderStatusMsg, rescheduleOrderStatus])

  const payment = (orderId, amount) => {
    const options = {
      description: 'Amount Towards ReSchedule',
      image: 'https://bookacook.s3.amazonaws.com/profile/admin/5e9410142a0e15147e6c5fac/f5adb44a-7dbd-406f-912b-f5cb28fd5af8',
      currency: 'INR',
      key: RAZORPAYKEY,
      amount: amount,
      order_id: orderId,
      external: {
        wallets: ['paytm']
      },
      name: 'BookACook',
      prefill: {
        email: profileData ? profileData.email : '',
        contact: profileData ? `${PHONECODE}${profileData.mobileNumber}` : '',
        name: profileData ? profileData.name : ''
      },
      theme: { color: '#FFC400' }
    }
    setState({})
    RazorpayCheckout.open(options).then((data) => {
      dispatch({
        type: CREATERAZORORDER.CLEAR
      })
      analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
        customerSupport: 'Payment success through Razorpay'
      })
      if (data.razorpay_payment_id) {
        rescheduleOrder(data.razorpay_payment_id)
      }
    }).catch((error) => {
      analytics().logEvent(PAGE.CUSTOMERSUPPORT, {
        customerSupport: error
      })
      Toast.showWithGravity(t('failed_payment'), Toast.LONG, Toast.BOTTOM)
      dispatch({
        type: CREATERAZORORDER.CLEAR
      })
      console.log(error)
    })
  }

  const showDatePicker = () => {
    setDatePickerVisible(true)
    setState({})
  }
  const showToDatePicker = () => {
    setTodatePickerVisible(true)
    setState({})
  }
  useEffect(() => {
    if (userType) {
      dispatch(getOrders(userType))
    }
  }, [userType])

  useEffect(() => {
    if (msg.trim()) {
      setMsgErr('')
    }
  }, [msg])

  useEffect(() => {
    if ((support && feedbackStatus === RESPONSE_MSG.SUCCESS) || orderData) {
      const newArray = []
      orderData.forEach((element, index, array) => {
        newArray.push({
          label: element.bookingId,
          value: element._id
        })
      })
      setOrdersList(newArray)
    }
  }, [orderData, feedbackStatus])

  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    setMinDate(date)
    if (orderId) {
      const tempOrdersData = orderData
      _.find(tempOrdersData, function (item) {
        if (item._id === orderId) {
          setSelectedBookingDetails(item.details)
          setSelectedBooking(item.details.slot)
          setFromDate(new Date(item.details.slot[0].fromTime))
          setToDate(new Date(item.details.slot[0].toTime))
          setOrderAmt(item.totalAmount)
          const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')
          const planFromDate = moment(new Date(item.details.slot[0].fromTime)).format('YYYY/MM/DD')
          const currentDateTimestamp = new Date(currentDateTime).getTime()
          const dailySlotStartTime = moment(new Date(planFromDate + ' ' + item.details.slot[0].slotTime)).format('YYYY-MM-DDTHH:mm')
          const slotDateTimeTimestamp = new Date(dailySlotStartTime).getTime()
          const diff = slotDateTimeTimestamp.valueOf() - currentDateTimestamp.valueOf()
          const bookingTimeDiff = 2
          const diffInHours = diff / 1000 / 60 / 60
          let isAvailable = false
          if ((diffInHours > bookingTimeDiff) && (currentDateTimestamp < slotDateTimeTimestamp)) {
            isAvailable = true
          }
          if (!isAvailable) {
            Toast.showWithGravity('You cannot able to ReSchedule, please contact admin.', Toast.LONG, Toast.BOTTOM)
          }
          setReschduleAvailable(isAvailable)
        }
      })
    }
  }, [orderId])

  const selectSlotTime = (item) => {
    setTimePickerVisible(true)
    setTimeSlot(item)
  }

  useEffect(() => {
    setState({})
    if (support && feedbackStatus === RESPONSE_MSG.SUCCESS) {
      setAction(false)
      setCancellation(false)
      setIsSuccess(true)
      dispatch(getOrders(userType))
      Toast.showWithGravity(t('cancel_succcess'), Toast.LONG, Toast.BOTTOM)
      setMsg('')
      setOrderId('')
    }
    if (support && feedbackStatus === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity(t('failed_to_proceed'), Toast.LONG, Toast.BOTTOM)
      setIsSuccess(false)
    }
    dispatch({ type: CONTACTUS.CLEAR })
  }, [feedbackStatus, feedbackStatusMsg])

  const onSelectOrder = (value, label) => {
    setLabel(label)
    setOrderId(value)
  }

  const hideDateTimePicker = () => {
    setDatePickerVisible(false)
    // setTodatePickerVisible(false)
  }

  const showslots = () => {
    return selectedBooking && selectedBooking.length > 0 && selectedBooking.map((item, index) => {
    // const planFromDate = moment(fromDate).format('YYYY/MM/DD')
    // const planToDate = moment(toDate).format('YYYY/MM/DD')
    // const userSelectedSlotTime = moment(planFromDate + ' ' + pickedTime).format('YYYY-MM-DDTHH:mm')
    // const slotToDateEnd = moment(planToDate + ' ' + pickedTime).format('YYYY-MM-DDTHH:mm')
      if (item.mealType && item.mealType._id === pickedTimeId) {
        item.slotTime = pickedTime || item.slotTime
        item.mealType.mealType = pickedTimeId
      }
      return (item.mealType ? (
        <TouchableOpacity onPress={() => selectSlotTime(item.mealType)} key={index} style={[supportMenu.orderContainer, { width: '75%', marginVertical: 0, marginBottom: 25 }]}>
          <View style={[supportMenu.orderImageView, supportMenu.hummingBack, { width: '20%' }]}>
            <Image source={timeImg} style={[supportMenu.orderIconStyle]} />
          </View>
          <View style={supportMenu.ordersText}>
            <Text style={supportMenu.orderIdText}>{item.mealType.fromTime} To {item.mealType ? item.mealType.toTime : ''}</Text>
            <Text style={supportMenu.orderText}>{item.mealType.name}</Text>
            <Text style={supportMenu.orderText}>Time {item.slotTime}</Text>
          </View>
        </TouchableOpacity>
      ) : null)
    })
  }
  const getTimeSlot = (slotsTime, slotTimeId) => {
    setPickedTime(slotsTime)
    setPickedTimeId(slotTimeId)
    setTimePickerVisible(false)
  }
  const onDateSelect = (type, date) => {
    setDatePickerVisible(false)
    const numberOfDays = selectedBookingDetails.plan.numberOfDays
    const packageDays = moment(date).add(selectedBookingDetails.plan.numberOfDays, 'days').format()
    setFromDate(date)
    if (type === DATE_TYPE.FROM && numberOfDays !== 1) {
      setToDate(new Date(packageDays))
    } else {
      setToDate('')
    }
  }
  const onToDateSelect = (type, date) => {
    setTodatePickerVisible(false)
    // setDateType('')
    if (type === DATE_TYPE.TO) {
      setToDate(date)
    }
  }

  return (
    <View style={supportMenu.container}>
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
      <TouchableOpacity
        onPress={() => backToLogin()}
      >
        <Text style={{ fontSize: 18, paddingTop: 10 }}><Icon name='ios-arrow-back' size={20} style={supportMenu.arrowBack} /> {t('back')} </Text>
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          alignItems: 'center'
        }}
      >
        <Text style={supportMenu.customerSupportText}>{userType === COOK ? t('Help') : t('CustomerSupport')}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginVertical: 15
        }}
      >
        {userType === COOK ? (menuCook.map((item, index) => {
          return (
            <View
              key={index}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%'
                }}
                onPress={() => toMenuContent(item)}
              >
                <Text style={[supportMenu.titleText, { width: '90%' }]}>{item.title}</Text>
                <Icon name='ios-arrow-forward' size={24} style={{ paddingVertical: 20, width: '10%' }} />
              </TouchableOpacity>
              <View style={supportMenu.borderLine} />
            </View>)
        })) : (
          menuUser.map((item, index) => {
            return (
              <View
                key={index}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%'
                  }}
                  onPress={() => toMenuContent(item)}
                >
                  <Text style={[supportMenu.titleText, { width: '90%' }]}>{item.title}</Text>
                  <Icon name='ios-arrow-forward' size={24} style={{ paddingVertical: 20, width: '10%' }} />
                </TouchableOpacity>
                <View style={supportMenu.borderLine} />
              </View>)
          })
        )}
      </ScrollView>
      <Modal
        visible={showModal}
        animationType='fade'
        transparent
        showMarker
      >
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : null} style={{ flex: 1 }}>
              <View style={styles.container}>
                {cancellation || reschedule || action ? (
                  <TouchableWithoutFeedback onPress={() => onModalClose()}>
                    <Icon name='ios-close' style={[styles.close1, supportMenu.closeIcon]} />
                  </TouchableWithoutFeedback>
                ) : null}
                <View style={styles.modal}>
                  {action ? (
                    <View
                      style={{
                        width: 350,
                        padding: 30
                      }}
                    >
                      <View>
                        <Text style={supportMenu.alertTitleText}>{userType !== COOK ? t('reschedule') : t('cancellation')}</Text>
                      </View>
                      <View style={supportMenu.orderContainer}>
                        <View style={supportMenu.orderImageView}>
                          <Image source={orderIcon} style={supportMenu.orderIconStyle} />
                        </View>
                        <View style={{
                          width: '87%',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                        >
                          <View style={supportMenu.ordersText}>
                            <Text style={supportMenu.orderIdText}>{orderId && ordersList[label] && ordersList[label].label ? ordersList[label].label : 'Select Order Id'}</Text>
                            <Text style={supportMenu.orderText}>Order Id</Text>
                          </View>
                          <View style={supportMenu.ordersIconContainer}>
                            <Icon name='ios-arrow-down' size={24} style={supportMenu.arrowDown} />
                          </View>
                        </View>
                      </View>
                      <Dropdown
                        label={!orderId ? '' : 'Select Order Id'}
                        placeholderText='600001'
                        onChangeText={(value, label) => onSelectOrder(value, label)}
                        labelHeight={13}
                        labelTextStyle={{
                          paddingLeft: 15
                        }}
                        fontSize={13}
                        labelFontSize={0}
                        containerStyle={{
                          width: '100%',
                          position: 'absolute',
                          top: 85,
                          left: 30,
                          opacity: 0
                        }}
                        inputContainerStyle={{
                          borderColor: 'red',
                          borderWidth: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: 'red',
                          borderRadius: 5,
                          paddingHorizontal: 15,
                          paddingTop: 10,
                          height: 55
                        }}
                        dropdownOffset={{
                          top: 70, left: 0
                        }}
                        dropdownMargins={{
                          min: 50, max: 50
                        }}
                        selectedItemColor='black'
                        textColor='red'
                        placeholderTextColor='black'
                        data={ordersList}
                      />
                      <View
                        style={userType !== COOK ? [{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }] : [{
                          flexDirection: 'row',
                          justifyContent: 'center'
                        }]}
                      >
                        {userType !== COOK ? (
                          <TouchableOpacity
                            onPress={goToReschedule}
                            disabled={!orderId}
                          >
                            <Text style={supportMenu.actionBtn}>{t('reschedule')}</Text>
                          </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity
                          onPress={goToCancellation}
                          disabled={!orderId}
                        >
                          <Text style={supportMenu.actionBtn}>{t('cancellation')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    reschedule ? (
                      <View
                        style={{
                          width: 375,
                          padding: 25
                        }}
                      >
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                          <Text style={supportMenu.alertTitleText}>{t('reschedule')}</Text>
                          <Text style={supportMenu.alertTitleText}>Order ID - {orderId && ordersList[label] && ordersList[label].label ? ordersList[label].label : ''}</Text>
                        </View>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                        >
                          <View style={[supportMenu.orderContainer, { width: '50%' }]}>
                            <View style={[supportMenu.orderImageView, supportMenu.tanBack, { width: '25%' }]}>
                              <Image source={calender3} style={[supportMenu.orderIconStyle]} />
                            </View>
                            <TouchableOpacity
                              onPress={showDatePicker}
                            >
                              <View style={supportMenu.ordersText}>
                                <Text style={supportMenu.orderIdText}>{moment(fromDate).format('DD/MM/YYYY')}</Text>
                                <Text style={supportMenu.orderText}>{t('fromdate')}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          {
                            selectedBooking[0].toTime ? (
                              <View style={[supportMenu.orderContainer, { width: '50%' }]}>
                                <View style={[supportMenu.orderImageView, supportMenu.tanBack, { width: '25%' }]}>
                                  <Image source={calender3} style={[supportMenu.orderIconStyle]} />
                                </View>
                                <TouchableOpacity
                                  onPress={showToDatePicker}
                                >
                                  <View style={supportMenu.ordersText}>
                                    <Text style={supportMenu.orderIdText}>{moment(toDate).format('DD/MM/YYYY')}</Text>
                                    <Text style={supportMenu.orderText}>{t('todate')}</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            ) : null
                          }
                        </View>
                        {showslots()}
                        {/* <View style={[supportMenu.orderContainer, { width: '60%', justifyContent: 'center', marginVertical: 0 }]}>
                        <View style={[supportMenu.orderImageView, { width: '25%' }]}>
                          <Image source={orderIcon} style={[supportMenu.orderIconStyle]} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={supportMenu.ordersText}>
                            <Text style={supportMenu.orderIdText}>{orderId ? ordersList[label].label : 'Select Order Id'}</Text>
                            <Text style={supportMenu.orderText}>{t('orderid')}</Text>
                          </View>
                          <View style={[supportMenu.ordersIconContainer, { marginLeft: 5, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 14 }]}>
                            <Icon name='ios-arrow-down' size={18} style={supportMenu.arrowDown} />
                          </View>
                        </View>
                        <Dropdown
                          label=''
                          placeholderText='600001'
                          onChangeText={(value, label) => onSelectOrder(value, label)}
                          labelHeight={13}
                          labelTextStyle={{
                            paddingLeft: 15
                          }}
                          fontSize={13}
                          labelFontSize={0}
                          containerStyle={{
                            width: '48%',
                            position: 'absolute',
                            top: 85,
                            left: 30,
                            opacity: 0
                          }}
                          inputContainerStyle={{
                            borderColor: 'red',
                            borderWidth: 1,
                            borderBottomWidth: 1,
                            borderBottomColor: 'red',
                            borderRadius: 5,
                            paddingHorizontal: 15,
                            paddingTop: 10,
                            height: 55
                          }}
                          dropdownOffset={{
                            top: 70, left: 0
                          }}
                          dropdownMargins={{
                            min: 50, max: 50
                          }}
                          selectedItemColor='black'
                          textColor='red'
                          placeholderTextColor='black'
                          data={ordersList}
                        />
                      </View> */}
                        <View style={{ padding: 5 }}>
                          <View style={[checkoutStyles.checkbox, { paddingVertical: 0 }]}>
                            <TouchableOpacity
                              onPress={() => onWalletChecked(!walletSelected)}
                            >
                              <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                              }}
                              >
                                <Image
                                  source={walletSelected ? checked : unchecked} style={{
                                    width: 17,
                                    height: 17
                                  }}
                                />
                                <Text style={checkoutStyles.checkboxLabel}>{t('use_your')} {`${Math.floor(walletAmount) || 0} Rs`} {t('baco_balance')}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={supportMenu.priceContainer}>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 3 }}>
                              <Text style={[supportMenu.priceLabel, { width: '100%' }]}>{t('your_order_amount')}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={[supportMenu.priceTotal, { width: '100%' }]}>{`${orderAmt} Rs`}</Text>
                            </View>
                          </View>
                        </View>
                        {orderRescheduleAmt ? (
                          <View style={supportMenu.priceContainer}>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ flex: 3 }}>
                                <Text style={[supportMenu.priceLabel, { width: '100%' }]}>{t('your_reschedule_amount')}</Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Text style={[supportMenu.priceTotal, { width: '100%' }]}>{`${orderRescheduleAmt} Rs`}</Text>
                              </View>
                            </View>
                          </View>) : null}
                        {
                          walletSelected && (orderRescheduleAmt > walletAmount) ? (
                            <View style={supportMenu.priceContainer}>
                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 3 }}>
                                  <Text style={[supportMenu.priceLabel, { width: '100%' }]}>{t('Pay')}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                  <Text style={[supportMenu.priceTotal, { width: '100%' }]}>{`${orderRescheduleAmt - walletAmount} Rs`}</Text>
                                </View>
                              </View>
                            </View>
                          ) : null
                        }
                        <View>
                          <Text style={supportMenu.commentsText}>Comments</Text>
                          <TextInput
                            onChangeText={(val) => setMsg(val)}
                            style={[supportMenu.textInput, supportMenu.commentsInput]}
                            multiline
                            numberOfLines={5}
                            placeholder='your valuable comments...'
                            value={msg}
                            underlineColorAndroid='transparent'
                          />
                          <Text style={supportMenu.errorMsgText}>{msgErr}</Text>
                        </View>
                        <TouchableHighlight
                          underlayColor={transparent}
                          disabled={!reschduleAvailable}
                          onPress={() => orderRescheduleAmt ? payRescheduleAmt() : confirmReschedule()}
                        >
                          <LinearGradient
                            colors={[gold, corn]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                              alignItems: 'center',
                              borderRadius: 5,
                              marginTop: 20,
                              padding: 15
                            }}
                          >
                            {(loading || razorloading) ? <Spinner /> : <Text style={supportMenu.loginText}>{orderRescheduleAmt ? t('Payment') : t('reschedule')}</Text>}
                          </LinearGradient>
                        </TouchableHighlight>
                        {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center'
                        }}
                      >
                        <TouchableOpacity
                          disabled={!msg || !reschduleAvailable}
                          onPress={() => rescheduleAmt ? payRescheduleAmt() : confirmReschedule()}
                          style={supportMenu.actionBtn}
                        >
                          {
                            <Text style={}>
                              {loading ? <Spinner /> : rescheduleAmt ? 'Payment' : 'Reschedule'}
                            </Text>
                          }
                        </TouchableOpacity>
                      </View> */}
                        {
                          timePickerVisible && (
                            <AlertModal
                              type='timeslot'
                              show={timePickerVisible}
                              bookingTimeDiff={2}
                              timeSlot={timeSlot}
                              fromDate={fromDate}
                              toDate={toDate}
                              onClose={(slotsTime, slotTimeId) => getTimeSlot(slotsTime, slotTimeId)}
                            />
                          )
                        }
                      </View>
                    ) : (cancellation ? (
                      <View
                        style={{
                          width: 350,
                          padding: 30
                        }}
                      >
                        <View>
                          <Text style={supportMenu.alertTitleText}>Cancellation</Text>
                        </View>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                        >
                          <View style={[supportMenu.orderContainer, { backgroundColor: 'white', padding: 0 }]}>
                            <View style={[supportMenu.orderImageView, { width: '25%' }]}>
                              <Image source={orderIcon} style={supportMenu.orderIconStyle} />
                            </View>
                            <View>
                              <View style={supportMenu.ordersText}>
                                <Text style={supportMenu.orderIdText}>{ordersList[label].label}</Text>
                                <Text style={supportMenu.orderText}>Order Id</Text>
                              </View>
                            </View>
                          </View>
                          <View style={[supportMenu.orderContainer, { backgroundColor: 'white', padding: 0 }]}>
                            <View style={[supportMenu.orderImageView, supportMenu.tanBack, { width: '25%' }]}>
                              <Image source={calender3} style={[supportMenu.orderIconStyle, { marginLeft: 2 }]} />
                            </View>
                            <View>
                              <View style={supportMenu.ordersText}>
                                <Text style={supportMenu.orderIdText}>{moment(orderData[label].bookingTime).format('DD/MM/YYYY')}</Text>
                                <Text style={supportMenu.orderText}>Date</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View>
                          <Text style={supportMenu.commentsText}>Comments</Text>
                          <TextInput
                            onChangeText={(val) => setMsg(val)}
                            style={[supportMenu.textInput, supportMenu.commentsInput]}
                            multiline
                            numberOfLines={5}
                            placeholder='your valuable comments...'
                            value={msg}
                            underlineColorAndroid='transparent'
                          />
                          <Text style={supportMenu.errorMsgText}>{msgErr}</Text>
                        </View>
                        <TouchableHighlight
                          underlayColor={transparent}
                          onPress={() => confirmCancellation()}
                        >
                          <LinearGradient
                            colors={[gold, corn]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                              alignItems: 'center',
                              borderRadius: 5,
                              marginTop: 20,
                              padding: 15
                            }}
                          >
                            {loading ? <Spinner /> : <Text style={supportMenu.loginText}>{t('confirm_cancel')}</Text>}
                          </LinearGradient>
                        </TouchableHighlight>
                        {/* <View
                        style={{
                          alignItems: 'center'
                        }}
                      >
                        <TouchableOpacity
                          onPress={confirmCancellation}
                        >
                          <Text style={msg ? [supportMenu.actionBtn] : [supportMenu.actionBtn, { backgroundColor: creammBurlee }]}>{t('confirm_cancel')}</Text>
                        </TouchableOpacity>
                      </View> */}
                      </View>
                    ) : null
                    )
                  )}
                  {
                    rescheduleFlow && (
                      <View style={[styles.modalBody, { flexDirection: 'row', height: 250 }]}>
                        <Image source={paySuccess1} style={isSuccess ? [styles.modalHolderImage, { left: 0, borderRadius: 0 }] : [styles.modalHolderImage, { left: 0, borderRadius: 0, height: 130, width: 110, top: 0 }]} />
                        <View style={{ width: '95%', alignItems: 'center' }}>
                          <Image source={paymentSuccess} style={styles.modalImage} />
                          <Text style={styles.message}>{rescheduleFlow ? 'Reschedule changed!' : 'Cancellation confirmed!'}</Text>
                        </View>
                        <Image source={paySuccess2} style={isSuccess ? [styles.modalHolderImage, { right: 0, borderRadius: 0 }] : [styles.modalHolderImage, { right: 0, borderRadius: 0, height: 130, width: 110, top: 0 }]} />
                      </View>
                    )
                  }
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </TouchableWithoutFeedback>
        {datePickerVisible ? (
          <DateTimePickerModal
            isVisible={datePickerVisible}
            testID='dateTimePicker'
            timeZoneOffsetInMinutes={0}
            value={fromDate}
            mode='date'
            is24Hour={false}
            display='default'
            isDarkModeEnabled={isDarkModeEnabled}
            minimumDate={new Date()}
            maximumDate={minDate}
            onConfirm={(date) => onDateSelect('FROM', date)}
            onCancel={hideDateTimePicker}
          />
        ) : null}
        {todatePickerVisible ? (
          <DateTimePickerModal
            isVisible={todatePickerVisible}
            testID='dateTimePicker'
            timeZoneOffsetInMinutes={0}
            value={toDate}
            mode='date'
            is24Hour={false}
            display='default'
            isDarkModeEnabled={isDarkModeEnabled}
            minimumDate={fromDate}
            maximumDate={toDate}
            date={toDate}
            onConfirm={(date) => onToDateSelect('TO', date)}
            onCancel={hideDateTimePicker}
          />
        ) : null}
      </Modal>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { userMyBookingReducer, customerSupportReducer, customerBookReducer, profileReducer } = state
  return {
    loading: !!(customerSupportReducer && customerSupportReducer.loading),
    razorloading: !!(customerBookReducer && customerBookReducer.loading),
    orderData: userMyBookingReducer && userMyBookingReducer.orderData ? userMyBookingReducer.orderData : [],
    feedbackStatus: customerSupportReducer && customerSupportReducer.feedbackStatus ? customerSupportReducer.feedbackStatus : '',
    feedbackStatusMsg: customerSupportReducer && customerSupportReducer.feedbackStatusMsg ? customerSupportReducer.feedbackStatusMsg : '',
    rescheduleAmt: customerSupportReducer && customerSupportReducer.rescheduleAmt ? customerSupportReducer.rescheduleAmt : '',
    rescheduleStatus: customerSupportReducer && customerSupportReducer.rescheduleStatus ? customerSupportReducer.rescheduleStatus : '',
    rescheduleStatusMsg: customerSupportReducer && customerSupportReducer.rescheduleStatusMsg ? customerSupportReducer.rescheduleStatusMsg : '',
    razorOrderData: customerBookReducer && customerBookReducer.razorOrderData ? customerBookReducer.razorOrderData : '',
    razorOrderStatus: customerBookReducer && customerBookReducer.razorOrderStatus ? customerBookReducer.razorOrderStatus : '',
    rescheduleOrderStatus: customerSupportReducer && customerSupportReducer.rescheduleOrderStatus ? customerSupportReducer.rescheduleOrderStatus : '',
    rescheduleOrderStatusMsg: customerSupportReducer && customerSupportReducer.rescheduleOrderStatusMsg ? customerSupportReducer.rescheduleOrderStatusMsg : '',
    razorOrderStatusPage: customerBookReducer && customerBookReducer.razorOrderStatusPage ? customerBookReducer.razorOrderStatusPage : '',
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CustomerSupportMenus))
