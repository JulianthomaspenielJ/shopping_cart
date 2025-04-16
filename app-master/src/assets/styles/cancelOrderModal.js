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
    width: 300
  },
  closeHolder: {
    alignItems: 'flex-end'
  },
  close: {
    fontSize: 30,
    paddingTop: 15,
    paddingRight: 20,
    color: grey20
  },
  modalBody: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  modalImage: {
    width: 60,
    height: 60
  },
  message: {
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: medium,
    fontWeight: '500',
    color: grey20,
    textAlign: 'center'
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
  }
})
