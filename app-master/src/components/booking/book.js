import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, BackHandler } from 'react-native'
import { styles } from '../../assets/styles/book'
import { common } from '../../assets/styles/common'
import calendar from '../../assets/icons/calendar2.png'
import male from '../../assets/icons/male.png'
import female from '../../assets/icons/female.png'
import moment from 'moment'
import { rupee, PAGE, USER, DATE_TYPE, EVENT_CAT, BOOKING, MSG, RESPONSE_MSG, GUEST, KEY, SESSION } from '../../lib/const'
import Cook from './cook'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { screenViewed, eventTriggered } from '../../lib/ga'
import { withTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { Dropdown } from 'react-native-material-dropdown'
import { transparent, cyanBlack, darkCyan } from '../../assets/styles/colors'
import { connect } from 'react-redux'
import { bookingconfigList, summary, pendingReview } from '../booking/actions'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import Toast from 'react-native-simple-toast'
import AlertModal from '../ui-components/alertModal'
import _ from 'lodash'
import { SUMMARY, COUPON } from '../../type'
import { Appearance } from 'react-native-appearance'
import cuisineImg from '../../assets/icons/cuisine.png'
import mebersImg from '../../assets/icons/members.png'
import RatingModal from '../ui-components/ratingModal'
import { sendRatings } from '../user-bookings/actions'
import Spinner from '../ui-components/Spinner'
import AsyncStorage from '@react-native-community/async-storage'
import Loader from '../ui-components/Loader'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import { getData } from '../../lib/storage'

const colorScheme = Appearance.getColorScheme()
const isDarkModeEnabled = colorScheme === 'dark'
const Book = (props) => {
  const {
    navigation,
    dispatch,
    bookingConfigData,
    summaryData,
    summaryErrMsg,
    t,
    summaryStatus,
    pendingReviewData,
    loading,
    selctedCookData
  } = props
  const [cuisineId, setCuisineId] = useState('')
  const [cookProfileData, setCookProfileData] = useState('')
  const [cuisineName, setCuisineName] = useState('')
  const [packId, setPackId] = useState('')
  const [packDays, setPackDays] = useState('')
  const [typeId, setTypeId] = useState('')
  const [typeName, setTypeName] = useState('')
  const [members, setMembers] = useState(2)
  const [gender, setGender] = useState('MALE')
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [todatePickerVisible, setTodatePickerVisible] = useState(false)
  const [dateType, setDateType] = useState('')
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState()
  const [timePickerVisible, setTimePickerVisible] = useState(false)
  const [slotFromTime, setSlotFromTime] = useState('')
  const [dateTimeTitle, setDateTimeTitle] = useState('')
  const [bookingConfig, setBookingConfig] = useState('')
  const [bookingMeals, setBookingMeals] = useState('')
  const [additionalBookingMeals, setAdditionalBookingMeals] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [pickedTime, setPickedTime] = useState('')
  const [pickedTimeId, setPickedTimeId] = useState('')
  const [bookingTimeDiff, setBookingTimeDiff] = useState('')
  const [showOkBtn, setShowOkBtn] = useState(false)
  const [summaryValue, setSummaryValue] = useState('')
  const [bookingPlan, setBookingPlan] = useState()
  const [minDate, setMinDate] = useState('')
  const [norecords, setNorecords] = useState('')
  const [filtertempBookingMealsState, setFiltertempBookingMealsState] = useState([])
  const [, setState] = useState()
  const [showRating, setShowRating] = useState(false)
  const [cusineActiveImg, setCusineActiveImg] = useState('')
  const [foodTypeActiveImg, setFoodTypeActiveImg] = useState('')
  const [pendingReviewItems, setPendingReviewItems] = useState('')
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [guestUser, setGuestUser] = useState('')
  let valid = false

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.BOOK)
    analytics().logEvent(PAGE.BOOK, { })
    crashlytics().log('Home page mounted')
  }, [])

  const Next = () => {
    if (guestUser === GUEST) {
      AsyncStorage.setItem(KEY.GUEST_USER, '')
      AsyncStorage.removeItem(SESSION.TOKEN)
      navigation.navigate('UserLogin')
    } else {
      getAdditionalMeal()
      if (validate()) {
        const slot = []
        setFiltertempBookingMealsState(getBookingAvailableMeals())
        const filtertempBookingMeals = getBookingAvailableMeals()
        const slotfromTime = moment(fromDate).format('YYYY-MM-DDTHH:mm')
        const slottoTime = (packDays !== 1 ? (moment(toDate).format('YYYY-MM-DDTHH:mm')) : '')
        let selectedSlot = {}
        const mealType = []
        filtertempBookingMeals.map((item) => {
          setSlotFromTime(item.slotTime)
          mealType.push(item._id)
          selectedSlot = {
            mealType: item._id,
            fromTime: slotfromTime,
            toTime: slottoTime,
            slotTime: item.slotTime
          }
          slot.push(selectedSlot)
        })
        const data = {
          cuisine: cuisineId,
          mealType: mealType,
          plan: packId,
          foodType: typeId,
          dateTime: new Date(),
          bookingType: 'NORMAL',
          slot: slot,
          members: members.toString(),
          cookGender: gender
        }
        dispatch({
          type: BOOKING.BOOKING_SUMMARY_REQUEST,
          summaryRequest: data
        })
        AsyncStorage.setItem('summaryRequest', JSON.stringify(data))
        dispatch(summary(data))
        setSummaryLoading(true)
        eventTriggered(EVENT_CAT.NAV, 'Navigating to checkout from Book page')
        analytics().logEvent(PAGE.BOOK, {
          foodType: typeName,
          cuisine: cuisineName,
          plan: packDays
        })
      }
    }
  }

  const cancel = () => {
    setShowOkBtn(false)
    setSummaryValue('')
    setNorecords('')
    setTypeId('')
    setTypeName('')
    setCuisineName('')
    setCuisineId('')
    setGender('MALE')
    const tempMeals = bookingMeals
    if (!_.isEmpty(tempMeals)) {
      tempMeals.map(item => {
        item.isSelect = false
      })
    }
    setBookingMeals(tempMeals)
    setPickedTime('')
    setMembers(2)
    setState({})
    // setToDate('')
    dispatch({
      type: SUMMARY.CLEAR_SUMMARY_VALUE
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
    BackHandler.exitApp()
    return true
  }

  useEffect(() => {
    getData(KEY.GUEST_USER)
      .then(gUser => {
        if (gUser) {
          setGuestUser(gUser)
        }
      })
  }, [navigation])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cancel()
      if (!summaryValue || summaryValue === '') {
        dispatch(bookingconfigList({ type: BOOKING.CONFIG }))
        setPackDays(1)
      }
      const data = {
        userType: USER
      }
      dispatch(pendingReview(data))
      screenViewed(PAGE.BOOK)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    // dispatch(bookingconfigList({ type: BOOKING.CONFIG }))
    setPackDays(1)
  }, [])

  useEffect(() => {
    if (bookingConfigData) {
      setBookingConfig(bookingConfigData)
      setBookingMeals(bookingConfigData.meals)
      setAdditionalBookingMeals(bookingConfigData.meals)
      setBookingPlan(bookingConfigData.plan)
      setBookingTimeDiff(bookingConfigData.bookingTimeDiff)
    }
    setSummaryValue(Math.round(summaryData))
    if (summaryData) {
      setShowOkBtn(true)
      setNorecords('')
    } else {
      if (summaryStatus === RESPONSE_MSG.ERROR) {
        Toast.showWithGravity(t('failed_to_proceed'), Toast.LONG, Toast.BOTTOM)
      }
      if (summaryErrMsg) {
        setNorecords(t('try_combination)'))
      }
      setShowOkBtn(false)
    }
    const date = new Date()
    date.setDate(date.getDate() + 1)
    setMinDate(date)
    const bookingPlanData = _.filter(bookingConfigData.plan, { isDefault: '1' })
    bookingPlanData.map(item => {
      if (item.isDefault === '1') {
        setPackId(item._id)
      }
    })
    getBookingSelectedMeals()
    dispatch({
      type: SUMMARY.CLEAR
    })
  }, [bookingConfigData, summaryData, summaryErrMsg, summaryStatus])

  useEffect(() => {
    if (selctedCookData) {
      setCookProfileData(selctedCookData)
      setGender(selctedCookData.user.gender)
    } else {
      setCookProfileData('')
    }
  }, [selctedCookData])

  const goToCheckout = () => {
    if (packDays === 1) {
      setToDate('')
    }
    const currentbookingSlot = []
    let selectedSlot = {}
    filtertempBookingMealsState.map((item) => {
      selectedSlot = {
        mealType: item._id,
        name: item.name,
        fromTime: item.slotfromTime,
        toTime: item.slottoTime,
        slotTime: item.slotTime
      }
      currentbookingSlot.push(selectedSlot)
    })
    const bookingStateData = {
      members,
      typeName,
      cuisineName,
      fromDate,
      toDate,
      // summaryData,
      summaryValue,
      slotFromTime,
      packDays,
      currentbookingSlot,
      foodTypeActiveImg,
      cusineActiveImg,
      selctedCookData,
      addonAdditional: _.filter(additionalBookingMeals, { isSelect: false, isAvailable: true }),
      cookProfileData: cookProfileData || ''
    }
    dispatch({
      type: BOOKING.SUMMARY_STATE_DATA,
      bookingSummaryData: bookingStateData
    })
    dispatch({
      type: SUMMARY.CLEAR_SUMMARY_VALUE
    })
    dispatch({
      type: SUMMARY.CLEAR_ADDON_SUMMARY_VALUE
    })
    dispatch({
      type: COUPON.CLEAR
    })
    eventTriggered(EVENT_CAT.NAV, 'Navigating to checkout from Book page')
    navigation.navigate('Checkout', { page: PAGE.CHECKOUT })
  }
  const onPackageSelect = (id, days) => {
    const tempBookingPlan = bookingPlan
    tempBookingPlan.map(item => {
      if (item._id === id) {
        item.isDefault = '1'
      } else {
        item.isDefault = '0'
      }
    })
    setPackId(id)
    setPackDays(days)
    const date = new Date(fromDate)
    if (days !== 1) {
      date.setDate((date.getDate() - 1) + days)
      setToDate(date)
    }
  }
  const showFromDatePicker = () => {
    setDateType(DATE_TYPE.FROM)
    setDateTimeTitle(t('from_date'))
    setDatePickerVisible(true)
  }
  const showToDatePicker = () => {
    setDateType(DATE_TYPE.TO)
    setDateTimeTitle(t('to_date'))
    setTodatePickerVisible(true)
  }
  const onDateSelect = (type, date) => {
    setDatePickerVisible(false)
    const packageDays = moment(date).add((packDays - 1), 'days').format()
    setFromDate(date)
    if (type === DATE_TYPE.FROM && packDays !== 1) {
      setToDate(new Date((packageDays)))
    } else {
      setToDate('')
    }
  }
  const onToDateSelect = (type, date) => {
    setTodatePickerVisible(false)
    setDateType('')
    if (type === DATE_TYPE.TO) {
      setToDate(date)
    }
  }
  const hideDateTimePicker = () => {
    setDatePickerVisible(false)
    setTodatePickerVisible(false)
  }
  const selectMultipleMeals = (key) => {
    const tempBookingMeals = bookingMeals
    tempBookingMeals[key].isSelect = !bookingMeals[key].isSelect
    setBookingMeals(tempBookingMeals)
    setState({})
  }
  const selectSlotTime = (item) => {
    setTimePickerVisible(true)
    setTimeSlot(item)
  }
  const showslots = () => {
    const slots = getBookingSelectedMeals()
    getBookingAvailableMeals()
    const showSlots = (
      slots && slots.length > 0 ? (
        <View style={[styles.card, common.shadow]}>
          <View style={styles.cardContent}>
            {getslots(slots)}
          </View>
        </View>) : null
    )
    return showSlots
  }

  const getAdditionalMeal = () => {
    const tempBookingMeals = bookingMeals
    const slots = _.filter(tempBookingMeals, { isSelect: false })
    slots.map((item) => {
      const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')
      const planFromDate = moment(fromDate).format('YYYY/MM/DD')
      const currentDate = moment().format('YYYY/MM/DD')
      const dailySlotEndTime = moment(planFromDate + ' ' + item.toTime).format('YYYY-MM-DDTHH:mm')
      const currentDateTimestamp = new Date(currentDateTime).getTime()
      const slotDateTimeTimestamp = new Date(dailySlotEndTime).getTime()
      var diff = slotDateTimeTimestamp.valueOf() - currentDateTimestamp.valueOf()
      const diffInHours = diff / 1000 / 60 / 60
      item.isAvailable = false
      item.addonsummaryData = 0
      if (planFromDate > currentDate) {
        item.isAvailable = true
      } else {
        if (((diffInHours > bookingTimeDiff) && (currentDateTimestamp < slotDateTimeTimestamp))) {
          item.isAvailable = true
        }
      }
    })
    setAdditionalBookingMeals(slots)
    setState({})
  }
  const getslots = (slots) => {
    return (
      slots.map((item, index) => {
        const currentDateTime = moment().format('YYYY-MM-DDTHH:mm')
        const planFromDate = moment(fromDate).format('YYYY/MM/DD')
        const planToDate = moment(toDate).format('YYYY/MM/DD')
        const userSelectedSlotTime = moment(new Date(planFromDate + ' ' + pickedTime)).format('YYYY-MM-DDTHH:mm')
        const slotToDateEnd = moment(new Date(planToDate + ' ' + pickedTime)).format('YYYY-MM-DDTHH:mm')
        const currentDate = moment().format('YYYY/MM/DD')
        const dailySlotEndTime = moment(new Date(planFromDate + ' ' + item.toTime)).format('YYYY-MM-DDTHH:mm')
        const currentDateTimestamp = new Date(currentDateTime).getTime()
        const slotDateTimeTimestamp = new Date(dailySlotEndTime).getTime()
        var diff = slotDateTimeTimestamp.valueOf() - currentDateTimestamp.valueOf()
        const diffInHours = diff / 1000 / 60 / 60
        item.isAvailable = false
        if (planFromDate > currentDate) {
          item.isAvailable = true
        } else {
          if (item.isSelect && ((diffInHours > bookingTimeDiff) && (currentDateTimestamp < slotDateTimeTimestamp))) {
            item.isAvailable = true
          }
        }
        if (item._id === pickedTimeId) {
          item.slotfromTime = new Date(userSelectedSlotTime)
          item.slottoTime = (packDays !== 1 ? (new Date(slotToDateEnd)) : '')
          item.slotTime = pickedTime
        }
        const slotPicker = (
          <>
            <TouchableOpacity
              disabled={!!summaryData}
              key={index}
              onPress={() => selectSlotTime(item)}
            >
              <View style={styles.slotContainer}>
                <View style={[styles.slotContainer, styles.slotContainerin]}>
                  <View style={styles.mealtime}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.cardTitle, styles.plancardTitle]}>{item.name} </Text>
                  </View>
                  <View>
                    {
                      item.isAvailable ? (
                        <View style={styles.slotAvailable}>
                          <View style={{ width: '47%', justifyContent: 'center' }}>
                            <Text style={[styles.slotTime, { textAlign: 'center' }]}>
                              {item.fromTime} -  {item.toTime}
                            </Text>
                          </View>
                          <View style={[styles.bookbtnCon, { width: '22%' }]}>
                            <Text style={styles.bookbtntext}>
                              <Text>{item.slotTime ? BOOKING.CHANGE : PAGE.BOOK}</Text>
                            </Text>
                          </View>
                        </View>)
                        : (
                          <View>
                            <Text style={styles.noslots}> {BOOKING.NOSLOTS}</Text>
                          </View>)
                    }
                  </View>
                </View>
                {
                  (item.isAvailable && item.slotTime) ? (
                    <View>
                      <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
                        <View>
                          <Text style={styles.slotitles}>{BOOKING.SLOT_TIME} </Text>
                          {packDays !== 1 ? <Text style={styles.slotitles}>{BOOKING.SLOT_END_TIME}</Text> : null}
                        </View>
                        <View>
                          <Text style={styles.slotitlesval}> - {moment(fromDate).format('DD/MM/YYYY')} </Text>
                          {packDays !== 1 ? <Text style={styles.slotitlesval}> - {moment(toDate).format('DD/MM/YYYY')} </Text> : null}
                        </View>
                        <View>
                          <Text style={styles.slotitlesval}>{item.slotTime}</Text>
                          {packDays !== 1 ? <Text style={styles.slotitlesval}>{item.slotTime}</Text> : null}
                        </View>
                      </View>
                    </View>) : null
                }
              </View>
            </TouchableOpacity>
          </>
        )
        return slotPicker
      })
    )
  }
  const getBookingSelectedMeals = () => {
    const tempBookingMeals = bookingMeals
    return _.filter(tempBookingMeals, { isSelect: true })
  }
  const getBookingAvailableMeals = () => {
    const tempBookingMeals = bookingMeals
    return _.filter(tempBookingMeals, { isSelect: true, isAvailable: true })
  }
  const validate = () => {
    valid = true
    let errorMsg = ''
    const filtertempBookingMeals = getBookingSelectedMeals()
    if (!cuisineId) {
      Toast.showWithGravity(t('select_cuisine'), Toast.LONG, Toast.BOTTOM)
      valid = false
    } else if (filtertempBookingMeals.length === 0) {
      errorMsg = t('select_atleast_one')
      valid = false
    } else if (!packDays) {
      errorMsg = t('select_package')
      valid = false
    } else if (packDays !== 1 && !fromDate) {
      errorMsg = t('select_fromdate')
      valid = false
    } else if (packDays !== 1) {
      filtertempBookingMeals.map(item => {
        if (!item.fromTime || !item.slottoTime) {
          errorMsg = `${t('pls_select') + ' ' + item.name + ' ' + t('slot_time')}`
          valid = false
        } else if ((!item.toTime || !item.slottoTime)) {
          errorMsg = `${t('pls_select') + ' ' + item.name + ' ' + t('slot_end_time')}`
          valid = false
        } else if (!typeId) {
          errorMsg = t('select_type')
          valid = false
        }
      })
    } else if (packDays === 1) {
      filtertempBookingMeals.map(item => {
        if (!item.slotfromTime) {
          errorMsg = `${t('pls_select') + ' ' + item.name + ' ' + t('slot_time')}`
          valid = false
        } else if (!item.slotfromTime && !item.slottoTime) {
          errorMsg = `${t('pls_select') + ' ' + item.name + ' ' + t('slot_end_time')}`
          valid = false
        } else if (!typeId) {
          errorMsg = t('select_type')
          valid = false
        }
      })
    } else if (!packId) {
      errorMsg = t('select_package')
      valid = false
    } else if (!members) {
      errorMsg = t('select_member')
      valid = false
    } else if (!gender) {
      errorMsg = t('select_gender')
      valid = false
    }
    if (errorMsg) {
      Toast.showWithGravity(errorMsg, Toast.LONG, Toast.BOTTOM)
    }
    return valid
  }
  const getTimeSlot = (slotsTime, slotTimeId) => {
    setPickedTime(slotsTime)
    setPickedTimeId(slotTimeId)
    setTimePickerVisible(false)
  }
  const selectCuisines = (cuisine) => {
    setCusineActiveImg(cuisine.inActiveImage)
    setCuisineId(cuisine._id)
    setCuisineName(cuisine.name)
  }
  const selectFoodType = (foodtype) => {
    setFoodTypeActiveImg(foodtype.inActiveImage)
    setTypeId(foodtype._id)
    setTypeName(foodtype.name)
  }

  useEffect(() => {
    if (pendingReviewData) {
      setShowRating(true)
      setPendingReviewItems(pendingReviewData)
    }
  }, [pendingReviewData])

  const onRating = (r, c, b) => {
    const data = {
      booking: b._id,
      workerRating: `${r}`,
      workerComment: c
    }
    dispatch(sendRatings(data))
    let newArray = []
    newArray = _.reject(pendingReviewItems, { _id: b._id })
    setPendingReviewItems(newArray)
    if (!pendingReviewItems) {
      setShowRating(false)
    }
  }
  const checkCookCuisine = (id) => {
    if (cookProfileData && cookProfileData.cuisine && id) {
      return !cookProfileData.cuisine.find(x => x === id)
    }
  }
  const checkCookFoodType = (id) => {
    if (cookProfileData && cookProfileData.foodType && id) {
      return !cookProfileData.foodType.find(x => x === id)
    }
  }
  const checkCookMealType = (id) => {
    if (cookProfileData && cookProfileData.mealType && id) {
      return !cookProfileData.mealType.find(x => x === id)
    }
  }
  const clearSelectedCook = () => {
    dispatch({ type: BOOKING.BOOKING_SELECTED_COOK_DATA_CLEAR })
  }

  return (
    <View style={common.containerBackground}>
      {
        loading && !summaryLoading ? (
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
        ) : (
          <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.Content}>
                {cookProfileData ? (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 4 }}>
                      <Cook cookDetails={cookProfileData.user} />
                    </View>
                    <TouchableOpacity
                      onPress={() => clearSelectedCook()}
                      style={{
                        flex: 1,
                        alignContent: 'flex-end',
                        alignSelf: 'center',
                        backgroundColor: '#ebbc0a',
                        borderRadius: 18
                      }}
                    >
                      <Text style={[styles.buttonClr, { padding: 8, textAlign: 'center' }]}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                <Text style={styles.cardTitle}>{t('cuisines')}</Text>
                <View style={[styles.card, common.shadow]}>
                  <View style={styles.cardTitleHolder}>
                    <Image source={cuisineImg} style={styles.cardTitleImg} />
                  </View>
                  <View style={styles.cardContent}>
                    {bookingConfig ? bookingConfig.cuisines.map((item, index) => {
                      return (
                        !checkCookCuisine(item._id) ? (
                          <TouchableOpacity
                            key={index}
                            disabled={!!summaryData || checkCookCuisine(item._id)}
                            style={styles.cuisineItem}
                            onPress={() => selectCuisines(item)}
                          >
                            <View style={cuisineId === item._id ? [styles.cuisineItemInner, styles.packageActive] : styles.cuisineItemInner}>
                              <Text
                                ellipsizeMode='tail' numberOfLines={1}
                                style={cuisineId === item._id ? styles.cuisineTitle : styles.cuisineTitleInactive}
                              >
                                {item.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ) : null
                      )
                    }) : <View style={{ width: '100%' }}><Loader /></View>}
                  </View>
                </View>
                <Text style={styles.cardTitle}>{t('time_text')}</Text>
                <View style={[styles.card, common.shadow]}>
                  <View style={styles.cardContent}>
                    {bookingMeals ? bookingMeals.map((item, index) => {
                      const imageUrl = item.isSelect ? `${IMAGE_BASE_URL}${item.activeImage}` : `${IMAGE_BASE_URL}${item.inActiveImage}`
                      return (
                        !checkCookMealType(item._id) ? (
                          <TouchableOpacity
                            key={index}
                            style={styles.timeItem}
                            disabled={!!summaryData || checkCookMealType(item._id)}
                            onPress={() => selectMultipleMeals(index)}
                          >
                            <View style={styles.cuisineTimeInner}>
                              <View style={[styles.cuisineImg, item.isSelect ? styles.imageActive : styles.imageInActive]}>
                                <Image
                                  source={{ uri: imageUrl }}
                                  style={styles.timeImage}
                                />
                              </View>
                              <Text
                                ellipsizeMode='tail' numberOfLines={2}
                                style={[styles.bookType, { color: cyanBlack }]}
                              >
                                {item.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ) : null
                      )
                    }) : <View style={{ width: '100%' }}><Loader /></View>}
                  </View>
                </View>
                <Text style={styles.cardTitle}>{t('package_text')}</Text>
                <View style={[styles.card, common.shadow]}>
                  <View style={styles.cardContent}>
                    {bookingPlan ? bookingPlan.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          disabled={!!summaryData}
                          style={styles.timeItem}
                          onPress={() => onPackageSelect(item._id, item.numberOfDays)}
                        >
                          <View style={(item.isDefault === '1') ? [styles.package, common.shadow, styles.packageActive] : [styles.package, common.shadow, styles.packageInactive]}>
                            <Text style={(item.isDefault === '1') ? [styles.packDays, styles.active] : styles.packDays}>{item.numberOfDays}</Text>
                            <Text style={(item.isDefault === '1') ? [styles.packTitle, styles.active] : styles.packTitle}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    }) : <View style={{ width: '100%' }}><Loader /></View>}
                  </View>
                </View>
                <Text style={styles.cardTitle}>{t('date_text')}</Text>
                <View style={[styles.card, common.shadow]}>
                  <View style={styles.cardContent}>
                    <TouchableOpacity
                      style={styles.dateHolder}
                      disabled={!!summaryData}
                      onPress={() => showFromDatePicker()}
                    >
                      <View style={styles.datePicker}>
                        <View style={styles.dateContainer}>
                          <Text style={styles.dateText}>{moment(fromDate).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.dateIconHolder}>
                          <Image source={calendar} style={styles.calIcon} />
                        </View>
                      </View>
                    </TouchableOpacity>
                    {packDays !== 1 ? (
                      <TouchableOpacity
                        style={styles.dateHolder}
                        disabled={!!summaryData}
                        onPress={() => showToDatePicker()}
                      >
                        <View style={styles.datePicker}>
                          <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>{moment(toDate).format('DD/MM/YYYY')}</Text>
                          </View>
                          <View style={styles.dateIconHolder}>
                            <Image source={calendar} style={styles.calIcon} />
                          </View>
                        </View>
                      </TouchableOpacity>) : null}
                    {datePickerVisible ? (
                      <DateTimePickerModal
                        isVisible={datePickerVisible}
                        testID='dateTimePicker'
                        timeZoneOffsetInMinutes={0}
                        value={fromDate}
                        mode='date'
                        is24Hour={false}
                        display='default'
                        isDarkModeEnabled={isDarkModeEnabled}
                        minimumDate={new Date()}
                        maximumDate={minDate}
                        headerTextIOS={dateTimeTitle}
                        onConfirm={(date) => onDateSelect(dateType, date)}
                        onCancel={hideDateTimePicker}
                      />
                    ) : null}
                    {todatePickerVisible ? (
                      <DateTimePickerModal
                        isVisible={todatePickerVisible}
                        testID='dateTimePicker'
                        timeZoneOffsetInMinutes={0}
                        value={toDate}
                        isDarkModeEnabled={isDarkModeEnabled}
                        mode='date'
                        is24Hour={false}
                        display='default'
                        minimumDate={fromDate}
                        maximumDate={toDate}
                        date={toDate}
                        headerTextIOS={dateTimeTitle}
                        onConfirm={(date) => onToDateSelect(dateType, date)}
                        onCancel={hideDateTimePicker}
                      />
                    ) : null}
                    {timePickerVisible ? (
                      <AlertModal
                        type='timeslot'
                        show={timePickerVisible}
                        bookingTimeDiff={bookingTimeDiff}
                        timeSlot={timeSlot}
                        fromDate={fromDate}
                        toDate={toDate}
                        onClose={(slotsTime, slotTimeId) => getTimeSlot(slotsTime, slotTimeId)}
                      />
                    ) : null}
                  </View>
                </View>
                {showslots()}
                <Text style={styles.cardTitle}>{t('type_text')}</Text>
                <View style={[styles.card, common.shadow]}>
                  <View style={styles.cardContent}>
                    {bookingConfig ? bookingConfig.food_type.map((item, index) => {
                      const typeImageUrl = typeId === item._id ? `${IMAGE_BASE_URL}${item.activeImage}` : `${IMAGE_BASE_URL}${item.inActiveImage}`
                      return (
                        !checkCookFoodType(item._id) ? (
                          <TouchableOpacity
                            disabled={!!summaryData || checkCookFoodType(item._id)}
                            key={index}
                            style={styles.timeItem}
                            onPress={() => selectFoodType(item)}
                          >
                            <View style={styles.cuisineTimeInner}>
                              <View style={[styles.cuisineImg, (typeId === item._id) ? styles.imageActive : styles.imageInActive, styles.typeSizeImg]}>
                                <Image
                                  source={{ uri: typeImageUrl }}
                                  style={styles.typeImage}
                                />
                              </View>
                              <Text
                                style={[styles.bookType, styles.poppins]}
                              >
                                {item.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ) : null
                      )
                    }) : <View style={{ width: '100%' }}><Loader /></View>}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%'
                  }}
                >
                  <Text style={[styles.cardTitle, styles.membersWidth]}>{t('members_text')}</Text>
                  <Text style={[styles.cardTitle, styles.membersWidth, { marginLeft: 10 }]}>{t('gender')}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%'
                  }}
                >
                  <View style={[styles.card, common.shadow, styles.membersWidth]}>
                    <Image
                      source={mebersImg}
                      style={styles.membersImg}
                    />
                    <View style={styles.memberContent}>
                      <View style={styles.memberBtnHolder}>
                        <Dropdown
                          value='2'
                          disabled={!!summaryData}
                          onChangeText={(value) => setMembers(value)}
                          labelHeight={2}
                          fontSize={14}
                          labelFontSize={0}
                          containerStyle={{
                            width: '80%',
                            marginTop: 12
                          }}
                          style={styles.poppins}
                          inputContainerStyle={{ borderBottomColor: transparent }}
                          selectedItemColor={darkCyan}
                          textColor={darkCyan}
                          placeholderTextColor={darkCyan}
                          data={bookingConfig.members}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.card, common.shadow, styles.membersWidth, { marginLeft: 10 }]}>
                    <View style={[styles.cardContent, styles.genderContent, { flexDirection: 'row' }]}>
                      <TouchableOpacity disabled={!!summaryData || cookProfileData} onPress={() => setGender('MALE')}>
                        <View style={gender === 'MALE' ? [styles.genderHolder, styles.packageActive] : styles.genderHolder}>
                          <Image source={male} style={styles.genderImage} />
                          <Text style={[styles.bookType, { paddingLeft: 7, fontSize: 10, marginTop: 1 }]}>Male</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity disabled={!!summaryData || cookProfileData} onPress={() => setGender('FEMALE')}>
                        <View style={gender === 'FEMALE' ? [styles.genderHolder, styles.packageActive] : styles.genderHolder}>
                          <Image source={female} style={styles.genderImage} />
                          <Text style={[styles.bookType, { paddingRight: 0, fontSize: 10, marginTop: 1 }]}>Female</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {
                  (!showOkBtn) ? (
                    <View style={styles.btnBookHolder}>
                      <TouchableOpacity
                        onPress={() => Next()}
                        style={styles.button}
                      >

                        <View style={styles.buttonView}>
                          {loading ? <View style={styles.buttonClr}><Spinner /></View> : <Text style={styles.buttonClr}>Next</Text>}
                        </View>
                      </TouchableOpacity>
                    </View>)
                    : null
                }
                {
                  (summaryErrMsg === MSG.NO_RECORDS_FOUND)
                    ? <Text style={styles.errorMsgText}>{norecords}</Text> : null
                }
                <View style={(summaryValue && showOkBtn) ? styles.totalAmountContainer : ''}>
                  {
                    (summaryValue && showOkBtn) ? (
                      <View style={styles.totalHolder}>
                        <View style={styles.totalLabel}>
                          <Text style={styles.totalLabelText}>Total Amount</Text>
                        </View>
                        <View style={styles.totalAmount}>
                          <Text style={styles.totalAmountText}>{`${rupee} ${Math.round(summaryValue)}`}</Text>
                        </View>
                      </View>) : null
                  }
                  {
                    (summaryValue && showOkBtn) ? (
                      <View style={styles.container1}>
                        <TouchableOpacity onPress={() => cancel()} style={styles.button}>
                          <View style={styles.buttonView}>
                            <Text style={styles.buttonClr}>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goToCheckout()} style={styles.button}>
                          <View style={styles.buttonView}>
                            {loading ? <View style={styles.buttonClr}><Spinner /></View> : <Text style={styles.buttonClr}>Book Now</Text>}
                          </View>
                        </TouchableOpacity>
                      </View>)
                      : null
                  }
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )
      }
      <RatingModal
        userType='CUSTOMER'
        show={showRating}
        t={t}
        reviewData={pendingReviewItems}
        onClose={(r, c, b) => onRating(r, c, b)}
      />
    </View>
  )
}
const mapStateToProps = (state) => {
  const { customerBookReducer } = state
  return {
    bookingConfigData: customerBookReducer && customerBookReducer.bookingConfigData ? customerBookReducer.bookingConfigData : '',
    summaryData: customerBookReducer && customerBookReducer.summaryData ? customerBookReducer.summaryData : '',
    summaryStatus: customerBookReducer && customerBookReducer.summaryStatus ? customerBookReducer.summaryStatus : '',
    summaryErrMsg: customerBookReducer && customerBookReducer.summaryErrMsg ? customerBookReducer.summaryErrMsg : '',
    pendingReviewData: customerBookReducer && customerBookReducer.pendingReview ? customerBookReducer.pendingReview : '',
    selctedCookData: customerBookReducer && customerBookReducer.selctedCookData ? customerBookReducer.selctedCookData : '',
    loading: !!(customerBookReducer && customerBookReducer.loading)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Book))
