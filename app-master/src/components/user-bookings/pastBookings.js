import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import { darkCyan } from '../../assets/styles/colors'
import { orders } from '../../assets/styles/orders'
import Icon from 'react-native-vector-icons/FontAwesome'
import { common } from '../../assets/styles/common'
import { PAGE, ORDER, ENUMSTATUS, BOOKING, EVENT_CAT, STATUSVALUE, USER, FORMAT } from '../../lib/const'
import { connect } from 'react-redux'
import moment from 'moment'
import { pastbooking } from './actions'
import { withTranslation } from 'react-i18next'
import { eventTriggered, screenViewed } from '../../lib/ga'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import cookMale from '../../assets/images/detailsCookImgMale.png'
import cookFemale from '../../assets/images/detailsCookImg.png'
import { useFocusEffect } from '@react-navigation/native'
import { ratingDetailsStyles } from '../../assets/styles/ratingDetails'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Loader from '../ui-components/Loader'
import NoRecords from '../ui-components/noRecords'
import ImageViewer from '../ui-components/imageViewer'

const PastBookings = (props) => {
  const { navigation, dispatch, userPastBooking, loading, page, t } = props
  const [currentBooking, setCurrentBooking] = useState([])
  const [selectedCookImage, setSelectedCookImage] = useState([])
  const [visible, setIsVisible] = useState(false)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // dispatch(INITIALREQUEST)
      screenViewed(PAGE.MYBOOKING)
      setCurrentBooking([])
      dispatch(pastbooking(ORDER.PAST, USER))
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    setCurrentBooking(userPastBooking)
  }, [userPastBooking, page])

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [])
  )
  const onBackPress = () => {
    navigation.navigate('BookingTabs')
    // BackHandler.exitApp()
    return true
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
  const goToDetail = (item) => {
    const bookingStateData = {
      id: item._id,
      name: item && item.worker && item.worker.name ? item.worker.name : '',
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
      ratingData: item.rating ? item.rating : '',
      Offer: item.offerCode ? item.offerCode : ''
    }
    dispatch({
      type: BOOKING.SUMMARY_STATE_DATA,
      bookingSummaryData: bookingStateData
    })
    eventTriggered(EVENT_CAT.NAV, 'Navigating to order detail')
    navigation.navigate('Details')
  }

  const SlotDetails = (data) => {
    const { bookingslot } = data
    return bookingslot && bookingslot.map(function (item, index) {
      return (
        <View key={index} style={{ flexDirection: 'row' }}>
          <Text key={index} style={ratingDetailsStyles.cookCuisineDetails}>{item.slotTime}</Text>
          <Text key={index} style={[ratingDetailsStyles.cookCuisineDetails, { paddingTop: 3, paddingLeft: 8, fontSize: 8, alignSelf: 'flex-start' }]}>&nbsp;({item.mealType && item.mealType.name ? item.mealType.name : item.name})</Text>
        </View>
      )
    })
  }

  const viewUserImage = () => {
    setIsVisible(!visible)
  }

  const getCook = (imageUrl) => {
    const imagesList = []
    if (imageUrl) {
      imagesList.push(imageUrl)
    }
    setSelectedCookImage(imagesList)
    setIsVisible(!visible)
  }

  const Item = (data) => {
    const { item, index } = data
    const image = (item.details && item.details.cookGender === 'MALE') ? cookMale : cookFemale
    const imageUrl = (item.worker && item.worker && item.worker.user.avatar) ? { uri: `${IMAGE_BASE_URL}${item.worker.user.avatar}` } : image
    return (
      <View key={index} style={[ratingDetailsStyles.cookDetailsContainer, { margin: 10, borderRadius: 30, padding: 23 }]}>
        <View style={ratingDetailsStyles.cookPersonal}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => { getCook(imageUrl) }}
            >
              <Image source={imageUrl} style={ratingDetailsStyles.imagess} />
              <Text style={[ratingDetailsStyles.name, { width: 120 }]} ellipsizeMode='tail' numberOfLines={2}>
                {item && item.worker && item.worker.user && item.worker.user.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={ratingDetailsStyles.status}>
              {(ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_IN_PROGRESS) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_NOT_ACCEPTED) ? STATUSVALUE.REQUEST_IN_PROGRESS : STATUSVALUE[item.status]}
            </Text>
            <View style={ratingDetailsStyles.cookPersonal}>
              <View>
                {item.details && item.details.slot && item.details.slot.length > 0 ? <SlotDetails bookingslot={item.details.slot} /> : null}
              </View>
            </View>
          </View>
        </View>
        <View style={[ratingDetailsStyles.cookContainerLine]}>
          <View style={{ paddingBottom: 12 }}>
            <View style={{ flexDirection: 'row', paddingLeft: 12 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={ratingDetailsStyles.cookCuisines}>Cuisines : </Text>
                <Text style={ratingDetailsStyles.cookCuisineDetails}>{item.details &&
                item.details.cuisine &&
                item.details.cuisine.name ? item.details.cuisine.name : ''}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={[ratingDetailsStyles.flexDirectionStyle, { justifyContent: 'flex-end' }]}>
                  <Text style={ratingDetailsStyles.cookCuisines}>From : </Text>
                  <Text style={ratingDetailsStyles.cookCuisineDetails}>
                    {(ENUMSTATUS[item.status] === ENUMSTATUS.ACCEPTED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_COMPLETED) || (ENUMSTATUS[item.status] === ENUMSTATUS.COMPLETED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_IN_PROGRESS) || (ENUMSTATUS[item.status] === ENUMSTATUS.RESCHEDULED) || (ENUMSTATUS[item.status] === ENUMSTATUS.RESCHEDULED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_NOT_ACCEPTED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_CANCELLED)
                      ? moment(getDates(item.details.slot).fromdate).format(FORMAT.DATE) : getDates(item.details.slot).fromdate}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 12, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={ratingDetailsStyles.cookCuisines}>Member : </Text>
                <Text style={ratingDetailsStyles.cookCuisineDetails}>{item.details && item.details.members}</Text>
              </View>
              <View>
                {
                  getDates(item.details && item.details.slot) && getDates(item.details && item.details.slot).todate !== '' && (
                    <View style={[orders.amountContainer, { justifyContent: 'space-between' }]}>
                      <Text style={ratingDetailsStyles.cookCuisines}>To : </Text>
                      <Text style={ratingDetailsStyles.cookCuisineDetails}>
                        {(ENUMSTATUS[item.status] === ENUMSTATUS.ACCEPTED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_COMPLETED) || (ENUMSTATUS[item.status] === ENUMSTATUS.COMPLETED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_IN_PROGRESS) || (ENUMSTATUS[item.status] === ENUMSTATUS.RESCHEDULED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_NOT_ACCEPTED) || (ENUMSTATUS[item.status] === ENUMSTATUS.REQUEST_CANCELLED)
                          ? moment(getDates(item.details.slot).todate).format(FORMAT.DATE) : getDates(item.details.slot).todate}
                      </Text>
                    </View>
                  )
                }
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={orders.totalPrice}>Total Price</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[orders.totalAmount, { textAlign: 'right' }]}>
                <Icon name='rupee' size={14} color={darkCyan} />&nbsp;{Math.round(item.totalAmount)}
              </Text>
            </View>
          </View>
        </View>
        <View style={[ratingDetailsStyles.cookPersonal, { marginTop: 15 }]}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[orders.orderIdText]}>Order Id :</Text>
              <Text style={orders.orderIdValue}>{item.bookingId}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ alignItems: 'flex-end' }}
            onPress={() => goToDetail(item)}
          >
            <Text style={orders.viewDetailsText}>View Details&nbsp;&nbsp;
              <Ionicons name='ios-arrow-forward' size={12} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <View style={common.containerBackground}>
      <View style={orders.maiContainer}>
        <SafeAreaView
          style={{ marginHorizontal: 15 }}
        >
          {loading ? (
            <Loader />
          ) : (
            currentBooking && currentBooking.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 30 }}
                data={currentBooking}
                renderItem={({ item, index }) => <Item item={item} key={index} index={index} />}
                keyExtractor={item => item.id}
              />
            ) : (
              currentBooking && currentBooking.length === 0 && (
                <View style={{ height: 400 }}>
                  <NoRecords msg={t('no_results_found')} enableEmoji />
                </View>
              )
            )
          )}
        </SafeAreaView>
      </View>
      <ImageViewer
        images={selectedCookImage}
        visible={visible}
        onClose={() => viewUserImage(false)}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  const { userMyBookingReducer } = state
  return {
    userPastBooking: userMyBookingReducer && userMyBookingReducer.userPastBooking ? userMyBookingReducer.userPastBooking : [],
    loading: !!(userMyBookingReducer && userMyBookingReducer.loading)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PastBookings))
