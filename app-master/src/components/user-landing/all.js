import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, Image, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/userLanding'
import { lightGrey } from '../../assets/styles/colors'
import { recommendedList } from '../user-landing/actions'
import { TYPE_RECOMMENDED, EVENT_CAT, PAGE } from '../../lib/const'
import { connect } from 'react-redux'
import Loader from '../ui-components/Loader'
import { screenViewed, eventTriggered } from '../../lib/ga'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import blueBg from '../../assets/images/blueBg.png'
import chefAvatar from '../../assets/images/chef.png'
import { AirbnbRating } from 'react-native-ratings'
import { HOME } from '../../type'
import NoRecords from '../ui-components/noRecords'
import { withTranslation } from 'react-i18next'

const All = (props) => {
  const { navigation, dispatch, homeData, loading, t } = props
  const [tempCuisine, setTempCuisine] = useState([])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenViewed(PAGE.RECOMMENDED)
      eventTriggered(EVENT_CAT.SELECTION, 'Navigating to recommended')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    dispatch(recommendedList({ type: TYPE_RECOMMENDED.ALL }))
  }, [])

  const getCuisinesName = (item) => {
    return item.map(item => item.name).join(' ') + ' Chef'
  }

  const bgImg = [
    { source: require('../../assets/images/skyBlueBg.png') },
    { source: require('../../assets/images/lightBlueBg.png') },
    { source: require('../../assets/images/greenBg.png') },
    { source: require('../../assets/images/purpleBg.png') }
  ]

  useEffect(() => {
    const tempCuisine = []
    const newArrayData = []
    if (homeData) {
      for (var i = 0; i <= homeData.cuisines.length; i++) {
        bgImg.forEach((element, index, array) => {
          newArrayData.push(element)
        })
      }
      homeData && homeData.cuisines && homeData.cuisines.forEach((element, i, array) => {
        const cuisineItem = element
        let newArray = ''
        newArrayData.forEach((element, index, array) => {
          if (i === index) {
            newArray = array[index].source
            cuisineItem.bgSource = newArray
          }
        })
        tempCuisine.push(cuisineItem)
      })
      setTempCuisine(tempCuisine)
    }
  }, [homeData])

  const cookDetails = (item) => {
    if (item) {
      dispatch({
        type: HOME.SELECTED_COOK,
        selectedCookData: item
      })
      navigation.navigate('UserCookProfile')
    }
  }

  const seeAllCooks = () => {
    navigation.push('HomeSearch')
  }

  const seeAllData = () => {
    navigation.navigate('ShowAllCuisines')
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: lightGrey, position: 'relative' }}>
        <View style={[styles.tabContainer, styles.bgColor]}>
          <View style={[styles.section, styles.allsection, { marginHorizontal: 10 }]}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={styles.titleHeader}>{t('available_cooks')}</Text>
            </View>
            <View style={styles.seeall}>
              <TouchableOpacity
                style={styles.seeAllCon}
                onPress={() => seeAllCooks()}
              >
                <Text style={styles.seeallText}>{t('see_all')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {loading ? <Loader /> : (
              homeData && homeData.workers && homeData.workers.length > 0 ? (
                <FlatList
                  data={homeData.workers}
                  horizontal
                  contentContainerStyle={styles.flatList}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={styles.imageContainer} keyExtractor={item.id}>
                      <View style={styles.imageSec}>
                        <TouchableOpacity
                          style={{ flex: 1 }}
                          onPress={() => cookDetails(item)}
                        >
                          <Image source={item.user && item.user.avatar ? { uri: `${IMAGE_BASE_URL}${item.user.avatar}` } : chefAvatar} style={styles.itemImg} />
                          <View style={styles.imageOpacity} />
                          <View style={styles.cookDetails}>
                            <Text style={[styles.nameText, styles.cooknameText]}>{item.user.name}</Text>
                            {
                              <Text style={styles.cuisinesText} ellipsizeMode='tail' numberOfLines={1}>{item.cuisines.length > 0 && getCuisinesName(item.cuisines)}</Text>
                            }
                            <View style={styles.starRatingContainer}>
                              <AirbnbRating
                                showRating={false}
                                isDisabled
                                defaultRating={item.rating}
                                starStyle={{ width: 15, height: 15 }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              ) : (
                <View style={{ height: 200 }}>
                  <NoRecords msg={t('no_results_found')} />
                </View>
              )
            )}
          </View>
          <View style={[styles.section, styles.allsection, { marginHorizontal: 10 }]}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={styles.titleHeader}>{t('cuisine_type_text')}</Text>
            </View>
            <View style={styles.seeall}>
              <TouchableOpacity
                style={styles.seeAllCon}
                onPress={() => seeAllData()}
              >
                <Text style={styles.seeallText}>{t('see_all')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {loading
              ? <Loader /> : (
                homeData ? (
                  <FlatList
                    data={tempCuisine}
                    horizontal
                    contentContainerStyle={styles.flatList}
                    keyExtractor={(item, index) => index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <View style={styles.cuisineCont} keyExtractor={item.id}>
                        <View style={styles.cuisineImages}>
                          <View style={styles.cuisineHeight}>
                            <ImageBackground source={item.bgSource ? item.bgSource : blueBg} style={[styles.itemImg, styles.cuisineImg, { height: 135 }]}>
                              <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                paddingHorizontal: 10
                              }}
                              >
                                <View style={{ flex: 1, paddingLeft: 10, alignSelf: 'center' }}>
                                  <Text style={[styles.nameText, { textAlign: 'center' }]}>{item.name}</Text>
                                </View>
                                <View style={{ flex: 1, paddingTop: 20, paddingRight: 10, alignItems: 'flex-end' }}>
                                  <ImageBackground imageStyle={{ borderRadius: 30 }} source={{ uri: `${IMAGE_BASE_URL}${item.image}` }} style={{ height: 90, width: 90, resizeMode: 'contain' }} />
                                </View>
                              </View>
                            </ImageBackground>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <View style={{ height: 200 }}>
                    <NoRecords msg={t('no_results_found')} enableEmoji />
                  </View>
                )
              )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(All))
