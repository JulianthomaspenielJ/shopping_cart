import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/userLanding'
import { lightGrey } from '../../assets/styles/colors'
import { connect } from 'react-redux'
import Loader from '../ui-components/Loader'
import { IMAGE_BASE_URL } from 'react-native-dotenv'
import blueBg from '../../assets/images/blueBg.png'
import Icon from 'react-native-vector-icons/Ionicons'

const ShowAllCuisines = (props) => {
  const { navigation, homeData, loading } = props
  const [tempCuisine, setTempCuisine] = useState([])

  const seeAllData = () => {
    navigation.navigate('UserLanding')
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: lightGrey, position: 'relative' }}>
        <View style={[styles.tabContainer, styles.bgColor]}>
          <View style={[styles.section, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }]}>
            <View>
              <TouchableOpacity
                onPress={() => seeAllData()}
              >
                <Icon name='ios-arrow-back' size={19} />
              </TouchableOpacity>
            </View>
            <View style={{ marginRight: '12%' }}>
              <Text style={styles.titleHeader}>Cuisine Types</Text>
            </View>
            <View />
          </View>
          <View>
            {loading
              ? <Loader /> : (
                homeData ? (
                  <FlatList
                    data={tempCuisine}
                    contentContainerStyle={styles.flatList}
                    keyExtractor={(item, index) => index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <View
                        style={[styles.cuisineCont,
                          {
                            alignSelf: 'center',
                            flexDirection: 'row',
                            marginHorizontal: 5,
                            marginVertical: 5,
                            padding: 15
                          }]} keyExtractor={item.id}
                      >
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
                  <View style={styles.noRecords}>
                    <Text>No record(s) found</Text>
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
    loading: customerHomeReducer && customerHomeReducer.loading ? customerHomeReducer.loading : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllCuisines)
