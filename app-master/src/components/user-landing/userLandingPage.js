import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { DrawerActions } from '@react-navigation/native'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  Keyboard,
  ImageBackground,
  ScrollView,
  PermissionsAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import All from './all'
import Recommended from './recommended'
import locationImg from '../../assets/images/location.png'
import menu from '../../assets/images/menu.png'
import { styles } from '../../assets/styles/userLanding'
import { lightGrey, yellow, darkCyan, lightBlue, white } from '../../assets/styles/colors'
import { poppinsMedium } from '../../assets/styles/fonts'
import { connect } from 'react-redux'
import { HOME, USERDEFAULTADDRESS, ADDADDRESS } from '../../type'
import { userDefaultAddress, getMapCurrentAddress } from '../location/actions'
import Geolocation from '@react-native-community/geolocation'
import bannerChef from '../../assets/images/bannerChef.png'
import bannerChef2 from '../../assets/images/bannerChef2.png'
import banner from '../../assets/images/banner.png'
import banner2 from '../../assets/images/banner2.png'
import banner3 from '../../assets/images/banner3.png'
import { screenViewed, eventTriggered } from '../../lib/ga'
import { PAGE, EVENT_CAT } from '../../lib/const'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import Toast from 'react-native-simple-toast'
import { withTranslation } from 'react-i18next'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const Tab = createMaterialTopTabNavigator()

