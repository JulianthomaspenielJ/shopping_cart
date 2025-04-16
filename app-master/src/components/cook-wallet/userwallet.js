import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Modal,
  TextInput
} from 'react-native'
import Header from '../ui-components/header'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { customerWallet } from '../../assets/styles/customerWallet'
import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { corn, gold, black, white } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import walletImg from '../../assets/icons/userWallet.png'
import refundImg from '../../assets/icons/refund.png'
import rescheduleImg from '../../assets/icons/reschedule.png'
import cancelImg from '../../assets/icons/cancel_book.png'
import bookingImg from '../../assets/icons/booking.png'
import CustomStatusBar from '../ui-components/statusbar'
import { updateUserWallet, transcationList } from './actions'
import { PROFILE, RESPONSE_MSG, REGEX, EVENT_CAT, PAGE, USER } from '../../lib/const'
import moment from 'moment'
import modalStyles from '../../assets/styles/modal'
import { welcomeCookStyles } from '../../assets/styles/welcomeCook'
import Spinner from '../ui-components/Spinner'
import { getProfile } from '../profile/actions'
import { UPDATEWALLET, CREATERAZORORDER, CHECKOUT as CHECKOUTAPI } from '../../type'
import Toast from 'react-native-simple-toast'
import { eventTriggered } from '../../lib/ga'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import NoRecords from '../ui-components/noRecords'
// import SvgUri from 'react-native-svg-uri'
// import walletBg from '../../assets/icons/userWallet.svg'
// import refund from '../../assets/icons/refund.svg'
// import { styles } from '../../assets/styles/header'
import { createRazorOrder } from '../booking/actions'
import RazorpayCheckout from 'react-native-razorpay'
import { RAZORPAYKEY, PHONECODE } from 'react-native-dotenv'

