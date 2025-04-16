import React, { useState, useEffect } from 'react'
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Modal,
  TextInput,
  TouchableHighlight
} from 'react-native'
import Header from '../ui-components/header'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { cookWallet } from '../../assets/styles/wallet'
import walletBg from '../../assets/images/walletBg.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { grey20, corn, gold, black, white } from '../../assets/styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import walletImg from '../../assets/icons/wallet.png'
import CustomStatusBar from '../ui-components/statusbar'
import { updateUserWallet, withdraw, withdrawList, transcationList } from './actions'
import { PROFILE, RESPONSE_MSG, REGEX, EVENT_CAT, PAGE, PAYMENTSTATUSVALUE, COOK } from '../../lib/const'
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
import RazorpayCheckout from 'react-native-razorpay'
import { RAZORPAYKEY, PHONECODE } from 'react-native-dotenv'
import { createRazorOrder } from '../booking/actions'

const Wallet = (props) => {
  const {
    navigation,
    dispatch,
    loading,
    profileData,
    checkUpdateWallet,
    checkWithdrawWallet,
    transcationsData,
    razorOrderStatusPage,
    razorOrderStatus,
    razorOrderData,
    appConfig,
    t
  } = props
  const [showTranscationList, setShowTranscationList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showWithDrawModal, setShowWithDrawModal] = useState(false)
  const [walletAmount, setWalletAmount] = useState(0)
  const [requestAmount, setRequestAmount] = useState(0)
  const [, setState] = useState()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      dispatch(withdrawList())
      if (profileData && profileData.worker && profileData.worker.walletAmount > 0) {
        setWalletAmount(profileData.worker.walletAmount)
        dispatch(transcationList(COOK, profileData.worker._id))
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
    setShowTranscationList(transcationsData.transcationList)
  }, [transcationsData])

  useEffect(() => {
    if (profileData && profileData.worker && profileData.worker.walletAmount) {
      setWalletAmount(profileData.worker.walletAmount)
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
    if ((checkUpdateWallet.status === RESPONSE_MSG.SUCCESS) || (checkWithdrawWallet.status === RESPONSE_MSG.SUCCESS)) {
      eventTriggered(EVENT_CAT.ACTION, 'Wallet Added')

      if (checkUpdateWallet.status === RESPONSE_MSG.SUCCESS) {
        Toast.showWithGravity(t('wallet_added'), Toast.LONG, Toast.BOTTOM)
      }
      if (checkWithdrawWallet.status === RESPONSE_MSG.SUCCESS) {
        Toast.showWithGravity(t('request_processing'), Toast.LONG, Toast.BOTTOM)
      }
      setShowModal(false)
      setShowWithDrawModal(false)
      setRequestAmount(0)
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      dispatch(transcationList(COOK, profileData.worker._id))
      dispatch({
        type: UPDATEWALLET.CLEAR
      })
    }
    if ((checkUpdateWallet.status === RESPONSE_MSG.ERROR) || (checkWithdrawWallet.status === RESPONSE_MSG.ERROR)) {
      eventTriggered(EVENT_CAT.ACTION, 'Failed to add wallet')
      Toast.showWithGravity(t('wallet_failed'), Toast.LONG, Toast.BOTTOM)
      setShowModal(false)
      setShowWithDrawModal(false)
      setRequestAmount(0)
      dispatch(transcationList(COOK, profileData.worker._id))
      dispatch({
        type: UPDATEWALLET.CLEAR
      })
    }
  }, [checkUpdateWallet, checkWithdrawWallet])

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

  const withdrawWallet = () => {
    eventTriggered(EVENT_CAT.ACTION, 'WithDraw wallet')
    if (requestAmount < walletAmount) {
      const totAmt = parseInt(walletAmount) - (requestAmount ? parseInt(requestAmount) : 0)
      if (totAmt < 500) {
        Toast.showWithGravity(`${t('min_amount_msg')} \u20B9${appConfig.minimumWallet ? appConfig.minimumWallet : 0}}`, Toast.LONG, Toast.BOTTOM)
      } else {
        dispatch(withdraw(requestAmount))
      }
    } else {
      setRequestAmount(0)
      Toast.showWithGravity(t('lesser_wallet_amount'), Toast.LONG, Toast.BOTTOM)
    }
  }
  useEffect(() => {
    if (razorOrderStatusPage === 'COOKWALLET' && razorOrderStatus === RESPONSE_MSG.SUCCESS && razorOrderData && razorOrderData.id) {
      setShowModal(false)
      setState({})
      setTimeout(() => { payment(razorOrderData.id, razorOrderData.amount) }, 1000)
    }
    if (razorOrderStatus === RESPONSE_MSG.ERROR) {
      Toast.showWithGravity(t('create_order_failed'), Toast.LONG, Toast.BOTTOM)
      dispatch({
        type: CREATERAZORORDER.CLEAR
      })
    }
  }, [razorOrderData, razorOrderStatus])

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
    dispatch(createRazorOrder(data, 'COOKWALLET'))
  }

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
                dispatch(updateUserWallet(requestAmount))
                dispatch({
                  type: CREATERAZORORDER.CLEAR
                })
              }
            // alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
              Toast.showWithGravity(t('wallet_failed'), Toast.LONG, Toast.BOTTOM)
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
    return (
      <View style={[cookWallet.rupeeContainer, cookWallet.spaceBetween, cookWallet.transactionContainer]}>
        <View style={cookWallet.rupeeContainer}>
          <View>
            <Image source={walletImg} style={cookWallet.walletImg} />
          </View>
          <View style={[cookWallet.transactionDateContainer, { paddingTop: 0 }]}>
            <Text style={[cookWallet.transactionText, cookWallet.family]}>{item.transcationId}</Text>
            <Text style={[cookWallet.transactionText, cookWallet.family]}>{PAYMENTSTATUSVALUE[item.paymentType]}</Text>
            <Text style={[cookWallet.dateText, cookWallet.family]}>{moment(item.createdAt).format('ll')}</Text>
          </View>
        </View>
        <View>
          <View style={[cookWallet.rupeeContainer, cookWallet.amountContainer]}>
            <Icon name='rupee' size={10} color={corn} style={cookWallet.rupeeIcon} />
            <Text style={[cookWallet.amount, cookWallet.family]}>{item.amount}</Text>
          </View>
          <Text style={[cookWallet.dateText, cookWallet.family, { width: 80, textAlign: 'left' }]}>{item.status}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={cookWallet.mainContainerFluid}>
      {Platform.OS === 'ios' && <CustomStatusBar navigation={navigation} />}
      <Header title={t('Wallet')} navigation={navigation} />
      <View style={cookWallet.mainContainer}>
        <View style={{ height: 120 }}>
          <ImageBackground style={cookWallet.walletBgImage} source={walletBg}>
            <View style={cookWallet.walletBgImageContainer}>
              <View style={[cookWallet.rupeeContainer, cookWallet.spaceBetween]}>
                <View>
                  <View style={cookWallet.rupeeContainer}>
                    <Icon name='rupee' size={10} color={grey20} style={[cookWallet.icon, cookWallet.iconText]} />
                    <Text style={cookWallet.iconText}>{walletAmount}</Text>
                  </View>
                  <View>
                    <Text style={cookWallet.balanceText}>{t('current_balance')}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowModal(true)} style={cookWallet.addIconContainer}>
                  <Icon name='plus' size={25} color={grey20} style={cookWallet.addIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[cookWallet.rupeeContainer, cookWallet.spaceBetween]}>
          <View>
            <Text style={cookWallet.recentTransaction}>{t('recent_transactions')}</Text>
          </View>
        </View>
        {
          showTranscationList && showTranscationList.length > 0 ? (
            <FlatList
              data={showTranscationList}
              renderItem={
                ({ item, index }) => (
                  item.paymentType !== 'WITHDRAWW' && (
                    <Item item={item} key={index} index={index} />
                  ))
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
        visible={showModal || showWithDrawModal}
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
                  {
                    showWithDrawModal ? 'Withdraw Money' : 'Add Money to Balance'
                  }
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => showWithDrawModal ? setShowWithDrawModal(false) : setShowModal(false)}>
                  <IonIcon name='ios-close' style={{ fontSize: 35 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>Available Balance <Icon name='rupee' style={{ fontSize: 12 }} /> {walletAmount}</Text>
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
            <TouchableHighlight
              underlayColor={white}
              disabled={!requestAmount}
              onPress={() => showWithDrawModal ? withdrawWallet() : updateWallet()}
            >
              <LinearGradient
                colors={[gold, corn]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={[modalStyles.gradientButton, welcomeCookStyles.payButton]}
              >
                {loading ? <Spinner /> : <Text style={modalStyles.gradientButtonText}>Proceed</Text>}
              </LinearGradient>
            </TouchableHighlight>

          </View>
        </View>
      </Modal>
    </View>
  )
}

const mapStateToProps = (state) => {
  const {
    walletReducer,
    profileReducer,
    customerBookReducer,
    configReducer
  } = state
  return {
    checkUpdateWallet: walletReducer && walletReducer.checkUpdateWallet ? walletReducer.checkUpdateWallet : '',
    checkWithdrawWallet: walletReducer && walletReducer.checkWithdrawWallet ? walletReducer.checkWithdrawWallet : '',
    transcationsData: walletReducer && walletReducer.transcationsData ? walletReducer.transcationsData : '',
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    loading: walletReducer && walletReducer.loading ? walletReducer.loading : '',
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Wallet))
