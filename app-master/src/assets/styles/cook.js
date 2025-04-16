import { StyleSheet } from 'react-native'
import { burntOrange, grey } from './colors'
import { medium } from './fonts'

export const styles = StyleSheet.create({
  cookHolder: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  cookProfile: {
    width: 45,
    height: 55,
    borderRadius: 10,
    borderColor: burntOrange
  },
  cookIconHolder: {
    paddingHorizontal: 10
  },
  cookIcon: {
    width: 17,
    height: 22
  },
  cookName: {
    fontFamily: medium,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 23,
    color: grey
  }
})