const UserLanding = (props) => {
  const { navigation, dispatch, getDefaultAddress, mapCurrentAddress, t } = props
  const [searchData, setSearchData] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [defaultAddress, setDefaultAddress] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [area, setArea] = useState('')
  const [city, setCity] = useState('')
  const [landmark, setLandmark] = useState('')
  const [street, setStreet] = useState('')
  const [, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [floor] = useState('')
  const [completeAddress] = useState('')
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0,
    longitudeDelta: 0.015,
    latitudeDelta: 0.0121
  })
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenViewed(PAGE.COOKALLRECCOMMENDED)
      setSearchData('')
      dispatch(userDefaultAddress({ type: USERDEFAULTADDRESS.REQUEST }))
      dispatch({ type: HOME.SEARCH, searchData: searchData })
      Geolocation.getCurrentPosition(
        position => {
          if (position.coords.latitude && position.coords.longitude) {
            const initialPosition = JSON.stringify(position)
            var lati = JSON.parse(initialPosition).coords.latitude
            var lng = JSON.parse(initialPosition).coords.longitude
            setCurrentPosition({
              lat: (lati),
              long: (lng),
              longitudeDelta: 0.015,
              latitudeDelta: 0.0121
            })
            const param = parseFloat(lati) + ',' + parseFloat(lng)
            dispatch(getMapCurrentAddress(param))
            // setCallRender({})
          }
        },
        error => {
          requestPermission()
          Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM)
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 120000 }
      )
    })
    return unsubscribe
  }, [navigation])
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This App needs access to your location ' +
                     'so we can know where you are.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Toast.showWithGravity('You can use locations', Toast.LONG, Toast.BOTTOM)
      } else {
        Toast.showWithGravity('Location permission denied', Toast.LONG, Toast.BOTTOM)
      }
    } catch (err) {
      console.warn(err)
    }
  }
  const confirmLocation = () => {
    if (currentPosition && (currentPosition.lat > 0 && currentPosition.long > 0)) {
      const data = { // eslint-disable-line
        deliveryLocation: area,
        pinCode: postalcode,
        area,
        city,
        floor,
        street,
        landmark,
        state,
        country,
        completeAddress,
        location: { type: 'Point', coordinates: [currentPosition.lat, currentPosition.long] },
        position: {
          lat: currentPosition.lat,
          long: currentPosition.long
        }
      }
      // dispatch(addAddress(data))
    }
  }

  useEffect(() => {
    if (mapCurrentAddress) {
      mapCurrentAddress.length > 0 && mapCurrentAddress.map((result, index) => {
        let indexx
        if (mapCurrentAddress.length > 1) {
          indexx = 1
        } else {
          indexx = 0
        }
        if ((index === indexx)) {
          setCurrentAddress(result.formatted_address)
          passMapAddress(result.address_components)
        }
      })
    }
  }, [mapCurrentAddress])

  const passMapAddress = (addressComp) => {
    addressComp.map((addressresult, index) => {
      if (addressresult.types.indexOf('postal_code') > -1) {
        setPostalcode(addressresult.long_name)
      }
      if (addressresult.types.indexOf('street_number') > -1) {
        setStreet(addressresult.long_name)
      }
      if (addressresult.types.indexOf('sublocality_level_1') > -1) {
        setArea(addressresult.long_name)
      }
      if (addressresult.types.indexOf('locality') > -1) {
        setCity(addressresult.long_name)
      }
      if (addressresult.types.indexOf('administrative_area_level_2') > -1) {
        setDistrict(addressresult.long_name)
      }
      if (addressresult.types.indexOf('administrative_area_level_1') > -1) {
        setState(addressresult.long_name)
      }
      if (addressresult.types.indexOf('country') > -1) {
        setCountry(addressresult.long_name)
      }
      if (addressresult.types.indexOf('route') > -1) {
        setLandmark(addressresult.long_name)
      }
    })
  }
  useEffect(() => {
    if (!getDefaultAddress) {
      confirmLocation()
    }
    dispatch({ type: ADDADDRESS.CLEAR })
  }, [])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.USERLANDING)
    crashlytics().log('Cook, Cuisine list page mounted')
  }, [])

  const userSearch = () => {
    if (searchData) {
      Keyboard.dismiss()
      dispatch({ type: HOME.SEARCH, searchData: searchData })
      navigation.navigate('HomeSearch', { searchData })
    }
  }

  const clearSearch = () => {
    setSearchData('')
  }
  useEffect(() => {
    if (getDefaultAddress) {
      let add = ''
      if (getDefaultAddress.complete_address) {
        add = `${add}${getDefaultAddress.complete_address}, `
      }
      if (getDefaultAddress.landmark) {
        add = `${add}${getDefaultAddress.landmark}, `
      }
      if (getDefaultAddress.area) {
        add = `${add}${getDefaultAddress.area}, `
      }
      if (getDefaultAddress.city) {
        add = `${add}${getDefaultAddress.city}, `
      }
      if (getDefaultAddress.pinCode) {
        add = `${add}${getDefaultAddress.pinCode}`
      }
      setDefaultAddress(add)
    }
  }, [getDefaultAddress])
  const getSouthCooks = (value) => {
    screenViewed(PAGE.SEARCH)
    eventTriggered(EVENT_CAT.SELECTION, 'Navigating to search page')
    analytics().logEvent(PAGE.SEARCH, {
      searchData: value
    })
    const searchData = value
    dispatch({ type: HOME.SEARCH, searchData: searchData })
    navigation.navigate('HomeSearch', { searchData })
  }
  return (
    <View style={{ flex: 1, backgroundColor: lightGrey }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {Platform.OS === 'ios' && (
          <>
            <View style={{ height: STATUS_BAR_HEIGHT }}>
              <StatusBar
                translucent
                backgroundColor={white}
                barStyle='dark-content'
              />
            </View>
          </>
        )}
        <View style={[styles.parentContainer, { marginTop: 10 }]}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.hederSec} onPress={() => navigation.push('SetLocation')}>
              <Image style={styles.locationImg} source={locationImg} />
              <Text style={styles.locationDesc} ellipsizeMode='tail' numberOfLines={1}>
                {defaultAddress || currentAddress}
              </Text>
            </TouchableOpacity>
            <View style={[styles.menuContainer]}>
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image style={styles.menuImg} source={menu} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1
          }}
        >
          <View style={[styles.bannerBackgroundContainer, { marginLeft: 15 }]}>
            <ImageBackground
              source={banner}
              style={styles.bannerBackgroundImage}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.bannerTextContainer}>
                  <View>
                    <Text style={styles.bannerText}>South Indian Cooks</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => getSouthCooks('south')}
                  >
                    <View style={styles.bannerSeeAll}>
                      <Text style={styles.bannerSeeAllText}>See all &nbsp;&nbsp;</Text>
                      <Icon name='ios-arrow-forward' style={{ paddingTop: 2, color: 'white' }} size={11} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image source={bannerChef} style={styles.bannerChefImg} />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={[styles.bannerBackgroundContainer, { marginLeft: 15 }]}>
            <ImageBackground
              source={banner2}
              style={styles.bannerBackgroundImage}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.bannerTextContainer}>
                  <View>
                    <Text style={styles.bannerText}>North Indian Cooks</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => getSouthCooks('North')}
                  >
                    <View style={styles.bannerSeeAll}>
                      <Text style={styles.bannerSeeAllText}>See all &nbsp;&nbsp;</Text>
                      <Icon name='ios-arrow-forward' style={{ paddingTop: 2, color: 'white' }} size={11} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image source={bannerChef2} style={styles.bannerChefImg} />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={[styles.bannerBackgroundContainer, { marginLeft: 15, marginRight: 15 }]}>
            <ImageBackground
              source={banner3}
              style={styles.bannerBackgroundImage}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.bannerTextContainer}>
                  <View>
                    <Text style={styles.bannerText}>Andhra Cooks</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => getSouthCooks('Andhra')}
                  >
                    <View style={[styles.bannerSeeAll, { marginTop: 45 }]}>
                      <Text style={styles.bannerSeeAllText}>See all &nbsp;&nbsp;</Text>
                      <Icon name='ios-arrow-forward' style={{ paddingTop: 2, color: 'white' }} size={11} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image source={bannerChef2} style={styles.bannerChefImg} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
        <View style={styles.searchContainer}>
          <View style={[styles.searchSec, { paddingRight: 0 }]}>
            <TextInput
              style={styles.searchInput}
              placeholder='Pls Enter Location, Cuisine, Cook, Type'
              onChangeText={(value) => setSearchData(value)}
              value={searchData}
            />
            {
              searchData ? (
                <TouchableOpacity onPress={() => clearSearch()}>
                  <Icon name='ios-close' style={styles.closeIcon} />
                </TouchableOpacity>
              ) : null
            }
            <TouchableOpacity
              onPress={() => userSearch()}
              style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end' }}
            >
              <Icon name='ios-search' style={searchData ? [styles.searchIcon] : [styles.searchIcon]} />
            </TouchableOpacity>
          </View>
        </View>
        <Tab.Navigator
          lazy={false}
          tabBarOptions={{
            activeTintColor: darkCyan,
            inactiveTintColor: darkCyan,
            style: {
              backgroundColor: lightBlue,
              borderBottomColor: lightBlue,
              marginLeft: 20,
              marginRight: 20,
              elevation: 0,
              shadowOpacity: 0,
              borderRadius: 13
            },
            indicatorStyle: {
              height: '100%',
              backgroundColor: yellow,
              borderRadius: 13

            },
            labelStyle: {
              fontFamily: poppinsMedium,
              textTransform: 'capitalize',
              fontSize: 16,
              fontWeight: '600'
            }
          }}
        >
          <Tab.Screen name={t('all_text')} component={All} />
          <Tab.Screen name={t('recommended')} component={Recommended} />
        </Tab.Navigator>
      </ScrollView>
    </View>

  )
}
const mapStateToProps = (state) => {
  const { mapLocationReducer } = state
  return {
    getDefaultAddress: mapLocationReducer && mapLocationReducer.getDefaultAddress ? mapLocationReducer.getDefaultAddress : '',
    mapCurrentAddress: mapLocationReducer && mapLocationReducer.mapCurrentAddress ? mapLocationReducer.mapCurrentAddress : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserLanding))
