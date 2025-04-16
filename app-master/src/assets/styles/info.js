import { StyleSheet, Platform } from 'react-native'
import {
  white,
  vividTangelo,
  darkCyan
} from './colors'
import {
  regular,
  rubikOneRegular,
  robotoBlack
} from './fonts'

export const userInfo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 18
  },
  imageContainer: {
    flex: 4,
    paddingTop: 40,
    paddingLeft: 20,
    width: '100%'
  },
  chefImage: {
    width: '98%',
    resizeMode: 'contain'
  },
  textContainer: {
  },
  infoText: {
    color: darkCyan,
    fontFamily: rubikOneRegular,
    fontSize: 24,
    fontWeight: 'normal',
    marginVertical: 5
  },
  infoTitle: {
    color: darkCyan,
    fontFamily: rubikOneRegular,
    fontSize: 26,
    fontWeight: 'normal',
    marginVertical: 0,
    lineHeight: 30
  },
  infoDetail: {
    color: darkCyan,
    fontFamily: robotoBlack,
    fontSize: 13,
    fontWeight: '300',
    marginVertical: 20
  },
  getRecipes: {
    alignItems: 'flex-end'
  },
  skipText: {
    color: vividTangelo,
    fontSize: 14,
    fontFamily: regular,
    paddingBottom: 25
  },
  Content: {
    ...Platform.select({
      ios: {
        padding: 18
      }
    })
  }
})
