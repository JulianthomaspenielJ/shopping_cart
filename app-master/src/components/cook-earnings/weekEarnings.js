import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView
} from 'react-native'
import { sushi, tangerine } from '../../assets/styles/colors'
import { orders } from '../../assets/styles/orders'
import Icon from 'react-native-vector-icons/FontAwesome'
import { earnings } from '../../assets/styles/earnings'
import { common } from '../../assets/styles/common'
import earningsImg from '../../assets/images/earnings.png'
import { weeklyEarnings } from '../user-bookings/actions'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import _ from 'lodash'
import { BOOKING, PAGE, PAYMENTSTATUSVALUE, FORMAT } from '../../lib/const'
import { screenViewed } from '../../lib/ga'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import NoRecords from '../ui-components/noRecords'
import moment from 'moment'
import Loader from '../ui-components/Loader'
import {
  LineChart
} from 'react-native-chart-kit'
import { welcomeCookStyles } from '../../assets/styles/welcomeCook'
import walletImg from '../../assets/icons/userWallet.png'

const weekEarnings = (props) => {
  const { navigation, dispatch, workerWeeklyEarningData, loading, adminTranscationList, t } = props
  const [workerWeeklyEarning, setWorkerWeeklyEarning] = useState([])
  const [graphData, setGraphData] = useState([])
  const [totalAmount, setTotalAmount] = useState('')
  const [payoutTotalAmount, setPayoutTotalAmount] = useState('')
  const [grossTotal, setGrossTotal] = useState('')
  const [resultData, setResultData] = useState([])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.WEEKLYEARNING)
    analytics().logEvent(PAGE.WEEKLYEARNING, { EARNING: BOOKING.WEEK })
    crashlytics().log('Weekly earning page mounted')
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenViewed(PAGE.WEEKLYEARNING)
      setWorkerWeeklyEarning([])
      dispatch(weeklyEarnings(BOOKING.WEEK))
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    setWorkerWeeklyEarning(workerWeeklyEarningData)
    if (workerWeeklyEarningData && workerWeeklyEarningData[0].results && workerWeeklyEarningData[0].results.length) {
      const data = workerWeeklyEarningData &&
      workerWeeklyEarningData[0].results &&
      workerWeeklyEarningData[0].results.length ? workerWeeklyEarningData[0].results : []
      setResultData(data)
    }
  }, [workerWeeklyEarningData, adminTranscationList])

  const totalAmt = () => {
    const data = workerWeeklyEarningData && workerWeeklyEarningData[0].results ? workerWeeklyEarningData[0].results : []
    if (data && data.length) {
      return _.reduce(data, function (total, o) {
        return total + (Math.round(o.booking.totalAmount) - Math.round(o.booking.commissionAmount) - Math.round(o.booking.taxAmount))
      }, 0)
    }
  }

  const graphView = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: graphData && graphData.length ? graphData : [0]
      }
    ]
  }

  useEffect(() => {
    if (workerWeeklyEarningData) {
      const newArray = []
      let totalAmountvalue = 0
      const weeklyEarningTotalData = workerWeeklyEarningData && workerWeeklyEarningData[0].results ? workerWeeklyEarningData[0].results : []
      weeklyEarningTotalData.forEach((element, index, array) => {
        totalAmountvalue += (Math.round(element.booking.totalAmount) - Math.round(element.booking.commissionAmount) - Math.round(element.booking.taxAmount))
        newArray.push(
          element.booking.totalAmount ? (Math.round(element.booking.totalAmount) - Math.round(element.booking.commissionAmount) - Math.round(element.booking.taxAmount)) : 0
        )
      })
      setGraphData(newArray)
      setTotalAmount(totalAmountvalue)
    }
  }, [workerWeeklyEarningData])

  useEffect(() => {
    let paidOutTot = 0
    if (adminTranscationList && adminTranscationList[0].results.length > 0) {
      adminTranscationList[0].results.forEach((element) => {
        paidOutTot += element.amount
        setPayoutTotalAmount(Math.round(paidOutTot))
      })
    }
  }, [adminTranscationList])

  useEffect(() => {
    setGrossTotal(totalAmount + (payoutTotalAmount || 0))
  }, [payoutTotalAmount, totalAmount])

  const getTotal = (datas) => {
    const amtSplitUp = {
      totalAmount: (Math.round(datas.booking.totalAmount) - Math.round(datas.booking.commissionAmount) - Math.round(datas.booking.taxAmount)),
      commissionAmount: Math.round(datas.booking.commissionAmount),
      taxAmount: Math.round(datas.booking.taxAmount)
    }
    return amtSplitUp
  }

  const Item = (data) => {
    const { item } = data
    if (item && item.results && item.results.length) {
      return item.results.map((datas, index) => {
        return (
          <View key={index}>
            <View style={earnings.dateContainer}>
              <Text style={earnings.dateContainerText}>{moment(item.date).format(FORMAT.DATE)}</Text>
            </View>
            <View style={orders.container}>
              <View>
                <View style={orders.orderDetailsContainer}>
                  <View>
                    <Text style={[orders.idText, orders.cuisines]}>{datas.paymentType && datas.paymentType ? PAYMENTSTATUSVALUE[datas.paymentType] : ''}</Text>
                  </View>
                  <View style={orders.toDateEnd}>
                    <View style={orders.amountContainer}>
                      <Text style={[earnings.earningAmountText, { color: '#333333' }]}>Total</Text>
                      <View style={{ width: 75, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Icon name='rupee' size={12} color={sushi} style={[orders.icon, earnings.icon, { paddingTop: 7 }]} />
                        <Text style={[orders.amountContainer, earnings.earningAmountText]}>{datas && datas.amount ? datas.amount : ''}</Text>
                      </View>
                    </View>
                    <View style={[orders.amountContainer]}>
                      <Text style={[earnings.earningAmountText, { color: '#333333' }]}>Commission</Text>
                      <View style={{ width: 75, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Icon name='rupee' size={12} color={sushi} style={[orders.icon, earnings.icon, { paddingTop: 7 }]} />
                        <Text style={[orders.amountContainer, earnings.earningAmountText]}>{datas && datas.booking && datas.booking.commissionAmount ? getTotal(datas).commissionAmount : 0}</Text>
                      </View>
                    </View>
                    <View style={orders.amountContainer}>
                      <Text style={[earnings.earningAmountText, { color: '#333333' }]}>Tax</Text>
                      <View style={{ width: 75, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Icon name='rupee' size={12} color={sushi} style={[orders.icon, earnings.icon, { paddingTop: 7 }]} />
                        <Text style={[orders.amountContainer, earnings.earningAmountText]}>{datas && datas.booking && datas.booking.taxAmount ? getTotal(datas).taxAmount : 0}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={earnings.borderLayer} />
                <View style={orders.orderDetailsContainer}>
                  <View>
                    <Text style={[orders.idText, earnings.orderId]}>Order ID :{datas.booking && datas.booking.bookingId ? datas.booking.bookingId : ''}</Text>
                  </View>
                  <View style={orders.toDateEnd}>
                    <View style={orders.amountContainer}>
                      <Icon name='rupee' size={12} color={sushi} style={[orders.icon, earnings.icon]} />
                      <Text style={[orders.amountContainer, earnings.earningAmountText]}>{datas && datas.booking && datas.booking.totalAmount ? getTotal(datas).totalAmount : 0}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      })
    }
  }
  return (
    <View style={common.containerBackground}>
      <View style={{ padding: 30, paddingBottom: 0 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[welcomeCookStyles.requestText, { flex: 1 }]}>Weekly Earnings</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image source={walletImg} style={welcomeCookStyles.walletImg} />
            <Icon size={18} style={{ color: tangerine, paddingRight: 5, paddingTop: 5 }} name='rupee' />
            <Text style={[welcomeCookStyles.requestText, { color: tangerine }]}>{grossTotal || 0}</Text>
          </View>
        </View>
        <LineChart
          data={graphView}
          width={335}
          height={100}
          yAxisInterval={10}
          chartConfig={{
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          bezier
          style={{
            marginVertical: 10,
            borderRadius: 5
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={earnings.earningsContainer}>
          <View style={earnings.totalEarningsContainer}>
            <View style={earnings.totalEarningsTextContainer}>
              <Text style={earnings.totalEarningsText}>Total Earnings</Text>
              <View style={[orders.amountContainer, orders.totalEarningsText]}>
                <Icon name='rupee' size={17} color={sushi} style={[orders.icon, { paddingTop: 4 }]} />
                <Text style={[orders.idText, earnings.earningAmountText]}>{totalAmt() || 0}</Text>
              </View>
            </View>
            <View>
              <Image
                source={earningsImg}
                style={earnings.earningsImg}
              />
            </View>
          </View>
        </View>
        {
          loading ? (
            <Loader />
          ) : (
            resultData && resultData.length > 0 ? (
              <View style={earnings.earningsContainer}>
                <SafeAreaView>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={workerWeeklyEarning.length > 10 ? { marginBottom: 30 } : ''}
                    data={workerWeeklyEarningData}
                    renderItem={({ item, index }) =>
                      <>
                        <Item item={item} key={index} index={index} />
                      </>}
                    keyExtractor={item => item.id}
                  />
                </SafeAreaView>
              </View>
            ) : (
              <View>
                <NoRecords msg={t('no_results_found')} enableEmoji />
              </View>
            )
          )
        }
      </ScrollView>
    </View>
  )
}
const mapStateToProps = (state) => {
  const { userMyBookingReducer } = state
  return {
    workerWeeklyEarningData: userMyBookingReducer && userMyBookingReducer.workerWeeklyEarningData ? userMyBookingReducer.workerWeeklyEarningData : '',
    adminTranscationList: userMyBookingReducer && userMyBookingReducer.adminTranscationList ? userMyBookingReducer.adminTranscationList : '',
    loading: !!(userMyBookingReducer && userMyBookingReducer.loading)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(weekEarnings))
