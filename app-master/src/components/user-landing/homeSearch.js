import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, Image, ScrollView, ImageBackground, TouchableOpacity, Platform, StatusBar, TextInput, Keyboard } from 'react-native'
import { styles } from '../../assets/styles/userLanding'
import { lightGrey } from '../../assets/styles/colors'

import { recommendedList } from './actions'
import { TYPE_RECOMMENDED, EVENT_CAT, PAGE } from '../../lib/const'
import { connect } from 'react-redux'
import Loader from '../ui-components/Loader'
import { screenViewed, eventTriggered } from '../../lib/ga'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import Icon from 'react-native-vector-icons/Ionicons'
import startRating from '../../assets/images/start_rating.png'
import notification from '../../assets/images/notification.png'
import chefAvatar from '../../assets/images/chef.png'
import { HOME } from '../../type'
import NoRecords from '../ui-components/noRecords'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import { withTranslation } from 'react-i18next'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const HomeSearch = (props) => {
  const { navigation, dispatch, homeData, loading, route, t } = props
  const searchDatas = route && route.params && route.params.searchData
  const [searchData, setSearchData] = useState(searchDatas)
  const userSearch = () => {
    if (searchData) {
      analytics().logEvent(PAGE.RECOMMENDED, {
        searchData: searchData
      })
      eventTriggered(EVENT_CAT.ACTION, 'User search with cuisine, user')
      Keyboard.dismiss()
      dispatch(recommendedList({ type: TYPE_RECOMMENDED.RECOMMENDED, keyword: searchData }))
    }
  }

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.USERLANDING)
    crashlytics().log('User search page mounted')
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenViewed(PAGE.SEARCH)
      eventTriggered(EVENT_CAT.SELECTION, 'Navigating to recommended')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (searchData) {
      analytics().logEvent(PAGE.SEARCH, { searchData: searchData })
      dispatch(recommendedList({ type: TYPE_RECOMMENDED.RECOMMENDED, keyword: searchData }))
    }
  }, [searchData])
  const clearSearch = () => {
    setSearchData('')
    dispatch(recommendedList({ type: TYPE_RECOMMENDED.ALL }))
  }
  const cookProfile = (item) => {
    if (item) {
      dispatch({
        type: HOME.SELECTED_COOK,
        selectedCookData: item
      })
      navigation.navigate('UserCookProfile')
    }
  }

  const getCuisines = (item) => {
    const { cuisines } = item
    return cuisines.map(item => item.name).join(' ') + ' Chef'
  }
  useEffect(() => {
    return () => {
      clearSearch()
    }
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: lightGrey }}>
      {Platform.OS === 'ios' && (
        <>
          <View style={{ height: STATUS_BAR_HEIGHT }}>
            <StatusBar
              translucent
              backgroundColor='white'
              barStyle='dark-content'
            />
          </View>
        </>
      )}
      <View style={styles.parentContainer}>
        <View style={[styles.headerContainer, styles.searchHeader]}>
          <TouchableOpacity style={styles.hederSec} onPress={() => navigation.pop()}>
            <Text style={{ fontSize: 18 }}><Icon name='ios-arrow-back' style={styles.arrowIcon} size={18} /> {t('back')}</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Image style={styles.bellicon} source={notification} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchSec}>
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
            <Icon name='ios-search' style={[styles.searchIcon]} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: lightGrey, position: 'relative' }}>
          <View style={styles.bgColor}>
            <View>
              {loading ? <Loader /> : (
                homeData && homeData.workers.length > 0 ? (
                  <FlatList
                    data={homeData.workers}
                    contentContainerStyle={[styles.flatList, styles.searchflatList]}
                    keyExtractor={(index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View>
                        <View style={styles.seachSection}>
                          <View>
                            <ImageBackground
                              source={item.user && item.user.avatar ? { uri: `${IMAGE_BASE_URL}${item.user.avatar}` } : chefAvatar}
                              style={styles.imageBg}
                              imageStyle={{
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20
                              }}
                            />
                          </View>
                          <View style={{
                            padding: 20,
                            width: '70%'
                          }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                              }}
                            >
                              <View>
                                <Text style={styles.chefName}>{item.user && item.user.name}</Text>
                              </View>
                            </View>
                            <View>

                              <View style={{ flexDirection: 'row' }}>
                                {
                                  item.cuisines.length > 0 && <Text style={styles.searchdescText} ellipsizeMode='tail' numberOfLines={1}>{getCuisines(item)}</Text>
                                }
                              </View>
                            </View>
                            <View>
                              <Text style={styles.searchdescText} ellipsizeMode='tail' numberOfLines={5}>{item.description}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <View>
                                {
                                  item.user && item.user.city && (
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                      <Text style={[styles.location, styles.ordessec]}>Location :&nbsp;</Text>
                                      <Text style={styles.locationText}>{item.user.city}</Text>
                                    </View>
                                  )
                                }
                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                  <Text style={[styles.location, styles.ordessec]}>Total Orders Done :&nbsp;</Text>
                                  <Text style={[styles.locationText, styles.orderval]}>{item.totalOrders}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                  <Image style={[styles.starRating, { marginTop: 0 }]} source={startRating} />
                                  <Text style={[styles.chefName, { fontSize: 12 }]}>{item.rating}</Text>
                                </View>
                              </View>
                              <TouchableOpacity
                                style={styles.arrowHolder}
                                onPress={() => cookProfile(item)}
                              >
                                <Icon name='ios-arrow-forward' style={styles.detailArrowIcon} size={20} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <NoRecords enableEmoji />
                )
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { customerHomeReducer } = state
  return {
    homeData: customerHomeReducer && customerHomeReducer.homeData ? customerHomeReducer.homeData : '',
    loading: customerHomeReducer && customerHomeReducer.loading ? customerHomeReducer.loading : '',
    searchData: customerHomeReducer && customerHomeReducer.searchData ? customerHomeReducer.searchData : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomeSearch))
