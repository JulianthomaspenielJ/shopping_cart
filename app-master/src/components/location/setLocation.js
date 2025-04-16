import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import gps from '../../assets/icons/gpsIcon.png'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { styles } from '../../assets/styles/map'
import { AddressList, userDefaultAddress, setAddressUserDefault, deleteTheAddress } from './actions'
import { withTranslation } from 'react-i18next'
import { RESPONSE_MSG, PAGE, EVENT_CAT } from '../../lib/const'
import { connect } from 'react-redux'
import { ADDRESSLIST, USERDEFAULTADDRESS, ADDADDRESS } from '../../type'
import { screenViewed, eventTriggered } from '../../lib/ga'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerActions } from '@react-navigation/native'
import Toast from 'react-native-simple-toast'
import Loader from '../ui-components/Loader'

const SetLocation = (props) => {
  const {
    navigation,
    dispatch,
    getDefaultAddress,
    getAddressList,
    setDefaultAddressStatus,
    deleteAddressError,
    deleteAddress,
    loading,
    t
  } = props
  const [defaultAddress, setDefaultAddress] = useState('')
  const [totalAddressLength, setTotalAddress] = useState(0)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenViewed(PAGE.ADDRESSLIST)
      dispatch(AddressList({ type: ADDRESSLIST.REQUEST }))
      dispatch(userDefaultAddress({ type: USERDEFAULTADDRESS.REQUEST }))
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    setTotalAddress(getAddressList.length)
  }, [getAddressList])

  useEffect(() => {
    if (getDefaultAddress) {
      let add = ''
      if (getDefaultAddress.completeAddress) {
        add = `${add}${getDefaultAddress.completeAddress}, `
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
    } else {
      setDefaultAddress('')
    }
    dispatch(AddressList({ type: ADDRESSLIST.REQUEST }))
  }, [getDefaultAddress])

  useEffect(() => {
    if (setDefaultAddressStatus && (setDefaultAddressStatus.status === RESPONSE_MSG.SUCCESS)) {
      dispatch(userDefaultAddress({ type: USERDEFAULTADDRESS.REQUEST }))
    }
  }, [setDefaultAddressStatus])

  const setDefault = (id) => {
    dispatch(setAddressUserDefault(id, { isDefault: '1' }))
  }

  const addressDelete = (id, isDefault) => {
    if (isDefault === '1') {
      Toast.showWithGravity(t('cantDeleteDeafultAdd'), Toast.LONG, Toast.BOTTOM)
    } else if (isDefault === '0') {
      dispatch(deleteTheAddress(id))
    }
  }

  useEffect(() => {
    if (deleteAddress && (deleteAddress.status === RESPONSE_MSG.SUCCESS)) {
      dispatch(AddressList({ type: ADDRESSLIST.REQUEST }))
      dispatch(userDefaultAddress({ type: USERDEFAULTADDRESS.REQUEST }))
    }
  }, [deleteAddress, deleteAddressError])

  const goToLocationMap = (addId = null) => {
    eventTriggered(EVENT_CAT.NAV, 'Navigating to set Google map')
    dispatch({ type: ADDADDRESS.CLEAR })
    navigation.push('SetLocationMap', { addressId: addId, totalAddressLength: totalAddressLength })
  }

  const goBack = () => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.closeDrawer())
  }

  const Item = (data) => {
    const { item, index } = data
    const address = item.completeAddress ? `${item.completeAddress}, ` : ''
    const landmark = item.landmark ? `${item.landmark}, ` : ''
    const area = item.area ? `${item.area}, ` : ''
    const city = item.city ? `${item.city} ` : ''
    const pinCode = item.pinCode ? `${item.pinCode}` : ''
    return (
      <>
        <View key={index} style={{ flexDirection: 'row' }}>
          <View style={{ flex: 6 }}>
            <TouchableOpacity key={index} onPress={() => setDefault(item._id)} style={[styles.headerContainer, styles.addContainer]}>
              <FontAwesome style={[styles.locationIcon, styles.locationIconOther]} name='map-marker' />
              <View style={{ width: '98%' }}>
                <Text ellipsizeMode='tail' numberOfLines={2} style={[styles.locationDesc, styles.locationDescOther]}>
                  {address}{landmark}{area}{city}{pinCode}
                </Text>
                <Text style={[styles.locationDesc, styles.locationDescOther, styles.addBtn]}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View>
              <Menu>
                <MenuTrigger>
                  <MatIcon name='dots-vertical' color='black' size={24} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ width: 120, paddingLeft: 8 }}>
                  <MenuOption onSelect={() => goToLocationMap(item._id)} text='Edit' />
                  <MenuOption onSelect={() => addressDelete(item._id, item.isDefault)} text='Delete' />
                  <MenuOption onSelect={() => setDefault(item._id)} text='Default' />
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.locationContainer}>
      <View style={{ padding: 18 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%'
        }}
        >
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ fontSize: 15 }}><Icon name='ios-arrow-back' size={15} style={[styles.arrowBack]} /> {t('back')}</Text>
          </TouchableOpacity>
          <Text style={[styles.title]}>{t('set_location')}</Text>
          <View />
        </View>
        <View style={styles.gpsheaderContainer}>
          <Image source={gps} style={styles.gpsBtn} />
          <TouchableOpacity style={styles.gpsContent} onPress={() => goToLocationMap()}>
            <Text style={styles.headline}>{t('current_location')}</Text>
            <Text style={styles.details}>{t('using_gps')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.parentContainer}>
          <Text style={styles.label}>{t('saved_address')}</Text>
        </View>
        {
          loading
            ? (
              <Loader />
            )
            : (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
                <View>
                  {
                    getAddressList && getAddressList.length > 0 ? (
                      <FlatList
                        data={getAddressList}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (<Item item={item} key={index} index={index} />)}
                      />)
                      : <Text style={[styles.locationDesc, styles.locationDescOther, styles.addBtn]}>{t('no_address_found')}</Text>
                  }
                </View>
                {
                  defaultAddress ? (
                    <View style={[styles.parentContainer, { paddingBottom: 80 }]}>
                      <View style={styles.defaultContainer}>
                        <View style={{ flex: 6 }}>
                          <Text>{t('default_location')}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 4 }}>
                          <View style={[styles.headerContainer, styles.addContainer]}>
                            <FontAwesome style={[styles.locationIcon, styles.locationIconOther]} name='map-marker' />
                            <Text ellipsizeMode='tail' numberOfLines={2} style={[styles.locationDesc, styles.locationDescOther, { width: '98%' }]}>{defaultAddress}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.locationDesc, styles.locationDescOther, styles.addBtn]}>{t('default')}</Text>
                        </View>
                      </View>
                    </View>
                  ) : null
                }
              </ScrollView>
            )
        }
      </View>
    </SafeAreaView>
  )
}
const mapStateToProps = (state) => {
  const { profileReducer, mapLocationReducer } = state
  return {
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    getAddressList: mapLocationReducer && mapLocationReducer.getAddressList ? mapLocationReducer.getAddressList : '',
    getDefaultAddress: mapLocationReducer && mapLocationReducer.getDefaultAddress ? mapLocationReducer.getDefaultAddress : '',
    setDefaultAddressStatus: mapLocationReducer && mapLocationReducer.setDefaultAddressStatus ? mapLocationReducer.setDefaultAddressStatus : '',
    loading: !!(mapLocationReducer && mapLocationReducer.loading),
    deleteAddress: mapLocationReducer && mapLocationReducer.deleteAddress ? mapLocationReducer.deleteAddress : '',
    deleteAddressError: mapLocationReducer && mapLocationReducer.deleteAddressError ? mapLocationReducer.deleteAddressError : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SetLocation))