const UserWallet = (props) => {
  const {
    navigation,
    dispatch,
    loading,
    profileData,
    checkUpdateWallet,
    transcationsData,
    razorOrderData,
    razorOrderStatus,
    razorOrderStatusPage,
    t,
    appConfig
  } = props
  const [showTranscationList, setShowTranscationList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [walletAmount, setWalletAmount] = useState(0)
  const [requestAmount, setRequestAmount] = useState(0)
  const [, setState] = useState('')
  const [, setCustomerId] = useState('')
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      if (profileData && profileData.customer) {
        setCustomerId(profileData.customer._id)
        setWalletAmount(profileData.customer.walletAmount)
        dispatch(transcationList(USER, profileData.customer._id))
      } else {
        setWalletAmount(0)
      }
    })
    return unsubscribe
  }, [navigation, profileData])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.WALLET)
    analytics().logEvent(PAGE.WALLET, { })
    crashlytics().log('Cook wallet page mounted')
  }, [])

  useEffect(() => {
    setShowTranscationList(transcationsData)
  }, [transcationsData])

  useEffect(() => {
    if (profileData && profileData.customer && profileData.customer.walletAmount) {
      setWalletAmount(profileData.customer.walletAmount)
    }
  }, [profileData])

  const changeRequestAmount = (value) => {
    if (value > 0 && REGEX.AMOUNT.test(value)) {
      setRequestAmount(value)
    } else {
      setRequestAmount('')
      Toast.showWithGravity(t('valid_amount'), Toast.LONG, Toast.BOTTOM)
    }
  }

  useEffect(() => {
    if ((checkUpdateWallet.status === RESPONSE_MSG.SUCCESS)) {
      eventTriggered(EVENT_CAT.ACTION, 'Wallet Added')

      if (checkUpdateWallet.status === RESPONSE_MSG.SUCCESS) {
        Toast.showWithGravity('Your wallet amount added', Toast.LONG, Toast.BOTTOM)
      }
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      dispatch(transcationList(USER, profileData.customer._id))
      setShowModal(false)
      setRequestAmount(0)
      dispatch({
        type: UPDATEWALLET.CLEAR
      })
    }
  }, [checkUpdateWallet])

  const updateWallet = () => {
    eventTriggered(EVENT_CAT.ACTION, 'Update wallet')
    const totAmt = parseInt(walletAmount) + (requestAmount ? parseInt(requestAmount) : 0)
    if (totAmt < 500) {
      Toast.showWithGravity(`${t('min_amount_msg')} \u20B9${appConfig.minimumWallet ? appConfig.minimumWallet : 0}`, Toast.LONG, Toast.BOTTOM)
    } else {
      dispatch({ type: UPDATEWALLET.REQUEST })
      createRazorpayment(requestAmount)
    }
  }

  const createRazorpayment = (amount) => {
    dispatch({
      type: CHECKOUTAPI.REQUEST
    })
    const data = {
      amount: (amount * 100),
      currency: 'INR',
      receipt: '',
      payment_capture: 1
    }
    dispatch(createRazorOrder(data, 'USERWALLET'))
  }

  useEffect(() => {
    if (razorOrderStatusPage === 'USERWALLET' && razorOrderStatus === RESPONSE_MSG.SUCCESS && razorOrderData && razorOrderData.id) {
      setShowModal(false)
      setState({})
      setTimeout(() => { payment(razorOrderData.id, razorOrderData.amount) }, 1000)
    }
    if (razorOrderStatus === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity('Failed to create order', Toast.LONG, Toast.BOTTOM)
      dispatch({
        type: CREATERAZORORDER.CLEAR
      })
    }
  }, [razorOrderData, razorOrderStatus])

  const payment = (orderId, amount) => {
    const options = {
      description: 'Amount Towards Wallet',
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
    return (
      <>
        <Modal>
          {
            RazorpayCheckout.open(options).then((data) => {
            // handle success

              if (data.razorpay_payment_id) {
                dispatch(updateUserWallet(requestAmount, data.razorpay_payment_id))
                dispatch({
                  type: CREATERAZORORDER.CLEAR
                })
              }
            // alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
              Toast.showWithGravity('Failed to add wallet', Toast.LONG, Toast.BOTTOM)
              dispatch({
                type: CREATERAZORORDER.CLEAR
              })
              console.log(error)
            // alert(`Error: ${error.code} | ${error.description}`);
            })
          }
        </Modal>
      </>
    )
  }

  const Item = (data) => {
    const { item } = data
    return item.map((datas, index) => {
      let bgImage
      let color
      let amount
      let status
      if (datas.paymentType === 'PAY_IN') {
        bgImage = bookingImg
        // bgImage = 'https://bookacook.s3.amazonaws.com/profile/admin/5e9410142a0e15147e6c5fac/4828104a-9b63-4613-9266-e4e5ee7c860c'
        amount = `-${datas.amount ? datas.amount : 0}`
        color = '#BA251C'
        status = 'Booking'
      } else if (datas.paymentType === 'REFUND') {
        bgImage = refundImg
        // bgImage = 'https://bookacook.s3.amazonaws.com/profile/admin/5e9410142a0e15147e6c5fac/6935b3b0-9272-4c72-a094-6ae30cc25f2e'
        amount = `+${datas.amount ? datas.amount : 0}`
        color = '#2433BD'
        status = 'Refunded'
      } else if (datas.paymentType === 'CANCEL') {
        bgImage = cancelImg
        // bgImage = 'https://bookacook.s3.amazonaws.com/profile/admin/5e9410142a0e15147e6c5fac/0b1e399c-d1e4-4485-8be0-395eb0dcef24'
        amount = `+${datas.amount ? datas.amount : 0}`
        color = '#2433BD'
        status = 'Cancelled'
      } else if (datas.paymentType === 'RESCHEDULED') {
        bgImage = rescheduleImg
        // bgImage = 'https://bookacook.s3.amazonaws.com/profile/admin/5e9410142a0e15147e6c5fac/4345183d-0c86-4855-8b58-dc64f9593800'
        amount = `-${datas.amount ? datas.amount : 0}`
        color = '#BA251C'
        status = 'Re-Scheduled'
      } else if (datas.paymentType === 'DEPOSIT') {
        bgImage = walletImg
        // bgImage = 'https://bookacook.s3.amazonaws.com/profile/admin/5e9410142a0e15147e6c5fac/3e5870fb-d0a3-4022-a803-7a55ba266e90'
        amount = `+${datas.amount ? datas.amount : 0}`
        color = '#2433BD'
        status = 'Money Added'
      } else {
        bgImage = bookingImg
        // bgImage = 'https://bookacook.s3.amazonaws.com/profile/admin/5e9410142a0e15147e6c5fac/4828104a-9b63-4613-9266-e4e5ee7c860c'
        amount = `+${datas.amount ? datas.amount : 0}`
        color = '#2433BD'
        status = datas.status
      }
      return (
        <View key={index} style={[customerWallet.rupeeContainer, customerWallet.spaceBetween, customerWallet.transactionContainer]}>
          <View style={customerWallet.rupeeContainer}>
            <View>
              <Image
                source={bgImage}
                style={customerWallet.walletImg}
              />
              {/* <SvgUri
              style={customerWallet.walletImg}
              source={walletBg}
              /> */}
            </View>
            <View style={[customerWallet.transactionDateContainer, { paddingTop: 0 }]}>
              {/* <Text style={[customerWallet.transactionText, customerWallet.family]}>{datas.transcationId}</Text> */}
              <Text style={[customerWallet.transactionText, customerWallet.family]}>{status}</Text>
              <Text style={[customerWallet.dateText, customerWallet.family]}>{moment(datas.createdAt).format('ll')}</Text>
            </View>
          </View>
          <View>
            <View style={[customerWallet.rupeeContainer, customerWallet.amountContainer]}>
              <Text style={[customerWallet.amount, customerWallet.family, { color: color }]}>{Math.floor(amount)}</Text>
              <Icon name='rupee' size={16} style={[customerWallet.rupeeIcon, { color: color }]} />
            </View>
          </View>
        </View>
      )
    })
  }

  return (
    <View style={customerWallet.mainContainerFluid}>
      {Platform.OS === 'ios' && <CustomStatusBar navigation={navigation} />}
      <Header title={t('wallet')} subMenu hamburger navigation={navigation} />

      {/* <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 30
      }}
      >
        <TouchableOpacity style={customerWallet.hederSec} onPress={() => navigation.navigate('BookingTabs')}>

          <Text style={{fontSize: 18}}><IonIcon name='ios-arrow-back' style={customerWallet.arrowIcon} size={26} /> Back</Text>
        </TouchableOpacity>
        <Text style={customerWallet.title}>Wallet</Text>

        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={customerWallet.menuImg} source={menu} />
        </TouchableOpacity>
      </View> */}
      <View style={customerWallet.mainContainer}>
        <View style={{ height: 120 }}>
          <View style={[customerWallet.walletBgImageContainer]}>
            <View style={[customerWallet.rupeeContainer, customerWallet.spaceBetween]}>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={customerWallet.balanceText}>{t('current_balance')}</Text>
                  </View>

                </View>
                <View style={customerWallet.rupeeContainer}>
                  <Icon name='rupee' size={10} color='#7C8AAB' style={[customerWallet.icon, customerWallet.iconText]} />
                  <Text style={customerWallet.iconText}>{Math.round(walletAmount)}</Text>
                </View>
              </View>
              <View style={{ paddingTop: 10 }}>
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={{ backgroundColor: '#1C4878', borderRadius: 15 }}
                >
                  <Text style={customerWallet.addmoney}>{t('add_money')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={[customerWallet.rupeeContainer, customerWallet.spaceBetween]}>
          <View>
            <Text style={customerWallet.recentTransaction}>{t('recent_transactions')}</Text>
          </View>
        </View>
        {
          showTranscationList && showTranscationList.length > 0 ? (
            <FlatList
              data={showTranscationList}
              renderItem={
                ({ item, index }) => (
                  <>
                    <View>
                      <Text style={customerWallet.month}>{moment(item._id.month, 'M').format('MMMM')}</Text>
                    </View>
                    <Item item={item.transcationsDetail} key={index} index={index} />
                    <View style={customerWallet.borderLayer} />
                  </>)
              }
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={{ height: 200 }}>
              <NoRecords msg={t('no_transactions_found')} enableEmoji />
            </View>
          )
        }
      </View>
      <Modal
        visible={showModal}
        animationType='fade'
        transparent
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 2 }}>
                <Text style={{
                  color: black,
                  fontSize: 16,
                  fontWeight: '500'
                }}
                >
                  Add Money to Wallet
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => setShowModal(false)}>
                  <IonIcon name='ios-close' style={{ fontSize: 35 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>Wallet Balance <Icon name='rupee' style={{ fontSize: 12 }} /> {Math.round(walletAmount)}</Text>
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 40, borderBottomWidth: 2, borderBottomColor: gold }}>
              <Icon name='rupee' style={{ fontSize: 20 }} />
              <TextInput
                style={{
                  width: '100%',
                  fontSize: 16,
                  paddingLeft: 15,
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingVertical: 15
                }}
                keyboardType='numeric'
                placeholder='Amount'
                onChangeText={(value) => changeRequestAmount(value)}
                value={requestAmount}
              />
            </View>
            <TouchableOpacity
              underlayColor={white}
              disabled={!requestAmount}
              onPress={() => updateWallet()}
            >
              <LinearGradient
                colors={[gold, corn]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={[modalStyles.gradientButton, welcomeCookStyles.payButton]}
              >
                {loading ? <Spinner /> : <Text style={modalStyles.gradientButtonText}>Proceed</Text>}
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { walletReducer, profileReducer, customerBookReducer, configReducer } = state
  return {
    checkUpdateWallet: walletReducer && walletReducer.checkUpdateWallet ? walletReducer.checkUpdateWallet : '',
    transcationsData: walletReducer && walletReducer.transcationsData ? walletReducer.transcationsData : '',
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    loading: customerBookReducer && customerBookReducer.loading ? customerBookReducer.loading : '',
    razorOrderData: customerBookReducer && customerBookReducer.razorOrderData ? customerBookReducer.razorOrderData : '',
    razorOrderStatus: customerBookReducer && customerBookReducer.razorOrderStatus ? customerBookReducer.razorOrderStatus : '',
    razorOrderStatusPage: customerBookReducer && customerBookReducer.razorOrderStatusPage ? customerBookReducer.razorOrderStatusPage : '',
    appConfig: configReducer && configReducer.appConfig ? configReducer.appConfig : null

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserWallet))
