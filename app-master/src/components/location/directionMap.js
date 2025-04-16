import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import MapView, { Marker, AnimatedRegion } from 'react-native-maps'
import { gold, corn, graniteGray, mapIndicatorColor } from '../../assets/styles/colors'
import { styles } from '../../assets/styles/directionMap'
import { GOOGLE_API_KEY } from 'react-native-dotenv'
import Geolocation from '@react-native-community/geolocation'
import Toast from 'react-native-simple-toast'
import Polyline from '@mapbox/polyline'
import { screenViewed } from '../../lib/ga'
import { PAGE } from '../../lib/const'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { withTranslation } from 'react-i18next'

const LinearGradient = require('react-native-linear-gradient').default

const DirectionMap = (props) => {
  const { navigation, route, t } = props
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0,
    longitudeDelta: 0.015,
    latitudeDelta: 0.0121
  })
  const mapRefView = useRef(null)

  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const cookPosition = route && route.params && route.params.data && route.params.data.cookPosition
  const userLocation = route && route.params && route.params.data && route.params.data.userLocation
  useEffect(() => {
    screenViewed(PAGE.COOKDIRECTION)
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords
        if (position.coords.latitude && position.coords.longitude && userLocation && userLocation.lat) {
          const initialPosition = JSON.stringify(position)
          var lati = JSON.parse(initialPosition).coords.latitude
          var lng = JSON.parse(initialPosition).coords.longitude
          setCurrentPosition({
            lat: (lati),
            long: (lng),
            longitudeDelta: 0.015,
            latitudeDelta: 0.0121
          })
          getRoutes(latitude, longitude)
        }
      },
      error => {
        setError(error.message)
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM)
      },
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 120000 }
    )
    return () => Geolocation.clearWatch(watchId)
  }, [error, routeCoordinates, currentPosition])

  const getRoutes = (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${latitude},${longitude}&destination=${userLocation.lat},${userLocation.long}&key=${GOOGLE_API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const points = Polyline.decode(res.routes[0].overview_polyline.points)
        const coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1]
          }
        })
        setLoading(true)
        setRouteCoordinates(coords)
      }).catch((error) => {
        console.log(error)
      }).done()
  }
  const goBack = () => {
    // Geolocation.clearWatch(watchId)
    navigation.navigate('AppDrawerCook', { screen: 'welcomeCook' })
  }

  return (
    <View style={styles.bgColor}>
      <LinearGradient
        colors={[gold, corn]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.navArea}>
          <TouchableOpacity style={styles.backArrowCont} onPress={() => goBack()}>
            <Text style={{ fontSize: 18 }}><IonIcon name='ios-arrow-back' size={18} /> {t('back')}</Text>
          </TouchableOpacity>
          <View style={styles.titleHolder}>
            <Text style={styles.headerTitle}>Directions</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.Mapcontainer}>
        <View style={{ width: '100%' }}>
          <View style={{ flex: 1 }}>
            <MapView
              loadingEnabled
              loadingIndicatorColor={graniteGray}
              loadingBackgroundColor={mapIndicatorColor}
              showUserLocation
              followUserLocation
              // moveOnMarkerPress
              showsCompass
              zoomEnabled
              showsMyLocationButton
              userInteraction={false}
              // showsPointsOfInterest
              style={styles.map}
              initialRegion={{
                latitude: currentPosition.lat ? currentPosition.lat : cookPosition.lat,
                longitude: currentPosition.long ? currentPosition.long : cookPosition.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              {
                !!userLocation && !!userLocation.lat && !!userLocation.long && (
                  <MapView.Marker
                    pinColor='gold'
                    coordinate={{
                      latitude: userLocation.lat,
                      longitude: userLocation.long
                    }}
                    title='User Location'
                  />)
              }
              {
                !!userLocation && !!userLocation.lat && !!userLocation.long && !loading && (
                  <MapView.Marker
                    pinColor='orange'
                    coordinate={{
                      latitude: cookPosition.lat,
                      longitude: cookPosition.long
                    }}
                    title='Your Location'
                  />)
              }
              {
                !!userLocation && !!userLocation.lat && !!userLocation.long && !loading && (
                  <MapView.Polyline
                    coordinates={[
                      {
                        latitude: userLocation.lat,
                        longitude: userLocation.long
                      },
                      {
                        latitude: cookPosition.lat,
                        longitude: cookPosition.long
                      }
                    ]}
                    strokeWidth={2}
                    strokeColor='red'
                  />)
              }
              {
                !!userLocation && !!userLocation.lat && !!userLocation.long && loading && <MapView.Polyline coordinates={routeCoordinates} strokeColor='red' strokeWidth={2} />
              }

              <Marker.Animated
                pinColor='orange'
                ref={mapRefView}
                coordinate={new AnimatedRegion({
                  latitude: currentPosition.lat,
                  longitude: currentPosition.long,
                  latitudeDelta: 0,
                  longitudeDelta: 0
                })}
              />
            </MapView>
          </View>
        </View>
      </View>
    </View>
  )
}
export default (withTranslation()(DirectionMap))
