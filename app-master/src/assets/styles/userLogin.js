import { StyleSheet, Platform } from 'react-native'
import {
  black,
  vividTangelo,
  grey,
  white,
  silver,
  darkCyan,
  blueZodiac,
  shamrock,
  shadeYellow,
  jacksonsPurple
} from './colors'
import {
  semiBold,
  mtCorsva,
  poppinsMedium,
  nunitoSansLight
} from './fonts'

export const userLogin = StyleSheet.create({
  titleContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  imageContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    position: 'relative',
    top: Platform.OS === 'ios' ? 35 : 0,
    left: 0,
    bottom: -50,
    right: 0
  },
  titleTextContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  leftBorder: {
    borderColor: vividTangelo,
    borderLeftWidth: 3,
    position: 'absolute',
    height: 30,
    left: 23,
    top: Platform.OS === 'ios' ? 7 : 11
  },
  bookCookText: {
    color: black,
    fontFamily: mtCorsva,
    fontSize: 40,
    fontWeight: '400',
    marginBottom: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15
  },
  otpTextContainer: {
    alignItems: 'center'
  },
  otpText: {
    color: grey,
    fontFamily: poppinsMedium,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 20
  },
  otpInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  otpInputText: {
    backgroundColor: white,
    borderColor: silver,
    borderRadius: 5,
    borderWidth: 1,
    color: vividTangelo,
    fontFamily: semiBold,
    fontWeight: '400',
    fontSize: 18,
    marginHorizontal: 5,
    textAlign: 'center',
    width: '18%',
    ...Platform.select({
      ios: {
        padding: 12
      }
    })
  },
  vividTangeloColorText: {
    color: shadeYellow
  },
  inputTextBox: {
    marginTop: 15
  },
  otpErrorMsg: {
    marginLeft: 30,
    marginTop: 5
  },
  emptyOtp: {
    marginLeft: 30,
    padding: 15
  },
  loginText: {
    color: darkCyan,
    fontFamily: poppinsMedium,
    fontWeight: 'normal',
    fontSize: 18
  },
  textCenter: {
    textAlign: 'center'
  },
  socialLoginFacebook: {
    borderColor: darkCyan,
    backgroundColor: blueZodiac,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5
  },
  inRow: {
    flexDirection: 'row'
  },
  socialText: {
    paddingHorizontal: 10,
    color: white,
    fontFamily: poppinsMedium,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 9
  },
  login: {
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    padding: 15
  },
  socialLoginGoogle: {
    backgroundColor: shamrock,
    borderColor: shamrock
    // paddingHorizontal: 15
  },
  terms: {
    paddingLeft: 8,
    fontFamily: nunitoSansLight,
    fontSize: 14,
    marginTop: 8,
    color: jacksonsPurple
  },
  body: {
    flex: 1,
    backgroundColor: white,
    top: 15,
    paddingBottom: 100
  },
  termsText: {
    color: black
  },
  skipTextContainer: {
    alignItems: 'flex-end',
    // width: '100%',
    padding: 5,
    marginRight: 10
  },
  skipText: {
    color: vividTangelo,
    fontFamily: poppinsMedium,
    fontWeight: 'normal',
    fontSize: 12
  },
  skipIcon: {
    textAlignVertical: 'center'
  }
})
