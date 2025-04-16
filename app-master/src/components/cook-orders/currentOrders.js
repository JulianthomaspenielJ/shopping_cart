import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Linking
} from 'react-native'
import { grey20, green, corn, gold, white, tangerine, red } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import { orders } from '../../assets/styles/orders'
import Icon from 'react-native-vector-icons/FontAwesome'
import clock1 from '../../assets/icons/clock1.png'
import calendar from '../../assets/icons/calendar1.png'
import gps from '../../assets/icons/gps.png'
import { common } from '../../assets/styles/common'
import { COOK, ENUMSTATUS, BOOKING, EVENT_CAT, WELCOMECOOK, ORDER, PAGE, STATUSVALUE, RESPONSE_MSG } from '../../lib/const'
import { currentbooking, sendRatings, subOrderComplete } from '../user-bookings/actions'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import { eventTriggered, screenViewed } from '../../lib/ga'
import { welcomeCookStyles } from '../../assets/styles/welcomeCook'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import Loader from '../ui-components/Loader'
import { useFocusEffect } from '@react-navigation/native'
import RatingModal from '../ui-components/ratingModal'
import { pendingReview, bookingconfigList } from '../booking/actions'
import _ from 'lodash'
import Spinner from '../ui-components/Spinner'
import { UPDATE_ORDER } from '../../type'
import OrderRejectAlert from '../ui-components/orderRejectAlert'

