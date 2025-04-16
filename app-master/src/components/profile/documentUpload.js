import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, TouchableHighlight, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { KEY, PROFILE, RESPONSE_MSG, OTHER_DOCUMENT_UPLOAD, PROFILEUPDATE, UPLOAD, SESSION } from '../../lib/const'
import { styles } from '../../assets/styles/documentupload'
import { transparent, gold, corn } from '../../assets/styles/colors'
import uploadImg from '../../assets/images/upload.png'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast'
import { getProfile, uploadOtherDocument, profileUpdate } from './actions'
import { withTranslation } from 'react-i18next'
import { getData } from '../../lib/storage'
import ImagePicker from 'react-native-image-picker'
import { MAX_FILE_UPLOAD_SIZE, IMAGE_BASE_URL } from 'react-native-dotenv'
import _ from 'lodash'
import Spinner from '../ui-components/Spinner'
import { GETPROFILE } from '../../type'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import Header from '../ui-components/header'

const documentData = [
  {
    name: 'Aadhar',
    value: 'aadhaar',
    imagepath: null,
    filename: null
  },
  {
    name: 'Pan Card',
    value: 'panCard',
    imagepath: null,
    filename: null
  },
  {
    name: 'Driving License',
    value: 'drivingLicense',
    imagepath: null,
    filename: null
  },
  {
    name: 'Voter Id',
    value: 'voterId',
    imagepath: null,
    filename: null
  },
  {
    name: 'Your Image',
    value: 'yourImage',
    imagepath: null,
    filename: null
  }
]
const DocumentUpload = (props) => {
  const {
    loading,
    navigation,
    dispatch,
    otherdocumetUploadData,
    otherdocumetUploadStatus,
    otherdocumentName,
    otherfileName,
    profileupdateStatus,
    t,
    route,
    page
  } = props
  const [userType, setUserType] = useState('')
  const [documentFiles, setDocumentFiles] = useState(documentData)
  const [authToken, setAuthtoken] = useState('')
  const [, setState] = useState()
  let valid = false

  useEffect(() => {
    analytics().setCurrentScreen('DOCUMENT')
    analytics().logEvent('DOCUMENT_PAGE', { })
    crashlytics().log('Cook Documet page mounted')
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
    if ((otherdocumetUploadStatus === RESPONSE_MSG.SUCCESS)) {
      Toast.showWithGravity(t('doc_uploaded'), Toast.LONG, Toast.BOTTOM)
      documentData.map((item, index) => {
        if (item.value === otherdocumentName) {
          item.imagepath = otherdocumetUploadData[0].path
          item.filename = otherfileName
        }
      })
      setDocumentFiles(documentData)
      setState({})
      dispatch({ type: OTHER_DOCUMENT_UPLOAD.CLEAR })
    }
    if ((otherdocumetUploadData === RESPONSE_MSG.ERROR)) {
      Toast.showWithGravity(t('doc_failed'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: OTHER_DOCUMENT_UPLOAD.CLEAR })
    }
  }, [otherdocumetUploadStatus, otherdocumetUploadData, otherdocumentName, otherfileName])

  useEffect(() => {
    const profileData = route && route.params && route.params.profileData
    const { documents } = profileData.worker
    documentData.map((item) => {
      item.imagepath = documents[item.value]
    })
    setDocumentFiles(documentData)
  }, [])

  useEffect(() => {
    return () => {
      documentData.map((item) => {
        item.imagepath = ''
        item.filename = ''
      })
      dispatch({ type: PROFILEUPDATE.CLEAR })
    }
  }, [])

  useEffect(() => {
    if (page === 'docpage' && (profileupdateStatus === RESPONSE_MSG.SUCCESS)) {
      navigation.goBack()
      Toast.showWithGravity(t('doc_upload_sucess'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: PROFILEUPDATE.CLEAR })
      setDocumentFiles(documentData)
    }
    if ((profileupdateStatus === RESPONSE_MSG.ERROR)) {
      Toast.showWithGravity(t('doc_upload_fail'), Toast.LONG, Toast.BOTTOM)
    }
  }, [page, profileupdateStatus])

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
    ImagePicker.launchImageLibrary(options, response => {
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
          const filelimit = MAX_FILE_UPLOAD_SIZE * limit
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
            dispatch(uploadOtherDocument(formData, value, fileName, authToken))
          }
        }
      }
    })
  }

  const validate = () => {
    valid = true
    const uploadeddocumentFiles = _.reject(documentFiles, ['imagepath', null])
    if (uploadeddocumentFiles.length === 0) {
      Toast.showWithGravity(t('select_one_doc'), Toast.LONG, Toast.BOTTOM)
      valid = false
    }
    const index = uploadeddocumentFiles.findIndex(x => x.value === 'yourImage')
    if (!uploadeddocumentFiles[index].imagepath) {
      Toast.showWithGravity('Please select your image', Toast.LONG, Toast.BOTTOM)
      valid = false
    }
    return valid
  }
  const updateProfile = () => {
    if (validate()) {
      dispatch({ type: GETPROFILE.LOADING })
      const documents = {}
      documentFiles.map((item, index) => {
        documents[item.value] = item.imagepath ? item.imagepath : ''
      })
      const data = {
        role: userType,
        worker: {
          documents: documents
        }
      }
      dispatch(profileUpdate(data, 'docpage'))
    }
  }
  return (
    <View style={styles.bankContainer}>
      <Header padding title={t('docupload')} subMenu navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
        {documentFiles ? documentFiles.map((item, index) => {
          return (
            <View key={index} style={[styles.formRow, styles.dropformRow]}>
              <View style={[styles.row, styles.dropDown]}>
                <Text style={styles.textInput}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => chooseFile(item.value)}
                  underlayColor={transparent}
                >
                  <LinearGradient
                    colors={[gold, corn]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.linerText, styles.uploadlinerText]}
                  >
                    <Image source={uploadImg} style={styles.uploadImg} />
                    <Text style={[styles.btnText, styles.uploadText]}>{t('Upload')}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {item.imagepath ? (
                <View style={{ flex: 1, paddingTop: 10 }}>
                  <Image style={{ height: 60, width: 60 }} source={{ uri: `${IMAGE_BASE_URL}${item.imagepath}` }} />
                </View>
              ) : null}
            </View>
          )
        }) : null}
        <TouchableHighlight
          underlayColor={transparent}
          style={styles.btnContainer}
          disabled={loading}
          onPress={() => updateProfile()}
        >
          <LinearGradient
            colors={[gold, corn]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.linerText}
          >
            {loading ? <Spinner /> : <Text style={styles.btnText}>Submit</Text>}
          </LinearGradient>
        </TouchableHighlight>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { profileReducer, loginReducer } = state
  return {
    otherdocumentName: profileReducer && profileReducer.otherdocumentName ? profileReducer.otherdocumentName : '',
    otherfileName: profileReducer && profileReducer.otherfileName ? profileReducer.otherfileName : '',
    otherdocumetUploadData: profileReducer && profileReducer.otherdocumetUploadData ? profileReducer.otherdocumetUploadData : '',
    otherdocumetUploadStatus: profileReducer && profileReducer.otherdocumetUploadStatus ? profileReducer.otherdocumetUploadStatus : '',
    profileupdateStatus: profileReducer && profileReducer.profileupdateStatus ? profileReducer.profileupdateStatus : '',
    authToken: loginReducer && loginReducer.authToken ? loginReducer.authToken : '',
    loading: !!(profileReducer && profileReducer.loading),
    page: profileReducer && profileReducer.page ? profileReducer.page : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DocumentUpload))
