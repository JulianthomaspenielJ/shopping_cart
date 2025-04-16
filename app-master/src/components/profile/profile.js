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
  TouchableHighlight
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from '@react-navigation/native'
import { getData } from '../../lib/storage'
import {
  USER,
  KEY,
  PROFILE,
  REGEX,
  RESPONSE_MSG,
  DOCUMENT_UPLOAD,
  PROFILEUPDATE,
  UPLOAD,
  IMAGE_UPLOAD,
  ITEM_STATUS,
  PAGE,
  SESSION,
  COOK
} from '../../lib/const'
import {
  white,
  tangerine,
  gold,
  corn,
  black,
  transparent
} from '../../assets/styles/colors'
import { styles } from '../../assets/styles/profile'
import { home } from '../../assets/styles/home'
import whiteMenu from '../../assets/icons/blackMenu.png'
import user from '../../assets/icons/blackUser.png'
import upload from '../../assets/icons/blackUpload.png'
import emailIcon from '../../assets/icons/blackEmailIcon.png'
import profileImg from '../../assets/images/profile.png'
import profileFemale from '../../assets/images/profileFemale.png'
import { connect } from 'react-redux'
import { getProfile, getCuisines, getFoodtypes, profileUpdate, getMealType, uploadDocument } from './actions'
import { withTranslation } from 'react-i18next'
import { medium } from '../../assets/styles/fonts'
import Toast from 'react-native-simple-toast'
import ImagePicker from 'react-native-image-picker'
import { MAX_PROFILE_UPLOAD_SIZE, IMAGE_BASE_URL } from 'react-native-dotenv'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import Spinner from '../ui-components/Spinner'
import { AirbnbRating } from 'react-native-ratings'

