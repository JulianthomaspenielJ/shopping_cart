import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { RESPONSE_MSG, PAGE, EVENT_CAT } from '../../lib/const'
import { ADDADDRESS, USERDEFAULTADDRESS } from '../../type'
import { screenViewed, eventTriggered } from '../../lib/ga'

import { koromiko, tangerine, transparent } from '../../assets/styles/colors'
import { styles } from '../../assets/styles/map'
import MapIcon from '../../assets/images/MapIcon.png'
import { getMapCurrentAddress, addAddress, userDefaultAddress, getByAddress, updateAddress } from './actions'
import Toast from 'react-native-simple-toast'
import Geolocation from '@react-native-community/geolocation'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from 'react-native-dotenv'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import Spinner from '../ui-components/Spinner'

const LinearGradient = require('react-native-linear-gradient').default

const SetLocationMap = (props) => {
  const {
    navigation,
    dispatch,
    mapCurrentAddress,
    addAddressStatus,
    t,
    addAddressError,
    route,
    getByAddressData,
    updateAddressStatus,
    updateAddressError,
    loading
  } = props
  const mapRefView = useRef(null)
  // lat: 12.947000,
  // long: 80.136190,
  const [, setGetCurrentMapAddress] = useState('')
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0,
    longitudeDelta: 0.015,
    latitudeDelta: 0.0121
  })
  const [currentAddress, setCurrentAddress] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [area, setArea] = useState('')
  const [city, setCity] = useState('')
  const [completeAddress, setCompleteAddress] = useState('')
  const [landmark, setLandmark] = useState('')
  const [floor, setFloor] = useState('')
  const [street, setStreet] = useState('')
  const [, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [, setPlaceId] = useState('')
  const [, setIsSearchLocation] = useState(false)
  const [addressType, setAddressType] = useState('')
  const [completeAddressErr, setCompleteAddressErr] = useState('')
  const [addressTypeErr, setAddressTypeErr] = useState('')
  const [, setRefreshState] = useState('')

  const addressId = route && route.params && route.params.addressId
  const totalAddressLength = route && route.params && route.params.totalAddressLength
  useEffect(() => {
    setCompleteAddress('')
    const unsubscribe = navigation.addListener('focus', () => {
      if (!addressId) {
        Geolocation.getCurrentPosition(
          position => {
            //  useCoordinates = position;
            setAddressType('')
            setCompleteAddress('')
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
            // setCurrentPosition({latitude: position.coords.latitude, longitude: position.coords.longitude})
            // dispatch(getMapCurrentAddress(parseFloat(currentPosition.lat), parseFloat(currentPosition.long)))
          },
          error => {
            requestPermission()
            Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM)
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 120000 }
        )
      }
      if (totalAddressLength >= 5) {
        Toast.showWithGravity('Your address limit exceeded, Please remove or update', Toast.LONG, Toast.BOTTOM)
      }

      dispatch(getByAddress(addressId))
      screenViewed(PAGE.GOOGLEMAP)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (getByAddressData && getByAddressData._id) {
      setCurrentPosition({
        lat: getByAddressData.position.lat,
        long: (getByAddressData.position.long),
        longitudeDelta: 0.015,
        latitudeDelta: 0.0121
      })
      setCompleteAddress(getByAddressData.completeAddress)
      setLandmark(getByAddressData.landmark)
      setPostalcode(getByAddressData.pinCode)
      setStreet(getByAddressData.street)
      setArea(getByAddressData.area)
      setCity(getByAddressData.city)
      setDistrict(getByAddressData.district)
      setState(getByAddressData.state)
      setCountry(getByAddressData.country)
      setAddressType(getByAddressData.type)
      const param = parseFloat(getByAddressData.position.lat) + ',' + getByAddressData.position.long
      dispatch(getMapCurrentAddress(param))
    }
  }, [getByAddressData])

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.ADDRESSSEARCH)
    crashlytics().log('Address search page mounted')
  }, [])

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This App needs access to your location ' + 'so we can know where you are.'
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
  useEffect(() => {
    setGetCurrentMapAddress(mapCurrentAddress)
    if (mapCurrentAddress) {
      // if (!placeId && !isSearchLocation && mapCurrentAddress) {
      mapCurrentAddress.length > 0 && mapCurrentAddress.map((result, index) => {
        if ((index === 1)) {
          clearState()
          passMapAddress(result.address_components)
          setCurrentAddress(result.formatted_address)
          setRefreshState({})
        }
      })
    }
  }, [mapCurrentAddress])

  useEffect(() => {
    return () => {
      setPlaceId('')
      setIsSearchLocation(false)
    }
  }, [])

  const passMapAddress = (addressComp) => {
    addressComp.map((addressresult, index) => {
      if (addressresult.types.indexOf('postal_code') > -1) {
        setPostalcode(addressresult.long_name)
      }
      if (addressresult.types.indexOf('street_number') > -1) {
        setStreet(addressresult.long_name)
      }
      if (addressresult.types.indexOf('sublocality_level_1') > -1 || (addressresult.types.indexOf('neighborhood')) > -1) {
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
      setRefreshState({})
    })
  }

  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search for your Location'
        minLength={2}
        autoFocus={false}
        nearbyPlacesAPI='GooglePlacesSearch'
        query={{
          key: GOOGLE_API_KEY,
          language: 'en'
        }}
        keyboardAppearance='light'
        // onChangeText={(value) => onMapRegionChange(value)}
        fetchDetails
        currentLocationLabel='Current location'
        onPress={(data, details = null) => {
          setIsSearchLocation(true)
          if (data.place_id) {
            setPlaceId(data.place_id)
            setCurrentAddress(data.description)
            if (details.geometry.location) {
              setCurrentPosition({
                lat: details.geometry.location.lat,
                long: details.geometry.location.lng,
                longitudeDelta: currentPosition.longitudeDelta,
                latitudeDelta: currentPosition.latitudeDelta
              })
              onMapRegionChange({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng
              })
              // dispatch(getMapCurrentAddressByPlaceId(data.place_id))
              setTimeout(() => {
                mapRefView.current.fitToCoordinates([{ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }], { animated: true })
              }, 2000)
            }
          }
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={300}
        renderLeftButton={() => <Icon name='ios-search' style={styles.searchIcon} />}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: 50

          },
          textInput: {
            borderRadius: 25,
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 14,
            backgroundColor: '#f2f2f2'

          },
          predefinedPlacesDescription: {
            color: '#1faadb',
            marginTop: 2
          }
        }}
      />
    )
  }

  const clearState = () => {
    setCompleteAddress('')
    setLandmark('')
    setPostalcode('')
    setStreet('')
    setArea('')
    setCity('')
    setDistrict('')
    setState('')
    setCountry('')
    setCurrentAddress('')
  }

  const onMapRegionChange = (region) => {
    // setCompleteAddress('')
    // setLandmark('')
    // setPostalcode('')
    // setStreet('')
    // setArea('')
    // setCity('')
    // setDistrict('')
    // setState('')
    // setCountry('')
    // setCurrentAddress('')

    setCurrentPosition({
      lat: parseFloat(region.latitude),
      long: parseFloat(region.longitude),
      longitudeDelta: region.longitudeDelta,
      latitudeDelta: region.latitudeDelta
    })
    const param = parseFloat(region.latitude) + ',' + parseFloat(region.longitude)
    dispatch(getMapCurrentAddress(param))
  }
  let valid = false
  const validate = () => {
    valid = true
    setCompleteAddress(completeAddress.trim())
    setAddressType(addressType)
    if (!completeAddress) {
      setCompleteAddressErr(true)
      valid = false
    }
    if (!addressType) {
      setAddressTypeErr(true)
      valid = false
    }
    return valid
  }

  useEffect(() => {
    if ((completeAddress)) {
      setCompleteAddressErr(false)
    }
    if ((addressType)) {
      setAddressTypeErr(false)
    }
  }, [completeAddress, addressType])

  const confirmLocation = () => {
    setCompleteAddress(completeAddress.trim())
    setAddressType(addressType)
    if (validate()) {
      const data = {
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
        type: addressType,
        location: { type: 'Point', coordinates: [currentPosition.lat, currentPosition.long] },
        position: {
          lat: currentPosition.lat,
          long: currentPosition.long
        }
      }
      analytics().logEvent(PAGE.ADDRESSSEARCH, {
        area,
        city,
        floor,
        street,
        landmark,
        state,
        country,
        completeAddress,
        type: addressType
      })
      if (!addressId) {
        eventTriggered(EVENT_CAT.ACTION, 'Add new address')
        dispatch(addAddress(data))
      } else {
        eventTriggered(EVENT_CAT.ACTION, 'Update new address')
        dispatch(updateAddress(data, addressId))
      }
      dispatch(userDefaultAddress({ type: USERDEFAULTADDRESS.REQUEST }))
    }
  }

  useEffect(() => {
    if ((addAddressStatus === RESPONSE_MSG.SUCCESS)) {
      // Toast.showWithGravity('New address added', Toast.LONG, Toast.BOTTOM)
      dispatch({ type: ADDADDRESS.CLEAR })
      eventTriggered(EVENT_CAT.ACTION, 'Added user address')
      navigation.pop()
      // dispatch(getProfile({ type: PROFILE.PROFILE }))
    }
    if ((addAddressStatus === RESPONSE_MSG.ERROR)) {
      eventTriggered(EVENT_CAT.ACTION, 'Failed to add user address')
      Toast.showWithGravity(t('profile_fails'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: ADDADDRESS.CLEAR })
    }
  }, [addAddressStatus, addAddressError])

  useEffect(() => {
    if ((updateAddressStatus === RESPONSE_MSG.SUCCESS)) {
      // Toast.showWithGravity('New address added', Toast.LONG, Toast.BOTTOM)
      dispatch({ type: ADDADDRESS.CLEAR })
      eventTriggered(EVENT_CAT.ACTION, 'Updated user address')
      navigation.pop()
      // dispatch(getProfile({ type: PROFILE.PROFILE }))
    }
    if ((updateAddressStatus === RESPONSE_MSG.ERROR)) {
      eventTriggered(EVENT_CAT.ACTION, 'Failed to update user address')
      Toast.showWithGravity(t('profile_fails'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: ADDADDRESS.CLEAR })
    }
  }, [updateAddressStatus, updateAddressError])

  const goToback = () => {
    navigation.pop()
  }

  const renderMap = () => {
    return (
      <>
        <MapView
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
          ref={mapRefView}
          // onRegionChangeComplete={(reg) => onMapRegionChange(reg)}
          showsUserLocation
          showsMyLocationButton
          zoomEnabled
          showsCompass
          initialRegion={{
            latitude: currentPosition && currentPosition.lat ? currentPosition.lat : getByAddressData.position.lat,
            longitude: currentPosition && currentPosition.long ? currentPosition.long : getByAddressData.position.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            tooltip
            draggable
            coordinate={{
              latitude: currentPosition && currentPosition.lat ? currentPosition.lat : 0,
              longitude: currentPosition && currentPosition.long ? currentPosition.long : 0
            }}
            title='Move Map to adjust'
          >
            <Image source={MapIcon} style={[styles.mapIcon]} />
          </Marker>

        </MapView>
        <Callout>
          <TouchableOpacity style={styles.backBtnContainer} onPress={() => goToback()}>
            <Text style={{ fontSize: 18 }}><Icon name='ios-arrow-back' size={20} style={styles.arrowBack} /> {t('back')}</Text>
          </TouchableOpacity>
        </Callout>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.bgColor}>
      <View style={{ flex: 1.6 }}>
        {(currentPosition && currentPosition.lat && currentPosition.long)
          ? renderMap() : null}
      </View>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={styles.addressForms}>
            <View style={{ backgroundColor: '#f2f2f2', borderRadius: 25, overflow: 'hidden' }}>
              <GooglePlacesInput />
            </View>
            <View style={styles.parentContainer}>
              <View style={styles.headerContainer}>
                <FontAwesome style={[styles.locationIcon]} name='map-marker' />
                <Text style={[styles.locationDesc, { fontSize: 14 }]} ellipsizeMode='tail' numberOfLines={2}>{currentAddress}</Text>
              </View>
            </View>
            <View style={styles.setLocation}>
              <TouchableOpacity onPress={() => setAddressType('HOME')} style={styles.setLocationBtn}>
                <Text style={[styles.setLocationTxt, addressType === 'HOME' ? { color: 'red' } : '']}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAddressType('WORK')} style={styles.setLocationBtn}>
                <Text style={[styles.setLocationTxt, addressType === 'WORK' ? { color: 'red' } : '']}>Work</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAddressType('OTHER')} style={styles.setLocationBtn}>
                <Text style={[styles.setLocationTxt, addressType === 'OTHER' ? { color: 'red' } : '']}>Other</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: 'red' }}>{addressTypeErr ? 'Please select address type' : ''}</Text>
            </View>
            <View style={[styles.parentContainer, styles.addressContainer]}>
              <Text style={[styles.label, styles.addLabel]}>{t('complete_address')}</Text>
              <View>
                <TextInput
                  style={styles.addressInput}
                  placeholder='Complete Address *'
                  value={completeAddress}
                  onChangeText={(value) => setCompleteAddress(value)}
                />
                <TextInput
                  style={styles.addressInput}
                  value={floor}
                  onChangeText={(value) => setFloor(value)}
                  placeholder='Floor (Optional)'
                />
                <TextInput
                  style={styles.addressInput}
                  value={landmark}
                  onChangeText={(value) => setLandmark(value)}
                  placeholder='Landmark (Optional)'
                />
                <Text style={{ fontSize: 12, color: 'red' }}>{completeAddressErr ? t('complete_address_msg') : ''}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                underlayColor={transparent}
                style={styles.btnContainer}
                onPress={() => confirmLocation()}
                disabled={totalAddressLength > 5}
              >
                <LinearGradient
                  colors={[tangerine, koromiko]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.linerText}
                >
                  {loading ? <Spinner /> : <Text style={styles.btnText}>{t('confirm_location')}</Text>}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>

  )
}
const mapStateToProps = (state) => {
  const { mapLocationReducer } = state
  return {
    mapCurrentAddress: mapLocationReducer && mapLocationReducer.mapCurrentAddress ? mapLocationReducer.mapCurrentAddress : '',
    addAddressStatus: mapLocationReducer && mapLocationReducer.addAddressStatus ? mapLocationReducer.addAddressStatus : '',
    addAddressError: mapLocationReducer && mapLocationReducer.addAddressError ? mapLocationReducer.addAddressError : '',
    getDefaultAddress: mapLocationReducer && mapLocationReducer.getDefaultAddress ? mapLocationReducer.getDefaultAddress : '',
    getByAddressData: mapLocationReducer && mapLocationReducer.getByAddressData ? mapLocationReducer.getByAddressData : '',
    updateAddressStatus: mapLocationReducer && mapLocationReducer.updateAddressStatus ? mapLocationReducer.updateAddressStatus : '',
    updateAddressError: mapLocationReducer && mapLocationReducer.updateAddressError ? mapLocationReducer.updateAddressError : '',
    loading: !!(mapLocationReducer && mapLocationReducer.loading)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SetLocationMap))
