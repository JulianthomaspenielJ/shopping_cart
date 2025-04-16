import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput, StatusBar, Platform
} from 'react-native'
import { ratingDetailsStyles } from '../../assets/styles/ratingDetails'
import detailsBg from '../../assets/images/detailBg.png'
import detailsBack from '../../assets/icons/back-button.png'
import { AirbnbRating } from 'react-native-ratings'
import { dangerText, darkCyan, white } from '../../assets/styles/colors'
import { connect } from 'react-redux'
import moment from 'moment'
import { FORMAT, RESPONSE_MSG, ENUMSTATUS, STATUSVALUE } from '../../lib/const'
import Icon from 'react-native-vector-icons/FontAwesome'
import { sendRatings } from './actions'
import Toast from 'react-native-simple-toast'
import { RATING } from '../../type'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import CheckIcon from '../../assets/icons/check.png'
import cookMale from '../../assets/images/detailsCookImgMale.png'
import cookFemale from '../../assets/images/detailsCookImg.png'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : 56

const Details = (props) => {
  const { navigation, bookingSummaryData, myRatingstatus, dispatch, t } = props
  const { bookingDetail, cookDetail, fromDate, toDate, members, summaryData, id, ratingData, Offer } = bookingSummaryData
  const [rating, setRating] = useState(0)
  const [comments, setComments] = useState('')
  const [wordCount, setWordCount] = useState(true)
  const [ratingErr, setRatingErr] = useState('')
  const backToBooking = () => {
    navigation.navigate('MyBookings')
  }
  useEffect(() => {
    if (myRatingstatus === RESPONSE_MSG.SUCCESS) {
      Toast.showWithGravity('Rating updated successfully.', Toast.LONG, Toast.BOTTOM)
      dispatch({ type: RATING.CLEAR })
    }
  }, [myRatingstatus])

  useEffect(() => {
    if (ratingData) {
      if (ratingData.workerRating) {
        setRating(ratingData.workerRating)
      }
    } else {
      setRating(0)
    }
    if (ratingData) {
      if (ratingData.workerComment) {
        setComments(ratingData.workerComment)
      } else {
        setComments('')
      }
    } else {
      setComments('')
    }
  }, [bookingSummaryData])

  const secondHandle = (event) => {
    const count = event.split(/\W+/).length
    if (count <= 30) {
      setComments(event)
      setWordCount(true)
    } else {
      setWordCount(false)
    }
  }
  const Item = (data) => {
    const { bookingslot } = data
    return bookingslot && bookingslot.map(function (item, index) {
      return (
        <View key={index}>
          <Text key={index} style={ratingDetailsStyles.cookCuisineDetails}>{item.slotTime}</Text>
          <Text key={index} style={[ratingDetailsStyles.cookCuisineDetails, { paddingBottom: 3, paddingLeft: 8, fontSize: 8, alignSelf: 'flex-start' }]}>&nbsp;({item.mealType.name ? item.mealType.name : item.name})</Text>
        </View>
      )
    })
  }


  const getofferValue = (orderAmount, data) => {
    let offerAmount = 0
    if (data.type === 'PERCENTAGE') {
      offerAmount = orderAmount * (data.value / 100)
    } else if (data.type === 'FLAT') {
      offerAmount = data.value
    }     
    return offerAmount
  }

  const submitRating = () => {
    if (rating) {
      const data = {
        booking: id,
        workerRating: `${rating}`,
        workerComment: comments
      }
      setRatingErr('')
      dispatch(sendRatings(data))
    } else {
      setRatingErr(t('choose_rating'))
    }
  }
  const handleRating = (r) => {
    if (ratingData && ratingData.workerRating) {
      setRating(ratingData.workerRating)
    } else {
      setRating(r)
    }
  }
  const imageUrl = `${IMAGE_BASE_URL}${cookDetail && cookDetail.avatar ? cookDetail.avatar : ''}`
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
          <Image
            source={detailsBack}
            style={ratingDetailsStyles.backArrowImage}
          />
        </TouchableOpacity>
      </ImageBackground>

      <View style={ratingDetailsStyles.ratingContainer}>
        <ScrollView
          style={{ height: '75%' }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={ratingDetailsStyles.borderPatch} />
          </View>
          <View>
            <Text style={ratingDetailsStyles.titleText}>Rating</Text>
          </View>
          <View style={ratingDetailsStyles.cookDetailsContainer}>
            <View style={ratingDetailsStyles.cookPersonal}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                  source={cookDetail && cookDetail.avatar ? { uri: imageUrl } : (bookingDetail && bookingDetail.cookGender === 'MALE' ? cookMale : cookFemale)}
                  style={ratingDetailsStyles.cookAvatar}
                />
                <Text style={[ratingDetailsStyles.name, { width: 120 }]} ellipsizeMode='tail' numberOfLines={2}>{cookDetail && cookDetail.name ? cookDetail.name : ''}</Text>
                <Text />
              </View>
              <View>
                <Text style={ratingDetailsStyles.status}>
                  {(ENUMSTATUS[bookingSummaryData.status] === ENUMSTATUS.REQUEST_IN_PROGRESS) || (ENUMSTATUS[bookingSummaryData.status] === ENUMSTATUS.REQUEST_NOT_ACCEPTED) ? STATUSVALUE.REQUEST_IN_PROGRESS : STATUSVALUE[bookingSummaryData.status]}
                </Text>
                <View style={ratingDetailsStyles.cookPersonal}>
                  <Text style={ratingDetailsStyles.orderIdText}>Order Id : </Text>
                  <Text style={ratingDetailsStyles.orderNumber}>{bookingSummaryData.bookingId}</Text>
                </View>
              </View>
            </View>
            <View style={[ratingDetailsStyles.cookContainerLine]}>
              <View style={{ paddingBottom: 12 }}>
                <View style={{ flexDirection: 'row', paddingLeft: 14, paddingBottom: 6 }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={ratingDetailsStyles.cookCuisines}>Cuisines : </Text>
                    <Text style={ratingDetailsStyles.cookCuisineDetails}>{bookingDetail &&
                    bookingDetail.cuisine &&
                    bookingDetail.cuisine.name ? bookingDetail.cuisine.name : ''}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={[ratingDetailsStyles.flexDirectionStyle, { justifyContent: 'flex-end' }]}>
                      <Text style={ratingDetailsStyles.cookCuisines}>From : </Text>
                      <Text style={ratingDetailsStyles.cookCuisineDetails}>{moment(fromDate).format(FORMAT.DATE)}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10, paddingBottom: 6 }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View>
                      <Text style={ratingDetailsStyles.cookCuisines}>Time : </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      {bookingDetail && bookingDetail.slot && bookingDetail.slot.length > 0 ? <Item bookingslot={bookingDetail.slot} /> : null}
                    </View>
                  </View>
                  {
                    toDate ? (
                      <View style={{ flex: 1 }}>
                        <View style={[ratingDetailsStyles.flexDirectionStyle, { justifyContent: 'flex-end' }]}>
                          <Text style={ratingDetailsStyles.cookCuisines}>To : </Text>
                          <Text style={ratingDetailsStyles.cookCuisineDetails}>{toDate ? moment(toDate).format(FORMAT.DATE) : ''}</Text>
                        </View>
                      </View>) : null
                  }
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 14 }}>
                  <Text style={ratingDetailsStyles.cookCuisines}>Members : </Text>
                  <Text style={ratingDetailsStyles.cookCuisineDetails}>{members}</Text>
                </View>
              </View>
                {
                  Offer && Offer.code ? (
                    <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                      <Text style={ratingDetailsStyles.cookCuisines}>Coupon : </Text>
                      <Text style={ratingDetailsStyles.cookCuisineDetails}>{Offer.code}</Text>
                    </View>
                  ) : null
              	}
              <View style={ratingDetailsStyles.underline} />
            
              {/* <View style={{ paddingLeft: 10 }}>
                <Text style={[ratingDetailsStyles.totalText, { fontSize: 14, marginTop: 10 }]}>Additional</Text>
                <View style={[ratingDetailsStyles.cookPersonal]}>
                  <View style={{ flex: 3 }}>
                    <Text>Lunch for additional {'\u20B9'}200</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end', marginTop: -2 }}>
                    <Image
                      source={CheckIcon}
                      style={{ width: 22, height: 22 }}
                    />
                  </View>
                </View>
              </View> */}
            </View>
						{
						Offer && Offer.code ? (
						<View style={[ratingDetailsStyles.cookPersonal, { marginTop: 5 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[ratingDetailsStyles.totalText, { paddingLeft: 7 }]}>Item Total</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[ratingDetailsStyles.totalText, { textAlign: 'right' }]}>
									<Icon name='rupee' size={14} color={darkCyan} />&nbsp;{Math.round(summaryData) + getofferValue(summaryData, Offer)}
                </Text>
              </View>
						</View>) : null
						}
						{
							Offer && Offer.code ? (
							<View style={[ratingDetailsStyles.cookPersonal, { marginTop: 5 }]}>
								<View style={{ flex: 1 }}>
									<Text style={[ratingDetailsStyles.totalText, { paddingLeft: 7 }]}>Offer</Text>
								</View>
								<View style={{ flex: 1 }}>
									<Text style={[ratingDetailsStyles.totalText, { textAlign: 'right' }]}>
										- <Icon name='rupee' size={14} color={darkCyan} />&nbsp;{getofferValue(summaryData, Offer)}
									</Text>
								</View>
							</View>) : null
						}
            <View style={[ratingDetailsStyles.cookPersonal, { marginTop: 5 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[ratingDetailsStyles.totalText, { paddingLeft: 7 }]}>Paid</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[ratingDetailsStyles.totalText, { textAlign: 'right' }]}>
									<Icon name='rupee' size={14} color={darkCyan} />&nbsp;{Math.round(summaryData)}
                </Text>
              </View>
            </View>
          </View>
          {bookingSummaryData.status === 'COMPLETED' || bookingSummaryData.status === 'REQUEST_COMPLETED' ? (
            <>
              <View>
                <Text style={ratingDetailsStyles.titleText}>Rate</Text>
              </View>
              <View style={ratingDetailsStyles.cookDetailsContainer}>
                <View style={[ratingDetailsStyles.cookPersonal, { justifyContent: 'space-between' }]}>
                  <AirbnbRating
                    defaultRating={rating}
                    showRating={false}
                    ratingBackgroundColor='#e6eef9'
                    starStyle={{ width: 25, height: 25 }}
                    onFinishRating={(r) => handleRating(r)}
                  />
                  <Text style={ratingDetailsStyles.ratingText}>{rating}</Text>
                </View>
              </View>
              <Text style={ratingDetailsStyles.errMsg}>{ratingErr || ''}</Text>
              <View>
                <Text style={ratingDetailsStyles.titleText}>Comments</Text>
              </View>
              <View style={[ratingDetailsStyles.cookDetailsContainer, { padding: 0 }]}>
                <TextInput
                  style={ratingDetailsStyles.input}
                  underlineColorAndroid='transparent'
                  placeholder='Give your valuable comments.....'
                  placeholderTextColor='#509696'
                  autoCapitalize='none'
                  onChangeText={secondHandle}
                  value={comments}
                />
                <Text style={[ratingDetailsStyles.maxWordCount, { color: wordCount ? darkCyan : dangerText }]}>30 words max</Text>
              </View>
              {ratingData.workerRating ? null : (
                <TouchableOpacity
                  onPress={submitRating}
                  style={ratingDetailsStyles.submitRatings}
                >
                  <Text style={ratingDetailsStyles.submitText}>Submit</Text>
                </TouchableOpacity>
              )}
            </>
          ) : null}
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { customerBookReducer, userMyBookingReducer } = state
  return {
    bookingSummaryData: customerBookReducer && customerBookReducer.bookingSummaryData ? customerBookReducer.bookingSummaryData : '',
    myRatingstatus: userMyBookingReducer && userMyBookingReducer.myRatingstatus ? userMyBookingReducer.myRatingstatus : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
