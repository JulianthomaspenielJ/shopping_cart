import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput
} from 'react-native'
import { styles } from '../../assets/styles/checkout'
import { common } from '../../assets/styles/common'
import moment from 'moment'
import { FORMAT, STATUS, PAGE, EVENT_CAT, RESPONSE_MSG, CHECKOUT, PLATFORM } from '../../lib/const'
import {
  COUPON,
  SUMMARY,
  USERDEFAULTADDRESS,
  CREATERAZORORDER,
  CHECKOUT as CHECKOUTAPI
} from '../../type'
import AlertModal from '../ui-components/alertModal'
import { eventTriggered, screenViewed } from '../../lib/ga'
import { connect } from 'react-redux'
import { checkoutAPI, addonsummary, couponApply, createRazorOrder } from '../booking/actions'
import { DEFAULT_ADDRESS_ID, IMAGE_BASE_URL, RAZORPAYKEY, PHONECODE } from 'react-native-dotenv'
import { ratingDetailsStyles } from '../../assets/styles/ratingDetails'
import detailsBg from '../../assets/images/detailBg.png'
import membersImg from '../../assets/icons/checkoutMembers.png'
import checkoutDateImg from '../../assets/icons/calender3.png'
import checkoutClockImg from '../../assets/icons/time.png'
import Spinner from '../ui-components/Spinner'
import { white } from '../../assets/styles/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { withTranslation } from 'react-i18next'
import checked from '../../assets/icons/checked1.png'
import unchecked from '../../assets/icons/unchecked1.png'
import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash'
import { getAppConfig } from '../config/configActions'
import { getVersion } from 'react-native-device-info'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import { userDefaultAddress } from '../location/actions'
import RazorpayCheckout from 'react-native-razorpay'
import Toast from 'react-native-simple-toast'
import ConformationAlertModal from '../ui-components/confirmationAlertModal'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : 56

