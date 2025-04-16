import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
import { white, darkYellow, darkCyan } from './colors'
import {
  medium,
  rubikOneRegular,
  RobotoLight
} from './fonts'
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

export const home = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 15,
    backgroundColor: white
  },
  container: {
    backgroundColor: white,
    paddingHorizontal: 15
  },
  logo: {
    alignItems: 'center',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10
  },
  loginText: {
    flex: 1
  },
  loginType: {
    color: white,
    fontSize: 19,
    fontFamily: medium,
    fontWeight: '500',
    marginVertical: 15
  },
  loginUser: {
    backgroundColor: darkYellow,
    borderRadius: 15,
    color: darkCyan,
    fontSize: 19,
    fontFamily: medium,
    fontWeight: '500',
    marginVertical: 15,
    padding: 13,
    paddingHorizontal: 8,
    textAlign: 'center',
    overflow: 'hidden'
  },
  languageContainer: {
    alignItems: 'flex-end',
    marginTop: 55
  },
  pickerStyle: {
    width: '25%',
    color: white,
    justifyContent: 'flex-end',
    height: 20
  },
  languageText: {
    color: white
  },
  languageDropdown: {
    color: white,
    position: 'absolute',
    bottom: 0,
    right: 40,
    fontSize: 15,
    fontWeight: '900'
  },
  whoLoveCook: {
    color: darkCyan,
    fontSize: 24,
    fontFamily: rubikOneRegular,
    fontWeight: 'normal',
    lineHeight: 30
  },
  cooksText: {
    color: darkCyan,
    fontSize: 13,
    fontFamily: RobotoLight,
    fontWeight: 'normal',
    marginTop: 10
  },
  img: {
    width: widthPercentageToDP('70%'),
    height: heightPercentageToDP('55%'),
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
