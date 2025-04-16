import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  BackHandler,
  Linking,
  ScrollView
} from 'react-native'
import StatusSwitch from '../ui-components/switch'
import LinearGradient from 'react-native-linear-gradient'
import { gold, corn, black, transparent, white } from '../../assets/styles/colors'
import { welcomeCookStyles } from '../../assets/styles/welcomeCook'
import welComeBg from '../../assets/images/welcomeCookBg.png'
import whiteMenu from '../../assets/icons/whiteMenu.png'
import welcomeCookIcon from '../../assets/icons/walletWhite.png'
import blackLogo from '../../assets/icons/blackLogo.png'
import modalStyles from '../../assets/styles/modal'
import {
  MSG,
  EVENT_CAT,
  WELCOMECOOK,
  RESPONSE_MSG,
  ENUMSTATUS,
  PROFILE,
  ONLINESTATUS,
  COOK,
  FORMAT,
  ORDER,
  KEY,
  SESSION,
  PROFILEUPDATE
} from '../../lib/const'
import Icon from 'react-native-vector-icons/FontAwesome'
import gps from '../../assets/icons/gps.png'
import { DrawerActions, useFocusEffect } from '@react-navigation/native'
import { connect } from 'react-redux'
import { eventTriggered } from '../../lib/ga'
import OneSignal from 'react-native-onesignal'
import {
  wlcomecookList,
  cookacceptorder,
  cookrejectorder,
  changeAvailableStatus,
  cookrescheduleacceptorder,
  cookreschedulerejecttorder,
  cookStartorder,
  covidAlert
} from './actions'
import { getProfile } from '../profile/actions'
import { withTranslation } from 'react-i18next'
import Toast from 'react-native-simple-toast'
import Spinner from '../ui-components/Spinner'
import Geolocation from '@react-native-community/geolocation'
import { sendRatings, pastbooking } from '../user-bookings/actions'
import RatingModal from '../ui-components/ratingModal'
import { pendingReview } from '../booking/actions'
import _ from 'lodash'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import moment from 'moment'
import NoRecords from '../ui-components/noRecords'
import { setData } from '../../lib/storage'
import AsyncStorage from '@react-native-community/async-storage'
import {
  COVID_ALERT
} from '../../type'
import OrderRejectAlert from '../ui-components/orderRejectAlert'