const Checkout = (props) => {
  const {
    navigation,
    route,
    bookingSummaryData,
    dispatch,
    checkoutStatus,
    checkoutData,
    loading,
    addonsummaryData,
    mealName,
    couponStatus,
    couponErrMsg,
    offerData,
    appConfig,
    getDefaultAddress,
    profileData,
    razorOrderStatus,
    razorOrderData,
    razorOrderStatusPage,
    t
  } = props
  const page = route && route.params && route.params.page
  const [showModal, setShowModal] = useState(false)
  const [checkoutSummaryValue, setCheckoutSummaryValue] = useState(0)
  const [bookingslot, setBookingslot] = useState('')
  const [addonAdditionalVal, setAddonAdditionalVal] = useState('')
  const [bookingDetails, setBookingDetails] = useState('')
  const [bookingDetailsTemp, setBookingDetailsTemp] = useState('')
  const [addOnSummaryValue, setAddOnSummaryValue] = useState(0)
  const [coupon, setCoupon] = useState('')
  const [couponMsg, setCouponMsg] = useState('')
  const [couponVal, setCouponVal] = useState('')
  const [walletSelected, setWalletSelected] = useState(false)
  const [walletAmount, setWalletAmount] = useState('')
  const [, setState] = useState('')
  const [isCheckoutPage, setIsCheckoutPage] = useState(true)// eslint-disable-line
  const [totalAmount, setTotalAmount] = useState(true)
  const [taxAmount, setTaxAmount] = useState(true)
  const [payableWalletAmount, setPayableWalletAmount] = useState(0)
  const [showConformationAlert, setShowConformationAlert] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(userDefaultAddress({ type: USERDEFAULTADDRESS.REQUEST }))
      setCouponVal('')
      setCouponMsg('')
      setCoupon('')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.CHECKOUT)
    crashlytics().log('Checkout page mounted')
  }, [])

  useEffect(() => {
    screenViewed(PAGE.CHECKOUT)
    const reqConfigData = {
      deviceType: Platform.OS === 'ios' ? PLATFORM.IOS : PLATFORM.ANDROID,
      versionCode: getVersion()
    }
    dispatch(getAppConfig(reqConfigData))
    dispatch(userDefaultAddress({ type: USERDEFAULTADDRESS.REQUEST }))
    AsyncStorage.getItem('summaryRequest').then((bookingdata) => {
      setBookingDetails(JSON.parse(bookingdata))
      setBookingDetailsTemp(JSON.parse(bookingdata))
    })
    setAddOnSummaryValue(0)
    setCheckoutSummaryValue(bookingSummaryData.summaryValue)
    setBookingslot(bookingSummaryData.currentbookingSlot)
    setAddonAdditionalVal(bookingSummaryData.addonAdditional)
    if (profileData && profileData.customer && profileData.customer.walletAmount) {
      setWalletAmount(profileData.customer.walletAmount)
      // setWalletAmount(150)
    }
  }, [bookingSummaryData, profileData])

  useEffect(() => {
    if (addonsummaryData && mealName) {
      addonAdditionalVal.map((item) => {
        if (mealName === item.name) {
          item.addonsummaryData = addonsummaryData
          setCheckoutSummaryValue(checkoutSummaryValue + addonsummaryData)
          setAddOnSummaryValue(addOnSummaryValue + addonsummaryData)
          setState({})
          dispatch({
            type: SUMMARY.CLEAR_ADDON_SUMMARY_VALUE
          })
        }
      })
    }
  }, [addonsummaryData, mealName])

  useEffect(() => {
    let summaryValue = 0
    if (checkoutSummaryValue && appConfig) {
      summaryValue = checkoutSummaryValue
    }
    let Tax = 0
    if (appConfig && appConfig.gst) {
      Tax = summaryValue * (appConfig.gst / 100)
    }
    const tot = Math.round(summaryValue) + Math.floor(Tax)
    setTaxAmount(Tax)
    setTotalAmount(tot)
  }, [appConfig, bookingSummaryData, checkoutSummaryValue])

  const onChecked = (key, mealName) => {
    const tempAddonAdditionalVal = addonAdditionalVal
    const tempSummaryRequestVal = bookingDetails
    tempAddonAdditionalVal[key].isSelect = !addonAdditionalVal[key].isSelect
    if (tempAddonAdditionalVal[key].isSelect) {
      setAddonAdditionalVal(tempAddonAdditionalVal)
      setState({})
      const slotfromTime = moment(bookingSummaryData.fromDate).format('YYYY-MM-DDTHH:mm')
      const slottoTime = (bookingSummaryData.toDate ? (moment(bookingSummaryData.toDate).format('YYYY-MM-DDTHH:mm')) : '')
      delete tempSummaryRequestVal.slot
      delete tempSummaryRequestVal.mealType
      const mealType = []
      const slot = []
      mealType.push(addonAdditionalVal[key]._id)
      slot.push({
        mealType: tempAddonAdditionalVal[key]._id,
        fromTime: slotfromTime,
        toTime: slottoTime,
        slotTime: tempAddonAdditionalVal[key].slot[0]
      })
      tempSummaryRequestVal.slot = slot
      tempSummaryRequestVal.mealType = mealType
      dispatch(addonsummary(tempSummaryRequestVal, mealName))
    } else {
      setAddOnSummaryValue(addOnSummaryValue - tempAddonAdditionalVal[key].addonsummaryData)
      setCheckoutSummaryValue(checkoutSummaryValue - tempAddonAdditionalVal[key].addonsummaryData)
    }
  }

  const onWalletChecked = () => {
    setWalletSelected(!walletSelected)
    setState({})
    if (!walletSelected) {
      if (walletAmount > 0) {
        if (walletAmount > totalAmount) {
          setPayableWalletAmount(totalAmount)
        } else {
          setPayableWalletAmount(walletAmount)
        }
      } else {
        setPayableWalletAmount(0)
      }
    } else {
      setPayableWalletAmount(0)
    }
  }

  const onModalClose = () => {
    dispatch({
      type: CHECKOUT.CLEAR
    })
    dispatch({
      type: SUMMARY.CLEAR_SUMMARY_VALUE
    })
    setShowModal(false)
    navigation.navigate('MyBookings', { page: PAGE.CHECKOUT })
  }
  const getAdditionalBookingAvailableMeals = () => {
    const tempBookingMeals = addonAdditionalVal
    return _.filter(tempBookingMeals, { isSelect: true })
  }
  const checkout = (razorpay_payment_id = null) => {
    const tempSummaryRequestVal = bookingDetailsTemp
    const timeRef = tempSummaryRequestVal && tempSummaryRequestVal.slot
    const timeSlotRef = `${timeRef && timeRef[0].fromTime ? (moment(timeRef[0].fromTime).format('YYYY/MM/DD')) : ''} ${timeRef && timeRef[0].slotTime ? moment(timeRef[0].slotTime, 'HH:mm a').format('HH:mm:ss') : ''}`
    const dateTime = moment(new Date(timeSlotRef)).format('YYYY-MM-DDTHH:mm:ss[Z]')
    const slotfromTime = moment(bookingSummaryData.fromDate).format('YYYY-MM-DDTHH:mm')
    const slottoTime = (bookingSummaryData.toDate ? (moment(bookingSummaryData.toDate).format('YYYY-MM-DDTHH:mm')) : '')
    let selectedSlot = {}
    const filtertempBookingMeals = getAdditionalBookingAvailableMeals()
    filtertempBookingMeals.map((item) => {
      tempSummaryRequestVal.mealType.push(item._id)
      selectedSlot = {
        mealType: item._id,
        fromTime: slotfromTime,
        toTime: slottoTime || '',
        slotTime: item.slot[0]
      }
      tempSummaryRequestVal.slot.push(selectedSlot)
    })

    const data = {
      bookingType: 'NORMAL',
      totalAmount: totalAmount,
      address: getDefaultAddress ? getDefaultAddress._id : DEFAULT_ADDRESS_ID,
      offerCode: couponVal._id ? couponVal._id : null,
      taxAmount: taxAmount,
      razorpay_payment_id: razorpay_payment_id
    }
    data.details = tempSummaryRequestVal
    data.details.dateTime = dateTime
    if (walletSelected) {
      data.payableWalletAmount = payableWalletAmount || 0
    }
    if (bookingSummaryData.cookProfileData && bookingSummaryData.cookProfileData._id) {
      data.worker = bookingSummaryData.cookProfileData._id
    }
    analytics().logEvent(PAGE.CHECKOUT, {
      checkout: 'Order Placed'
    })
    eventTriggered(EVENT_CAT.ACTION, 'Order Placed')
    dispatch({
      type: COUPON.CLEAR
    })
    dispatch(checkoutAPI(data))
  }

  useEffect(() => {
    if (checkoutStatus === RESPONSE_MSG.SUCCESS) {
      eventTriggered(EVENT_CAT.ACTION, 'Checkout success')
      setShowModal(true)
    }
    if (checkoutStatus === RESPONSE_MSG.ERROR) {
      eventTriggered(EVENT_CAT.ACTION, 'Checkout Failure')
      Toast.showWithGravity(t('payment_failed'), Toast.LONG, Toast.BOTTOM)
      setShowModal(false)
    }
  }, [checkoutData, checkoutStatus])

  useEffect(() => {
    if (couponStatus === RESPONSE_MSG.SUCCESS && offerData && offerData._id) {
      setCouponMsg('')
      setCouponVal(offerData)
      setTotalAmount(totalAmount - offerData.offerAmount)
    }
    if (couponStatus === RESPONSE_MSG.ERROR) {
      setCouponMsg(couponErrMsg)
    }
  }, [couponStatus, couponErrMsg, offerData])

  const Item = (data) => {
    const { bookingslot } = data
    return bookingslot && bookingslot.map(function (item, index) {
      return (
        <View key={index} style={{ flexDirection: 'row' }}>
          <Text style={[styles.detailsText, styles.checkoutDataText]}>{item.mealType.name ? item.mealType.name : item.name}</Text>
          <Text style={[styles.detailsText, styles.checkoutDataText]}>({item.slotTime})</Text>
        </View>)
    })
  }

  const backToBooking = () => {
    navigation.navigate('BookingTabs')
    dispatch({
      type: SUMMARY.CLEAR_SUMMARY_VALUE
    })
  }

  const applyCoupon = () => {
    setCoupon(coupon.trim())
    if (coupon) {
      const data = {
        code: coupon.trim(),
        orderAmount: Math.round(checkoutSummaryValue)
      }
      dispatch(couponApply(data))
      analytics().logEvent(PAGE.CHECKOUT, {
        coupon: coupon.trim()
      })
    }
  }
  const removeCoupon = () => {
    setTotalAmount(totalAmount - offerData.offerAmount)
    setCouponVal('')
    setCouponMsg('')
    setCoupon('')
    dispatch({
      type: COUPON.CLEAR
    })
  }

  const createRazorpayment = () => {
    setShowConformationAlert(false)
    if (!getDefaultAddress) {
      setShowConformationAlert(true)
      return false
    }
    if (totalAmount > walletAmount || !walletSelected) {
      let amount = totalAmount
      if (walletSelected) {
        amount = totalAmount - walletAmount
      }
      dispatch({
        type: CHECKOUTAPI.REQUEST
      })
      const data = {
        amount: (amount) * 100,
        currency: 'INR',
        receipt: '',
        payment_capture: 1
      }
      dispatch(createRazorOrder(data, 'CHECKOUT'))
    } else {
      checkout()
    }
  }

  useEffect(() => {
    if (razorOrderStatusPage === 'CHECKOUT' && razorOrderStatus === RESPONSE_MSG.SUCCESS && razorOrderData && razorOrderData.id) {
      setIsCheckoutPage(false)
      setState({})
      payment(razorOrderData.id, razorOrderData.amount)
    }
    if (razorOrderStatus === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity(t('create_order_failed'), Toast.LONG, Toast.BOTTOM)
    }
    dispatch({
      type: CREATERAZORORDER.CLEAR
    })
  }, [razorOrderData, razorOrderStatus])

  const payment = (orderId, amount) => {
    const options = {
      description: 'Amount Towards Order',
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
        email: profileData.email ? profileData.email : '',
        contact: profileData ? `${PHONECODE}${profileData.mobileNumber}` : '',
        name: profileData.name
      },
      theme: { color: '#FFC400' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      dispatch({
        type: CREATERAZORORDER.CLEAR
      })
      if (data.razorpay_payment_id) {
        checkout(data.razorpay_payment_id)
      }
      // alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      Toast.showWithGravity(t('create_order_failed'), Toast.LONG, Toast.BOTTOM)
      dispatch({
        type: CREATERAZORORDER.CLEAR
      })
      console.log(error)
      // alert(`Error: ${error.code} | ${error.description}`);
    })
  }

  const getReducedWalletAmount = () => {
    if (totalAmount > walletAmount) {
      const reminingAmount = totalAmount - walletAmount
      const paidAmount = totalAmount - reminingAmount
      return paidAmount
    } else if (totalAmount < walletAmount) {
      const reminingAmount = walletAmount - totalAmount
      const paidAmount = walletAmount - reminingAmount
      return paidAmount
    }
  }

  return (
    <View style={ratingDetailsStyles.container}>
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
            <View style={{ height: HEADER_HEIGHT }} />
          </>
        )
      }
      <ImageBackground
        source={detailsBg}
        style={ratingDetailsStyles.bgImageContainer}
      >
        <TouchableOpacity
          onPress={backToBooking}
        >
          <Text style={{ fontSize: 18, paddingTop: 10, marginTop: 10, marginHorizontal: 10, color: 'white' }}><Icon name='ios-arrow-back' size={20} /> Back </Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={ratingDetailsStyles.ratingContainer}>
        <ScrollView
          style={{ height: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={ratingDetailsStyles.borderPatch} />
          </View>
          <View>
            <Text style={ratingDetailsStyles.titleText}>Checkout</Text>
          </View>
          <View style={ratingDetailsStyles.cookDetailsContainer}>
            <View style={[ratingDetailsStyles.flexDirectionStyle, { marginVertical: 5 }]}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#9AD4B7',
                padding: 10
              }}
              >
                <Image
                  source={{ uri: bookingSummaryData && bookingSummaryData.cusineActiveImg ? `${IMAGE_BASE_URL}${bookingSummaryData.cusineActiveImg}` : '' }}
                  style={ratingDetailsStyles.checkoutImg}
                />
              </View>
              <View style={ratingDetailsStyles.detailsText}>
                <Text style={[styles.detailsText, styles.checkoutDataText]}>{bookingSummaryData.cuisineName}</Text>
                <Text style={page === PAGE.CHECKOUT ? styles.detailText : [styles.detailText, common.paddingTopPrimary]}>Cuisines</Text>
              </View>
            </View>
            <View style={[ratingDetailsStyles.flexDirectionStyle, { marginVertical: 10 }]}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#4871D4',
                padding: 10
              }}
              >
                <Image
                  source={{ uri: bookingSummaryData && bookingSummaryData.foodTypeActiveImg ? `${IMAGE_BASE_URL}${bookingSummaryData.foodTypeActiveImg}` : '' }}
                  style={ratingDetailsStyles.checkoutImg}
                />
              </View>
              <View style={ratingDetailsStyles.detailsText}>
                <Text style={[styles.detailsText, styles.checkoutDataText]}>{bookingSummaryData.typeName}</Text>
                <Text style={styles.detailText}>Food Type</Text>
              </View>
            </View>
            <View style={[ratingDetailsStyles.flexDirectionStyle, { marginVertical: 10 }]}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#DCDEE5',
                padding: 10
              }}
              >
                <Image
                  source={membersImg}
                  style={ratingDetailsStyles.checkoutImg}
                />
              </View>
              <View style={ratingDetailsStyles.detailsText}>
                <Text style={[styles.detailsText, styles.checkoutDataText]}>{bookingSummaryData.members}</Text>
                <Text style={styles.detailText}>Members</Text>
              </View>
            </View>
            <View style={[ratingDetailsStyles.flexDirectionStyle, { marginVertical: 10 }]}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#F9AE81',
                padding: 10
              }}
              >
                <Image
                  source={checkoutDateImg}
                  style={ratingDetailsStyles.checkoutImg}
                />
              </View>
              <View style={ratingDetailsStyles.detailsText}>
                <Text style={[styles.detailsText, styles.checkoutDataText]}>{moment(bookingSummaryData.fromDate).format(FORMAT.DATE)}
                  {bookingSummaryData && bookingSummaryData.toDate ? ` | ${moment(bookingSummaryData.toDate).format(FORMAT.DATE)}` : null}
                </Text>
                <Text style={styles.detailText}>Date</Text>
              </View>
            </View>
            <View style={[ratingDetailsStyles.flexDirectionStyle, { marginVertical: 10 }]}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#C0F7F4',
                padding: 10
              }}
              >
                <Image
                  source={checkoutClockImg}
                  style={ratingDetailsStyles.checkoutImg}
                />
              </View>
              <View style={ratingDetailsStyles.detailsText}>
                {bookingslot && bookingslot.length > 0 ? <Item bookingslot={bookingslot} /> : null}
                <Text style={styles.detailText}>Time</Text>
              </View>
            </View>
          </View>
          {
            addonAdditionalVal && addonAdditionalVal.length > 0 ? (
              <>
                <View>
                  <Text style={ratingDetailsStyles.titleText}>Add</Text>
                </View>
                <View style={[ratingDetailsStyles.cookDetailsContainer, { padding: 12, paddingLeft: 30 }]}>
                  {addonAdditionalVal ? addonAdditionalVal.map((item, index) => {
                    return (
                      <View key={index} style={[styles.checkbox, { paddingVertical: 6 }]}>
                        <TouchableOpacity
                          onPress={() => onChecked(index, item.name)}
                        >
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}
                          >
                            <Image
                              source={item.isSelect ? checked : unchecked} style={{
                                width: 17,
                                height: 17
                              }}
                            />
                            <Text style={styles.checkboxLabel}>{`${item.name} for additional`}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  }) : null}
                </View>
              </>
            ) : null
          }
          <View style={styles.coupon}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2, alignContent: 'center', justifyContent: 'center' }}>
                <TextInput
                  style={styles.couponstext}
                  value={coupon}
                  onChangeText={(val) => setCoupon(val)}
                  placeholder='Coupon code'
                />
              </View>
              <TouchableOpacity
                style={styles.couponsSec}
                onPress={() => couponVal.offerAmount ? removeCoupon() : applyCoupon()}
              >
                <Text style={styles.couponsapply}>{couponVal.offerAmount ? 'Remove' : 'Apply'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.priceContainerSec, { paddingTop: 15 }]}>
            <Text style={styles.couponErr}>{couponMsg}</Text>
          </View>
          <View style={{ padding: 0, paddingLeft: 18 }}>
            <View style={[styles.checkbox, { paddingVertical: 0 }]}>
              <TouchableOpacity
                onPress={() => onWalletChecked()}
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
                  <Text style={styles.checkboxLabel}>Use Your {`${Math.floor(walletAmount) || 0} Rs`} Baco Wallet Balance</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.priceContainerSec, { paddingTop: 15 }]}>
            <View style={styles.totalHolder}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceLabelOther}>Booking Charges</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceTotalOther}>{`${Math.round(bookingSummaryData.summaryValue)} Rs`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceContainerSec}>
            <View style={styles.totalHolder}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceLabelOther}>Add - On</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceTotalOther}>{addOnSummaryValue ? `${Math.round(addOnSummaryValue)} Rs` : '0 Rs'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceContainerSec}>
            <View style={styles.totalHolder}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceLabelOther}>Wallet</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceTotalOther}>{walletSelected ? getReducedWalletAmount() : 0} Rs</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceContainerSec}>
            <View style={styles.totalHolder}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceLabelOther}>Tax</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceTotalOther}>{taxAmount || '0'}&nbsp;Rs</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceContainerSec}>
            <View style={styles.totalHolder}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceLabelOther}>Coupon</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.priceTotalOther, styles.couponErr]}>{couponVal.offerAmount ? `-${couponVal.offerAmount} Rs` : '0 Rs'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.totalHolder}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.priceLabel, { width: '100%' }]}>Total</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.priceTotal, { width: '100%' }]}>{`${totalAmount} Rs`}</Text>
              </View>
            </View>
          </View>
          {
            walletSelected && walletAmount > 0 && (totalAmount > walletAmount) ? (
              <View style={styles.priceContainer}>
                <View style={styles.totalHolder}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.priceLabel, { width: '100%' }]}>Pay Remaining</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.priceTotal, { width: '100%' }]}>{`${totalAmount - walletAmount} Rs`}</Text>
                  </View>
                </View>
              </View>
            ) : null
          }
          {
            !getDefaultAddress && !loading &&
              <View style={{ paddingBottom: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.push('SetLocationMap')}
                  style={{
                    alignContent: 'flex-end',
                    alignSelf: 'flex-end',
                    backgroundColor: '#1565C0',
                    borderRadius: 18
                  }}
                >
                  <Text style={styles.addaddress}>Add Address</Text>
                </TouchableOpacity>
              </View>
          }
          <TouchableOpacity
            onPress={() => createRazorpayment()}
            disabled={loading}
          >
            <View style={[styles.checkout, { paddingVertical: 18, borderRadius: 15 }]}>
              {
                loading ? <Spinner /> : (
                  <View style={styles.checkooutBtn}>
                    <Text style={styles.checkoutBtnColor}>Payment</Text>
                    <Icon name='ios-arrow-forward' style={{ paddingTop: 2 }} size={18} />
                  </View>
                )
              }
            </View>
          </TouchableOpacity>
          <AlertModal
            type={STATUS.SUCCESS}
            show={showModal}
            onClose={() => onModalClose()}
            message='Payment Success'
          />
        </ScrollView>
      </View>
      <ConformationAlertModal
        show={showConformationAlert}
        t={t}
        conformatiomButtonText='Ok'
        onClose={() => setShowConformationAlert(false)}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  const { customerBookReducer, mapLocationReducer, configReducer, profileReducer } = state
  return {
    bookingSummaryData: customerBookReducer && customerBookReducer.bookingSummaryData ? customerBookReducer.bookingSummaryData : '',
    checkoutData: customerBookReducer && customerBookReducer.checkoutData ? customerBookReducer.checkoutData : '',
    checkoutStatus: customerBookReducer && customerBookReducer.checkoutStatus ? customerBookReducer.checkoutStatus : '',
    cancelorder: customerBookReducer && customerBookReducer.cancelorder ? customerBookReducer.cancelorder : '',
    summaryValue: customerBookReducer && customerBookReducer.summaryValue ? customerBookReducer.summaryValue : '',
    addonsummaryData: customerBookReducer && customerBookReducer.addonsummaryData ? customerBookReducer.addonsummaryData : '',
    mealName: customerBookReducer && customerBookReducer.mealName ? customerBookReducer.mealName : '',
    couponStatus: customerBookReducer && customerBookReducer.couponStatus ? customerBookReducer.couponStatus : '',
    couponErrMsg: customerBookReducer && customerBookReducer.couponErrMsg ? customerBookReducer.couponErrMsg : '',
    offerData: customerBookReducer && customerBookReducer.offerData ? customerBookReducer.offerData : '',
    getDefaultAddress: mapLocationReducer && mapLocationReducer.getDefaultAddress ? mapLocationReducer.getDefaultAddress : '',
    appConfig: configReducer && configReducer.appConfig ? configReducer.appConfig : null,
    loading: customerBookReducer && customerBookReducer.loading ? customerBookReducer.loading : '',
    razorOrderData: customerBookReducer && customerBookReducer.razorOrderData ? customerBookReducer.razorOrderData : '',
    razorOrderStatus: customerBookReducer && customerBookReducer.razorOrderStatus ? customerBookReducer.razorOrderStatus : '',
    razorOrderStatusPage: customerBookReducer && customerBookReducer.razorOrderStatusPage ? customerBookReducer.razorOrderStatusPage : '',
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Checkout))
