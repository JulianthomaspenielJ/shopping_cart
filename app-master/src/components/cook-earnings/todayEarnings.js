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
import { todayEarnings, weeklyEarnings } from '../user-bookings/actions'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { BOOKING, PAGE } from '../../lib/const'
import { screenViewed } from '../../lib/ga'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import NoRecords from '../ui-components/noRecords'
import Loader from '../ui-components/Loader'
import {
  LineChart
} from 'react-native-chart-kit'
import { welcomeCookStyles } from '../../assets/styles/welcomeCook'
import walletImg from '../../assets/icons/userWallet.png'

const TodayEarnings = (props) => {
  const { navigation, dispatch, workerTodayEarningData, loading, workerWeeklyEarningData, adminTranscationList, t } = props
  const [workerTodayEarning, setWorkerTodayEarning] = useState([])
  const [graphData, setGraphData] = useState([])
  const [totalAmount, setTotalAmount] = useState('')
  const [payoutTotalAmount, setPayoutTotalAmount] = useState('')
  const [grossTotal, setGrossTotal] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenViewed(PAGE.TODAYEARNING)
      setWorkerTodayEarning([])
      dispatch(todayEarnings(BOOKING.TODAY))
      dispatch(weeklyEarnings(BOOKING.WEEK))
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.TODAYEARNING)
    analytics().logEvent(PAGE.ORDERDETAIL, { EARNING: BOOKING.TODAY })
    crashlytics().log('Today earning page mounted')
  }, [])

  useEffect(() => {
    setWorkerTodayEarning(workerTodayEarningData)
  }, [workerTodayEarningData, adminTranscationList])

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

  useEffect(() => {
    if (adminTranscationList && adminTranscationList[0].results.length > 0) {
      adminTranscationList[0].results.forEach((element) => {
        setPayoutTotalAmount(Math.round(element.amount))
      })
    }
  }, [adminTranscationList])

  const graphView = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: graphData && graphData.length ? graphData : [0]
      }
    ]
  }

  const getTotal = (datas) => {
    const amtSplitUp = {
      totalAmount: (Math.round(datas.totalAmount) - Math.round(datas.commissionAmount) - Math.round(datas.taxAmount)),
      commissionAmount: Math.round(datas.commissionAmount),
      taxAmount: Math.round(datas.taxAmount)
    }
    return amtSplitUp
  }

  useEffect(() => {
    if (workerWeeklyEarningData) {
      const newArray = []
      workerWeeklyEarningData.forEach((element, index, array) => {
        setTotalAmount((Math.round(element.totalAmount) - Math.round(element.commissionAmount) - Math.round(element.taxAmount)))
        if (element.orderDetail && element.orderDetail.length) {
          element.orderDetail.forEach((e, i, array) => {
            newArray.push(
              e.totalAmount ? (Math.round(e.totalAmount) - Math.round(e.commissionAmount) - Math.round(e.taxAmount)) : 0
            )
          })
        }
        setGraphData(newArray)
      })
    }
  }, [workerWeeklyEarningData])

  const Item = (data) => {
    const { item } = data
    return item.orderDetail.map((datas, index) => {
      return (
        <View key={index}>
          <View style={orders.container}>
            <View>
              <View style={orders.orderDetailsContainer}>
                <View>
                  <Text style={[orders.idText, earnings.orderId]}>Order ID :{datas.orderId}</Text>
                  <Text style={[orders.idText, orders.cuisines]}>Cuisines : {datas.cuisine && datas.cuisine.name}</Text>
                </View>
                <View style={orders.toDateEnd}>
                  <View style={orders.amountContainer}>
                    <Text style={[earnings.earningAmountText, { color: '#333333' }]}>Total</Text>
                    <Icon name='rupee' size={12} color={sushi} style={[orders.icon, earnings.icon, { paddingTop: 4 }]} />
                    <Text style={[orders.amountContainer, earnings.earningAmountText]}>{datas ? getTotal(datas).totalAmount : 0}</Text>
                  </View>
                  <View style={orders.amountContainer}>
                    <Text style={[earnings.earningAmountText, { color: '#333333' }]}>Commission</Text>
                    <Icon name='rupee' size={12} color={sushi} style={[orders.icon, earnings.icon, { paddingTop: 4 }]} />
                    <Text style={[orders.amountContainer, earnings.earningAmountText]}>{datas ? getTotal(datas).commissionAmount : 0}</Text>
                  </View>
                  <View style={orders.amountContainer}>
                    <Text style={[earnings.earningAmountText, { color: '#333333' }]}>Tax</Text>
                    <Icon name='rupee' size={12} color={sushi} style={[orders.icon, earnings.icon, { paddingTop: 4 }]} />
                    <Text style={[orders.amountContainer, earnings.earningAmountText]}>{datas ? getTotal(datas).taxAmount : 0}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    })
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
              stroke: '#black'
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
                <Text style={[orders.idText, earnings.earningAmountText]}>{workerTodayEarning && workerTodayEarning[0] ? getTotal(workerTodayEarning[0]).totalAmount : 0}</Text>
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
            workerTodayEarning && workerTodayEarning.length > 0 ? (
              <View style={earnings.earningsContainer}>
                <SafeAreaView>
                  <FlatList
                    style={{ marginBottom: 30 }}
                    data={workerTodayEarning}
                    renderItem={({ item, index }) =>
                      <>
                        <Item item={item} key={index} index={index} />
                        <View style={earnings.borderLayer} />
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
    workerTodayEarningData: userMyBookingReducer && userMyBookingReducer.workerTodayEarningData ? userMyBookingReducer.workerTodayEarningData : '',
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
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TodayEarnings))
