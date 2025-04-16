import { StyleSheet } from 'react-native'
import {
  paleSky,
  bigStone,
  athensGrey3,
  persianRed,
  darkYellow
} from './colors'
import {
  robotoRegular,
  poppinsMedium
} from './fonts'

export const notificationStyle = StyleSheet.create({
  notificationTitle: {
    fontFamily: poppinsMedium,
    fontSize: 18,
    fontWeight: '500'
  },
  alertText: {
    fontFamily: robotoRegular
  },
  notificationContainer: {
    backgroundColor: athensGrey3,
    borderRadius: 15,
    marginVertical: 10,
    padding: 15
  },
  titleName: {
    fontFamily: poppinsMedium,
    fontSize: 14,
    fontWeight: '500',
    color: paleSky,
    textTransform: 'capitalize'
  },
  titleMsg: {
    fontFamily: poppinsMedium,
    fontSize: 12,
    fontWeight: '500',
    color: bigStone
  },
  swipeDelete: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  notificationIcon: {
    backgroundColor: persianRed,
    marginVertical: 15,
    justifyContent: 'center',
    borderRadius: 50,
    height: 45,
    alignSelf: 'center',
    padding: 10,
    marginLeft: 10
  },
  clearContainer: {
    backgroundColor: darkYellow,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden'
  },
  clear: {
    fontFamily: poppinsMedium,
    fontSize: 13,
    textAlignVertical: 'center'
  }
})
