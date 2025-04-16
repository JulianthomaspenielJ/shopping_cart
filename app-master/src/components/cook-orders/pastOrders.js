import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler
} from 'react-native'
import { grey20, green, corn, gold, white, tangerine, red } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import { orders } from '../../assets/styles/orders'
import Icon from 'react-native-vector-icons/FontAwesome'
import clock1 from '../../assets/icons/clock1.png'
import calendar from '../../assets/icons/calendar1.png'
import gps from '../../assets/icons/gps.png'
import { common } from '../../assets/styles/common'
import { COOK, ENUMSTATUS, BOOKING, EVENT_CAT, WELCOMECOOK, ORDER, PAGE, STATUSVALUE } from '../../lib/const'
import { pastbooking, orderComplete, sendRatings } from '../user-bookings/actions'
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
import { pendingReview } from '../booking/actions'

import _ from 'lodash'

const PastOrders = (props) => {
  const { navigation, dispatch, userPastBooking, completedStatus, loading, t, page } = props
  const [booking, setBooking] = useState('')
  const [showRating, setShowRating] = useState(false)
  const [pendingReviewItems, setPendingReviewItems] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callPendingReview()
      screenViewed(PAGE.PASTORDER)
      setBooking([])
      dispatch(pastbooking(ORDER.PAST, COOK, 'ORDER'))
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.PASTORDER)
    analytics().logEvent(PAGE.PASTORDER, { COOK: ORDER.PAST })
    crashlytics().log('Past order page mounted')
  }, [])

  useEffect(() => {
    if (page === 'ORDER') {
      setBooking(userPastBooking)
    }
  }, [userPastBooking, page])

  const callPendingReview = () => {
    const data = {
      userType: COOK
    }
    dispatch(pendingReview(data))
  }

  const goToWelcome = (item) => {
    eventTriggered(EVENT_CAT.ACTION, 'Cook order completed')
    const newArray = []
    const newArray1 = []
    const tempItem = item
    const { details, _id } = tempItem
    details.mealType.forEach((element, index, array) => {
      newArray.push(element._id)
    })
    details.slot.forEach((element, index, array) => {
      newArray1.push({
        mealType: element.mealType._id,
        fromTime: element.fromTime,
        toTime: element.toTime,
        slotTime: element.slotTime
      })
    })
    tempItem.details.slot = newArray1
    tempItem.details.mealType = newArray
    tempItem.status = ENUMSTATUS.REQUEST_COMPLETED
    dispatch(orderComplete(_id, tempItem))
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
    dispatch(pastbooking(ORDER.PAST, COOK, 'ORDER'))
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
    eventTriggered(EVENT_CAT.NAV, 'Navigating to cook order detail')
    navigation.navigate('CookDetails')
  }

  useEffect(() => {
    if (completedStatus) {
      callPendingReview()
      dispatch(pastbooking(ORDER.PAST, COOK, 'ORDER'))
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

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [])
  )

  const onBackPress = () => {
    navigation.navigate('WelcomeCook')
    // BackHandler.exitApp()
    return true
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

  const Item = (data) => {
    const { item } = data
    const location = item && item.address && item.address.location ? item.address.location.name : ''
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
            {item.status === ENUMSTATUS.ACCEPTED ? (
              <View>
                <LinearGradient
                  colors={[corn, gold]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={orders.orderCompletedContainer}
                >
                  <TouchableOpacity onPress={() => goToWelcome(item)}>
                    <Text style={[orders.orderCompleted, orders.statusText]}>Complete</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ) : (<View style={orders.orderCompletedContainer} />)}
            <View>
              {(item.status === ENUMSTATUS.ACCEPTED || item.status === ENUMSTATUS.RESCHEDULED || item.status === ENUMSTATUS.JOBSTARTED) ? (
                <View style={[orders.amountContainer, orders.datesection]}>
                  <View style={orders.callIconContainer}>
                    <Icon name='phone' size={12} color={white} />
                  </View>
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
            booking.length > 0 ? (
              <FlatList
                data={booking}
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
    </View>
  )
}
const mapStateToProps = (state) => {
  const { userMyBookingReducer, customerBookReducer } = state
  return {
    userPastBooking: userMyBookingReducer && userMyBookingReducer.userPastBooking ? userMyBookingReducer.userPastBooking : [],
    completedStatus: customerBookReducer && customerBookReducer.completedStatus ? customerBookReducer.completedStatus : '',
    loading: !!(userMyBookingReducer && userMyBookingReducer.loading),
    page: userMyBookingReducer && userMyBookingReducer.page ? userMyBookingReducer.page : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PastOrders))
