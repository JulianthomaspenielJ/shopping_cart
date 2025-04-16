import React, { useEffect } from 'react'
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { styles } from '../../assets/styles/userLanding'
import { white } from '../../assets/styles/colors'
import { recommendedList } from '../user-landing/actions'
import { TYPE_RECOMMENDED, PAGE } from '../../lib/const'
import { connect } from 'react-redux'
import Loader from '../ui-components/Loader'
import { screenViewed } from '../../lib/ga'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import { AirbnbRating } from 'react-native-ratings'
import { HOME } from '../../type'
import chefAvatar from '../../assets/images/chef.png'
import NoRecords from '../ui-components/noRecords'
import { withTranslation } from 'react-i18next'

const Recommended = (props) => {
  const { navigation, dispatch, homeData, loading, searchData, t } = props

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenViewed(PAGE.RECOMMENDED)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    dispatch(recommendedList({ type: TYPE_RECOMMENDED.RECOMMENDED }))
  }, [])

  useEffect(() => {
    if (searchData) {
      dispatch(recommendedList({ type: TYPE_RECOMMENDED.RECOMMENDED, keyword: searchData }))
    } else {
      dispatch(recommendedList({ type: TYPE_RECOMMENDED.RECOMMENDED }))
    }
  }, [searchData])
  const getCuisinesName = (item) => {
    return item.map(item => item.name).join(' ') + ' Chef'
  }

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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: white }}>
        <View style={[styles.tabContainer, styles.bgColor]}>
          <View style={[styles.section, styles.allsection]}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={styles.titleHeader}>{t('our_recommended')}</Text>
            </View>
            <View style={styles.seeall}>
              <TouchableOpacity
                style={styles.seeAllCon}
                onPress={seeAllCooks}
              >
                <Text style={styles.seeallText}>{t('see_all')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {loading ? <Loader /> : (
              homeData && homeData.recommended && homeData.recommended.length > 0 ? (
                <FlatList
                  data={homeData.recommended}
                  horizontal
                  contentContainerStyle={styles.flatList}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={styles.imageContainer} keyExtractor={index}>
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
          <View style={[styles.section, styles.allsection]}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={styles.titleHeader}>{t('user_rated_cooks')}</Text>
            </View>
            <View style={styles.seeall}>
              <TouchableOpacity
                style={styles.seeAllCon}
                onPress={seeAllCooks}
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
                  keyExtractor={(item, index) => index}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={styles.cuisineCont} keyExtractor={index}>
                      <View style={styles.imageSec}>
                        <TouchableOpacity onPress={() => cookDetails(item)} style={{ flex: 1 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Recommended))
