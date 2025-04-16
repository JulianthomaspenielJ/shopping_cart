import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image
} from 'react-native'
import { styles } from '../../assets/styles/quickBook'
import quickBookSample from '../../assets/images/detailBg.png'
import { common } from '../../assets/styles/common'
import { PAGE, GENDER, ITEM_STATUS, BOOKING, EVENT_CAT, GUEST, KEY, SESSION } from '../../lib/const'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-material-dropdown'
import { darkCyan, mischka, jacksonsPurple, white } from '../../assets/styles/colors'
import cuisineImg from '../../assets/icons/cuisine.png'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { summary, getCombo } from '../booking/actions'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { radioStyles } from '../../assets/styles/radioGroup'
import QuickBookAlertModal from '../ui-components/quickBookAlertModal'
import moment from 'moment'
import _ from 'lodash'
import { eventTriggered, screenViewed } from '../../lib/ga'
import Toast from 'react-native-simple-toast'
import Spinner from '../ui-components/Spinner'
import {
  SUMMARY,
  COUPON
} from '../../type'
import NoRecords from '../ui-components/noRecords'
import Loader from '../ui-components/Loader'
import AsyncStorage from '@react-native-community/async-storage'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import { getData } from '../../lib/storage'

const QuickBook = (props) => {
  const {
    navigation,
    dispatch,
    bookingConfigData,
    comboData,
    summaryData,
    t,
    loading,
    summaryDataValueChanged,
    summaryReceivedMsg
  } = props
  let valid = false
  const { cuisines } = bookingConfigData
  const [cuisineSelected, setCuisine] = useState('')
  const [gender, setGender] = useState('')
  const [genderSelected, setGenderSelected] = useState('')
  const [foodTypeSelected, setFoodTypeSelected] = useState('')
  const initialValue = [
    { label: '', value: '' }]
  const [cuisinesList, setCuisinesList] = useState(initialValue)
  const [quickBookSelected, setQuickBookSelected] = useState('')
  const [quickBookRadioSelected, setQuickBookRadioSelected] = useState('')
  const [formattedCombo, setFormattedCombo] = useState([])
  const [, setState] = useState()
  const [showModal, setShowModal] = useState(false)
  const [slotsTimeData, setSlotTimeData] = useState([])
  const [selectedMealType, setSelectedMealType] = useState('')
  const [selectedItemIndex, setSelectedItemIndex] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [packId, setPackId] = useState('')
  const [labelValue, setLabelValue] = useState('')
  const [foodTypeSelectedImage, setFoodTypeSelectedImage] = useState('')
  const [guestUser, setGuestUser] = useState('')
  const fromDate = new Date()
  const genders = [
    { label: 'Female', value: 0 },
    { label: 'Male', value: 1 }
  ]
  useEffect(() => {
    analytics().setCurrentScreen(PAGE.ORDERDETAIL)
    analytics().logEvent(PAGE.ORDERDETAIL, { })
    crashlytics().log('Quick page mounted')
  }, [])
  useEffect(() => {
    if (comboData && comboData.length) {
      screenViewed(PAGE.QUICK_BOOK)
      const tempCombo = []
      comboData.forEach((element, index, array) => {
        const comboItem = element
        comboItem.people = 2
        comboItem.foodSelected = ''
        comboItem.selectedComboTime = ''
        const itemId = element._id
        if (bookingConfigData.food_type && bookingConfigData.food_type.length) {
          const newArray = []
          bookingConfigData && bookingConfigData.food_type.forEach((element, index, array) => {
            if (index < 2) {
              newArray.push({
                label: element.name,
                value: element._id,
                itemId: itemId,
                image: element.inActiveImage
              })
            }
          })
          comboItem.foodType = newArray
        }
        if (genders && genders.length) {
          const newArray = []
          genders.forEach((element, index, array) => {
            if (index < 2) {
              newArray.push({
                label: element.label,
                value: element.value,
                itemId: itemId
              })
            }
          })
          comboItem.gender = newArray
        }
        if (cuisines && cuisines.length) {
          const newArray = []
          cuisines.forEach(item => newArray.push(
            {
              label: item.name,
              value: item._id,
              itemId: itemId
            }
          ))
          setCuisinesList(newArray)
        }
        tempCombo.push(comboItem)
      })
      setFormattedCombo(tempCombo)
    }
    const bookingPlanData = _.filter(bookingConfigData.plan, { isDefault: '1' })
    bookingPlanData.map(item => {
      if (item.isDefault === '1') {
        setPackId(item._id)
      }
    })
  }, [bookingConfigData, comboData])

  useEffect(() => {
    const comboParrams = {
      status: ITEM_STATUS.ACTIVE,
      cuisine: ''
    }
    dispatch(getCombo(comboParrams))
    dispatch({
      type: SUMMARY.CLEAR_SUMMARY_VALUE
    })
  }, [navigation])

  useEffect(() => {
    if (cuisineSelected) {
      const comboParrams = {
        cuisine: cuisineSelected,
        status: ITEM_STATUS.ACTIVE
      }
      dispatch(getCombo(comboParrams))
    }
  }, [cuisineSelected])

  const onGenderChange = (gender, selectedGender) => {
    setQuickBookRadioSelected(selectedGender)
    setGenderSelected(gender)
    if (gender === 0) {
      setGender(GENDER.MALE)
    } else {
      setGender(GENDER.FEMALE)
    }
  }
  const onFoodTypeChange = (itemSelected, selectedItemId, label, foodTypeImage, index) => {
    setLabelValue(label)
    setQuickBookSelected(selectedItemId)
    setFoodTypeSelected(itemSelected)
    setFoodTypeSelectedImage(foodTypeImage)
    const tempFormatedCombo = formattedCombo
    tempFormatedCombo[index].foodSelected = selectedItemId
    setFormattedCombo(tempFormatedCombo)
  }

  const peopleCountChange = (cnt, item, index) => {
    const tempFormatedCombo = formattedCombo
    tempFormatedCombo[index].people = cnt
    setFormattedCombo(tempFormatedCombo)
    setState({})
  }

  const selectSlotTime = (index, item) => {
    const slotTime = formattedCombo[index].slot
    const foodType = formattedCombo[index].mealType[0].name
    item.mealType[0].isSelect = true

    setSelectedItemIndex(index)
    setShowModal(true)
    setSelectedMealType(foodType)
    setSlotTimeData(slotTime)
    setSelectedItem(item)
  }

  const selectedTimeSlot = (modal, slotTime) => {
    const tempFormatedCombo = formattedCombo
    tempFormatedCombo[selectedItemIndex].selectedComboTime = slotTime
    tempFormatedCombo[selectedItemIndex].isSelect = true
    setShowModal(modal)
    setFormattedCombo(tempFormatedCombo)
  }

  const goToCheckout = () => {
    if (guestUser === GUEST) {
      AsyncStorage.setItem(KEY.GUEST_USER, '')
      AsyncStorage.removeItem(SESSION.TOKEN)
      navigation.navigate('UserLogin')
    } else {
      if (validate()) {
        const slot = []
        const slotfromTime = moment(fromDate).format('YYYY-MM-DDTHH:mm')
        const slottoTime = ''
        let selectedSlot = {}
        const mealType = []
        selectedItem.mealType.map((item) => {
          mealType.push(item._id)
          selectedSlot = {
            mealType: item._id,
            fromTime: slotfromTime,
            toTime: slottoTime,
            slotTime: item.isSelect ? selectedItem.selectedComboTime : item.slot[0]
          }
          slot.push(selectedSlot)
        })
        const data = {
          cuisine: selectedItem.cuisine._id,
          mealType: mealType,
          plan: packId,
          foodType: foodTypeSelected,
          dateTime: new Date(),
          bookingType: 'NORMAL',
          slot: slot,
          members: selectedItem.people.toString(),
          cookGender: gender
        }
        dispatch({
          type: BOOKING.BOOKING_SUMMARY_REQUEST,
          summaryRequest: data
        })
        AsyncStorage.setItem('summaryRequest', JSON.stringify(data))
        dispatch(summary(data))
      }
    }
  }

  useEffect(() => {
    // AsyncStorage.removeItem('summaryRequest')
    if (summaryData && selectedItem) {
      const slottoTime = ''
      const currentbookingSlot = []
      const mealType = []
      let selectedSlot = {}
      selectedItem.mealType.map((item) => {
        mealType.push(item._id)
        selectedSlot = {
          mealType: item._id,
          name: item.name,
          fromTime: new Date(),
          toTime: slottoTime,
          slotTime: item.isSelect ? selectedItem.selectedComboTime : item.slot[0]
        }
        currentbookingSlot.push(selectedSlot)
      })
      const bookingStateData = {
        members: selectedItem.people,
        typeName: labelValue,
        cuisineName: selectedItem.cuisine.name,
        fromDate: new Date(),
        toDate: slottoTime,
        summaryValue: summaryData,
        slotFromTime: selectedItem.selectedComboTime,
        packDays: 1,
        currentbookingSlot,
        foodTypeActiveImg: foodTypeSelectedImage,
        cusineActiveImg: selectedItem.cuisine.inActiveImage ? selectedItem.cuisine.inActiveImage : ''
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
      eventTriggered(EVENT_CAT.NAV, 'Navigating to checkout')
      navigation.navigate('Checkout', { page: PAGE.CHECKOUT })
      setSelectedItem('')
      setFoodTypeSelected('')
      setQuickBookRadioSelected('')
      setGender('')
      formattedCombo.find((o, i) => {
        if (o.people && selectedItemIndex === i) {
          const tempFormatedCombo = formattedCombo
          tempFormatedCombo[i].people = 2
          tempFormatedCombo[i].selectedComboTime = ''
          setFormattedCombo(tempFormatedCombo)
        }
      })
    }
  }, [selectedItem, summaryData])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.GUEST_USER)
        .then(gUser => {
          if (gUser) {
            setGuestUser(gUser)
          }
        })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (!summaryDataValueChanged && summaryReceivedMsg) {
      Toast.showWithGravity('Please choose an another combination.', Toast.LONG, Toast.BOTTOM)
      dispatch({
        type: SUMMARY.RECEIVED
      })
    }
  }, [summaryDataValueChanged, summaryReceivedMsg])

  const validate = () => {
    valid = true
    let errorMsg = ''
    if (!selectedItem.selectedComboTime) {
      errorMsg = t('select_slot_time')
      valid = false
    } else if (!selectedItem.foodSelected) {
      errorMsg = t('select_type')
      valid = false
    } else if (!selectedItem.people) {
      errorMsg = t('select_member')
      valid = false
    } else if (!gender) {
      errorMsg = t('select_gender')
      valid = false
    } else if (!selectedItem.selectedComboTime) {
      errorMsg = t('select_gender')
      valid = false
    }
    if (errorMsg) {
      Toast.showWithGravity(errorMsg, Toast.LONG, Toast.BOTTOM)
    }
    return valid
  }

  const QuickItem = (props) => {
    const { item, index } = props
    const { cuisine, mealType, selectedComboTime } = item
    return (
      <View
        style={[styles.bookItem, styles.Content]}
        key={item.id}
      >
        <View style={[styles.bookDetail]}>
          <ImageBackground
            source={quickBookSample}
            style={styles.bgImage}
            imageStyle={styles.bgImageStyle}
          />
        </View>
        <View style={styles.bookControl}>
          <View style={styles.detailInner}>
            <Text style={styles.detailTitle}>{cuisine.name}</Text>
          </View>
          <View
            style={styles.radioHolder}
          >
            <RadioForm
              initial={0}
              formHorizontal
            >
              {
                item && item.foodType && item.foodType.map((obj, i) => (
                  <RadioButton labelHorizontal key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={quickBookSelected === obj.itemId && foodTypeSelected === obj.value}
                      onPress={(value) => onFoodTypeChange(value, obj.itemId, obj.label, obj.image, index)}
                      borderWidth={1}
                      buttonInnerColor={jacksonsPurple}
                      buttonOuterColor={jacksonsPurple}
                      buttonSize={15}
                      buttonOuterSize={20}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal
                      onPress={(value) => onFoodTypeChange(value, obj.itemId, obj.label, obj.image, index)}
                      labelStyle={radioStyles.labelStyle}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))
              }
            </RadioForm>
          </View>
          <View style={styles.radioHolder}>
            <RadioForm
              initial={0}
              formHorizontal
            >
              {
                item && item.gender && item.gender.map((obj, i) => (
                  <RadioButton labelHorizontal key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={quickBookRadioSelected === obj.itemId && obj.value === genderSelected}
                      onPress={(value) => onGenderChange(value, obj.itemId)}
                      borderWidth={1}
                      buttonInnerColor={jacksonsPurple}
                      buttonOuterColor={jacksonsPurple}
                      buttonSize={15}
                      buttonOuterSize={20}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal
                      onPress={(value) => onGenderChange(value, obj.itemId)}
                      labelStyle={radioStyles.labelStyle}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))
              }
            </RadioForm>
          </View>
          <View style={styles.peopleHolder}>
            <View>
              <Text style={styles.peopleLabel}>People</Text>
            </View>
            <TouchableOpacity onPress={() => item.people > 2 ? peopleCountChange(item.people - 2, item._id, index) : null}>
              <View style={styles.btnDecr}><Text style={[styles.btnPpl]}>-</Text></View>
            </TouchableOpacity>
            <View>
              <Text style={styles.pplCount}>{item.people}</Text>
            </View>
            <TouchableOpacity onPress={() => item.people < 10 ? peopleCountChange(item.people + 2, item._id, index) : null}>
              <View style={styles.btnIncr}><Text style={styles.btnPpl}>+</Text></View>
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          >
            <View style={{
              marginTop: 12,
              marginLeft: 10
            }}
            >
              {
                mealType && mealType.map((obj, i) => (
                  <View
                    key={i} style={{
                      flexDirection: 'row'
                    }}
                  >
                    <Text ellipsizeMode='tail' numberOfLines={2} key={i} style={[styles.slotTimeText, { fontSize: 12, width: 60 }]}>{obj.name}</Text>
                  </View>
                ))
              }
            </View>

            <TouchableOpacity
              style={styles.slotTimeContainer}
              onPress={() => selectSlotTime(index, item)}
            >
              <Text style={[styles.slotTimeText, { alignSelf: 'center', color: white }]}>Slot Time</Text>
            </TouchableOpacity>
            <View style={{
              marginTop: 20,
              marginLeft: 10
            }}
            >
              <Text style={[styles.slotTimeText, { fontSize: 12 }]}>{selectedComboTime || ''}</Text>
            </View>
          </View>
          <View style={styles.bookNowButton}>
            <TouchableOpacity
              style={styles.bookNow}
              onPress={() => goToCheckout()}
            >
              {loading ? (item._id === selectedItem._id) ? <Spinner />
                : (
                  <Text style={styles.bookNowText}>Book now&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon name='ios-arrow-forward' />
                  </Text>)
                : (
                  <Text style={styles.bookNowText}>Book now&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon name='ios-arrow-forward' />
                  </Text>
                )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={common.containerBackground}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.dropdownContainer}>
            <View style={{ width: '30%' }}>
              <Image source={cuisineImg} style={styles.imageCuisine} />
            </View>
            <Dropdown
              label={!cuisineSelected ? 'Select Cuisine' : ''}
              onChangeText={(value) => setCuisine(value)}
              labelHeight={13}
              labelTextStyle={styles.dropdownLable}
              fontSize={13}
              labelFontSize={0}
              containerStyle={{
                width: '70%'
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                backgroundColor: mischka,
                borderRadius: 15,
                paddingHorizontal: 15,
                paddingTop: 13,
                height: 50
              }}
              dropdownOffset={{
                top: 105, left: 55
              }}
              dropdownMargins={{
                min: 50, max: 50
              }}
              selectedItemColor={darkCyan}
              textColor={darkCyan}
              placeholderTextColor={darkCyan}
              data={cuisinesList}
            />
          </View>
          {loading ? <Loader /> : (
            comboData && comboData.length ? (
              <FlatList
                data={formattedCombo}
                renderItem={({ item, index }) => <QuickItem item={item} index={index} />}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={{ height: 400 }}>
                <NoRecords msg={t('no_results_found')} enableEmoji />
              </View>
            )
          )}
        </ScrollView>
      </SafeAreaView>
      <QuickBookAlertModal
        fromDate={fromDate}
        selectedMealType={selectedMealType}
        show={showModal}
        slots={slotsTimeData}
        onClose={(data, slotTIme) => selectedTimeSlot(data, slotTIme)}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  const { customerBookReducer } = state
  return {
    bookingConfigData: customerBookReducer && customerBookReducer.bookingConfigData ? customerBookReducer.bookingConfigData : '',
    comboData: customerBookReducer && customerBookReducer.comboData ? customerBookReducer.comboData : '',
    summaryData: customerBookReducer && customerBookReducer.summaryData ? customerBookReducer.summaryData : '',
    summaryDataValueChanged: customerBookReducer && customerBookReducer.summaryDataValueChanged ? customerBookReducer.summaryDataValueChanged : '',
    summaryReceivedMsg: customerBookReducer && customerBookReducer.summaryReceivedMsg ? customerBookReducer.summaryReceivedMsg : '',
    loading: !!(customerBookReducer && customerBookReducer.loading)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(QuickBook))