const welcomeCook = (props) => {
  const {
    navigation,
    dispatch,
    loading,
    profileData,
    cookRequestData,
    acceptorder,
    rejectorder,
    onlineStatus,
    t,
    accepterror,
    rejecterror,
    pendingReviewData,
    rescheduleaccepterror,
    reschedulerejecterror,
    rescheduleacceptorder,
    reschedulerejectorder,
    myRatingstatus,
    startorderStatus,
    userPastBooking,
    covidStatus,
    covidStatusLoding
  } = props
  const [switchValue, setSwitchValue] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [cookNotificationData, setCookNotificationData] = useState('')
  const [showbookDetail, setShowbookDetail] = useState('')
  const [pendingReviewItems, setPendingReviewItems] = useState('')
  const [showRating, setShowRating] = useState(false)
  const [isCookPage, setIsCookPage] = useState(true)
  const [showPandemicAlert, setShowPandemicAlert] = useState(false)
  const [covidTypeSelected, setCovidTypeSelected] = useState('')
  const [cookPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0
  })
  const [showorderRejectAlert, setShowOrderRejectAlert] = useState(false)
  const [showStartButtonAlert, setShowStartButtonAlert] = useState(false)
  const [startBookingId, setStartBookingId] = useState('')
  const [rejectBookingId, setRejectBookingId] = useState(true)
  const [rejectBookingData, setRejectBookingData] = useState(true)

  useEffect(() => {
    analytics().setCurrentScreen(WELCOMECOOK.NOTIFICATION)
    analytics().logEvent(WELCOMECOOK.NOTIFICATION, { COOK: 'COOK DASHBOARD' })
    crashlytics().log('Cook landing page mounted')
  }, [])

  useEffect(() => {
    if (covidStatus === RESPONSE_MSG.SUCCESS && covidTypeSelected === 'YES') {
      AsyncStorage.removeItem(SESSION.TOKEN)
      AsyncStorage.removeItem(KEY.COVID)
      navigation.navigate('Home')
      dispatch({ type: PROFILEUPDATE.CLEAR })
      dispatch({ type: COVID_ALERT.CLEAR })
      setShowPandemicAlert(false)
    } else {
      setShowPandemicAlert(false)
    }
  }, [covidStatus])

  const refresh = () => {
    Toast.showWithGravity(t('notification_loading'), Toast.LONG, Toast.BOTTOM)
    dispatch(wlcomecookList({ type: WELCOMECOOK.NOTIFICATION }))
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition(
        position => {
          if (position.coords.latitude && position.coords.longitude) {
            const initialPosition = JSON.stringify(position)
            var lati = JSON.parse(initialPosition).coords.latitude
            var lng = JSON.parse(initialPosition).coords.longitude
            setCurrentPosition({
              lat: (lati),
              long: (lng)
            })
          }
        },
        error => {
          // See error code charts below.
          console.log(error)
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 120000 }
      )
      AsyncStorage.getItem(KEY.COVID).then((covidData) => {
        if (covidData) {
          setShowPandemicAlert(false)
        } else {
          setShowPandemicAlert(true)
        }
      })
      dispatch(pastbooking(ORDER.PAST, COOK, 'ORDER'))
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      dispatch(wlcomecookList({ type: WELCOMECOOK.NOTIFICATION }))
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const data = {
      userType: COOK
    }
    dispatch(pendingReview(data))
  }, [])

  useEffect(() => {
    if (profileData && profileData.worker && profileData.worker.status === ONLINESTATUS.OFFLINE) {
      setSwitchValue(true)
      const data = {
        worker: {
          status: ONLINESTATUS.ONLINE
        }
      }
      dispatch(changeAvailableStatus(data))
    }
    if (profileData && profileData.worker && profileData.worker.status === ONLINESTATUS.ONLINE) {
      setSwitchValue(true)
    }
    if (profileData && profileData.worker && profileData.worker.status === ONLINESTATUS.INACTIVE) {
      setSwitchValue(false)
    }
  }, [profileData])

  useEffect(() => {
    if (pendingReviewData && pendingReviewData.length) {
      setPendingReviewItems(pendingReviewData)
      setShowRating(true)
    } else {
      setPendingReviewItems('')
      setShowRating(false)
    }
  }, [pendingReviewData])

  useEffect(() => {
    if (myRatingstatus === RESPONSE_MSG.SUCCESS) {
      setShowRating(false)
    }
  }, [myRatingstatus])

  useEffect(() => {
    OneSignal.addEventListener('received', refresh)
    OneSignal.addEventListener('opened', refresh)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [])
  )

  const onBackPress = () => {
    BackHandler.exitApp()
    return true
  }

  useEffect(() => {
    setCookNotificationData(cookRequestData)
    if (acceptorder && acceptorder.status === RESPONSE_MSG.SUCCESS) {
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      Toast.showWithGravity(t('payment_success'), Toast.LONG, Toast.BOTTOM)
      setShowModal(false)
      dispatch(wlcomecookList({ type: WELCOMECOOK.NOTIFICATION }))
      dispatch({ type: WELCOMECOOK.CLEAR })
    } else if (rejectorder && rejectorder.status === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity(t('reject_success'), Toast.LONG, Toast.BOTTOM)
      setShowModal(false)
      dispatch(wlcomecookList({ type: WELCOMECOOK.NOTIFICATION }))
      dispatch({ type: WELCOMECOOK.CLEAR })
    }

    if (isCookPage && onlineStatus && onlineStatus.status === RESPONSE_MSG.SUCCESS) {
      setIsCookPage(false)
      Toast.showWithGravity(t('online_status'), Toast.LONG, Toast.BOTTOM)
      setShowModal(false)
      dispatch(wlcomecookList({ type: WELCOMECOOK.NOTIFICATION }))
      dispatch({ type: WELCOMECOOK.CLEAR })
    }
  }, [cookRequestData, acceptorder, rejectorder, onlineStatus])

  useEffect(() => {
    if (accepterror && accepterror.status === RESPONSE_MSG.ERROR) {
      if (MSG.INSUFFICIENTFUND === accepterror.message) {
        Toast.showWithGravity(t('insufficient_fund'), Toast.LONG, Toast.BOTTOM)
        //, Minimum wallet \u20B9500
      } else if (MSG.ALREADYACCEPTED === accepterror.message) {
        Toast.showWithGravity(t('server_error.already_accepted'), Toast.LONG, Toast.BOTTOM)
        //, Minimum wallet \u20B9500
      } else {
        Toast.showWithGravity(t('server_error.try_again'), Toast.LONG, Toast.BOTTOM)
      }
    }
    if (rejectorder && rejectorder.status === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity(t('server_error.try_again'), Toast.LONG, Toast.BOTTOM)
    }
    dispatch({ type: WELCOMECOOK.CLEAR })
  }, [accepterror, rejecterror])

  useEffect(() => {
    setCookNotificationData(cookRequestData)
    if (rescheduleacceptorder && rescheduleacceptorder.status === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity(t('order_accepted'), Toast.LONG, Toast.BOTTOM)
    }
    if (rejectorder && rejectorder.status === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity(t('Order_rejected'), Toast.LONG, Toast.BOTTOM)
    }
    if ((rescheduleacceptorder && rescheduleacceptorder.status === RESPONSE_MSG.SUCCESS) || (reschedulerejectorder && reschedulerejectorder.status === RESPONSE_MSG.SUCCESS)) {
      setShowModal(false)
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      dispatch(wlcomecookList({ type: WELCOMECOOK.NOTIFICATION }))
      dispatch({ type: WELCOMECOOK.CLEAR })
    }
  }, [cookRequestData, rescheduleacceptorder, reschedulerejectorder])

  useEffect(() => {
    if (rescheduleaccepterror && rescheduleaccepterror.status === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity(t('server_error.try_again'), Toast.LONG, Toast.BOTTOM)
    }
    if (rejectorder && rejectorder.status === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity(t('server_error.try_again'), Toast.LONG, Toast.BOTTOM)
    }
    dispatch({ type: WELCOMECOOK.CLEAR })
  }, [rescheduleaccepterror, reschedulerejecterror])

  const pay = (data, notificationStatus) => {
    if (notificationStatus === ENUMSTATUS.RESCHEDULED) {
      dispatch(cookrescheduleacceptorder(data._id))
    } else {
      setShowbookDetail(data)
      setShowModal(true)
    }
  }

  const readyToPay = (bookingid) => {
    eventTriggered(EVENT_CAT.ACTION, 'Cook accept order')
    dispatch(cookacceptorder(bookingid))
  }

  const onReject = (bookingid, notificationStatus) => {
    setShowOrderRejectAlert(true)
    setRejectBookingId(bookingid)
    setRejectBookingData(notificationStatus)
  }

  const cancel = () => {
    setShowModal(false)
  }

  const goToDirection = (userLocation) => {
    const data = {
      userLocation,
      cookPosition
    }
    navigation.navigate('DirectionMap', { data })
  }

  const changeStatus = () => {
    setSwitchValue(!switchValue)
    let status = ONLINESTATUS.ONLINE
    if (switchValue) {
      status = ONLINESTATUS.OFFLINE
    }
    const data = {
      worker: {
        status: status
      }
    }
    dispatch(changeAvailableStatus(data))
  }

  const getslotType = (data) => {
    return data.map(function (item, index) {
      return (
        <View key={index} style={[welcomeCookStyles.cookPaymentContainer, welcomeCookStyles.amttext, welcomeCookStyles.amttext1]}>
          <Text style={[welcomeCookStyles.userLocationDetails, welcomeCookStyles.timeslots]}>{item.mealType ? item.mealType.name : ''}</Text>
          <Text style={[welcomeCookStyles.userLocationDetails, { fontSize: 9 }]}>({item.slotTime})</Text>
        </View>)
    })
  }

  const jobStart = (bookingid) => {
    setShowStartButtonAlert(true)
    setStartBookingId(bookingid)
  }

  useEffect(() => {
    if (startorderStatus === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity(t('YourJobStarted'), Toast.LONG, Toast.BOTTOM)
      dispatch(wlcomecookList({ type: WELCOMECOOK.NOTIFICATION }))
    }
    dispatch({ type: WELCOMECOOK.CLEAR })
  }, [startorderStatus])

  const checkTodaySlot = (data) => {
    const slotDate = moment(data.fromTime).format('YYYY-MM-DD')
    const todayDate = moment().format('YYYY-MM-DD')
    let flag = false
    const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')
    const planFromDate = moment(data.fromTime).format('YYYY/MM/DD')
    const dailySlotStartTime = moment(new Date(planFromDate + ' ' + data.slotTime)).format('YYYY-MM-DDTHH:mm')
    const currentDateTimestamp = new Date(currentDateTime).getTime()
    const slotDateTimeTimestamp = new Date(dailySlotStartTime).getTime() + (30 * 60 * 1000)
    if (todayDate === slotDate && currentDateTimestamp > slotDateTimeTimestamp) {
      flag = true
    } else {
      flag = false
    }
    return flag
  }

  const showStartButton = (slot, bookingid) => {
    const slotDate = moment(slot.fromTime).format('YYYY-MM-DD')
    const todayDate = moment().format('YYYY-MM-DD')
    if (todayDate === slotDate) {
      const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')
      const planFromDate = moment(slot.fromTime).format('YYYY/MM/DD')
      const dailySlotStartTime = moment(new Date(planFromDate + ' ' + slot.slotTime)).format('YYYY-MM-DDTHH:mm')
      const currentDateTimestamp = new Date(currentDateTime).getTime()
      const slotDateTimeTimestamp = new Date(dailySlotStartTime).getTime() + (30 * 60 * 1000)
      let slotsView = null
      if (currentDateTimestamp > slotDateTimeTimestamp && !slot.status) {
        slotsView = (
          <TouchableHighlight
            underlayColor={white}
            onPress={() => jobStart(bookingid)}
          >
            <LinearGradient
              colors={[gold, corn]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={[welcomeCookStyles.orderCompletedContainer, { width: 75 }]}
            >
              {loading ? <Spinner /> : <Text style={[welcomeCookStyles.orderCompleted, { color: 'black' }]}>{slot.mealType ? 'Job Start' : ''}</Text>}
            </LinearGradient>
          </TouchableHighlight>
        )
      }
      return slotsView
    }
  }

  const getDate = (data) => {
    let fromtotime = null
    let totime = null
    if (data && data[0]) {
      fromtotime = data && data[0].fromTime ? moment(data[0].fromTime).format(FORMAT.DATE) : ''
      totime = data && data[0].toTime ? data[0].toTime : ''
      if (data[0].toTime && totime) {
        fromtotime = fromtotime + ' To ' + moment(totime).format(FORMAT.DATE)
      }
    }
    return fromtotime
  }

  const onRating = (r, c, b) => {
    const data = {
      booking: b._id,
      customerRating: `${r}`,
      customerComment: c
    }
    dispatch(sendRatings(data))
    let newArray = []
    newArray = _.reject(pendingReviewItems, { _id: b._id })
    setPendingReviewItems(newArray)
    if (!pendingReviewItems) {
      setShowRating(false)
    }
  }

  const onPandemicSubmit = (type) => {
    const data = {
      covid: type
    }
    setCovidTypeSelected(type)
    dispatch(covidAlert(data))
    if (type === 'NO') {
      setData(KEY.COVID, type)
      setShowPandemicAlert(false)
    }
  }
  const onOrderRejected = (type) => {
    if (type === 'YES' && showorderRejectAlert) {
      if (rejectBookingData === ENUMSTATUS.RESCHEDULED) {
        dispatch(cookreschedulerejecttorder(rejectBookingId))
      } else {
        dispatch(cookrejectorder(rejectBookingId))
      }
      setShowOrderRejectAlert(false)
      setRejectBookingData('')
      setRejectBookingId('')
    } else if (type === 'NO' && showorderRejectAlert) {
      setRejectBookingData('')
      setRejectBookingId('')
      setShowOrderRejectAlert(false)
    }
  }

  const onStarted = (type) => {
    if (type === 'YES' && showStartButtonAlert) {
      dispatch(cookStartorder(startBookingId))
      setShowStartButtonAlert(false)
      setStartBookingId('')
    } else if (type === 'NO' && showStartButtonAlert) {
      setShowStartButtonAlert(false)
      setStartBookingId('')
    }
  }

  const Item = (data) => {
    const { item, index } = data
    const { booking } = item
    const { address } = booking
    const notificationStatus = item.status
    const mobileNumber = booking && booking.customer && booking.customer.user ? booking.customer.user.mobileNumber : ''
    const userLocation = booking && booking.address && booking.address.position ? booking.address.position : ''
    let completeAddress = ''
    let landmark = ''
    let area = ''
    let city = ''
    let pinCode = ''
    if (address) {
      completeAddress = address.completeAddress ? `${address.completeAddress}, ` : ''
      landmark = address.landmark ? `${address.landmark}, ` : ''
      area = address.area ? `${address.area}, ` : ''
      city = address.city ? `${address.city} ` : ''
      pinCode = address.pinCode ? `${address.pinCode}` : ''
    }
    return (
      <View key={index} style={welcomeCookStyles.cardBorder}>
        <Text style={welcomeCookStyles.userLocationDetails}> {`${t('orderid')}`}: {booking.bookingId} </Text>
        <View style={welcomeCookStyles.userData}>
          <View style={{ width: '50%' }}>
            <Text style={[welcomeCookStyles.userLocationDetails, welcomeCookStyles.userName]}>{booking && booking.customer.user && booking.customer.user.name ? booking.customer.user.name : ''}</Text>
            <Text style={welcomeCookStyles.userLocationDetails}>Cuisine: {booking.details && booking.details.cuisine && booking.details.cuisine.name ? booking.details.cuisine.name : ''}</Text>
            <Text style={welcomeCookStyles.userLocationDetails}>Food Type: {booking.details && booking.details.foodType && booking.details.foodType.name}</Text>
            <Text style={welcomeCookStyles.userLocationDetails}>{booking && booking.details.members && booking.details.members + ' Guests'}</Text>
            <Text style={welcomeCookStyles.userLocationDetails}>{booking.details && getDate(booking.details && booking.details.slot)}</Text>
            <View style={welcomeCookStyles.locationIconArea}>
              {(booking && booking.address && booking.address.deliverLocation) ? (
                <View>
                  <Icon name='map-marker' size={10} color={black} style={welcomeCookStyles.locationIcon} />
                  <Text style={welcomeCookStyles.userLocationDetails}>{booking.address.deliverLocation} </Text>
                </View>
              ) : null}
              {(ENUMSTATUS.ACCEPTED === notificationStatus || ENUMSTATUS.JOBSTARTED === notificationStatus) &&
                <TouchableOpacity
                  underlayColor={transparent}
                  style={[welcomeCookStyles.paymentButtons, ((booking && booking.address && booking.address.deliverLocation) && welcomeCookStyles.directionButton) || welcomeCookStyles.emptyAddress]}
                >
                  <TouchableOpacity onPress={() => goToDirection(userLocation)} style={welcomeCookStyles.directions}>
                    <Image source={gps} style={welcomeCookStyles.directionIcon} />
                    <Text style={[welcomeCookStyles.directionsText, welcomeCookStyles.paymentText]}>Directions</Text>
                  </TouchableOpacity>
                </TouchableOpacity>}
            </View>
          </View>
          <View>
            {(ENUMSTATUS.NEW === notificationStatus || ENUMSTATUS.RESCHEDULED === notificationStatus) ? (
              <>
                <View style={welcomeCookStyles.cookPaymentContainer}>
                  <TouchableOpacity
                    onPress={() => pay(booking, notificationStatus)}
                    underlayColor={transparent}
                    style={[welcomeCookStyles.paymentButtons, welcomeCookStyles.paymentSuccessText]}
                  >
                    <Text style={[welcomeCookStyles.paymentSuccess, welcomeCookStyles.paymentText, welcomeCookStyles.payOption]}>{
                      ENUMSTATUS.NEW === notificationStatus ? t('Pay') : t('Accept')
                    }
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onReject(booking._id, notificationStatus)}
                    underlayColor={transparent}
                    style={[welcomeCookStyles.paymentButtons, { marginTop: 15 }]}
                  >
                    <Text style={[welcomeCookStyles.paymentReject, welcomeCookStyles.paymentText]}>{t('Reject')}</Text>
                  </TouchableOpacity>
                </View>
                {(ENUMSTATUS.RESCHEDULED === notificationStatus) ? <Text style={[welcomeCookStyles.orderAccept, { textAlign: 'right', paddingRight: 6 }]}>( Reschedule Order )</Text> : null}
              </>
            ) : (
              (ENUMSTATUS.ACCEPTED === notificationStatus) ? (
                <View style={{ alignSelf: 'flex-end' }}>
                  {
                    booking.details && checkTodaySlot(booking.details && booking.details.slot[0]) ? showStartButton(booking.details && booking.details.slot[0], booking._id)
                      : ((ENUMSTATUS.ACCEPTED === notificationStatus &&
                    item.booking &&
                    item.booking.status === ENUMSTATUS.CANCELLED)
                        ? (
                          <Text style={[welcomeCookStyles.paymentReject, welcomeCookStyles.orderAccept]}>
                            {
                              item && item.booking && item.booking.status ? item.booking.status : null
                            }
                          </Text>
                        ) : (
                          <Text style={[welcomeCookStyles.paymentSuccess, welcomeCookStyles.orderAccept]}>
                            {
                              item && item.status
                            }
                          </Text>
                        )
                      )
                  }
                  {ENUMSTATUS.JOBSTARTED === notificationStatus
                    ? (
                      <TouchableOpacity onPress={() => { Linking.openURL(`tel:${mobileNumber}`) }} style={[welcomeCookStyles.locationAccepted]}>
                        <Icon name='phone' size={20} color={white} />
                      </TouchableOpacity>
                    ) : (ENUMSTATUS.ACCEPTED === notificationStatus ? (
                      <TouchableOpacity onPress={() => { Linking.openURL(`tel:${mobileNumber}`) }} style={[welcomeCookStyles.locationAccepted]}>
                        <Icon name='phone' size={20} color={white} />
                      </TouchableOpacity>
                    ) : (null)
                    )}
                </View>
              ) : (
                ((ENUMSTATUS.RESCHEDULED === notificationStatus) || (ENUMSTATUS.JOBSTARTED === notificationStatus)) ? (
                  <View style={{ alignSelf: 'flex-end' }}>
                    <Text style={[welcomeCookStyles.paymentSuccess, welcomeCookStyles.orderAccept]}>{
                      item && item.status
                    }
                    </Text>
                    <TouchableOpacity
                      onPress={() => { Linking.openURL(`tel:${mobileNumber}`) }} style={{
                        backgroundColor: corn,
                        borderWidth: 1,
                        borderColor: corn,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        height: 30,
                        width: 30,
                        left: 50,
                        top: 110
                      }}
                    >
                      <Icon name='phone' size={20} color={white} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignSelf: 'flex-end' }}>
                    <Text style={[welcomeCookStyles.paymentReject, welcomeCookStyles.orderAccept]}>{item && item.status}</Text>
                  </View>
                )
              )
            )}
            <View style={[welcomeCookStyles.cookPaymentContainer, welcomeCookStyles.amttext, (ENUMSTATUS.NEW !== notificationStatus) ? welcomeCookStyles.acceptamt : '']}>
              <Icon name='rupee' size={12} color={black} style={[modalStyles.rupeeIcon, welcomeCookStyles.rupeeIcon]} />
              <Text style={modalStyles.modalTitle}>{(booking && Math.round(booking.totalAmount)) || 0}</Text>
            </View>
            {booking.details && getslotType(booking.details && booking.details.slot)}
          </View>
        </View>
        {
          (ENUMSTATUS.ACCEPTED === notificationStatus || ENUMSTATUS.JOBSTARTED === notificationStatus) && (
            <View>
              <Text style={welcomeCookStyles.addressCard} ellipsizeMode='tail' numberOfLines={2}>
                {completeAddress}{landmark}{area}{city}{pinCode}
              </Text>
            </View>
          )
        }
        {
          (ENUMSTATUS.NEW === notificationStatus) && (
            <View>
              <Text style={welcomeCookStyles.addressCard} ellipsizeMode='tail' numberOfLines={2}>
                Order Area: {address.area ? `${address.area} ` : ''}
              </Text>
            </View>
          )
        }
      </View>
    )
  }
  return (
    <View style={welcomeCookStyles.mainContainer}>
      <Image source={welComeBg} style={welcomeCookStyles.bgImage} />
      <LinearGradient
        colors={[corn, gold]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={welcomeCookStyles.container}
      >
        <View style={welcomeCookStyles.navItems}>
          <View>
            {/* <View style={welcomeCookStyles.leftBorder} /> */}
            <Image source={blackLogo} style={[welcomeCookStyles.cookWelcomeIcon, { width: 80, height: 40, marginLeft: 10 }]} />
            {/* <Text style={welcomeCookStyles.bookCookText}>{ t('app_title') }</Text> */}
          </View>
          <TouchableOpacity style={welcomeCookStyles.menuIconContainer} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={whiteMenu} style={welcomeCookStyles.menuIcon} />
          </TouchableOpacity>
        </View>
        <View style={welcomeCookStyles.welcomeCookContainer}>
          <View style={welcomeCookStyles.switchStatus}>
            <View>
              <Text style={welcomeCookStyles.cookName}>{profileData.gender === 'FEMALE' ? 'Ms.' : 'Mr.'}{profileData ? profileData.name : ''}</Text>
            </View>
            <View>
              <Text style={[welcomeCookStyles.welcomeText, welcomeCookStyles.switchText]}>{t('working_status')}</Text>
            </View>
          </View>
          <View style={welcomeCookStyles.cookStatus}>
            <View style={welcomeCookStyles.welcomeCookText}>
              <View>
                <Image source={welcomeCookIcon} style={welcomeCookStyles.cookWelcomeIcon} />
              </View>
              <Text style={[welcomeCookStyles.welcomeText, { paddingTop: 3 }]}>{profileData && profileData.worker ? profileData.worker.walletAmount : ''}</Text>
            </View>
            <View style={welcomeCookStyles.statusSwitchStyle}>
              <StatusSwitch
                shape='pill'
                onChange={() => changeStatus()}
                value={switchValue}
                disabled={profileData && (profileData.status === 'IN_REVIEW' || profileData.status === 'NEW')}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={welcomeCookStyles.requestContainer}>
          <View style={welcomeCookStyles.requestHeader}>
            {
              profileData && (profileData.status === 'IN_REVIEW' || profileData.status === 'NEW')
                ? (
                  <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'red' }}>*Waiting for approval</Text>
                ) : (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {profileData && profileData.SOSNumber ? (
                      <TouchableOpacity
                        onPress={() => { Linking.openURL(`tel:${profileData.SOSNumber}`) }}
                        style={[welcomeCookStyles.refresh, { flexDirection: 'row', paddingHorizontal: 5, padding: 0 }]}
                      >
                        <Text style={welcomeCookStyles.refresh}><Icon size={10} style={{ color: black, alignSelf: 'center' }} name='phone' /> {t('SoS')}</Text>
                      </TouchableOpacity>
                    ) : (<View />)}
                    <TouchableHighlight
                      onPress={() => refresh()}
                      underlayColor={white}
                    >
                      <Text style={welcomeCookStyles.refresh}>{t('refresh')}</Text>
                    </TouchableHighlight>
                  </View>
                )

            }
            <View style={welcomeCookStyles.userList}>
              <SafeAreaView>
                {cookNotificationData.length > 0 ? (
                  <FlatList
                    data={cookNotificationData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                      <Item item={item} key={index} index={index} />}
                    keyExtractor={item => item.id}
                  />
                ) : (
                  profileData && (profileData.status === 'IN_REVIEW' || profileData.status === 'NEW')
                    ? (
                      <View>
                        <Text style={{ lineHeight: 26 }}>{t('cookapprovalsteps')}</Text>
                      </View>
                    ) : (
                      userPastBooking && userPastBooking.length
                        ? (<View style={{ height: 200 }}><NoRecords msg={t('no_requests')} /></View>)
                        : (<View style={{ height: 200 }}><NoRecords news={t('good_news')} newsMsg={t('good_news_msg')} msg={t('registration_accepted')} /></View>)
                    )
                )}
              </SafeAreaView>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={showModal}
        animationType='fade'
        transparent
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalCard}>
            <View style={modalStyles.modalHeaderContainer}>
              <Text style={modalStyles.modalTitle}>My wallet</Text>
              <View style={welcomeCookStyles.locationIconArea}>
                <Icon name='rupee' size={10} color={black} style={modalStyles.rupeeIcon} />
                <Text style={modalStyles.modalTitle}>{profileData && profileData.worker ? profileData.worker.walletAmount : ''}</Text>
              </View>
            </View>
            <View style={modalStyles.modalBodyContent}>
              <Text style={modalStyles.modalBodyText}>Cusines : {showbookDetail && showbookDetail.details && showbookDetail.details.cuisine && showbookDetail.details.cuisine.name}</Text>
              <Text style={modalStyles.modalBodyText}>Customer : {showbookDetail && showbookDetail.customer.user && showbookDetail.customer.user.name}</Text>
            </View>
            <View style={modalStyles.modalHeaderContainer}>
              <Text style={modalStyles.modalTitle}>Total Amount</Text>
              <View style={welcomeCookStyles.locationIconArea}>
                <Icon name='rupee' size={10} color={black} style={modalStyles.rupeeIcon} />
                <Text style={modalStyles.modalTitle}>{(showbookDetail && Math.round(showbookDetail.totalAmount)) || 0}</Text>
              </View>
            </View>
            <View style={modalStyles.modalHeaderContainer}>
              <Text style={modalStyles.modalTitle}>Pay</Text>
              <View style={welcomeCookStyles.locationIconArea}>
                <Icon name='rupee' size={10} color={black} style={modalStyles.rupeeIcon} />
                <Text style={modalStyles.modalTitle}>{(showbookDetail && showbookDetail.commissionAmount) || 0}</Text>
              </View>
            </View>
            <TouchableHighlight
              underlayColor={white}
              onPress={() => readyToPay(showbookDetail._id)}
            >
              <LinearGradient
                colors={[gold, corn]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={[modalStyles.gradientButton, welcomeCookStyles.payButton]}
              >
                {loading ? <Spinner /> : <Text style={modalStyles.gradientButtonText}>{t('Pay')}</Text>}
              </LinearGradient>
            </TouchableHighlight>

            <TouchableOpacity
              underlayColor={white}
              onPress={() => cancel()}
              style={welcomeCookStyles.cancelTextContainer}
            >
              <Text style={[welcomeCookStyles.paymentReject, welcomeCookStyles.paymentText, welcomeCookStyles.orderAccept, welcomeCookStyles.cancelText]}>{t('Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <RatingModal
        userType={COOK}
        show={showRating}
        t={t}
        reviewData={pendingReviewItems}
        onClose={(r, c, b) => onRating(r, c, b)}
      />
      <OrderRejectAlert
        show={showorderRejectAlert}
        msg={t('reject_confirmation')}
        t={t}
        onClose={(type) => onOrderRejected(type)}
      />
      <OrderRejectAlert
        show={showStartButtonAlert}
        msg={t('start_confirmation')}
        t={t}
        onClose={(type) => onStarted(type)}
      />
    </View>
  )
}
const mapStateToProps = (state) => {
  const { welcomCookReducer, profileReducer, customerBookReducer, userMyBookingReducer } = state
  return {
    cookRequestData: welcomCookReducer && welcomCookReducer.cookRequestData ? welcomCookReducer.cookRequestData : '',
    acceptorder: welcomCookReducer && welcomCookReducer.acceptorder ? welcomCookReducer.acceptorder : '',
    rejectorder: welcomCookReducer && welcomCookReducer.rejectorder ? welcomCookReducer.rejectorder : '',
    onlineStatus: welcomCookReducer && welcomCookReducer.onlineStatus ? welcomCookReducer.onlineStatus : '',
    rejecterror: welcomCookReducer && welcomCookReducer.rejecterror ? welcomCookReducer.rejecterror : '',
    accepterror: welcomCookReducer && welcomCookReducer.accepterror ? welcomCookReducer.accepterror : '',
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    pendingReviewData: customerBookReducer && customerBookReducer.pendingReview ? customerBookReducer.pendingReview : '',
    workerWeeklyEarningData: userMyBookingReducer && userMyBookingReducer.workerWeeklyEarningData ? userMyBookingReducer.workerWeeklyEarningData : '',
    loading: !!(welcomCookReducer && welcomCookReducer.loading),
    rescheduleacceptorder: welcomCookReducer && welcomCookReducer.rescheduleacceptorder ? welcomCookReducer.rescheduleacceptorder : '',
    reschedulerejectorder: welcomCookReducer && welcomCookReducer.reschedulerejectorder ? welcomCookReducer.reschedulerejectorder : '',
    reschedulerejecterror: welcomCookReducer && welcomCookReducer.reschedulerejecterror ? welcomCookReducer.reschedulerejecterror : '',
    rescheduleaccepterror: welcomCookReducer && welcomCookReducer.rescheduleaccepterror ? welcomCookReducer.rescheduleaccepterror : '',
    myRatingstatus: userMyBookingReducer && userMyBookingReducer.myRatingstatus ? userMyBookingReducer.myRatingstatus : '',
    completedSubOrderStatus: customerBookReducer && customerBookReducer.completedSubOrderStatus ? customerBookReducer.completedSubOrderStatus : '',
    startorderStatus: welcomCookReducer && welcomCookReducer.startorderStatus ? welcomCookReducer.startorderStatus : '',
    covidStatus: welcomCookReducer && welcomCookReducer.covidStatus ? welcomCookReducer.covidStatus : '',
    covidStatusLoding: welcomCookReducer && welcomCookReducer.covidStatusLoding ? welcomCookReducer.covidStatusLoding : false,
    userPastBooking: userMyBookingReducer && userMyBookingReducer.userPastBooking ? userMyBookingReducer.userPastBooking : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(welcomeCook))