const Profile = (props) => {
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
    mealTypeData,
    loading,
    t,
    page
  } = props
  const [userType, setUserType] = useState('')
  const [, setShowProfile] = useState('')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [foodtype, setFoodtype] = useState([])
  const [cuisine, setCuisine] = useState([])
  const [mealType, setMealType] = useState([])
  const [description, setDescription] = useState('')
  const [profileEnable, setProfileEnable] = useState(true)
  const [foodTypesData, setFoodTypesData] = useState([])
  const [cuisineDataTypes, setCuisineDataTypes] = useState([])
  const [selectedMealType, setSelectedMealType] = useState([])
  const [imageSource, setImageSource] = useState()
  const [rating, setRating] = useState()
  const [, setState] = useState()
  const [sOSNumber, setSOSNumber] = useState('')
  const [authToken, setAuthtoken] = useState('')
  const [isImageUpdated, setImageUpdated] = useState(false)

  let valid = false

  useEffect(() => {
    analytics().setCurrentScreen(PAGE.PROFILE)
    analytics().logEvent(PAGE.PROFILE, { })
    crashlytics().log('Cook Profile page mounted')
  }, [])

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
      dispatch(getCuisines({ type: PROFILE.CUISINE, status: ITEM_STATUS.ACTIVE }))
      dispatch(getFoodtypes({ type: PROFILE.FOODTYPE, status: ITEM_STATUS.ACTIVE }))
      dispatch(getMealType({ type: PROFILE.MEALTYPE, status: ITEM_STATUS.ACTIVE }))
      setState({})
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (foodtypesData) {
      setFoodTypesData(foodtypesData)
    }
    if (cuisineData) {
      setCuisineDataTypes(cuisineData)
    }
    if (mealTypeData) {
      setSelectedMealType(mealTypeData)
    }
    if (profileData) {
      setShowProfile(profileData)
      if (profileData.name) {
        setName(profileData.name)
      }
      if (profileData.mobileNumber) {
        setMobileNumber(profileData.mobileNumber)
      }
      if (profileData.avatar) {
        setImageSource(profileData.avatar)
      }

      if (profileData.email) {
        setEmail(profileData.email)
      }
      if (profileData.SOSNumber) {
        setSOSNumber(profileData.SOSNumber)
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
        if (profileData.worker.mealType && mealTypeData.length > 0) {
          setMealType(profileData.worker.mealType.map(a => a._id))
        }
        if (profileData.worker.rating) {
          setRating(profileData.worker.rating)
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
  }, [page, cuisineData, mealTypeData, foodtypesData, profileData, profileUploadStatus])

  useEffect(() => {
    if (page === 'profilepage' && (profileupdateStatus === RESPONSE_MSG.SUCCESS) && !isImageUpdated) {
      setProfileEnable(true)
      Toast.showWithGravity(t('profile_updated_success'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: PROFILEUPDATE.CLEAR })
      dispatch(getProfile({ type: PROFILE.PROFILE }))
      setTimeout(() => {
        if (userType === COOK) {
          navigation.push('AppDrawerCook')
        } else {
          navigation.push('AppDrawer')
        }
      }, 6000)
      setImageUpdated(false)
    } else if (page === 'profilepage' && (profileupdateStatus === RESPONSE_MSG.SUCCESS)) {
      setProfileEnable(true)
      Toast.showWithGravity(t('profile_updated_success'), Toast.LONG, Toast.BOTTOM)
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
      setProfileEnable(true)
      setImageUpdated(true)
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
    setSOSNumber(sOSNumber.trim())
    if (!name) {
      errorMsg = t('enter_name')
      valid = false
    } else if (!REGEX.EMAIL.test(email)) {
      errorMsg = t('valid_email')
      valid = false
    } else if (!REGEX.PHONE.test(sOSNumber)) {
      errorMsg = t('enter_valid_sosnumber')
      valid = false
    } else if (!sOSNumber) {
      errorMsg = t('enter_sosnumber')
      valid = false
    } else if (userType !== USER) {
      setDescription(description.trim())
      if (foodtype && foodtype.length === 0) {
        errorMsg = t('select_one_foodtype')
        valid = false
      } else if (cuisine && cuisine.length === 0) {
        errorMsg = t('select_one_cuisine')
        valid = false
      } else if (mealType && mealType.length === 0) {
        errorMsg = t('select_one_mealtype')
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

  const addBank = () => {
    dispatch({ type: PROFILEUPDATE.CLEAR })
    navigation.navigate('AddBank', { profileData })
  }

  const documentUpload = () => {
    dispatch({ type: PROFILEUPDATE.CLEAR })
    navigation.navigate('DocumentUpload', { profileData })
  }

  const updateImage = (image) => {
    const data = {
      avatar: image,
      role: userType
    }
    dispatch(profileUpdate(data, 'profilepage'))
  }
  const updateProfile = () => {
    if (validate()) {
      const data = {
        name: name,
        email: email,
        role: userType,
        SOSNumber: sOSNumber
      }
      if (userType !== USER) {
        data.worker = {
          foodType: foodtype,
          cuisine: cuisine,
          mealType: mealType,
          description: description
        }
      }
      dispatch(profileUpdate(data, 'profilepage'))
    }
  }

  const chooseFile = (value) => {
    var options = {
      title: 'Select Document',
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
            Toast.showWithGravity('File size should be less than 5MB', Toast.LONG, Toast.BOTTOM)
          } else {
            const formData = new FormData()
            formData.append('type', UPLOAD.DOCUMENT)
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

  const backToHOme = () => {
    navigation.navigate('WelcomeCook')
  }
  const icon = () => {
    return <Icon name='ios-close' style={[styles.fontIcon, styles.dropIcon]} />
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
          <View style={{ paddingTop: Platform.OS === 'ios' ? 40 : 0 }}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={backToHOme}>
                <Text style={{ fontSize: 18 }}><Icon name='ios-arrow-back' size={20} style={styles.arrowBack} /> {t('back')}</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Profile</Text>
              <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                  <Image style={styles.menuImg} source={whiteMenu} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.profile}>
            <View style={styles.bgProfile} />
            <View style={styles.owner}>
              <View style={styles.ownerBg}>
                <TouchableOpacity onPress={() => chooseFile()}>
                  <ImageBackground source={imageSource ? { uri: profileData.avatar ? `${IMAGE_BASE_URL}${profileData.avatar}` : imageSource } : (profileData.gender === 'MALE' ? profileImg : profileFemale)} style={styles.ownerAvatarImg} imageStyle={{ borderRadius: 70 }}>
                    <View style={[styles.editIconCont, userType !== USER ? styles.editIconContCook : '']}>
                      <Icon name='md-create' style={styles.editIcon} />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{name || ''}</Text>
                <Text style={styles.profileNo}>{mobileNumber || ''}</Text>
                <View style={styles.starRatingContainer}>
                  <AirbnbRating
                    showRating={false}
                    isDisabled
                    defaultRating={rating}
                    starStyle={{ width: 15, height: 15 }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formRow}>
              <Text style={styles.label}>{t('name')}</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <Image style={styles.imageIcon} source={user} />
                </View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(val) => setName(val)}
                  placeholder='Name'
                  editable={profileEnable}
                  value={name}
                  underlineColorAndroid='transparent'
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>{t('mobilenumber')}</Text>
              <View style={styles.row}>
                <FontAwesome style={styles.fontIcon} name='phone' />
                <TextInput
                  editable={false}
                  keyboardType='number-pad'
                  style={[styles.textInput, styles.phoneText]}
                  onChangeText={(val) => setMobileNumber(val)}
                  placeholder='Mobile Number'
                  value={mobileNumber}
                  underlineColorAndroid='transparent'
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>{t('emailid')}</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <Image style={styles.imageIcon} source={emailIcon} />
                </View>
                <TextInput
                  editable={profileEnable}
                  style={styles.textInput}
                  onChangeText={(val) => setEmail(val)}
                  placeholder='Email'
                  value={email}
                  underlineColorAndroid='transparent'
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>{t('sosnumber')}</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <FontAwesome style={styles.fontIcon} name='phone' />
                </View>
                <TextInput
                  editable={profileEnable}
                  style={styles.textInput}
                  keyboardType='number-pad'
                  maxLength={10}
                  onChangeText={(val) => setSOSNumber(val)}
                  placeholder='SOS Number'
                  value={sOSNumber}
                  underlineColorAndroid='transparent'
                />
              </View>
            </View>
            {
              userType !== USER
                ? (
                  <View>
                    <View style={styles.formRow}>
                      <Text style={styles.label}>{t('Document')}</Text>
                      <View style={styles.row}>
                        <View style={styles.imageContainer}>
                          <Image style={styles.imageIcon} source={upload} />
                        </View>
                        <Text style={[styles.textInput, styles.textAddInput]}>{t('Upload')}</Text>
                        <Text onPress={() => documentUpload()} style={[styles.label, styles.addlabel, styles.btnlabel]}>Upload</Text>
                      </View>
                    </View>
                    <View style={styles.formRow}>
                      <Text style={styles.label}>{t('add_bank_acc')}</Text>
                      <View style={styles.row}>
                        <FontAwesome style={styles.fontIcon} name='bank' />
                        <Text style={[styles.textInput, styles.textAddInput]}>Upload</Text>
                        <Text onPress={() => addBank()} style={[styles.label, styles.addlabel, styles.btnlabel]}>Add</Text>
                      </View>
                    </View>
                    <View style={[styles.formRow, styles.dropformRow]}>
                      <Text style={styles.label}>{t('foodtypes')} </Text>
                      <View style={[styles.row, styles.dropDown]}>
                        <View style={{ width: '94%', marginLeft: 25 }}>
                          <SectionedMultiSelect
                            disabled={!profileEnable}
                            items={foodTypesData}
                            searchPlaceholderText='Search'
                            expandDropDowns
                            hideSearch
                            single
                            uniqueKey='_id'
                            selectText='Choose Food Type'
                            selectToggleTextColor='white'
                            confirmText='Confirm'
                            showDropDowns
                            colors={{ primary: tangerine }}
                            itemNumberOfLines={3}
                            selectLabelNumberOfLines={3}
                            modalWithSafeAreaView
                            selectToggleIconComponent={<Icon style={styles.fontIcon} name='ios-arrow-down' />}
                            styles={{
                              selectToggleText: {
                                color: { black }
                              },
                              container: { maxHeight: 350 },
                              modalWrapper: { padding: 40 },
                              center: { alignItems: 'center' },
                              chipText: {
                                color: 'white',
                                fontSize: 13,
                                fontFamily: medium,
                                fontWeight: '600',
                                marginRight: 5
                              },
                              itemText: {
                                color: 'black',
                                fontFamily: medium
                              },
                              selectedItemText: {
                                color: tangerine
                              },
                              itemBackground: {
                                color: 'white'
                              }
                            }}
                            readOnlyHeadings={false}
                            iconRenderer={icon}
                            onSelectedItemsChange={(val) => setFoodtype(val)}
                            selectedItems={foodtype || []}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.formRow, styles.dropformRow]}>
                      <Text style={styles.label}>{t('cuisines')}</Text>
                      <View style={[styles.row, styles.dropDown]}>
                        <View style={{ width: '94%', marginLeft: 25 }}>
                          <SectionedMultiSelect
                            disabled={!profileEnable}
                            items={cuisineDataTypes}
                            searchPlaceholderText='Search'
                            expandDropDowns
                            hideSearch
                            uniqueKey='_id'
                            selectText='Choose Cuisine'
                            selectToggleTextColor='white'
                            confirmText='Confirm'
                            showDropDowns
                            colors={{ primary: tangerine }}
                            itemNumberOfLines={3}
                            selectLabelNumberOfLines={3}
                            modalWithSafeAreaView
                            selectToggleIconComponent={<Icon style={styles.fontIcon} name='ios-arrow-down' />}
                            styles={{
                              selectToggleText: {
                                color: { black }
                              },
                              container: { maxHeight: 350 },
                              modalWrapper: { padding: 40 },
                              center: { alignItems: 'center' },
                              chipText: {
                                color: 'black',
                                fontSize: 13,
                                fontFamily: medium,
                                fontWeight: '600',
                                marginRight: 5
                              },
                              itemText: {
                                color: 'black',
                                fontFamily: medium
                              },
                              selectedItemText: {
                                color: tangerine
                              },
                              itemBackground: {
                                color: 'white'
                              }
                            }}
                            loading={!cuisineDataTypes}
                            readOnlyHeadings={false}
                            iconRenderer={icon}
                            onSelectedItemsChange={(val) => setCuisine(val)}
                            selectedItems={cuisine}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.formRow, styles.dropformRow]}>
                      <Text style={styles.label}>{t('mealtype')}</Text>
                      <View style={[styles.row, styles.dropDown]}>
                        <View style={{ width: '94%', marginLeft: 25 }}>
                          <SectionedMultiSelect
                            disabled={!profileEnable}
                            items={selectedMealType}
                            searchPlaceholderText='Search'
                            expandDropDowns
                            hideSearch
                            uniqueKey='_id'
                            selectText='Choose Meal Type'
                            selectToggleTextColor='white'
                            confirmText='Confirm'
                            showDropDowns
                            colors={{ primary: tangerine }}
                            itemNumberOfLines={3}
                            selectLabelNumberOfLines={3}
                            modalWithSafeAreaView
                            selectToggleIconComponent={<Icon style={styles.fontIcon} name='ios-arrow-down' />}
                            styles={{
                              selectToggleText: {
                                color: { black }
                              },
                              container: { maxHeight: 350 },
                              modalWrapper: { padding: 40 },
                              center: { alignItems: 'center' },
                              chipText: {
                                color: 'black',
                                fontSize: 13,
                                fontFamily: medium,
                                fontWeight: '600',
                                marginRight: 5
                              },
                              itemText: {
                                color: 'black',
                                fontFamily: medium
                              },
                              selectedItemText: {
                                color: tangerine
                              },
                              itemBackground: {
                                color: 'white'
                              }
                            }}
                            loading={!selectedMealType}
                            readOnlyHeadings={false}
                            iconRenderer={icon}
                            onSelectedItemsChange={(val) => setMealType(val)}
                            selectedItems={mealType}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.formRow}>
                      <Text style={styles.label}>{t('cooking_exp')}</Text>
                      <View style={styles.row}>
                        <TextInput
                          editable={profileEnable}
                          onChangeText={(val) => setDescription(val)}
                          style={[styles.textInput, styles.description]}
                          multiline
                          numberOfLines={10}
                          placeholder='Description'
                          placeholderTextColor={black}
                          value={description}
                          underlineColorAndroid='transparent'
                        />
                      </View>
                    </View>
                  </View>
                ) : null
            }
          </View>
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
                {loading ? <Spinner /> : <Text style={styles.submitText}>{t('savechanges')}</Text>}
              </LinearGradient>
            </TouchableHighlight>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { profileReducer } = state
  return {
    profileData: profileReducer && profileReducer.profileData ? profileReducer.profileData : '',
    foodtypesData: profileReducer && profileReducer.foodtypesData ? profileReducer.foodtypesData : '',
    cuisineData: profileReducer && profileReducer.cuisineData ? profileReducer.cuisineData : '',
    profileupdateStatus: profileReducer && profileReducer.profileupdateStatus ? profileReducer.profileupdateStatus : '',
    documetUploadData: profileReducer && profileReducer.documetUploadData ? profileReducer.documetUploadData : '',
    documetUploadStatus: profileReducer && profileReducer.documetUploadStatus ? profileReducer.documetUploadStatus : '',
    documetUploaderror: profileReducer && profileReducer.documetUploaderror ? profileReducer.documetUploaderror : '',
    profileUploadStatus: profileReducer && profileReducer.profileUploadStatus ? profileReducer.profileUploadStatus : '',
    mealTypeData: profileReducer && profileReducer.mealTypeData ? profileReducer.mealTypeData : '',
    loading: !!(profileReducer && profileReducer.loading),
    page: profileReducer && profileReducer.page ? profileReducer.page : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Profile))
