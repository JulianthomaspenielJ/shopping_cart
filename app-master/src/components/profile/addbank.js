import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, TouchableHighlight } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { styles } from '../../assets/styles/bank'
import { transparent, gold, corn } from '../../assets/styles/colors'
import { RESPONSE_MSG, PROFILEUPDATE, REGEX } from '../../lib/const'
import Toast from 'react-native-simple-toast'
import { profileUpdate } from './actions'
import { GETPROFILE } from '../../type'
import Spinner from '../ui-components/Spinner'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'
import Header from '../ui-components/header'

const AddBank = (props) => {
  const {
    loading,
    navigation,
    dispatch,
    profileupdateStatus,
    route,
    t,
    page
  } = props
  const profileData = route && route.params && route.params.profileData

  const { bankDetails } = profileData && profileData.worker
  const [bankName, setBankName] = useState(bankDetails.bankName)
  const [branchName, setBranchName] = useState(bankDetails.branchName)
  const [accno, setAccno] = useState(bankDetails.accountNumber)
  const [accName, setaccName] = useState(bankDetails.accountHolderName)
  const [ifsccode, setIfsccode] = useState(bankDetails.ifscCode)
  let valid = false

  useEffect(() => {
    analytics().setCurrentScreen('COOK BANK DEATAIL')
    analytics().logEvent('COOK_BANK_DEATAIL', { })
    crashlytics().log('bank details wallet page mounted')
  }, [])

  const validate = () => {
    valid = true
    let errorMsg = ''
    setBankName(bankName.trim())
    setBranchName(branchName.trim())
    setAccno(accno.trim())
    setaccName(accName.trim())
    setIfsccode(ifsccode.trim())
    if (!bankName) {
      errorMsg = t('select_bank')
      valid = false
    } else if (!branchName) {
      errorMsg = t('enter_branch')
      valid = false
    } else if (!REGEX.ACC_NO.test(accno)) {
      errorMsg = t('valid_acc')
      valid = false
    } else if (!accName) {
      errorMsg = t('enter_acc_holder')
      valid = false
    } else if (!REGEX.IFSC_CODE.test(ifsccode)) {
      errorMsg = t('valid_ifsc')
      valid = false
    }
    if (errorMsg) {
      Toast.showWithGravity(errorMsg, Toast.LONG, Toast.BOTTOM)
    }
    return valid
  }

  const updateBank = () => {
    if (validate()) {
      dispatch({ type: GETPROFILE.LOADING })
      const data = {
        role: profileData.role,
        worker: {
          bankDetails: {
            bankName: bankName,
            accountNumber: accno,
            accountHolderName: accName,
            ifscCode: ifsccode,
            branchName: branchName
          }
        }
      }
      dispatch(profileUpdate(data, 'bankpage'))
    }
  }
  useEffect(() => {
    if (page === 'bankpage' && (profileupdateStatus === RESPONSE_MSG.SUCCESS)) {
      navigation.goBack()
      Toast.showWithGravity(t('bankdetails_updated_success'), Toast.LONG, Toast.BOTTOM)
      dispatch({ type: PROFILEUPDATE.CLEAR })
    }
    if (page === 'bankpage' && (profileupdateStatus === RESPONSE_MSG.ERROR)) {
      Toast.showWithGravity(t('failed_to_update'), Toast.LONG, Toast.BOTTOM)
    }
  }, [page, profileupdateStatus])
  return (
    <View style={styles.bankContainer}>
      <Header padding title={t('bankaccDeatils')} subMenu navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
        <View style={[styles.formRow, styles.dropformRow]}>
          <Text style={styles.label}>{t('bank_name')}</Text>
          <View style={[styles.row, styles.dropDown]}>
            <TextInput
              style={styles.textInput}
              onChangeText={(val) => setBankName(val)}
              value={bankName}
              placeholder='Bank Name'
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={[styles.formRow, styles.dropformRow]}>
          <Text style={styles.label}>{t('Branch_name')}</Text>
          <View style={[styles.row, styles.dropDown]}>
            <TextInput
              style={styles.textInput}
              onChangeText={(val) => setBranchName(val)}
              value={branchName}
              placeholder='Branch Name'
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={[styles.formRow, styles.dropformRow]}>
          <Text style={styles.label}>{t('Acc_no')}</Text>
          <View style={[styles.row, styles.dropDown]}>
            <TextInput
              style={styles.textInput}
              onChangeText={(val) => setAccno(val)}
              placeholder='Account Number'
              keyboardType='number-pad'
              value={accno}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={[styles.formRow, styles.dropformRow]}>
          <Text style={styles.label}>{t('Acc_name')}</Text>
          <View style={[styles.row, styles.dropDown]}>
            <TextInput
              style={styles.textInput}
              placeholder='Account Name'
              value={accName}
              onChangeText={(val) => setaccName(val)}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={[styles.formRow, styles.dropformRow]}>
          <Text style={styles.label}>{t('ifsc')}</Text>
          <View style={[styles.row, styles.dropDown]}>
            <TextInput
              style={styles.textInput}
              placeholder='IFSC Code'
              value={ifsccode}
              onChangeText={(val) => setIfsccode(val)}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <TouchableHighlight
          underlayColor={transparent}
          style={styles.btnContainer}
          onPress={() => updateBank()}
          disabled={loading}
        >
          <LinearGradient
            colors={[gold, corn]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.linerText}
          >
            {loading ? <Spinner /> : <Text style={styles.btnText}>Save</Text>}
          </LinearGradient>
        </TouchableHighlight>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { profileReducer } = state
  return {
    profileupdateStatus: profileReducer && profileReducer.profileupdateStatus ? profileReducer.profileupdateStatus : '',
    loading: !!(profileReducer && profileReducer.loading),
    page: profileReducer && profileReducer.page ? profileReducer.page : ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddBank))
