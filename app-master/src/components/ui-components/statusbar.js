import React, { useState, useEffect } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../assets/styles/tabHeader'
import { tangerine, white, gold, corn } from '../../assets/styles/colors'
import { USER, KEY } from '../../lib/const'
import { getData } from '../../lib/storage'
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : 56
const CustomStatusBar = (props) => {
  const [userType, setUserType] = useState('')
  const { navigation } = props
  useEffect(() => {
    getData(KEY.USER_TYPE)
      .then(user => {
        if (user) {
          setUserType(user)
        }
      })
  }, [navigation])
  return (
    <LinearGradient
      colors={userType === USER ? [white, white] : [corn, gold]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.statusBarcontainer}
    >
      <View style={{ height: STATUS_BAR_HEIGHT }}>
        <StatusBar
          translucent
          color='white'
          backgroundColor={tangerine}
          barStyle={userType === USER ? 'dark-content' : 'light-content'}
        />
      </View>
    </LinearGradient>
  )
}

export default CustomStatusBar
