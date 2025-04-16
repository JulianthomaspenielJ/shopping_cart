import { StyleSheet, Platform } from 'react-native'
import {
  white,
  corn,
  cookShadow,
  black,
  dangerText,
  darkCyan
} from './colors'
import {
  poppinsExtra,
  nunitoSans
} from './fonts'

export const input = StyleSheet.create({
  fieldSet: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: darkCyan,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        padding: 11
      }
    })
  },
  fieldSetError: {
    borderColor: dangerText
  },
  fieldSetCook: {
    borderColor: corn
  },
  fieldSetUser: {
    borderColor: darkCyan
  },
  legend: {
    backgroundColor: white,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: darkCyan,
    fontFamily: poppinsExtra,
    fontWeight: '300',
    fontSize: 12,
    position: 'absolute',
    textShadowColor: cookShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    top: -13,
    left: 20
  },
  legendError: {
    color: dangerText
  },
  legendUser: {
    color: darkCyan
  },
  inputText: {
    color: black,
    fontFamily: nunitoSans,
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 1
    // lineHeight: 25
  },
  inputFocus: {
    color: corn
  }
})
