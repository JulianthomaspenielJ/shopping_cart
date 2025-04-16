import React, { useState, useEffect } from 'react'
import {
  Platform,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native'
import Header from '../ui-components/header'
import { styles } from '../../assets/styles/checkout'
import { common } from '../../assets/styles/common'
import cuisines from '../../assets/images/cuisines.jpg'
import call from '../../assets/icons/call.png'
import { STATUS, rupee, PAGE, USER, COOK, KEY, EVENT_CAT, RESPONSE_MSG, CHECKOUT, FORMAT } from '../../lib/const'
import GradiantButton from '../../components/ui-components/gradiantButton'
import { gradiant } from '../../assets/styles/grandiantButton'
import AlertModal from '../ui-components/alertModal'
import Cook from './cook'
import RatingModal from '../ui-components/ratingModal'
import { getData } from '../../lib/storage'
import CancelOrderModal from '../ui-components/cancelOrderModal'
import { AirbnbRating } from 'react-native-ratings'
import { screenViewed, eventTriggered } from '../../lib/ga'
import { connect } from 'react-redux'
import { checkoutAPI, cancelorder } from '../booking/actions'
import { DEFAULT_ADDRESS_ID } from 'react-native-dotenv'
import CustomStatusBar from '../ui-components/statusbar'
import { sendRatings } from '../user-bookings/actions'
import Toast from 'react-native-simple-toast'
import { RATING } from '../../type'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import moment from 'moment'

const CookDetails = (props) => {
  const {
    navigation,
    route,
    bookingSummaryData,
    summaryRequest,
    dispatch,
    checkoutStatus,
    checkoutData,
    loading,
    t,
    myRatingstatus
  } = props
  const page = route && route.params && route.params.page
  const {
    summaryData,
    id,
    ratingData
  } = bookingSummaryData
  const [userType, setUserType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [showCanelModal, setShowCancelModal] = useState(false)
  const title = page === PAGE.CHECKOUT ? 'Checkout' : 'Detail'
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [summaryValue, setSummaryValue] = useState('')
  const [summaryRequestVal, setSummaryRequestVal] = useState('')
  const [bookingslot, setBookingslot] = useState('')
  const [comments, setComments] = useState('')
  const [ratingErr, setRatingErr] = useState('')
  const showProfile = false

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.ORDERDETAIL)
    analytics().logEvent(PAGE.ORDERDETAIL, { })
    crashlytics().log('Order detail page mounted')
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.USER_TYPE)
        .then(user => {
          if (user) {
            setUserType(user)
          }
          if (page === PAGE.DETAIL) {
            setShowRating(false)
            screenViewed(PAGE.DETAIL)
          } else {
            screenViewed(PAGE.CHECKOUT)
          }
        })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    setSummaryValue(summaryData)
    setSummaryRequestVal(summaryRequest)
    setBookingslot(bookingSummaryData.currentbookingSlot)
    if (!summaryData && bookingSummaryData.bookingDetail) {
      setSummaryValue(bookingSummaryData.summaryData)
    }
    if (!summaryRequest && bookingSummaryData.bookingDetail) {
      setSummaryRequestVal(bookingSummaryData.bookingDetail)
      setBookingslot(bookingSummaryData.bookingDetail.slot)
    }
  }, [summaryData, bookingSummaryData, summaryRequest])

  useEffect(() => {
    if (ratingData) {
      if (ratingData.customerRating) {
        setRating(ratingData.customerRating)
      }
    } else {
      setRating(0)
    }
    if (ratingData) {
      if (ratingData.customerComment) {
        setComments(ratingData.customerComment)
      } else {
        setComments('')
      }
    } else {
      setComments('')
    }
  }, [bookingSummaryData])

  const onModalClose = () => {
    dispatch({
      type: CHECKOUT.CLEAR
    })
    setShowModal(false)
    navigation.navigate('MyBookings', { page: PAGE.CHECKOUT })
  }
  const checkout = () => {
    const tempSummaryRequestVal = summaryRequestVal
    const data = {
      bookingType: 'NORMAL',
      totalAmount: summaryValue,
      address: DEFAULT_ADDRESS_ID
    }
    data.details = tempSummaryRequestVal
    eventTriggered(EVENT_CAT.NAV, 'Navigating to my booking')
    dispatch(checkoutAPI(data))
  }
  useEffect(() => {
    if (checkoutStatus === RESPONSE_MSG.SUCCESS) {
      setShowModal(true)
    }
  }, [checkoutData, checkoutStatus])

  const onRating = (r, c) => {
    setShowRating(false)
    setRating(r)
    setComment(c)
  }

  const handleCancelOrder = () => {
    setShowCancelModal(true)
  }

  const onCloseCanelModal = () => {
    setShowCancelModal(false)
  }

  const onCancelOrder = () => {
    const data = {
      cancelledReason: 'cancel'
    }
    setShowCancelModal(false)
    eventTriggered(EVENT_CAT.ACTION, 'Order cancelled')
    dispatch(cancelorder(bookingSummaryData.bookingId, data))
    navigation.navigate('OrderTabs', { page: PAGE.CHECKOUT })
  }

  const Item = (data) => {
    const { bookingslot } = data
    return bookingslot && bookingslot.map(function (item, index) {
      return (
        <View key={index} style={{ flexDirection: 'row' }}>
          <Text style={styles.detailText}>{item.mealType && item.mealType.name ? item.mealType.name : item.name}</Text>
          <Text style={styles.detailText}>({item.slotTime})</Text>
        </View>)
    })
  }

  const handleRating = (r) => {
    if (ratingData && ratingData.customerRating) {
      setRating(ratingData.customerRating)
    } else {
      setRating(r)
    }
  }

  const secondHandle = (event) => {
    setComments(event)
  }

  const submitRating = () => {
    if (rating) {
      const data = {
        booking: id,
        customerRating: `${rating}`,
        customerComment: comments
      }
      setRatingErr('')
      dispatch(sendRatings(data))
    } else {
      setRatingErr(t('choose_rating'))
    }
  }

  useEffect(() => {
    if (myRatingstatus === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity('Rating updated successfully.', Toast.LONG, Toast.BOTTOM)
      dispatch({ type: RATING.CLEAR })
    }
  }, [myRatingstatus])
  return (
    <View style={common.containerBackground}>
      {Platform.OS === 'ios' && <CustomStatusBar navigation={navigation} />}
      <Header title={title} subMenu navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.summary, common.shadow]}>
            <ImageBackground
              source={cuisines}
              style={styles.banner}
              imageStyle={styles.bannerStyle}
            />
            <View style={styles.details}>
              {showProfile && page === PAGE.CHECKOUT ? <Cook /> : null}
              <View style={{ flexDirection: 'row' }}>
                <Text style={page === PAGE.CHECKOUT ? styles.detailText : [styles.detailText, common.paddingTopPrimary]}>Cuisines : {bookingSummaryData.cuisineName}</Text>
                {page === PAGE.DETAIL && userType === COOK ? (
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => handleCancelOrder()}>
                    <Text style={[styles.detailText, styles.cancelOrder]}>Cancel Order</Text>
                  </TouchableOpacity>) : null}
              </View>
              <Text style={styles.detailText}>Food Type : {bookingSummaryData.typeName}</Text>
              <Text style={styles.detailText}>Total Members : {bookingSummaryData.members}</Text>
              <Text style={styles.detailText}>From Date : {moment(bookingSummaryData.fromDate).format(FORMAT.DATE)}
                {bookingSummaryData && bookingSummaryData.toDate ? ` | ${moment(bookingSummaryData.toDate).format(FORMAT.DATE)}` : null}
              </Text>
              {bookingslot && bookingslot.length > 0 ? <Item bookingslot={bookingslot} /> : null}
              {page === PAGE.DETAIL && userType === USER && bookingSummaryData.cookDetail ? (
                <View style={styles.detailCookHolder}>
                  <View>
                    <Cook cookDetails={bookingSummaryData.cookDetail} />
                  </View>
                  <View style={styles.callHolder}>
                    <Image source={call} style={{ width: 30, height: 30 }} />
                  </View>
                </View>) : null}
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.totalHolder}>
                <Text style={styles.priceLabel}>Total Price</Text>
                <Text style={styles.priceTotal}>{`${rupee} ${summaryValue}`}</Text>
              </View>
            </View>
            {bookingSummaryData.status === 'COMPLETED' ? (
              <>
                <View style={{
                  marginVertical: 10,
                  paddingHorizontal: 15
                }}
                >
                  <Text style={
                    styles.priceLabel
                  }
                  >
                    Rating
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  justifyContent: 'space-between'
                }}
                >
                  <AirbnbRating
                    isDisabled={!!ratingData}
                    defaultRating={rating}
                    showRating={false}
                    ratingBackgroundColor='#e6eef9'
                    starStyle={{ width: 25, height: 25 }}
                    onFinishRating={(r) => handleRating(r)}
                  />
                  <Text style={[styles.priceTotal, { paddingRight: 10 }]}>{rating}</Text>
                </View>
                <Text style={{
                  color: '#ff0101',
                  paddingHorizontal: 20,
                  paddingVertical: 10
                }}
                >{ratingErr || ''}
                </Text>
                <View style={{
                  marginTop: 10,
                  paddingHorizontal: 15
                }}
                >
                  <Text style={
                    styles.priceLabel
                  }
                  >
                    Comments
                  </Text>
                </View>
                <View style={{
                  paddingHorizontal: 15
                }}
                >
                  <TextInput
                    style={{
                      marginVertical: 15,
                      height: 60,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      paddingLeft: 15,
                      color: 'black'
                    }}
                    editable={!ratingData}
                    underlineColorAndroid='transparent'
                    placeholder='Give your valuable comments.....'
                    placeholderTextColor='#509696'
                    multiline
                    numberOfLines={5}
                    autoCapitalize='none'
                    onChangeText={secondHandle}
                    value={comments}
                  />
                  {ratingData ? null : (
                    <TouchableOpacity
                      onPress={submitRating}
                      style={{
                        backgroundColor: '#ffc400',
                        padding: 15,
                        alignItems: 'center',
                        borderRadius: 15
                      }}
                    >
                      <Text style={{
                        color: 'white'
                      }}
                      >Submit
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : null}
            {(page === PAGE.CHECKOUT && !checkoutStatus) ? (
              <View style={styles.btnHolder}>
                <GradiantButton
                  label='Pay'
                  loading={loading}
                  onPress={() => checkout()}
                  bottonStyle={gradiant.container}
                  labelStyle={gradiant.btnLabel}
                />
              </View>) : null}
          </View>
          {rating && comment && page === PAGE.DETAIL ? (
            <View style={styles.ratingContent}>
              <Text style={styles.rateTitle}>Rating</Text>
              <View style={styles.ratingHolder}>
                <AirbnbRating
                  isDisabled
                  defaultRating={rating}
                  showRating={false}
                  starStyle={{ width: 20, height: 20 }}
                  onFinishRating={() => {}}
                />
              </View>
              <Text style={styles.rateTitle}>Comment</Text>
              <Text style={styles.comment}>{comment}</Text>
            </View>) : null}
        </View>
      </ScrollView>
      <AlertModal
        type={STATUS.SUCCESS}
        show={showModal}
        onClose={() => onModalClose()}
        message='Payment Success'
      />
      <RatingModal
        userType={userType}
        show={showRating}
        onClose={(r, c) => onRating(r, c)}
      />
      <CancelOrderModal
        show={showCanelModal}
        onClose={() => onCloseCanelModal()}
        onCancelOrder={() => onCancelOrder()}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  const { customerBookReducer, userMyBookingReducer } = state
  return {
    summaryData: customerBookReducer && customerBookReducer.summaryData ? customerBookReducer.summaryData : '',
    bookingSummaryData: customerBookReducer && customerBookReducer.bookingSummaryData ? customerBookReducer.bookingSummaryData : '',
    summaryRequest: customerBookReducer && customerBookReducer.summaryRequest ? customerBookReducer.summaryRequest : '',
    checkoutData: customerBookReducer && customerBookReducer.checkoutData ? customerBookReducer.checkoutData : '',
    checkoutStatus: customerBookReducer && customerBookReducer.checkoutStatus ? customerBookReducer.checkoutStatus : '',
    cancelorder: customerBookReducer && customerBookReducer.cancelorder ? customerBookReducer.cancelorder : '',
    loading: customerBookReducer && customerBookReducer.loading ? customerBookReducer.loading : '',
    myRatingstatus: userMyBookingReducer && userMyBookingReducer.myRatingstatus ? userMyBookingReducer.myRatingstatus : ''

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookDetails)
