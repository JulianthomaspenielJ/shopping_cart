import { StyleSheet, Platform, Dimensions, PixelRatio } from 'react-native'
import {
  white,
  corn,
  silver,
  graniteGray,
  cello
} from './colors'
import { medium, poppinsMedium, nunitoSansRegular, poppinsBold } from './fonts'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const widthPercentageToDP = widthPercent => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100)
}

const heightPercentageToDP = heightPercent => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100)
}

export const cookLogin = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  body: {
    flex: 1,
    backgroundColor: white,
    paddingBottom: 50
  },
  container: {
    flex: 1,
    paddingHorizontal: 25
  },
  mask: {
    flex: 1,
    resizeMode: 'cover'
  },
  loginTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: nunitoSansRegular,
    marginTop: 20
  },
  loginContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    alignItems: 'center',
    flex: 0,
    justifyContent: 'center',
    marginVertical: 40
  },
  form: {
    flex: 1
  },
  login: {
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    padding: 15
  },
  loginTextSendOtp: {
    marginBottom: 30
  },
  loginText: {
    color: white,
    fontFamily: poppinsMedium,
    fontWeight: '700',
    fontSize: 18
  },
  note: {
    alignItems: 'center',
    marginTop: 15
  },
  haveAccount: {
    color: graniteGray,
    fontFamily: medium,
    fontWeight: '400',
    fontSize: 15
  },
  signUpText: {
    color: corn
  },
  splitSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  borderBottom: {
    borderColor: silver,
    borderBottomWidth: 1,
    width: '43%',
    position: 'relative',
    fontFamily: poppinsBold
  },
  orText: {
    color: cello,
    fontSize: 18,
    position: 'relative',
    top: 7,
    marginTop: 5,
    fontFamily: nunitoSansRegular
  },
  socialNetworks: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  icons: {
    width: Platform.OS === 'android' ? '50%' : '30%',
    alignItems: 'center'
  },
  haveAccountDiff: {
    fontWeight: '700',
    fontSize: 14
  },
  socialLogin: {
    height: 38,
    width: 38,
    resizeMode: 'contain',
    alignSelf: 'flex-start'

  },
  socialLogin1: {
    height: 38,
    width: 38,
    resizeMode: 'contain',
    alignSelf: 'flex-start'
  },
  img: {
    width: widthPercentageToDP('70%'),
    height: heightPercentageToDP('30%'),
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
