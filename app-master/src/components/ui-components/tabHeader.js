import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../../assets/styles/tabHeader'
import { tangerine, koromiko, gold, corn } from '../../assets/styles/colors'
import { USER, KEY } from '../../lib/const'
import { getData } from '../../lib/storage'
import whiteMenu from '../../assets/icons/whiteMenu.png'
import { DrawerActions } from '@react-navigation/native'

const TabHeader = (props) => {
  const [userType, setUserType] = useState('')
  const { title, state, descriptors, navigation } = props
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.USER_TYPE)
        .then(user => {
          if (user) {
            setUserType(user)
          }
        })
    })
    return unsubscribe
  }, [navigation])
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
      colors={userType === USER ? [tangerine, koromiko] : [corn, gold]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.navArea}>
        <View />
        <View style={styles.titleHolder}>
          <Text style={styles.headerTitle}>{title || ''}</Text>
        </View>
        <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.backArrow} source={whiteMenu} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }
          return (
            <TouchableOpacity
              key={index}
              style={isFocused ? [styles.tabButton, styles.tabButtonActive] : styles.tabButton}
              onPress={onPress}
            >
              <Text style={isFocused ? styles.tabButtonText : [styles.tabButtonText, styles.tabButtonTextInactive]}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </LinearGradient>
  )
}

export default TabHeader
