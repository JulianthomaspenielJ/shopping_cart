import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Platform,
  FlatList,
  TouchableHighlight
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getData } from '../../lib/storage'
import {
  USER,
  GENDER,
  KEY,
  PROFILE,
  REGEX,
  RESPONSE_MSG,
  DOCUMENT_UPLOAD,
  PROFILEUPDATE,
  UPLOAD,
  IMAGE_UPLOAD,
  FORMAT,
  EVENT_CAT,
  SESSION,
  COOK
} from '../../lib/const'
import {
  white,
  black,
  transparent,
  gold, corn
} from '../../assets/styles/colors'
import { styles } from '../../assets/styles/userProfileStyle'
import { home } from '../../assets/styles/home'
import whiteMenu from '../../assets/icons/editPen.png'
import location from '../../assets/icons/addressIcon.png'
import userIcon from '../../assets/icons/userIcon.png'
import emailIcon from '../../assets/icons/emailIcon.png'
import profileImg from '../../assets/images/profile.png'
import profileFemale from '../../assets/images/profileFemale.png'
import { connect } from 'react-redux'
import { getProfile, getCuisines, getFoodtypes, profileUpdate, uploadDocument } from './actions'
import { withTranslation } from 'react-i18next'
import Toast from 'react-native-simple-toast'
import ImagePicker from 'react-native-image-picker'
import { MAX_PROFILE_UPLOAD_SIZE, IMAGE_BASE_URL } from 'react-native-dotenv'
import DateSelector from '../ui-components/dateSelector'
import RadioGroup from '../ui-components/radioGroup'
import cameraIcon from '../../assets/icons/camera.png'
import moment from 'moment'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
// import SvgUri from 'react-native-svg-uri'
import phoneIconSvg from '../../assets/icons/phoneIcon.png'
import dateIcon from '../../assets/icons/dateIcon.png'
import Spinner from '../ui-components/Spinner'
import { deleteTheAddress, setAddressUserDefault } from '../location/actions'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { screenViewed, eventTriggered } from '../../lib/ga'

