import { StyleSheet } from 'react-native'
import { transparentOpacity, white, grey20, tangerine, black, searchIconColor, gainsboro, boxShadow } from './colors'
import { semibold, poppinSemiBold } from './fonts'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: transparentOpacity,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: white,
    borderRadius: 21,
    overflow: 'hidden'
  },
  slotcloseHolder: {
    justifyContent: 'space-evenly',
    marginVertical: 5
  },
  closeHolder: {
    alignItems: 'flex-end'
  },
  modalcontainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  slontTextActive: {
    fontSize: 12,
    padding: 10
  },
  slontTextactive: {
    fontSize: 12,
    padding: 10
  },
  colorwhite: {
    color: white
  },
  colorblack: {
    color: black
  },
  colorboxShadow: {
    color: boxShadow
  },
  slotname: {
    fontSize: 20,
    paddingLeft: 20,
    color: tangerine,
    fontFamily: semibold,
    fontWeight: '500'
  },
  slotSelection: {
    flexDirection: 'row',
    margin: 6,
    borderRadius: 25
  },
  bgtangerine: {
    backgroundColor: tangerine
  },
  bggainsboro: {
    backgroundColor: gainsboro
  },
  bgsearchIconColor: {
    backgroundColor: searchIconColor
  },
  fromDate: {
    color: black,
    paddingLeft: 0,
    fontSize: 15
  },
  close: {
    fontSize: 35,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 20,
    color: grey20
  },
  modalBody: {
    alignItems: 'center'
  },
  slotmodalBody: {
    paddingTop: 10,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  modalImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    resizeMode: 'stretch'
  },
  message: {
    paddingVertical: 20,
    fontSize: 20,
    fontFamily: poppinSemiBold,
    fontWeight: '500',
    color: grey20
  },
  modalHolderImage: {
    width: 130,
    height: 250,
    borderRadius: 9,
    resizeMode: 'stretch',
    position: 'absolute'
  },
  close1: {
    fontSize: 35,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 20,
    color: grey20
  },
  modalHolderImage1: {
    width: '19%',
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 10,
    bottom: 75
  }
})
