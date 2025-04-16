import { StyleSheet } from 'react-native'
import { transparentOpacity, white, grey20 } from './colors'
import { medium } from './fonts'

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
    width: 320
  },
  closeHolder: {
    alignItems: 'flex-end'
  },
  close: {
    fontSize: 30,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 20,
    color: grey20
  },
  modalBody: {
    paddingTop: 10,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'center'
  },
  mbodyWithoutClose: {
    paddingTop: 70
  },
  modalImageHolder: {
    alignItems: 'center'
  },
  modalImage: {
    width: 108,
    height: 83
  },
  message: {
    paddingVertical: 20,
    fontSize: 20,
    fontFamily: medium,
    fontWeight: '500',
    color: grey20,
    textAlign: 'center'
  },
  btnHolder: {
    width: 200
  }
})
