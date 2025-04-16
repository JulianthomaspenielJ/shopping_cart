import { StyleSheet } from 'react-native'
import {
  black,
  darkCyan,
  darkYellow,
  gray
} from './colors'
import {
  nunitoRegular,
  robotoRegular,
  nunitoLight,
  robotoMedium,
  poppinsBold
} from './fonts'

export const noRecordsStyle = StyleSheet.create({
  emoji: {
    height: 120,
    width: 120,
    resizeMode: 'contain'
  },
  container: {
    flex: 1
  },
  emojiContainer: {
    paddingVertical: 30,
    alignItems: 'center'
  },
  sorryMsgContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center'
  },
  sorryText: {
    color: darkCyan,
    fontFamily: nunitoRegular,
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  sorryMsg: {
    color: darkCyan,
    fontFamily: nunitoLight,
    fontWeight: '300',
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCookBtn: {
    alignItems: 'center',
    backgroundColor: darkYellow,
    margin: 20,
    padding: 20,
    borderRadius: 15
  },
  noCookText: {
    color: black,
    fontFamily: robotoMedium,
    fontSize: 14,
    textTransform: 'capitalize'
  },
  thanksMsg: {
    alignItems: 'center'
  },
  thanksText: {
    color: gray,
    fontFamily: robotoRegular,
    fontSize: 10
  },
  notification:{
    alignSelf: 'center', 
    color: '#897979',
    fontFamily: poppinsBold,
    paddingTop: 30
  }
})