const CurrentOrders = (props) => {
  const {
    navigation,
    dispatch,
    userCurrentBooking,
    completedStatus,
    loading,
    pendingReviewData,
    t,
    page,
    myRatingstatus,
    orderloading,
    currentDateTime,
    completedSubOrderStatus,
    bookingConfigData
  } = props
  const [currentBooking, setcurrentBooking] = useState([])
  const [showRating, setShowRating] = useState(false)
  const [pendingReviewItems, setPendingReviewItems] = useState('')
  const [mealsType, setMealsType] = useState([])
  const [showCompleteButtonAlert, setShowcompleteButtonAlert] = useState(false)
  const [completeMealType, setCompletedMealType] = useState('')
  const [orderCompleteData, setOrderCompleteData] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callPendingReview('ORDER')
      screenViewed(PAGE.CURRENTORDER)
      setcurrentBooking([])
      dispatch(bookingconfigList({ type: BOOKING.CONFIG }))
      dispatch(currentbooking(ORDER.CURRENT, COOK, 'ORDER'))
      dispatch({ type: UPDATE_ORDER.REQUEST })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (bookingConfigData) {
      setMealsType(bookingConfigData.meals)
    }
  }, [bookingConfigData])

  const callPendingReview = (page) => {
    const data = {
      userType: COOK
    }
    dispatch(pendingReview(data, page))
  }

  useEffect(() => {
    if (page === 'ORDER') {
      setcurrentBooking(userCurrentBooking)
    }
  }, [userCurrentBooking, page])

  useEffect(() => {
    if (completedSubOrderStatus === RESPONSE_MSG.SUCCESS) {
      dispatch(currentbooking(ORDER.CURRENT, COOK, 'ORDER'))
    }
  }, [completedSubOrderStatus])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.CURRENTORDER)
    analytics().logEvent(PAGE.CURRENTORDER, { COOK: ORDER.CURRENT })
    crashlytics().log('Current order page mounted')
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [])
  )

  useEffect(() => {
    if (myRatingstatus === RESPONSE_MSG.SUCCESS) {
      setShowRating(false)
      callPendingReview('ORDER')
    }
  }, [myRatingstatus])

  useEffect(() => {
    if (pendingReviewData) {
      setShowRating(true)
      setPendingReviewItems(pendingReviewData)
    }
  }, [pendingReviewData, page])

  const onBackPress = () => {
    navigation.navigate('WelcomeCook')
    // BackHandler.exitApp()
    return true
  }

  const proceedComplete = (meals, data) => {
    setOrderCompleteData(data)
    setCompletedMealType(meals)
    setShowcompleteButtonAlert(true)
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

  const getDates = (data) => {
    const dates = {
      fromdate: '',
      todate: ''
    }
    if (data && data[0] && data[0].fromTime) {
      dates.fromdate = data[0].fromTime.replace('Z', '')
    }
    if (data && data[0] && data[0].toTime) {
      dates.todate = data[0].toTime.replace('Z', '')
    }
    return dates
  }

  const refresh = () => {
    dispatch(currentbooking(ORDER.CURRENT, COOK, 'ORDER'))
  }

  const goToDetail = (item) => {
    const bookingStateData = {
      id: item._id,
      name: item && item.worker && item.worker && item.worker.user.name ? item.worker.user.name : '',
      status: item.status,
      bookingId: item.bookingId,
      members: item.details.members,
      typeName: item.details.foodType.name,
      cuisineName: item.details.cuisine.name,
      fromDate: getDates(item.details.slot).fromdate,
      toDate: getDates(item.details.slot).todate,
      summaryData: item.totalAmount,
      cookDetail: item.worker && item.worker.user,
      bookingDetail: item.details,
      address: item.address,
      ratingData: item.rating ? item.rating : ''
    }
    dispatch({
      type: BOOKING.SUMMARY_STATE_DATA,
      bookingSummaryData: bookingStateData
    })
    eventTriggered(EVENT_CAT.NAV, 'Navigating to detail')
    navigation.navigate('CookDetails')
  }

  useEffect(() => {
    if (completedStatus) {
      callPendingReview('ORDER')
      dispatch(currentbooking(ORDER.CURRENT, COOK, 'ORDER'))
    }
  }, [completedStatus])

  const getslotType = (data) => {
    return data.map(function (item, index) {
      return (
        <View
          key={index} style={{
            flexDirection: 'row',
            paddingTop: 0,
            paddingHorizontal: 2
          }}
        >
          <Text style={[orders.idText, orders.cuisines]}>{item.mealType ? item.mealType.name : ''}</Text>
          <Text style={[orders.idText, orders.cuisines]}> ({item.slotTime})</Text>
        </View>)
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // dispatch(getCurrentTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // setServerDateTime()
  }, [currentDateTime])

  const getMealName = (id) => {
    const meals = _.find(mealsType, function (item) { return item._id === id })
    return meals ? meals.name : ''
    // mealsType.find(x => x === id).name
  }
  const completeButton = (data) => {
    return data.map(function (item, index) {
      const slotDate = moment(item.slotdate).format('YYYY-MM-DD')
      const todayDate = moment().format('YYYY-MM-DD')
      if (todayDate === slotDate) {
        return item.slots.map(function (slot, index) {
          const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')
          const planFromDate = moment(item.slotdate).format('YYYY/MM/DD')
          const dailySlotStartTime = moment(new Date(planFromDate + ' ' + slot.slotTime)).format('YYYY-MM-DDTHH:mm')
          const currentDateTimestamp = new Date(currentDateTime).getTime()
          const slotDateTimeTimestamp = new Date(dailySlotStartTime).getTime() + (30 * 60 * 1000)
          let slotsView
          if (currentDateTimestamp > slotDateTimeTimestamp && !slot.status) {
            slotsView = (
              <View>
                <LinearGradient
                  colors={[corn, gold]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={orders.orderCompletedContainer}
                >
                  <TouchableOpacity key={index} onPress={() => proceedComplete(slot.mealType, item)}>
                    <Text style={[orders.orderCompleted, orders.statusText]}>{slot.mealType ? `${getMealName(slot.mealType)} Complete` : ''}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )
          } else if (slot.status === ENUMSTATUS.COMPLETED) {
            slotsView = (
              <View>
                <Text style={[orders.orderCompleted, orders.statusText, { color: green }]}>{slot.mealType ? `${getMealName(slot.mealType)} Completed` : ''}</Text>
              </View>
            )
          }
          return slotsView
        })
      }
    })
  }

  const onCompleteOrder = (type) => {
    if (type === 'YES' && showCompleteButtonAlert) {
      const { slots, slotenddate, booking } = orderCompleteData
      slots && slots.forEach((element) => {
        if (element.mealType === completeMealType) {
          element.status = ENUMSTATUS.COMPLETED
        }
      })
      const suborderdata = {
        slotenddate: slotenddate,
        slots: slots,
        bookingId: booking
      }
      dispatch(subOrderComplete(orderCompleteData._id, suborderdata))
      setShowcompleteButtonAlert(false)
      setCompletedMealType('')
      setOrderCompleteData('')
    } else if (type === 'NO' && showCompleteButtonAlert) {
      setShowcompleteButtonAlert(false)
      setCompletedMealType('')
      setOrderCompleteData('')
    }
  }

  const Item = (data) => {
    const { item } = data
    const location = item && item.address && item.address.location ? item.address.location.name : ''
    const mobileNumber = item && item.customer && item.customer.user ? item.customer.user.mobileNumber : ''
    return (
      <View style={orders.container}>
        <View style={orders.ordersList}>
          <View style={orders.orderDetailsContainer}>
            <View>
              <Text style={orders.idText}>Order ID : {item.bookingId}</Text>
              <Text style={[orders.idText, orders.cuisines, orders.setHeight]}>Cuisines : {item.details && item.details.cuisine && item.details.cuisine.name}</Text>
            </View>
            <View style={orders.toDateEnd}>
              <Text style={[orders.idText, orders.statusText, { color: item.status === ENUMSTATUS.CANCELLED || item.status === ENUMSTATUS.REQUEST_CANCELLED ? red : green }]}>{STATUSVALUE[item.status]}</Text>
              <View style={orders.amountContainer}>
                <Icon name='rupee' size={10} color={grey20} style={orders.icon} />
                <Text style={[orders.idText, orders.setHeight]}>{Math.round(item.totalAmount)}</Text>
              </View>
            </View>
          </View>
          <View style={[orders.orderTimeSchedule, orders.datesection]}>
            <View>
              <View style={[orders.amountContainer, orders.pt5]}>
                <Image source={clock1} style={orders.menuIcon} />
                <View>
                  {item.details && getslotType(item.details && item.details.slot)}
                </View>
              </View>
              {
                location && (
                  <View style={[orders.amountContainer, orders.pt5]}>
                    <Image source={gps} style={[orders.menuIcon, orders.directionIcon]} />
                    <Text style={[orders.idText, orders.cuisines]}>{location}</Text>
                  </View>
                )
              }
            </View>
            <View>
              <View style={[orders.amountContainer, orders.pt5]}>
                <Image source={calendar} style={orders.menuIcon} />
                <Text style={[orders.idText, orders.cuisines]}>From : {moment(getDates(item.details && item.details.slot).fromdate).format('DD/MM/YYYY')}</Text>
              </View>
              {
                getDates(item.details && item.details.slot) && getDates(item.details && item.details.slot).todate !== '' && (
                  <View style={[orders.amountContainer, orders.toDateEnd]}>
                    <Text style={[orders.idText, orders.cuisines]}>To : {moment(getDates(item.details && item.details.slot).todate).format('DD/MM/YYYY')}</Text>
                  </View>
                )
              }
            </View>
          </View>
          <View style={orders.orderTimeSchedule}>
            {(item.status === ENUMSTATUS.ACCEPTED || item.status === ENUMSTATUS.JOBSTARTED) ? (
              <View>
                {orderloading ? <Spinner /> : item.jobslots ? completeButton(item.jobslots && item.jobslots) : null}
              </View>
            ) : (<View style={orders.orderCompletedContainer} />)}
            <View>
              {(item.status === ENUMSTATUS.ACCEPTED || item.status === ENUMSTATUS.RESCHEDULED || item.status === ENUMSTATUS.JOBSTARTED) ? (
                <View style={[orders.amountContainer, orders.datesection]}>
                  <TouchableOpacity onPress={() => { Linking.openURL(`tel:${mobileNumber}`) }} style={orders.callIconContainer}>
                    <Icon name='phone' size={12} color={white} />
                  </TouchableOpacity>
                </View>
              ) : (null)}
              <View style={orders.amountContainer}>
                <TouchableOpacity onPress={() => goToDetail(item)}>
                  <Text style={[orders.idText, orders.viewDetails]}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={common.containerBackground}>
      <View style={orders.maiContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => refresh()}><Icon size={20} style={{ color: tangerine }} name='refresh' /></TouchableOpacity>
        </View>
        <SafeAreaView>
          {loading ? (
            <Loader />
          ) : (
            currentBooking.length > 0 ? (
              <FlatList
                data={currentBooking}
                renderItem={({ item, index }) => <Item item={item} key={index} index={index} />}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={welcomeCookStyles.norecord}>
                <Text style={welcomeCookStyles.norecordtext}>{WELCOMECOOK.NOORDER}</Text>
              </View>
            )
          )}
        </SafeAreaView>
      </View>
      <RatingModal
        show={showRating}
        t={t}
        userType='WORKER'
        reviewData={pendingReviewItems}
        onClose={(r, c, b) => onRating(r, c, b)}
      />
      <OrderRejectAlert
        show={showCompleteButtonAlert}
        msg={t('complete_confirmation')}
        t={t}
        onClose={(type) => onCompleteOrder(type)}
      />
    </View>
  )
}
const mapStateToProps = (state) => {
  const { userMyBookingReducer, customerBookReducer, configReducer } = state
  return {
    bookingConfigData: customerBookReducer && customerBookReducer.bookingConfigData ? customerBookReducer.bookingConfigData : '',
    userCurrentBooking: userMyBookingReducer && userMyBookingReducer.userCurrentBooking ? userMyBookingReducer.userCurrentBooking : '',
    page: userMyBookingReducer && userMyBookingReducer.page ? userMyBookingReducer.page : '',
    completedStatus: customerBookReducer && customerBookReducer.completedStatus ? customerBookReducer.completedStatus : '',
    myRatingstatus: userMyBookingReducer && userMyBookingReducer.myRatingstatus ? userMyBookingReducer.myRatingstatus : '',
    pendingReviewData: customerBookReducer && customerBookReducer.pendingReview ? customerBookReducer.pendingReview : '',
    reviewPage: customerBookReducer && customerBookReducer.page ? customerBookReducer.page : '',
    currentDateTime: configReducer && configReducer.currentDateTime ? configReducer.currentDateTime : '',
    loading: !!(userMyBookingReducer && userMyBookingReducer.loading),
    orderloading: !!(customerBookReducer && customerBookReducer.loading),
    completedSubOrderStatus: customerBookReducer && customerBookReducer.completedSubOrderStatus ? customerBookReducer.completedSubOrderStatus : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CurrentOrders))
