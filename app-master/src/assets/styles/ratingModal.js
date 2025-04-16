import { StyleSheet } from 'react-native'
import { transparentOpacity, white, grey20, dangerText, darkYellow } from './colors'
import { medium, poppinsMedium } from './fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: transparentOpacity,
    justifyContent: 'center'
  },
  content: {
    backgroundColor: white,
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 20,
    borderRadius: 33
  },
  title: {
    fontSize: 16,
    color: grey20,
    fontFamily: medium,
    fontWeight: '700',
    lineHeight: 15,
    padding: 5,
    paddingLeft: 15,
    paddingTop: 5
  },
  ratingHolder: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 10
  },
  comment: {
    height: 80,
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: '#e6eef9',
    borderRadius: 20,
    padding: 25
  },
  errMsg: {
    color: dangerText,
    textAlign: 'center',
    padding: 3
  },
  btnHolder: {
    paddingHorizontal: 30
  },
  btnSquare: {
    paddingVertical: 8,
    borderRadius: 5
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: medium,
    fontWeight: '500',
    color: white,
    fontSize: 20
  },
  submitText: {
    backgroundColor: darkYellow,
    width: '50%',
    paddingVertical: 10,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    fontFamily: poppinsMedium,
    fontWeight: '600',
    fontSize: 14,
    overflow: 'hidden'
  },
  cookAvatar: {
    width: 55,
    height: 55,
    resizeMode: 'stretch',
    alignSelf: 'center',
    borderRadius: 25
  }
})