const UserProfile = (props) => {
  const {
    navigation,
    dispatch,
    profileData,
    cuisineData,
    profileUploadStatus,
    documetUploaderror,
    foodtypesData,
    profileupdateStatus,
    documetUploadData,
    documetUploadStatus,
    t,
    loading,
    deleteAddressError,
    deleteAddress,
    setDefaultAddressStatus
  } = props
  const [userType, setUserType] = useState('')
  const [, setShowProfile] = useState('')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [foodtype, setFoodtype] = useState([])
  const [cuisine, setCuisine] = useState([])
  const [description, setDescription] = useState('')
  const [profileEnable, setProfileEnable] = useState(false)
  const [imageSource, setImageSource] = useState()
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [, setState] = useState()
  const [genderSelected, setGenderSelected] = useState('')
  const [addresses, setAddresses] = useState([])
  const [authToken, setAuthtoken] = useState('')
  const [isImageUpdated, setImageUpdated] = useState(false)

  const options = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
  ]

  let valid = false
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(KEY.USER_TYPE)
        .then(user => {
          if (user) {
            setUserType(user)
          }
        })
      getData(SESSION.TOKEN)
        .then(token => {
          if (token) {
            setAuthtoken(token)
          }
        })
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      dispatch(getCuisines({ type: PROFILE.CUISINE }))
      dispatch(getFoodtypes({ type: PROFILE.FOODTYPE }))
      Toast.showWithGravity(t('peofile_edit_alert'), Toast.LONG, Toast.TOP)
      setState({})
      screenViewed('PROFILE')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    analytics().setCurrentScreen(PROFILE.PROFILE)
    analytics().logEvent(PROFILE.PROFILE, { COOK: PROFILE.PROFILE })
    crashlytics().log('User profile page mounted')
  }, [])

  useEffect(() => {
    if (profileEnable) {
      Toast.showWithGravity(t('enableEdit'), Toast.LONG, Toast.TOP)
    }
  }, [profileEnable])

  const addressDelete = (id, isDefault) => {
    if (isDefault === '1') {
      Toast.showWithGravity(t('cantDeleteDeafultAdd'), Toast.LONG, Toast.BOTTOM)
    } else {
      dispatch(deleteTheAddress(id))
    }
  }

  useEffect(() => {
    if (setDefaultAddressStatus && (setDefaultAddressStatus.status === RESPONSE_MSG.SUCCESS)) {
      dispatch(getProfile({ type: PROFILE.PROFILE }))
    }
  }, [setDefaultAddressStatus])

  const setDefault = (id) => {
    dispatch(setAddressUserDefault(id, { isDefault: '1' }))
  }

  useEffect(() => {
    if (deleteAddress && (deleteAddress.status === RESPONSE_MSG.SUCCESS)) {
      dispatch(getProfile({ type: PROFILE.PROFILE }))
    }
  }, [deleteAddress, deleteAddressError])

  useEffect(() => {
    if (profileData) {
      setShowProfile(profileData)

      if (profileData.addresses) {
        setAddresses(profileData.addresses)
      }
      if (profileData.name) {
        setName(profileData.name)
      }
      if (profileData.mobileNumber) {
        setMobileNumber(profileData.mobileNumber)
      }
      if (profileData.gender) {
        setGender(profileData.gender)
        if (profileData.gender === 'MALE') {
          setGenderSelected(0)
        } else {
          setGenderSelected(1)
        }
      }
      if (profileData.dob) {
        setDob(moment(profileData.dob).format(FORMAT.DOB))
      }
      if (profileData.avatar) {
        setImageSource(profileData.avatar)
      }

      if (profileData.email) {
        setEmail(profileData.email)
      }
      if (profileData.worker) {
        if (profileData.worker.description) {
          setDescription(profileData.worker.description)
        }
        if (profileData.worker.cuisine && cuisineData.length > 0) {
          setCuisine([...profileData.worker.cuisine.map((a) => a._id)])
        }
        if (profileData.worker.foodType && foodtypesData.length > 0) {
          setFoodtype(profileData.worker.foodType.map(a => a._id))
        }
      }
    }
    if ((profileUploadStatus === RESPONSE_MSG.SUCCESS)) {
      Toast.showWithGravity(t('image_updated_success'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: IMAGE_UPLOAD.CLEAR })
    }
    if ((profileUploadStatus === RESPONSE_MSG.ERROR)) {
      Toast.showWithGravity(t('doc_failed'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: IMAGE_UPLOAD.CLEAR })
    }
  }, [cuisineData, foodtypesData, profileData, profileUploadStatus])

  useEffect(() => {
    if ((profileupdateStatus === RESPONSE_MSG.SUCCESS) && !isImageUpdated) {
      Toast.showWithGravity(t('profile_updated_success'), Toast.LONG, Toast.BOTTOM)
      setProfileEnable(false)
      dispatch({ type: PROFILEUPDATE.CLEAR })
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      if (userType === COOK) {
        navigation.push('AppDrawerCook')
      } else {
        navigation.push('AppDrawer')
      }
      setImageUpdated(false)
    } else if ((profileupdateStatus === RESPONSE_MSG.SUCCESS)) {
      Toast.showWithGravity(t('profile_updated_success'), Toast.LONG, Toast.BOTTOM)
      setProfileEnable(false)
      dispatch({ type: PROFILEUPDATE.CLEAR })
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      setImageUpdated(false)
    }
    if ((profileupdateStatus === RESPONSE_MSG.ERROR)) {
      Toast.showWithGravity(t('profile_fails'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: PROFILE.UPDATECLEAR })
    }
  }, [profileupdateStatus])

  useEffect(() => {
    setState({})
    getData(KEY.USER_TYPE)
      .then(user => {
        if (user) {
          setUserType(user)
        }
      })
    getData(SESSION.TOKEN)
      .then(token => {
        if (token) {
          setAuthtoken(token)
        }
      })
    if ((documetUploadStatus === RESPONSE_MSG.SUCCESS)) {
      setImageUpdated(true)
      setProfileEnable(true)
      setImageSource(documetUploadData[0].path)
      dispatch({ type: DOCUMENT_UPLOAD.CLEAR })
      updateImage(documetUploadData[0].path)
    }
    if ((documetUploaderror)) {
      setImageSource('')
      Toast.showWithGravity(t('image_fail'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: DOCUMENT_UPLOAD.CLEAR })
    }
  }, [documetUploadData, documetUploadStatus, documetUploaderror])

  useEffect(() => {
    return () => {
      dispatch({ type: PROFILEUPDATE.CLEAR })
    }
  }, [])

  const validate = () => {
    valid = true
    let errorMsg = ''
    setName(name.trim())
    setEmail(email.trim())
    if (!name) {
      errorMsg = t('enter_name')
      valid = false
    } else if (!REGEX.EMAIL.test(email)) {
      errorMsg = t('valid_email')
      valid = false
    } else if (userType !== USER) {
      setDescription(description.trim())
      if (foodtype && foodtype.length === 0) {
        errorMsg = t('select_one_foodtype')
        valid = false
      } else if (cuisine && cuisine.length === 0) {
        errorMsg = t('select_one_cuisine')
        valid = false
      } else if (!description) {
        errorMsg = t('enter_desc')
        valid = false
      }
    }
    if (errorMsg) {
      Toast.showWithGravity(errorMsg, Toast.LONG, Toast.BOTTOM)
    }
    return valid
  }

  const updateImage = (image) => {
    const data = {
      avatar: image,
      role: userType
    }
    dispatch(profileUpdate(data, 'userprofilepage'))
  }
  const updateProfile = () => {
    if (validate()) {
      const data = {
        name: name,
        email: email,
        role: userType,
        gender: gender,
        dob: dob
      }
      if (userType !== USER) {
        data.worker = {
          foodType: foodtype,
          cuisine: cuisine,
          description: description
        }
      }
      dispatch(profileUpdate(data, 'userprofilepage'))
    }
  }
  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        Toast.showWithGravity(t('doc_cancelled'), Toast.LONG, Toast.BOTTOM)
      } else if (response.error) {
        Toast.showWithGravity(response.error, Toast.LONG, Toast.BOTTOM)
      } else {
        const source = response
        let fileName = ''
        let fileType = ''
        let validFile = false
        const imagepath = Platform.OS === 'android' ? 'file://' + source.path : source.uri
        if (imagepath) {
          const uriParts = imagepath.split('/')
          if (uriParts && uriParts.length > 0) {
            fileName = uriParts[uriParts.length - 1]
            const fileNameParts = fileName.split('.')
            fileType = fileNameParts[fileNameParts.length - 1]
          }
        }
        validFile = true
        if (validFile) {
          const limit = (1024 * 1024)
          const filesize = source.fileSize / limit
          const filelimit = MAX_PROFILE_UPLOAD_SIZE * limit
          if (filesize >= filelimit) {
            Toast.showWithGravity('File size should be less than 2MB', Toast.LONG, Toast.BOTTOM)
          } else {
            const formData = new FormData()
            formData.append('type', UPLOAD.PROFILE)
            formData.append('width', '600')
            formData.append('height', '600')
            formData.append('file_to_upload', {
              uri: imagepath,
              type: 'image/' + fileType,
              name: fileName
            })
            dispatch(uploadDocument(formData, authToken))
          }
        }
      }
    })
  }

  const onGenderChange = (gender) => {
    setGenderSelected(gender)
    if (gender === 0) {
      setGender(GENDER.MALE)
    } else {
      setGender(GENDER.FEMALE)
    }
  }

  const backToHOme = () => {
    navigation.navigate('UserLanding')
  }

  const goToLocationMap = (addId = null) => {
    eventTriggered(EVENT_CAT.NAV, 'Navigating to set Google map')
    navigation.push('SetLocationMap', { addressId: addId })
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
        <View key={index} style={[styles.row, { paddingTop: 0 }]}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SetLocation')} style={{ width: 150 }}>
              {/* <SvgUri
                style={styles.imageIcon}
                source={location}
              /> */}
              <Image style={styles.imageIcon} source={location} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => goToLocationMap(item._id)}>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.address}>
                {address}{landmark}{area}{city}{pinCode}
              </Text>
              <Text style={styles.addressType}>{item.isDefault === '1' ? 'Defult Address' : item.type}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Menu>
              <MenuTrigger>
                <MatIcon name='dots-vertical' color={black} size={24} />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{ width: 100 }}>
                <MenuOption onSelect={() => goToLocationMap(item._id)} text='Edit' />
                <MenuOption onSelect={() => addressDelete(item._id, item.isDefault)} text='Delete' />
                <MenuOption onSelect={() => setDefault(item._id)} text='Default' />
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={styles.borderBottom} />
      </>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <LinearGradient
          colors={[white, white]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[home.container, styles.gradient]}
        >
          <View style={{ paddingTop: Platform.OS === 'ios' ? 20 : 0, marginTop: 10 }}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={backToHOme}
              >
                <Text style={{ fontSize: 18 }}><Icon name='ios-arrow-back' size={20} style={styles.arrowBack} /> {t('back')}</Text>
              </TouchableOpacity>
              <Text style={styles.title} />
              <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => setProfileEnable(true)} style={styles.editIconText}>
                  <Image
                    style={[styles.menuImg, { marginTop: 15 }]}
                    source={whiteMenu}
                  />
                </TouchableOpacity>
                {/* {!profileEnable ? (
                  <TouchableOpacity onPress={() => setProfileEnable(true)} style={styles.editIconText}>
                    <SvgUri
                      style={[styles.menuImg, { marginTop: 15 }]}
                      source={whiteMenu}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => updateProfile()} style={styles.editIconText}>
                    <SvgUri
                      style={[styles.menuImg, { marginTop: 15 }]}
                      source={whiteMenu}
                    />
                  </TouchableOpacity>
                )} */}
              </View>
            </View>
          </View>
          <View style={styles.profile}>
            <View style={styles.bgProfile} />
            <View style={styles.owner}>
              <View style={styles.ownerBg}>
                <TouchableOpacity onPress={() => chooseFile()}>
                  <ImageBackground source={imageSource ? { uri: profileData.avatar ? `${IMAGE_BASE_URL}${profileData.avatar}` : imageSource } : (gender === 'MALE' ? profileImg : profileFemale)} style={styles.ownerAvatarImg} imageStyle={{ borderRadius: 70 }}>
                    <View style={[styles.editIconCont, userType !== USER ? styles.editIconContCook : '']}>
                      <Image
                        style={{
                          height: 35,
                          width: 35,
                          resizeMode: 'stretch'
                        }}
                        source={cameraIcon}
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileUserName}>{name || ''}</Text>
              </View>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formRow}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  {/* <SvgUri
                    style={styles.imageIcon}
                    source={userIcon}
                  /> */}
                  <Image style={styles.imageIcon} source={userIcon} />
                </View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => setName(val)}
                  placeholder='Name'
                  placeholderTextColor={black}
                  editable={profileEnable}
                  value={name}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={styles.borderBottom} />
              <Text style={styles.label}>E-Mail</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  {/* <SvgUri
                    style={styles.imageIcon}
                    source={emailIcon}
                  /> */}
                  <Image style={styles.imageIcon} source={emailIcon} />
                </View>
                <TextInput
                  editable={profileEnable}
                  style={styles.textInput}
                  onChangeText={(val) => setEmail(val)}
                  placeholder='Email'
                  placeholderTextColor={black}
                  value={email}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={styles.borderBottom} />
              <Text style={styles.label}>Phone</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.imageIcon}
                    source={phoneIconSvg}
                  />
                </View>
                <TextInput
                  editable={false}
                  style={[styles.textInput, styles.phoneText]}
                  onChangeText={(val) => setMobileNumber(val)}
                  placeholder='Mobile Number'
                  placeholderTextColor={black}
                  keyboardType='number-pad'
                  value={mobileNumber}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={styles.borderBottom} />
              <Text style={styles.label}>Date Of Birth</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <Image style={styles.imageIcon} source={dateIcon} />
                </View>
                <TextInput
                  editable={profileEnable}
                  style={styles.textInput}
                  onChangeText={(val) => setDob(val)}
                  value={dob}
                  placeholder='Date Of Birth'
                  placeholderTextColor={black}
                  underlineColorAndroid='transparent'
                />
                <DateSelector
                  style={styles.datePicker}
                  date={dob}
                  onDateChange={(date) => { setDob(date) }}
                />
              </View>
              <View style={styles.borderBottom} />
              <Text style={styles.label}>Gender</Text>
              <View style={[styles.row, { marginVertical: 7 }]}>
                <RadioGroup
                  selected={genderSelected}
                  options={options}
                  onPress={(value) => { onGenderChange(value) }}
                  labelStyle={styles.radioLabelText}
                />
              </View>
              <View style={styles.borderBottom} />
              <Text style={styles.label}>Address</Text>
              {
                addresses && addresses.length > 0 ? (
                  <FlatList
                    data={addresses}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (<Item item={item} key={index} index={index} />)}
                  />)
                  : (
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('SetLocation')}>
                        <Text style={styles.address}>Click here to add address</Text>
                      </TouchableOpacity>
                    </View>
                  )
              }
            </View>
            {profileEnable && (
              <View style={styles.formRow}>
                <TouchableHighlight
                  underlayColor={transparent}
                  onPress={() => updateProfile()}
                >
                  <LinearGradient
                    colors={[gold, corn]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.saveBtn, { paddingVertical: 10, borderRadius: 15 }]}
                  >
                    {loading ? <Spinner /> : <Text style={styles.submitText}>Save Changes</Text>}
                  </LinearGradient>
                </TouchableHighlight>
              </View>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { profileReducer, mapLocationReducer } = state
  return {
    loading: !!(profileReducer && profileReducer.loading),
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    foodtypesData: profileReducer && profileReducer.foodtypesData ? profileReducer.foodtypesData : '',
    cuisineData: profileReducer && profileReducer.cuisineData ? profileReducer.cuisineData : '',
    profileupdateStatus: profileReducer && profileReducer.profileupdateStatus ? profileReducer.profileupdateStatus : '',
    documetUploadData: profileReducer && profileReducer.documetUploadData ? profileReducer.documetUploadData : '',
    documetUploadStatus: profileReducer && profileReducer.documetUploadStatus ? profileReducer.documetUploadStatus : '',
    documetUploaderror: profileReducer && profileReducer.documetUploaderror ? profileReducer.documetUploaderror : '',
    profileUploadStatus: profileReducer && profileReducer.profileUploadStatus ? profileReducer.profileUploadStatus : '',
    deleteAddress: mapLocationReducer && mapLocationReducer.deleteAddress ? mapLocationReducer.deleteAddress : '',
    deleteAddressError: mapLocationReducer && mapLocationReducer.deleteAddressError ? mapLocationReducer.deleteAddressError : '',
    setDefaultAddressStatus: mapLocationReducer && mapLocationReducer.setDefaultAddressStatus ? mapLocationReducer.setDefaultAddressStatus : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserProfile))
