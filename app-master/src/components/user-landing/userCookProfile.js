import React from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { ratingDetailsStyles } from '../../assets/styles/ratingDetails'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import chef from '../../assets/images/chef.png'
import cookGenderImg from '../../assets/icons/male.png'
import cookGenderFemaleImg from '../../assets/icons/female.png'
import { userCookStyles } from '../../assets/styles/userCookStyles'
import starRating from '../../assets/images/start_rating.png'
import { BOOKING } from '../../type'
import { eventTriggered } from '../../lib/ga'
import { EVENT_CAT } from '../../lib/const'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { withTranslation } from 'react-i18next'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

const HomeSearch = (props) => {
  const { navigation, selectedCookData, bookingConfigData, dispatch, t } = props
  const { user, rating, description, cuisines, foodType, mealType } = selectedCookData
  const getCuisines = () => {
    return cuisines && cuisines.length ? cuisines.map(function (cuisines, index) {
      return (
        <Text key={index} style={userCookStyles.cuisinesContainerText}>{cuisines.name}</Text>
      )
    }) : null
  }

  const getFoodType = () => {
    let newArray = []
    newArray = bookingConfigData && bookingConfigData.food_type.filter(function (item) {
      return foodType.includes(item._id)
    })
    return newArray && newArray.length ? newArray.map(function (item) {
      return (
        <View key={item._id}>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${item.inActiveImage}` }}
            style={userCookStyles.foodTypeImg}
          />
          <Text style={[userCookStyles.foodTypeText, { paddingHorizontal: '11%' }]}>{item.name}</Text>
        </View>
      )
    }) : null
  }

  const getMealType = () => {
    let newArray = []
    newArray = bookingConfigData && bookingConfigData.meals.filter(function (item) {
      return mealType.includes(item._id)
    })
    return newArray && newArray.length ? newArray.map(function (item) {
      return (
        <View key={item._id}>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${item.inActiveImage}` }}
            style={userCookStyles.foodTypeImg}
          />
          <Text style={[userCookStyles.foodTypeText, { paddingHorizontal: '11%' }]}>{item.name}</Text>
        </View>
      )
    }) : null
  }
  const bookNow = () => {
    dispatch({
      type: BOOKING.BOOKING_SELECTED_COOK_DATA,
      selctedCookData: selectedCookData
    })
    eventTriggered(EVENT_CAT.NAV, 'Navigating to Booking page from individula cook')
    navigation.navigate('BookingTabs')
  }
  const backToBooking = () => {
    eventTriggered(EVENT_CAT.NAV, 'Navigating to recommended from individula cook')
    navigation.navigate('UserLanding')
  }
  return (
    <View style={ratingDetailsStyles.container}>
      {
        Platform.OS === 'ios' && (
          <>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: 'white' }}>
              <StatusBar
                translucent
                backgroundColor='white'
                barStyle='dark-content'
              />
            </View>
          </>
        )
      }
      <ImageBackground
        source={user.avatar ? { uri: `${IMAGE_BASE_URL}${user.avatar}` } : chef}
        style={ratingDetailsStyles.bgImageContainer}
      >
        <TouchableOpacity
          onPress={backToBooking}

        >
          <Text style={{ fontSize: 18, marginTop: 30, marginHorizontal: 15 }}><IonIcon name='ios-arrow-back' size={18} /> {t('back')}</Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={userCookStyles.ratingContainerDetails}>
        <ScrollView
          style={{ height: '75%' }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={ratingDetailsStyles.borderPatch} />
          </View>
          <View style={userCookStyles.cookDetailsCOntainer}>
            <View style={userCookStyles.flexDirectionStyle}>
              <Image
                source={user.gender === 'MALE' ? cookGenderImg : cookGenderFemaleImg}
                style={userCookStyles.cookGenderImg}
              />
              <Text style={[userCookStyles.userNameText, { width: 180 }]} numberOfLines={1} ellipsizeMode='tail'>{user.name}</Text>
            </View>
            <View style={[userCookStyles.flexDirectionStyle, userCookStyles.ratingContainer]}>
              <Image
                source={starRating}
                style={userCookStyles.starRatingImg}
              />
              <Text style={userCookStyles.ratingText}>{rating}</Text>
            </View>
          </View>
          <View>
            <View style={userCookStyles.descriptionContainer}>
              <Text style={userCookStyles.descriptionTitleText}>Description</Text>
            </View>
            <View style={userCookStyles.descriptionTextContainer}>
              <Text style={userCookStyles.descriptionText}>{description}</Text>
            </View>
          </View>
          <View>
            <View style={userCookStyles.descriptionContainer}>
              <Text style={userCookStyles.descriptionTitleText}>Cuisines</Text>
            </View>
            <View style={[userCookStyles.descriptionTextContainer, userCookStyles.flexDirectionStyle]}>
              <View style={userCookStyles.cuisinesContainer}>
                {getCuisines()}
              </View>
            </View>
          </View>
          <View style={userCookStyles.pb}>
            <View style={userCookStyles.descriptionContainer}>
              <Text style={userCookStyles.descriptionTitleText}>Type</Text>
            </View>
            <View style={[userCookStyles.descriptionTextContainer, userCookStyles.flexDirectionStyle]}>
              <View style={[userCookStyles.cuisinesContainer]}>
                {getFoodType()}
              </View>
            </View>
            {mealType ? (
              <>
                <View style={userCookStyles.descriptionContainer}>
                  <Text style={userCookStyles.descriptionTitleText}>Meal Type</Text>
                </View>
                <View style={[userCookStyles.descriptionTextContainer, userCookStyles.flexDirectionStyle]}>
                  <View style={[userCookStyles.cuisinesContainer]}>
                    {getMealType()}
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
        <View>
          <View style={userCookStyles.bookNowContainer}>
            <TouchableOpacity
              onPress={bookNow}
            >
              <Text style={userCookStyles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { customerHomeReducer, customerBookReducer } = state
  return {
    selectedCookData: customerHomeReducer && customerHomeReducer.selectedCookData ? customerHomeReducer.selectedCookData : '',
    bookingConfigData: customerBookReducer && customerBookReducer.bookingConfigData ? customerBookReducer.bookingConfigData : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomeSearch))
